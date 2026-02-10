/**
 * Edit Item Page Component
 */

'use client';

import { ItemsForm } from './ItemsForm';
import { useParams } from 'next/navigation' 

export default function EditItemPage() {
  const params = useParams(); 
  const itemId = Array.isArray(params.id) ? params.id[0] : params.id; // Xử lý trường hợp id có thể là một mảng
  
  return ( 
    <div className="flex flex-col gap-6 p-6">
      <ItemsForm mode="edit" itemId={itemId} />
    </div>
  );
}
