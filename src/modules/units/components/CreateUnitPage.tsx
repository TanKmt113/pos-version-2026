/**
 * Create Unit Page Component
 */

'use client';

import { UnitsForm } from '@/modules/units/components/UnitsForm';

export default function CreateUnitPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <UnitsForm mode="create" />
    </div>
  );
}
