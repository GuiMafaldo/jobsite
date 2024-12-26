'use client'

import { useState } from 'react'

import DashboardHeader from '../../../components/dashboard-header'
import Footer from '../../../components/footer'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Upload, Briefcase, DollarSign, Award, Search, UserCheck } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"


import jobs from '@/utils/lista'


interface JobCardProps {
    id: string 
    title: string 
    company: string
    location: string
    description: string
    salary: string
    benefits: string[]
    contractType: string
}

export default function JobCard({ id, title, company, location, description, benefits, salary, contractType }: JobCardProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [buttonTxt, setButtonTxt] = useState<{[key: string]: boolean}>({})
  const [filter, setFilter] = useState({
    jobTitle:'',
    level: '',
    state: ''
  })
  const [dataSave, setDataSave] = useState<JobCardProps>({
    id:'',
    title:'',
    company:'',
    location:'',
    description:'',
    salary:'',
    benefits:[],
    contractType:''
  })
  const [filtereds, setFiltered] = useState(jobs)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!file) {
        setError('Por favor, selecione um arquivo de currículo.');
        return;
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const jobData = {
            id: dataSave.id,
            title:dataSave.title,
            company:dataSave.company,
            location:dataSave.location,
            description:dataSave.description,
            benefits:dataSave.benefits,
            salary:dataSave.salary,
            contractType:dataSave.contractType,
        };

        console.log('Dados da vaga:', jobData);

        const savedJobs: JobCardProps[] = JSON.parse(localStorage.getItem('savedJobs') || '[]');

        const isJobAlreadySaved = savedJobs.some((job: JobCardProps) => job.id === jobData.location);

        if (!isJobAlreadySaved) {
            savedJobs.push(jobData);
            localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
            console.log('Vagas salvas no localStorage:', JSON.parse(localStorage.getItem('savedJobs') || '[]'));
            setSuccess(true);
            setFile(null);
            setDataSave('')
        } else {
            setError('Esta vaga já foi salva.');
        }

        setButtonTxt(prevState => ({ ...prevState}));
    } catch (err) {
        console.error('Erro ao salvar a vaga:', err);
        setError('Falha no envio do currículo. Por favor, tente novamente.');
    }
};


  const handleFilter = () => {
    const filtered = jobs.filter((job) => {
        const normalizeStringTitle = (str: string) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();     
        }; 
      const matchesTitle = filter.jobTitle
        ? normalizeStringTitle(job.title).includes(normalizeStringTitle(filter.jobTitle))
        : true;
        
         const normalizeStringLevel = (str: string) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();     
        }; 
      const matchesLevel = filter.level
        ? normalizeStringLevel(job.level).includes(normalizeStringLevel(filter.level))
        : true;
  
        const normalizeString = (str: string) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();     
        }; 
        const matchesState = filter.state
            ? normalizeString(job.location).includes(normalizeString(filter.state))
            : true 

  
      return matchesTitle && matchesLevel && matchesState;
    });
  
    setFiltered(filtered);
    console.log(filtered)
  };
  return (
    <>
    <DashboardHeader />
        <section className="py-10 mb-12 flex flex-1"> 
            <div>
                <div className="filter-section p-4 ml-8">
                    <h5 className='mb-2 text-center text-lg'>Adicionar Filtros</h5>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                            <Input
                                id="jobTitle"
                                type="text"
                                placeholder="Digite o cargo"
                                value={filter.jobTitle}
                                onChange={(e) =>
                                setFilter((prev) => ({ ...prev, jobTitle: e.target.value }))
                                }
                            />
                        </div>
                        <div>
                            <select
                                id="level"
                                value={filter.level}
                                onChange={(e) =>
                                setFilter((prev) => ({ ...prev, level: e.target.value }))
                                }
                                className="input-select p-2 w-full bg-white border text-sm text-gray-500"
                            >
                                <option value="">Nivel</option>
                                <option value="Junior">Junior</option>
                                <option value="Pleno">Pleno</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </div>
                        <div>
                            <Input
                                id="state"
                                type="text"
                                placeholder="Digite o estado"
                                value={filter.state}
                                onChange={(e) =>
                                setFilter((prev) => ({ ...prev, state: e.target.value }))
                                }
                            />
                </div>
            </div>
            <Button
                onClick={() => handleFilter()}
                className="w-24 bg-blue-600 mt-2 ml-32"
            >
                Aplicar Filtros
            </Button>
                </div>
            </div>   
            <div className='ml-24  '>
                <div className='bg-blue-700 py-6 mb-24 w-11/12'>
                    <h2 className="text-center text-3xl font-bold mb-8 text-white pt-6">Vagas mais recentes</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 w-11/12">
                    {filtereds.map((job, index) => (
                    <Card key={index} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4">
                        <CardHeader>
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <CardDescription className="text-lg">
                            {job.company} - {job.location}
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <p className="text-xs text-gray-600 ">{job.description}</p>
                        <div className="flex items-center space-x-2">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                            <span className="font-medium">{job.contractType}</span>
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
                            {Array.isArray(job.benefits) &&
                                job.benefits.map((benefit, index) => (
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
                                <Button className="w-full">{buttonTxt[job.id] ?'Ja esta incrito': 'Candidatar-se'}</Button>
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
                                <AlertDescription>{error ? 'Esta vaga ja foi salva': ''}</AlertDescription>
                                </Alert>
                            )}
                            {success && (
                                <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Sucesso</AlertTitle>
                                <AlertDescription>
                                    {!success ? '':'Seu curriculo foi enviado com sucesso' }
                                </AlertDescription>
                                </Alert>
                            )}
                            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                                <div className="space-y-2">
                                <Label htmlFor="cv">Currículo (PDF)</Label>
                                <Input
                                    id="cv"
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={handleFileChange}
                                    required
                                />
                                </div>
                                <Button type="submit" className="w-full">
                                    <Upload className="mr-2 h-4 w-4" /> {buttonTxt[job.id] ? 'Ja esta inscrito': 'Candidatar-se' }
                                </Button>
                            </form>
                            </DialogContent>
                        </Dialog>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            </div>
        </section>
        <Footer />
    </>

  )
}

