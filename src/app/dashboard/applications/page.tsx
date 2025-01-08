'use client'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removed, initialized } from "@/store/slice";
import { Jobs } from "../../../../types";

import DashboardHeader from "@/components/Headers/userHome-header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, GraduationCap } from 'lucide-react';

function ApplicationsList() {

  useEffect(() => {
    document.title = 'EmpreGo - Minhas vagas'
  })
  
  const dispatch = useDispatch();
  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);
  const [isLoading, setIsLoading] = useState(true);

  // FAZ A VERIFICAÇÃO PRA VER SI JA TEM OS DADOS SALVOS
  useEffect(() => {
    const storedJobs = localStorage.getItem('savedJobs');
    if (storedJobs) {
      dispatch(initialized(JSON.parse(storedJobs)));
    }
    setIsLoading(false);
  }, [dispatch]);

  const handleCancelApplication = (jobId: number) => {
    dispatch(removed(jobId));
  };

  if (isLoading) {
    return <div className='text-center py-10'>Carregando vagas...</div>
  }

  if (!Array.isArray(savedJobs) || savedJobs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Você ainda não se candidatou a nenhuma vaga.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
      {savedJobs.map((job: Jobs) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 opacity-70" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 opacity-70" />
                <span>{job.contractType}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 opacity-70" />
                <span>R$ {job.salary}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 opacity-70" />
                <span>{job.level}</span>
              </div>
              <div className="mt-4">
                <span className="text-sm font-semibold">Descrição:</span>
                <p className="text-sm mt-1">{job.description}</p>
              </div>
              <div className="mt-4">
                <span className="text-sm font-semibold">Benefícios:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Array.isArray(job.benefits) && job.benefits.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Sem benefícios informados</p>
                    )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={() => handleCancelApplication(job.id)}>
              Cancelar Candidatura
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>  
  )
}

export default function Applications() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <DashboardHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-24">Minhas Candidaturas</h1>
        <ApplicationsList />
      </main>
      <Footer />
    </div>
  );
}

