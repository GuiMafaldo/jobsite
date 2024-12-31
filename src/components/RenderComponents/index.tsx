import ApplicationStatus from "../Works/application-status"
import JobRecommendations from "../job-recomendations"
import RecentSearches from "../Works/recent-searches"
import SavedJobs from "../Works/saved-jobs"


const ContainerComponents = () => {
    return(
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bem-vindo de volta, [Nome do Usuário]</h1>
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
    </div>
    )
}

export default ContainerComponents