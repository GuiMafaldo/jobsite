import Header from '../components/Headers/header'
import JobSearch from '../components/Works/job-search'
import PopularCategories from '../components/Works/popular-categories'
import HowItWorks from '../components/Works/how-it-works'
import Testimonials from '../components/testimonials'
import CallToAction from '../components/call-to-action'
import Footer from '../components/footer'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'JobSite | O maior site de empregos do Pis',
  description: 'O emprego perfeito está na JobSite',
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">  
          <Header />
          <main className="flex-grow">
              <JobSearch />
              <PopularCategories />
              <HowItWorks />
              <Testimonials />
              <CallToAction />
            </main>
            <Footer />
        </div>

  )
}

