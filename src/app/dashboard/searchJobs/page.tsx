'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { added, initialized } from '../../../store/slice';
import { RootState } from '../../../store/store';


import DashboardHeader from '@/components/dashboard-header';
import Footer from '@/components/footer';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Briefcase, DollarSign, GraduationCap, AlertCircle, Upload } from 'lucide-react';

import jobs from '@/utils/lista';
import { Jobs } from '../../../../types';

export default function JobForm() {
  const [showAll, setShowAll] = useState(false)

  const displayJobs = showAll ? jobs : jobs.slice(0, 20)

  const handleShowMore = () => {
    setShowAll(!showAll)
  } 

  useEffect(() => {
    document.title = "EmpreGo - Buscar vagas";
  }, [])

  const [file, setFile] = useState<File | null>(null);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [recomended, setRecomended] = useState<any | string>()

  const [filter, setFilter] = useState({
    title:'',
    level: '',
    state: ''
  })
  const [filtered, setFiltered] = useState(jobs)

  const dispatch = useDispatch();
  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);

  //useEffect pra verificar si o item ja foi adicionado ao localstorage, com JSON.parse pra fazer o comparativo
  useEffect(() => {
    const storedJobs = localStorage.getItem('savedJobs');
    if (storedJobs) {
      dispatch(initialized(JSON.parse(storedJobs)));
    }
  }, [dispatch]);

  // função de envio de doc
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  // FUNÇAO DE REGISTRAR USUARIO E ATUALIZAR O ESTADO DA LISTA 
  const handleRegister = (job: Jobs) => {
    dispatch(added(job));
    console.log('Job added to saved list:', job);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError('Por favor, selecione um arquivo PDF ou .DOCX.');
      return;
    }

    if (selectedJob) {
      setSuccess(true);
      setFile(null);
    }
  };

  // FUNÇAO DE FILTRAGEM PELO ESTADO, FUNÇÃO E LEVEL
  const handleFilter = () => {
    const filtered = jobs.filter((job) => {
        const normalizeString = (str: string) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();     
        }; 
      const matchTitle = filter.title
        ? normalizeString(job.title).includes(normalizeString(filter.title))
        : true;
        
      const matchLevel = filter.level
        ? normalizeString(job.level).includes(normalizeString(filter.level))
        : true

      const matchState = filter.state
        ? normalizeString(job.location).includes(normalizeString(filter.state))
        : true
  
      return matchTitle && matchLevel && matchState;
    });
  
    setFiltered(filtered);
    const getProfessional = filtered.map((item: any) => localStorage.setItem('recomended',recomended))
    
  };
  return (
    <section>
      <DashboardHeader />
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-1 bg-blue-500 w-full p-12 justify-center m-auto mb-24">
            <h1 className="text-white font-bold text-xl">Vagas mais recentes</h1>
          </div>
          <div className='flex gap-8 w-11/12 m-auto'>
              <div className='flex flex-col w-52 gap-4'>
                <input 
                  className='p-2 bg-gray-100 rounded-md' 
                  value={filter.title} 
                  type="text" 
                  placeholder='Digite o nome da vaga'
                  onChange={(e) => setFilter((prev) => ({...prev, title: e.target.value}))}
                  />
                <input 
                  className='p-2 bg-gray-100 rounded-md' 
                  value={filter.state} 
                  type="text" 
                  placeholder='Digite o estado' 
                  onChange={(e) => setFilter((prev) => ({...prev, state: e.target.value}))}
                  />
                <select 
                  id='level'
                  className='p-2 bg-gray-100 text-gray-400 rounded-md' 
                  value={filter.level}
                  onChange={(e) => setFilter((prev) =>({...prev, level: e.target.value}))}
                  >
                  <option value="">Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Senior">Senior</option>
                </select>
                <Button className='bg-blue-600 rounded-md w-42 p-1 text-white font-bold' onClick={handleFilter}>Adicionar filtros</Button>
              </div>
              <div className="grid grid-cols-1 w-9/12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full m-auto pb-24">
                {displayJobs.map((job: Jobs) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {job.company} - {job.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{job.description}</p>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{job.contractType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">R$ {job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{job.level}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => handleRegister(job)} disabled={savedJobs.some(savedJob => savedJob.id === job.id)}>
                            {savedJobs.some(savedJob => savedJob.id === job.id) ? 'Já Candidatado' : 'Candidatar-se'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
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
                              <AlertDescription>Seu currículo foi enviado com sucesso!</AlertDescription>
                            </Alert>
                          )}
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="cv">Currículo (PDF | .DOCX)</Label>
                              <input
                                id="cv"
                                type="file"
                                accept=".pdf, .docx"
                                onChange={handleFileChange}
                                required
                                className="w-full"
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              <Upload className="mr-2 h-4 w-4" />
                              Enviar Currículo
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>    
          </div>
            <Button 
                className="bg-blue-600 p-4 rounded-md w-52 m-auto mb-24" 
                onClick={handleShowMore}>
                {showAll ? "Ver menos" : "Ver mais"}
            </Button>
        </div>
      </div>
      <Footer />
    </section>
  );
}
