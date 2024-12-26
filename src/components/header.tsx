import Link from 'next/link'
import { LoginModal } from './login-modal'
import { SignupModal } from './signup.modal'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">JobSite</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/jobs" className="text-gray-600 hover:text-blue-600">Empregos</Link></li>
            <li><Link href="/companies" className="text-gray-600 hover:text-blue-600">Empresas</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600">Sobre</Link></li>
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

