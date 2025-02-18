"use client"

import { useEffect, useState } from "react"
import { jobsAssign } from "@/services/api"
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { CheckCircle2Icon, MapPin, HotelIcon, DollarSign, Gift, Calendar1Icon } from "lucide-react"

export default function Applications() {
  const [jobs, setJobs] = useState<Applied[] | any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    document.title = 'Dashboard - Applications'
    const fetchJobs = async () => {
      try {
        const data = await jobsAssign(jobs)
        setJobs(data)
      } catch (err) {
        console.error("Erro ao carregar as candidaturas:", err)
        setError("Erro ao carregar as candidaturas.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Minhas Candidaturas</h1>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center">Nenhuma candidatura encontrada.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job: any, index: any) => (
            <Card key={index}>
            <CardHeader className="bg-blue-500 h-24 mb-2" style={{ borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}>
              <CardTitle className="text-3xl font-bold items-center gap-2 flex m-auto mt-3 mb-4 text-white font-700">
                <HotelIcon />
                {job.company_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2 className="flex font-bold text-2xl text-black justify-center">{job.job_title}</h2>
              <div className="flex items-center gap-2">
                <CheckCircle2Icon  className="h5 w-5 text-gray-500"/>
                 <span className="font-medium text-sm">{job.application_status}</span>
              </div>
              <CardDescription className="text-lg flex items-center space-x-2 mt-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-black text-sm">{job.job_localy}</span>
              </CardDescription>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-sm">R$ {job.salary}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar1Icon className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-sm">R$ {new Date(job.applied_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Gift className="h-5 w-5 text-gray-500" />  
                  {job.job_benefits.map((benefit: string, index: number) => (
                    <div key={index}>
                      {benefit}
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-1 justify-end">
              <Button className="font-bold" >
                Cancelar inscrição
              </Button>
            </CardFooter>
          </Card>
          ))}
        </div>
      )}
    </div>
  )
}
