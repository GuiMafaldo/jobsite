'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Users, PlusCircle, MessageSquare, Building2, DollarSign } from 'lucide-react'
import Footer from '@/components/footer'
import CompanyHomeHeader from '@/components/Headers/companyHome-header'

// Placeholder data
const applications = [
  { id: 1, name: "João Silva", job: "Desenvolvedor Frontend", status: "Pendente", avatar: "/avatars/joao.png" },
  { id: 2, name: "Maria Oliveira", job: "Designer UX/UI", status: "Entrevistado", avatar: "/avatars/maria.png" },
  { id: 3, name: "Carlos Santos", job: "Desenvolvedor Backend", status: "Rejeitado", avatar: "/avatars/carlos.png" },
]

const jobs = [
  { id: 1, title: "Desenvolvedor Frontend", applicants: 5, location: "São Paulo, SP", type: "Remoto" },
  { id: 2, title: "Designer UX/UI", applicants: 3, location: "Rio de Janeiro, RJ", type: "Híbrido" },
  { id: 3, title: "Desenvolvedor Backend", applicants: 7, location: "Belo Horizonte, MG", type: "Presencial" },
]

export default function CompanyDashboard() {
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    type: '',
    benefits: '',
    requirements: '',
    isRemote: false
  })
  const [message, setMessage] = useState('')

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Posting new job:', newJob)
    // Here you would typically send this data to your backend
    setNewJob({
      title: '',
      description: '',
      location: '',
      salary: '',
      type: '',
      benefits: '',
      requirements: '',
      isRemote: false
    })
  }

  const handleSendMessage = (applicantId: number) => {
    console.log('Sending message to applicant', applicantId, ':', message)
    // Here you would typically send this message to your backend
    setMessage('')
  }

  return (
    <>
    <CompanyHomeHeader />
    <div className="container mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard da Empresa</h1>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Criar Nova Vaga</Button>
      </header>
      
      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 gap-4">
          <TabsTrigger value="applications" className="text-lg"><Users className="mr-2 h-5 w-5" /> Candidaturas</TabsTrigger>
          <TabsTrigger value="jobs" className="text-lg"><Briefcase className="mr-2 h-5 w-5" /> Vagas</TabsTrigger>
          <TabsTrigger value="post-job" className="text-lg"><PlusCircle className="mr-2 h-5 w-5" /> Nova Vaga</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Candidaturas Recentes</CardTitle>
              <CardDescription>Gerencie as candidaturas para suas vagas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={app.avatar} alt={app.name} />
                        <AvatarFallback>{app.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-gray-500">{app.job}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        app.status === 'Pendente' ? 'secondary' :
                        app.status === 'Entrevistado' ? 'default' :
                        'destructive'
                      }>
                        {app.status}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Mensagem</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Enviar Mensagem</DialogTitle>
                            <DialogDescription>
                              Envie uma mensagem para {app.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Textarea
                              placeholder="Digite sua mensagem aqui..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => handleSendMessage(app.id)}>Enviar Mensagem</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Suas Vagas</CardTitle>
              <CardDescription>Gerencie suas vagas abertas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{job.type}</Badge>
                        <span className="text-sm text-gray-500">{job.applicants} candidatos</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Ver Detalhes</Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="post-job">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Postar Nova Vaga</CardTitle>
              <CardDescription>Crie uma nova oportunidade de emprego</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostJob} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Título da Vaga</Label>
                    <Input
                      id="job-title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-location">Localização</Label>
                    <Input
                      id="job-location"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-description">Descrição da Vaga</Label>
                  <Textarea
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
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      placeholder="Ex: R$ 3.000 - R$ 5.000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Tipo de Contratação</Label>
                    <Select onValueChange={(value: any) => setNewJob({ ...newJob, type: value })}>
                      <SelectTrigger id="job-type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Tempo Integral</SelectItem>
                        <SelectItem value="part-time">Meio Período</SelectItem>
                        <SelectItem value="contract">Contrato</SelectItem>
                        <SelectItem value="temporary">Temporário</SelectItem>
                        <SelectItem value="internship">Estágio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-benefits">Benefícios</Label>
                  <Textarea
                    id="job-benefits"
                    value={newJob.benefits}
                    onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
                    placeholder="Liste os benefícios oferecidos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-requirements">Requisitos</Label>
                  <Textarea
                    id="job-requirements"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    placeholder="Liste os requisitos para a vaga"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="job-remote"
                    checked={newJob.isRemote}
                    onCheckedChange={(checked: any) => setNewJob({ ...newJob, isRemote: checked as boolean })}
                  />
                  <Label htmlFor="job-remote">Trabalho Remoto</Label>
                </div>
                <Button type="submit" className="w-full">Publicar Vaga</Button>
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

