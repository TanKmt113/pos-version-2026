'use client'

import { BranchForm } from "@/components/branch/BranchForm"
import { User } from "@/modules/user/user.types"

export default function CreateUserPage() {
  async function handleCreateBranch(data: Partial<User>) {
    // TODO: Implement API call to create user
    console.log('Creating user:', data)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <BranchForm
      mode="create"
      onSubmit={handleCreateBranch}
    />
  )
}