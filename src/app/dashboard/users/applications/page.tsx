"use client"

import { useEffect, useState } from "react"
import { getJobsWithCandidates } from "@/services/api" // Certifique-se de que o caminho de importação está correto

export default function Applications() {
  const [jobs, setJobs] = useState<Jobs[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobsWithCandidates()
        setJobs(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar as candidaturas:", error)
        setError("Erro ao carregar as candidaturas.")
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (isLoading) {
    return <p className="text-center">Carregando...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Minhas Candidaturas</h1>

      {jobs.length === 0 ? (
        <p className="text-center">Nenhuma candidatura encontrada.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm">{job.location}</p>
              </div>
            ))):'Nenhuma vaga disponivel' }

        </div>
      )}
    </div>
  )
}

