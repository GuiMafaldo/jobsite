import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllJobs } from "@/services/api";




export default function JobRecommendations() {
  const [jobs, setJobs] = useState<Jobs[]>([])
  const [viewMore, setMoreView] = useState(false)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState("")
  
  const moreView = viewMore ? jobs : jobs.slice(0, 4);

  const renderJobs = async () => {
    try{
      setLoad(true)
      const response = await getAllJobs()
      setJobs(response)
    }catch(exe) {
      console.error('Erro ao capturar as vagas:', exe)
      setError("Err ao buscar suas recomendações")
    }finally{
      setLoad(false)
    }
  }
  useEffect(() => {
    //renderJobs()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações de Emprego</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moreView.length > 0 ? (
            moreView.map((vaga) => (
              <div
                key={vaga.jobId}
                className="flex justify-between items-start border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <h3 className="font-semibold">{vaga.title}</h3>
                  <p className="text-sm text-gray-600">{vaga.company}</p>
                  <p className="text-sm text-gray-600">{vaga.location}</p>
                  <p className="text-sm text-gray-600">{vaga.salary}</p>
                </div>
                <div className="space-y-2">
                  <Badge>Recomendado</Badge>
                  <Button variant="outline" size="sm" className="w-full">
                    <a className="font-bold" href="/dashboard/searchJobs">
                      Ver vagas
                    </a>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            "Nenhuma vaga Recomendada"
          )}
        </div>
      </CardContent>
    </Card>
  );
}
