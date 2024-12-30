'use client'
import { useEffect } from 'react';

import DashboardHeader from '../../components/dashboard-header'
import ApplicationStatus from '@/components/application-status';
import JobRecommendations from '@/components/job-recomendations';
import RecentSearches from '@/components/recent-searches';
import SavedJobs from '@/components/saved-jobs';
import Footer from '@/components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.title = "EmpreGo - Dashboard";
  }, [])

  const username = localStorage.getItem('username')?.toUpperCase()

  return (
  
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 pb-24">
        <h1 className="text-3xl font-bold mb-8">Bem-vindo de volta, {username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <JobRecommendations />
            <ApplicationStatus />
          </div>
          <div className="space-y-8">
            <SavedJobs />
            <RecentSearches />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
