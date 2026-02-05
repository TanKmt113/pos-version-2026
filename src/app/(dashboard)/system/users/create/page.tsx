'use client'

import { UserForm } from "@/components/user/UserForm"
import { User } from "@/modules/user/types"

export default function CreateUserPage() {
  async function handleCreateUser(data: Partial<User>) {
    // TODO: Implement API call to create user
    console.log('Creating user:', data)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <UserForm
      mode="create"
      onSubmit={handleCreateUser}
    />
  )
}