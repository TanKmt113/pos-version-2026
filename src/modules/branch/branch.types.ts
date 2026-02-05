export interface Branch {
  id?: string
  code: string
  name: string
  address: string
  phone: string
  timezone: string
  status: 'active' | 'inactive'
  note?: string
}