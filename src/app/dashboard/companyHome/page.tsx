'use client'

import { useEffect, useState } from 'react'
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
import { Briefcase, MapPin, Users, PlusCircle, MessageSquare } from 'lucide-react'
import Footer from '@/components/footer'
import CompanyHomeHeader from '@/components/Headers/companyHome-header'
import { getJobsCompany, submitJob } from '@/services/api'


export default function CompanyDashboard() {
  const [newJob, setNewJob] = useState<Jobs>({
    title: '',
    description: '',
    location: '',
    salary: '',
    employment_type: '',
    benefits: '',
    requirements: '',
    work_mode: '',
    company_name:''
  });
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard - Company';

    const fetchJobs = async () => {
      try {
        const response = await getJobsCompany();
        setJobs(response)
        console.log(response)
      } catch (error) {
        console.error("Erro ao carregar as vagas:", error);
        alert("Erro ao carregar as vagas. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificação simples de campos obrigatórios antes de enviar
    if (!newJob.title || !newJob.description) {
      alert("Título e descrição são obrigatórios.");
      return;
    }

    try {
      const res = await submitJob(newJob);

      if (res) {
        alert("Vaga cadastrada com sucesso.");
        console.log('Posting new job:', newJob);

        // Após enviar, limpa os campos
        setNewJob({
          title: '',
          description: '',
          location: '',
          salary: '',
          employment_type: '',
          benefits: '',
          requirements: '',
          work_mode: '',
          company_name: ''
        });
      } else {
        alert("Erro ao cadastrar a vaga, tente novamente.");
      }
    } catch (exe) {
      console.error("Erro ao cadastrar vaga, verifique os campos necessários:", exe);
      alert("Ocorreu um erro inesperado. Tente novamente.");
    }
  };

  const handleSendMessage = (applicantId: number) => {
    console.log('Sending message to applicant', applicantId, ':', message);
    setMessage('');
  };
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
           {/*} <CardContent>
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
            */}
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
                {jobs && jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <Card key={index} className="mb-4 overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                      <CardTitle className="text-xl font-bold text-primary text-center" style={{fontFamily:'Helvetica'}}>{job.company_name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-700" style={{fontFamily:'Helvetica'}}>Vaga: {job.title}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className="text-sm font-medium">
                          <b>Tipo: </b> 
                        </Badge>
                        <span className='ml-2'><i className='text-muted-foreground'>{job.employment_type}</i></span>
                      </div>
                      <div className="grid gap-3 text-sm">
                        <div className='flex gap-2'>
                          <Badge variant="outline" className="flex items-center gap-2">
                              <b>Salario:</b>
                          </Badge>
                          <span><i className='text-muted-foreground'>{job.salary}</i></span>        
                        </div>
                        <div className='flex gap-2'>
                          <Badge variant="outline" className="flex items-center gap-2">
                            <b>Beneficios:</b>
                          </Badge>
                          <span><i className='text-muted-foreground'>{job.benefits}</i></span>
                        </div>
                        <div className='flex gap-2'>
                          <Badge variant="outline">
                            <b>Modelo:</b>
                          </Badge>
                          <span> <i className='text-muted-foreground'>{job.work_mode}</i></span>
                        </div>
                        <div className='flex gap-2'>
                          <Badge variant="outline">
                            <b>Requisitos:</b>
                          </Badge>
                          <h4> <i className='text-muted-foreground'>{job.requirements}</i></h4>
                        </div>
                        <div className='flex gap-2'>
                          <Badge variant="outline">
                              <b>Descrição:</b>
                          </Badge>
                          <h4> <i className="text-muted-foreground">{job.description}</i></h4>
                        </div>
                        <div className='flex gap-2'>
                          <Badge variant="outline">
                            <b>Local:</b>
                          </Badge>
                          <div className='flex gap-2'>
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm"><i>{job.location}</i></span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50">
                      <Button variant="default" className="w-full">
                        Ver Detalhes
                      </Button>
                    </CardFooter>
                  </Card>
                  ))): 'Nenhuma vaga disponivel'}
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
              <form onSubmit={handleSubmitJob} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className='space-y-2'>
                    <Label htmlFor='company_name'>Nome da empresa</Label>
                    <Input 
                      id='company_name'
                      value={newJob.company_name}
                      name='company_name'
                      onChange={handleChange}
                      required
                    />

                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Título da Vaga</Label>
                    <Input
                      id="job-title"
                      value={newJob.title}
                      name='title'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-location">Localização</Label>
                    <Input
                      id="job-location"
                      value={newJob.location}
                      name='location'
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-description">Descrição da Vaga</Label>
                  <Textarea 
                  style={{resize:'none'}}
                    id="job-description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-salary">Faixa Salarial</Label>
                    <Input
                      id="job-salary"
                      value={newJob.salary}
                      name='salary'
                      onChange={handleChange}
                      placeholder="Ex: R$ 3.000 - R$ 5.000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Tipo de Contratação</Label>
                    <Select onValueChange={(value) => setNewJob({ ...newJob, employment_type: value })}>
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
                    <Select onValueChange={(value) => setNewJob({ ...newJob, work_mode: value})}>
                      <SelectTrigger id='job-mode'>
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
                    style={{resize: 'none'}}
                    onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
                    placeholder="Liste os benefícios oferecidos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-requirements">Requisitos</Label>
                  <Textarea
                    id="job-requirements"
                    style={{resize: 'none'}}
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    placeholder="Liste os requisitos para a vaga"
                  />
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

