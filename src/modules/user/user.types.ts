export interface User {
  id?: string
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  address?: string
  note?: string
  createdAt?: string
}