"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

import { PermissionFunction } from "../types";

const getDescendantIds = (node: PermissionFunction): number[] => {
  return node.functions.reduce(
    (acc, child) => [...acc, child.id, ...getDescendantIds(child)],
    [] as number[],
  );
};

interface PermissionNodeProps {
  node: PermissionFunction;
  selectedIds: Set<number>;
  onToggle: (nodeId: number, checked: boolean) => void;
}

const PermissionNode: React.FC<PermissionNodeProps> = ({
  node,
  selectedIds,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.functions && node.functions.length > 0;

  const descendantIds = React.useMemo(() => getDescendantIds(node), [node]);

  const areAllDescendantsChecked = hasChildren
    ? descendantIds.every((id) => selectedIds.has(id))
    : false;
  const areSomeDescendantsChecked = hasChildren
    ? descendantIds.some((id) => selectedIds.has(id))
    : false;

  const isChecked = selectedIds.has(node.id);

  let checkState: boolean | "indeterminate" = isChecked;

  if (hasChildren) {
    if (areAllDescendantsChecked) {
      checkState = true;
    } else if (areSomeDescendantsChecked) {
      checkState = "indeterminate";
    } else {
      checkState = isChecked;
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-0.5 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        <Checkbox
          id={`perm-${node.id}`}
          checked={checkState}
          onCheckedChange={(checked) => onToggle(node.id, !!checked)}
          className="mt-0.5"
        />
        <label
          htmlFor={`perm-${node.id}`}
          className="text-sm cursor-pointer select-none"
        >
          {node.name}
        </label>
      </div>
      {isOpen && hasChildren && (
        <div className="ml-4 pl-4 border-l dark:border-gray-700 space-y-2 py-2">
          {node.functions.map((childNode) => (
            <PermissionNode
              key={childNode.id}
              node={childNode}
              selectedIds={selectedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface PermissionTreeProps {
  permissions: PermissionFunction[];
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export const PermissionTree: React.FC<PermissionTreeProps> = ({
  permissions,
  selectedIds,
  setSelectedIds,
}) => {
  const permissionMap = React.useMemo(() => {
    const map = new Map<number, PermissionFunction>();
    const addNode = (node: PermissionFunction) => {
      map.set(node.id, node);
      node.functions.forEach(addNode);
    };
    permissions.forEach(addNode);
    return map;
  }, [permissions]);

  const handleToggle = (nodeId: number, checked: boolean) => {
    const node = permissionMap.get(nodeId);
    if (!node) return; 
    const allIdsToToggle = [nodeId, ...getDescendantIds(node)]; 
    setSelectedIds((prev) => {
      const newSelected = new Set(prev);
      if (checked) {
        allIdsToToggle.forEach((id) => newSelected.add(id));
      } else {
        allIdsToToggle.forEach((id) => newSelected.delete(id));
      }
      return newSelected;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {permissions.map((permission) => (
        <PermissionNode
          key={permission.id}
          node={permission}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />    
      ))}
    </div>
  );
};
