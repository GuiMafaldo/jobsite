'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Bell, MessageSquare } from 'lucide-react'
import { LoginModal } from '../Forms/login-modal'
import { SignupModal } from '../Forms/signup.modal'



export default function InitialPageHeader() {
  return (
    <header className="bg-white shadow-sm mb-24">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">EmpreGo</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/dashboard/users/works" className="text-gray-600 hover:text-blue-600">Empregos</Link></li>
            <li><Link href="/dashboard/companies" className="text-gray-600 hover:text-blue-600">Empresas</Link></li>
            <li><Link href="/dashboard/about" className="text-gray-600 hover:text-blue-600">Sobré</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <div className='flex gap-2'>
            <LoginModal />
            <SignupModal />    
          </div>
        </div>
      </div>
    </header>
  )
}

