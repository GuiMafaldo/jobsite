'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { added, initialized, updateStatus } from '../../../store/slice';
import { RootState } from '../../../store/store';
import { Jobs } from '../../../../types';

import jobs from '@/utils/lista';

import DashboardHeader from '@/components/Headers/userHome-header';
import Footer from '@/components/footer';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Briefcase, DollarSign, GraduationCap } from 'lucide-react';


export default function JobForm({ job }: { job: Jobs }) {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);

  const handleApply = () => {
    const isAlreadySaved = savedJobs.some((savedJob) => savedJob.id === job.id);

    if (!isAlreadySaved) {
      dispatch(updateStatus({ id: job.id, status: { enviando: true } }));
    }
  };

  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState({
    title: '',
    level: '',
    state: '',
  });

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    document.title = 'EmpreGo - Buscar vagas';
  }, []);

  useEffect(() => {
    const storedJobs = localStorage.getItem('savedJobs');

    if (storedJobs) {
      dispatch(initialized(JSON.parse(storedJobs)));
    }
  }, [dispatch]);

  // Atualizar o estado da vaga ao registrá-la
  const handleRegister = (job: Jobs) => {
    const jobStatus = {
      ...job,
      status: {
        enviado: 'Enviado',
        emAnalise: '',
        selecionado: '',
        naoSelecionado: '',
        agendado: '',
      },
    };
    dispatch(added(jobStatus));
    dispatch(updateStatus({ id: job.id, status: { enviado: 'Enviado' } }));
    console.log('Job added to saved list and status updated:', jobStatus);
  };

  const handleFilter = () => {
    const filteredJobs = jobs.filter((job) => {
      const normalizeString = (str: string) =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const matchTitle = filter.title
        ? normalizeString(job.title).includes(normalizeString(filter.title))
        : true;

      const matchLevel = filter.level
        ? normalizeString(job.level).includes(normalizeString(filter.level))
        : true;

      const matchState = filter.state
        ? normalizeString(job.location).includes(normalizeString(filter.state))
        : true;

      return matchTitle && matchLevel && matchState;
    });

    return showAll ? filteredJobs : filteredJobs.slice(0, 20);
  };

  const displayJobs = handleFilter();

  return (
    <section>
      <DashboardHeader />
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-1 bg-blue-500 w-full p-12 justify-center m-auto mb-24">
            <h1 className="text-white font-bold text-xl">Vagas mais recentes</h1>
          </div>
          <div className="flex gap-8 w-11/12 m-auto">
            <div className="flex flex-col w-52 gap-4">
              <input
                className="p-2 bg-gray-100 rounded-md"
                value={filter.title}
                type="text"
                placeholder="Digite o nome da vaga"
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                className="p-2 bg-gray-100 rounded-md"
                value={filter.state}
                type="text"
                placeholder="Digite o estado"
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, state: e.target.value }))
                }
              />
              <select
                id="level"
                className="p-2 bg-gray-100 text-gray-400 rounded-md"
                value={filter.level}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, level: e.target.value }))
                }
              >
                <option value="">Level</option>
                <option value="Junior">Junior</option>
                <option value="Pleno">Pleno</option>
                <option value="Senior">Senior</option>
              </select>
              <Button
                className="bg-blue-600 rounded-md w-42 p-1 text-white font-bold"
                onClick={handleFilter}
              >
                Adicionar filtros
              </Button>
            </div>
            <div className="grid grid-cols-1 w-9/12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full m-auto pb-24">
              {displayJobs.map((job) => (
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
                  <CardFooter className="flex flex-1 justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="font-bold"
                          onClick={() => handleRegister(job)}
                          disabled={savedJobs.some(
                            (savedJob) => savedJob.id === job.id
                          )}
                        >
                          {savedJobs.some(
                            (savedJob) => savedJob.id === job.id
                          )
                            ? savedJobs.find(
                                (savedJob) => savedJob.id === job.id
                              )?.status?.enviado || 'Ja Candidato'
                            : 'Candidatar-se'}
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <Button
            className="bg-blue-600 p-4 rounded-md w-52 m-auto mb-24"
            onClick={handleShowMore}
          >
            {showAll ? 'Ver menos' : 'Ver mais'}
          </Button>
        </div>
      </div>
      <Footer />
    </section>
  );
}
