/**
 * Create Unit Page Component
 */

'use client';

import { ItemsForm } from './ItemsForm';

export default function CreateUnitPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ItemsForm mode="create" />
    </div>
  );
}
