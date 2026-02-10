"use client";

export function ViewItemPage({ itemId }: { itemId: string }) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1>View Item Page</h1>
      <p>Item ID: {itemId}</p>
    </div>
  );
}