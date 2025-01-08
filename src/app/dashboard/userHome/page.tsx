'use client'
import { useEffect } from 'react';

import DashboardHeader from '../../../components/Headers/userHome-header'
import Footer from '@/components/footer';
import ContainerComponents from '@/components/RenderComponents';

export default function Layout() {
  useEffect(() => {
    document.title = "EmpreGo - Dashboard";
  }, [])

  const username = localStorage.getItem('username')?.toUpperCase()


  return (
  
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 pb-24">
        <h1 className="text-3xl font-bold mb-8">Bem-vindo de volta, {username}</h1>
        <ContainerComponents />
      </main>
      <Footer />
    </div>
  );
}
