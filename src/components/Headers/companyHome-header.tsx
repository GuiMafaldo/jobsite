import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare } from 'lucide-react'
import LogoutButton from '@/utils/functions/logout-site'

export default function companyHomeHeader() {
  
  const companyName = localStorage.getItem('company')?.slice(0, 2)

 
  return (
    <header className="bg-white shadow-sm mb-24">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="" className="text-2xl font-bold text-blue-600">EmpreGo</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="" className="text-gray-600 hover:text-blue-600">Pesquisar candidatos</Link></li>
            <li><Link href="" className="text-gray-600 hover:text-blue-600">Suporte</Link></li>
            <li><Link href="" className="text-gray-600 hover:text-blue-600">Sobré</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuário" />
            <AvatarFallback className='bg-gray-500'>
              <span className='font-bold text-xl font-sans text-white'>{companyName}</span>
            </AvatarFallback>
          </Avatar>
          <LogoutButton />    
        </div>
      </div>
    </header>
  )
}
