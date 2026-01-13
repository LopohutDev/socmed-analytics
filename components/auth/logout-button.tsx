'use client'

import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button variant="outline" size="sm" type="submit">
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </form>
  )
}

