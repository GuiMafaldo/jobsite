import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare } from 'lucide-react'

export default function DashboardHeader() {

  const username = localStorage.getItem('username')?.slice(0, 2).toUpperCase()

  return (
    <header className="bg-white shadow-sm mb-24">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">EmpreGo</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/dashboard/searchJobs" className="text-gray-600 hover:text-blue-600">Buscar Empregos</Link></li>
            <li><Link href="/dashboard/applications" className="text-gray-600 hover:text-blue-600">Minhas Candidaturas</Link></li>
            <li><Link href="/dashboard/profile" className="text-gray-600 hover:text-blue-600">Meu Perfil</Link></li>
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
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <Button type='button' variant={'outline'}><a href="/">Logout</a> </Button>
        </div>
      </div>
    </header>
  )
}
