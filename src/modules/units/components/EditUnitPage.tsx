/**
 * Edit Unit Page Component
 */

'use client';

import { useState, useEffect } from 'react';
import { UnitsForm } from '@/modules/units/components/UnitsForm';
import { uomService } from '@/modules/units/services/unitsService';
import { UnitOfMeasures } from '@/modules/units/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface EditUnitPageProps {
  unitId: string;
}

export default function EditUnitPage({ unitId }: EditUnitPageProps) {
  const router = useRouter();
  const [unit, setUnit] = useState<UnitOfMeasures | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        const data = await uomService.getById(unitId);
        setUnit(data);
      } catch (error: any) {
        console.error('Failed to fetch unit:', error);
        const message = error?.error || error?.message || 'Không thể tải dữ liệu đơn vị tính';
        toast.error(message);
        router.push('/products/units');
      } finally {
        setLoading(false);
      }
    };

    fetchUnit();
  }, [unitId, router]);

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
