"use client";

import { ReactNode } from "react";
import { Button } from "../ui/Button";
import { BarChart, Plus, User } from "lucide-react";

interface HeaderTabsProps {
  children?: ReactNode;
}

export const HeaderTabs = ({ children }: HeaderTabsProps) => {
  return (
    <div className="w-full bg-primary">
      <div className="flex justify-between items-center gap-5 px-2">
        <div className="flex gap-2 text-white pt-2">
          <div className="w-[300px] py-2 mr-16">{children}</div>
          <div className="active w-[130px] bg-gray-200 tab-invoice flex items-center justify-around hover:cursor-pointer hover:bg-primary hover:rounded-md hover:transition-colors hover:duration-300">
            <span className="font-sans text-white">Hóa đơn</span>
            <button className="text-white btn-remove">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>
            <Button>
              <Plus />
            </Button>
          </div>
        </div>
        <div className="flex items-center">
          <Button>
            <User />
          </Button>
          <Button>
            <BarChart />
          </Button>
        </div>
      </div>
    </div>
  );
};
