"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { getJobsCompany } from "@/services/api"


export default function ViewJobs() {
  const [jobs, setJobs] = useState<Jobs[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobsCompany()
        setJobs(response)
      } catch (error) {
        console.error("Erro ao carregar as vagas:", error)
        alert("Erro ao carregar as vagas. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Suas Vagas</CardTitle>
        <CardDescription>Gerencie suas vagas abertas</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {jobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                    <CardTitle className="text-xl font-bold text-primary">{job.title}</CardTitle>
                    <CardDescription>{job.company_name}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Salário</Badge>
                        <span className="text-sm text-muted-foreground">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Modelo</Badge>
                        <span className="text-sm text-muted-foreground">{job.model}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Status</Badge>
                        <span className="text-sm text-muted-foreground">{job.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{job.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 mt-auto">
                    <Button variant="default" className="w-full">
                      Ver Detalhes
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">Nenhuma vaga disponível</div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

