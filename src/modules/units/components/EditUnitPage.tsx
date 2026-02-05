/**
 * Edit Unit Page Component
 */

'use client';

import { useEffect } from 'react';
import { UnitsForm } from '@/modules/units/components/UnitsForm';
import { useUnitById } from '@/modules/units/hooks';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface EditUnitPageProps {
  unitId: string;
}

export default function EditUnitPage({ unitId }: EditUnitPageProps) {
  const router = useRouter();
  const { data: unit, loading, error } = useUnitById(unitId);

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push('/products/units');
    }
  }, [error, router]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!unit) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <UnitsForm mode="edit" initialData={unit} />
    </div>
  );
}
