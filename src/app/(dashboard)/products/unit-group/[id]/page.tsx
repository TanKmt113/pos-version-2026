import EditUnitPage from '@/modules/units/components/EditUnitPage';

export default async function EditUnitGroupRoute({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <EditUnitPage unitId={id} />;
}
