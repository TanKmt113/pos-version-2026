/**
 * Create Unit Page Component
 */

'use client';

import { UnitsGroupForm } from './UnitsGroupForm';

export default function CreateUnitGroupPage() {
  return (

    <div className="flex flex-col gap-6 p-6">
      <UnitsGroupForm mode="create" />
    </div>
  );
}
