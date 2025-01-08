import Link from 'next/link'
import Image from 'next/image'

import face from '../assets/face.svg'
import x from '../assets/x.svg'
import linke from '../assets/linke.svg'
import insta from '../assets/insta.svg'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-400">EmpreGo é a plataforma líder em busca de empregos, conectando talentos às melhores oportunidades.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-gray-400 hover:text-white">Buscar Empregos</Link></li>
              <li><Link href="/companies" className="text-gray-400 hover:text-white">Empresas</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-white">Recursos</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <Image width={22} height={22} src={face} alt="facebook logo" />
              <a href="#" className="text-gray-400 hover:text-white">Facebook </a>
              <Image width={22} height={22} src={x} alt='x logo' />
              <a href="#" className="text-gray-400 hover:text-white">X</a>
              <Image width={22} height={22} src={linke} alt='Linkedin logo' />
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              <Image width={22} height={22} src={insta} alt='instagram logo' />
              <a href="#" className='text-gray-400 hover:text-white'>Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EmpreGo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

