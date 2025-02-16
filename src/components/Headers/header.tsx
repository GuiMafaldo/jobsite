import Link from 'next/link'
import { LoginModal } from '../Forms/login-modal'
import { SignupModal } from '../Forms/signup.modal'


export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">EmpreGo</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/dashboard/users/works" className="text-gray-600 hover:text-blue-600">Empregos</Link></li>
            <li><Link href="/dashboard/companies" className="text-gray-600 hover:text-blue-600">Empresas</Link></li>
            <li><Link href="/dashboard/about" className="text-gray-600 hover:text-blue-600">Sobré</Link></li>
          </ul>
        </nav>
        <div className="space-x-2">
          <LoginModal />
          <SignupModal/>
        </div>
      </div>
    </header>
  )
}

