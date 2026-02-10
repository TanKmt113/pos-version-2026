import { ViewItemPage } from "@/modules/items/components/ViewItemPage";

export default async function EditItemPageRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ViewItemPage itemId={id} />;
}
