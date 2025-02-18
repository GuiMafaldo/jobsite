import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobsAssign } from "@/services/api";
import { useEffect, useState } from "react";

export default function ApplicationStatus() {
  const [jobs, setJobs] = useState<Jobs[] | any>([])

  useEffect(() => {
    const render = async () => {
      try {
        const response = await jobsAssign(jobs)
  
        if(response) {
          setJobs(response)
          console.log('Nada pra renderizar aqui', response)
        }
      }catch(exe) {
        console.error('Erro ao buscar vagas')
      }
    }

    render()
  },[])



  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Candidaturas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
                <div>
                  {jobs.map((job: any, index: any) => (
                    <ul key={index}>
                      <li>{job.id}</li>
                      <h3 className="font-semibold text-lg">{job.id}</h3>
                      <p className="text-sm text-gray-600"></p>
                    </ul>
                  ))}
                </div>
                <div
                  className={`flex justify-center items-center h-6 px-4 rounded-sm text-white font-bold bg-${getStatusColor}`}>
                </div>
                  <span></span>
                  </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusColor({enviado, emAnalise, selecionado, naoSelecionado, agendado}: {enviado: string, emAnalise: string, selecionado: string, naoSelecionado: string, agendado: string}) {
  switch (status) {
    case enviado:
      return "blue-400";
    case emAnalise:
      return "yellow-400";
    case selecionado:
      return "green-400";
    case naoSelecionado:
      return "red-400";
    case agendado:
      return "purple-400";
    default:
      return "gray-400";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "enviado":
      return "CV Enviado";
    case "emAnalise":
      return "Em Análise";
    case "selecionado":
      return "Selecionado";
    case "naoSelecionado":
      return "Não Selecionado";
    case "agendado":
      return "Entrevista Agendada";
    default:
      return "Status Desconhecido";
  }
}
