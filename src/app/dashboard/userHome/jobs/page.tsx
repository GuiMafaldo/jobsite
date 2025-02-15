'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload, Briefcase, DollarSign, Award, UserCheck} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

import Footer from '@/components/footer'

import InitialPageHeader from '@/components/Headers/initialPage-header'
import { getAllJobs } from '@/services/api'


export default function InitialPageJobs() {
  const [file, setFile] = useState<File | null>(null);
  const [moreView, setMoreView] = useState(false)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Jobs[] | any>([])
  const [success, setSuccess] = useState(false)

  const viewJobs = moreView ? jobs : jobs.slice(0, 5)

  const renderJobs = async () => {
    try {
        setLoading(true)
        const result = await getAllJobs()
        setJobs(result)
    } catch(exe) {
        console.error('Erro ao renderizar vagas', exe)
        setError("Erro ao buscar vagas. Por favor recarregue a pagina.")
    } finally {
        setLoading(false)
    }
  }

  const toggleViewMore = (e: any) => {
    setJobs(!jobs)
  }

// seta o meta da pagina
  useEffect(() => {
    document.title = "EmpreGo - Vagas";
    renderJobs()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(true)
    

    if (!file) {
      setError('Por favor, selecione um arquivo PDF ou .DOCX');
      return;
    }
  };

  return (
    <section>      
        <InitialPageHeader />
        <div className='flex flex-1 items-center m-auto bg-blue-600 justify-center h-32 mb-24'>
            <h1 className='text-white font-bold text-3xl'>Confira as vagas disponiveis</h1>
        </div>
        <div className='grid grid-cols-1 w-9/12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-10/12 m-auto pb-24'>
            {viewJobs && viewJobs.length > 0 ?(
                viewJobs.map((job: any, index: any) => (
                    <Card key={index} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4">
                    <CardHeader>
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <CardDescription className="text-lg">
                        {job.title} - {job.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xs text-gray-600">{job.description}</p>
                        <div className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{job.contract}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <UserCheck className='h-5 w-5 text-gray-500' />
                            <span className='font-medium'>{job.level}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{job.salary}</span>
                        </div>
                        <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-gray-500" />
                            <span className="font-medium">Benefícios:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {job.benefits.map((benefit: string, index: number) => (
                            <Badge key={index} variant="secondary">
                                {benefit}
                            </Badge>
                            ))}
                        </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='link' className="w-full">Candidatar-se</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Enviar Currículo</DialogTitle>
                            <DialogDescription>
                                Envie seu currículo para se candidatar à vaga de {job.title} na {job.company}.
                            </DialogDescription>
                            </DialogHeader>
                            {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Erro</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                            )}
                            {success && (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Sucesso</AlertTitle>
                                <AlertDescription>
                                Seu currículo foi enviado com sucesso!
                                </AlertDescription>
                            </Alert>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cv">Currículo (PDF ou DOCX)</Label>
                                <Input
                                id="cv"
                                type="file"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                                required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                <Upload className="mr-2 h-4 w-4" /> Enviar Currículo
                            </Button>
                            </form>
                        </DialogContent>
                        </Dialog>
                    </CardFooter>
                    </Card>
                ))
            ): 'Nenhuma Vaga disponivel'}
        </div>
        <div className='flex flex-1'>
        <Button 
            className="bg-blue-600 p-4 rounded-md w-52 m-auto mb-24" 
            onClick={toggleViewMore}>
            {jobs ? "Ver menos" : "Ver mais"}
        </Button>
        </div>
        <Footer />
    </section>

  )
}

