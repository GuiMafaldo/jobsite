"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Briefcase, Users, PlusCircle } from "lucide-react"
import Footer from "@/components/footer"
import CompanyHomeHeader from "@/components/Headers/companyHome-header"
import { getJobsCompany, submitJob } from "@/services/api"
import SubscribesInJobs from "./subscribes"
import ViewJobs from "./viewJobs"

export default function CompanyDashboard() {
  const [newJob, setNewJob] = useState<Jobs>({
    title: "",
    description: "",
    location: "",
    salary: "",
    benefits: [],
    requirements: "",
    model: "",
    company_name: "",
    status: "",
    contract: "",
  })
  
  useEffect(() => {
    document.title = "Dashboard - Company"
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Verificação simples de campos obrigatórios antes de enviar
    if (!newJob.title || !newJob.description) {
      alert("Título e descrição são obrigatórios.")
      return
    }

    try {
      const res = await submitJob(newJob)

      if (res) {
        alert("Vaga cadastrada com sucesso.")
        console.log("Posting new job:", newJob)

        // Após enviar, limpa os campos
        setNewJob({
          company_name: "",
          title: "",
          location: "",
          description: "",
          salary: "",
          contract: "",
          model: "",
          benefits: [],
          requirements: "",
          status: "",
        })
      } else {
        alert("Erro ao cadastrar a vaga, tente novamente.")
      }
    } catch (exe) {
      console.error("Erro ao cadastrar vaga, verifique os campos necessários:", exe)
      alert("Ocorreu um erro inesperado. Tente novamente.")
    }
  }

  return (
    <>
      <CompanyHomeHeader />
      <div className="container mx-auto p-6 space-y-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard da Empresa</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Criar Nova Vaga
          </Button>
        </header>
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-4">
            <TabsTrigger value="applications" className="text-lg">
              <Users className="mr-2 h-5 w-5" /> Candidaturas
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-lg">
              <Briefcase className="mr-2 h-5 w-5" /> Vagas
            </TabsTrigger>
            <TabsTrigger value="post-job" className="text-lg">
              <PlusCircle className="mr-2 h-5 w-5" /> Nova Vaga
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <SubscribesInJobs />
          </TabsContent>
          <TabsContent value="jobs">
            <ViewJobs />
          </TabsContent>
          <TabsContent value="post-job">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Postar Nova Vaga</CardTitle>
                <CardDescription>Crie uma nova oportunidade de emprego</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitJob} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Nome da empresa</Label>
                      <Input
                        id="company_name"
                        value={newJob.company_name}
                        name="company_name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Título da Vaga</Label>
                      <Input id="job-title" value={newJob.title} name="title" onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-location">Localização</Label>
                      <Input
                        id="job-location"
                        value={newJob.location}
                        name="location"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-description">Descrição da Vaga</Label>
                    <Textarea
                      style={{ resize: "none" }}
                      id="job-description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-salary">Faixa Salarial</Label>
                      <Input
                        id="job-salary"
                        value={newJob.salary}
                        name="salary"
                        onChange={handleChange}
                        placeholder="Ex: R$ 3.000 - R$ 5.000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-type">Tipo de Contratação</Label>
                      <Select onValueChange={(value) => setNewJob({ ...newJob, contract: value })}>
                        <SelectTrigger id="job-type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tempo integral">Tempo Integral</SelectItem>
                          <SelectItem value="Meio periodo">Meio Período</SelectItem>
                          <SelectItem value="Contrato">Contrato</SelectItem>
                          <SelectItem value="Temporario">Temporário</SelectItem>
                          <SelectItem value="Estagio">Estágio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type_mode">Modelo de trabalho</Label>
                      <Select onValueChange={(value) => setNewJob({ ...newJob, model: value })}>
                        <SelectTrigger id="job-mode">
                          <SelectValue placeholder="Selecione um modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Presencial">Presencial</SelectItem>
                          <SelectItem value="Remoto">Remoto</SelectItem>
                          <SelectItem value="Hibrido">Hibrido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-benefits">Benefícios</Label>
                    <Textarea
                      id="job-benefits"
                      value={newJob.benefits}
                      style={{ resize: "none" }}
                      onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
                      placeholder="Liste os benefícios oferecidos"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-requirements">Requisitos</Label>
                    <Textarea
                      id="job-requirements"
                      style={{ resize: "none" }}
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                      placeholder="Liste os requisitos para a vaga"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Publicar Vaga
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}

