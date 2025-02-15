'use client'
import { useEffect } from 'react';

import DashboardHeader from '../../../components/Headers/userHome-header'
import Footer from '@/components/footer';
import ContainerComponents from '@/components/RenderComponents';

export default function Layout() {
  useEffect(() => {
    document.title = "EmpreGo - Dashboard";
  }, [])

const handleUsername = localStorage.getItem('username')

  return ( 
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold font-sans">Bem-vindo de volta</h1>
          <div className="bg-blue-300 w-auto p-1 h-10 rounded-lg  text-center">
            <span className="text-2xl text-white font-bold font-sans">
              {handleUsername}
            </span>
          </div>
        </div>
        <ContainerComponents />
      </main>
      <Footer />
    </div>
  );
}
