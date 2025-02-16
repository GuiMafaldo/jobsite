"use client";

import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/Headers/userHome-header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, GraduationCap, FileText, MapPin, Gift } from "lucide-react";
import { getAllJobs, sendApplication } from "@/services/api";

export default function JobForm() {  
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState({ title: "", level: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [moreView, setMoreView] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Jobs | any>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const viewJobs = moreView ? jobs : jobs.slice(0, 10);

  const renderJobs = async () => {
    try {
      setLoading(true);
      const result = await getAllJobs();
      setJobs(result);
    } catch (exe) {
      console.error("Erro ao capturar as vagas:", exe);
      setError("Erro ao recuperar vagas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "EmpreGo - Buscar vagas";
    renderJobs();
  }, []);

  const handleRegister = async (job: Jobs) => {
    try {
      const response = await sendApplication(job);
      if (response.success) {
        setSelectedJob(job.id);
        console.log(job.id)
        setIsDialogOpen(true);
      } else {
        alert("Erro ao se candidatar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
      alert("Erro ao se candidatar.");
    }
  };

  const handleFilter = () => {
    const filteredJobs = viewJobs.filter((job) => {
      const normalizeString = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const matchTitle = filter.title ? normalizeString(job.title).includes(normalizeString(filter.title)) : true;
      const matchLevel = filter.level ? normalizeString(job.level).includes(normalizeString(filter.level)) : true;
      const matchState = filter.state ? normalizeString(job.location).includes(normalizeString(filter.state)) : true;
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
            <div className="grid grid-cols-1 w-9/12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full m-auto pb-24">
              {displayJobs.map((job, index) => (
                <Card key={index}>
                  <CardHeader className="bg-blue-500 h-24 mb-2" style={{ borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}>
                    <CardTitle className="text-xl flex m-auto mt-3 mb-4 text-white font-700">{job.company}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h2 className="flex text-xl text-black justify-center">{job.title}</h2>
                    <CardDescription className="text-lg flex items-center space-x-2 mt-4">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-black text-sm">{job.location}</span>
                    </CardDescription>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-sm">{job.contract}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-sm">R$ {job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-sm">{job.requirements}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Gift className="h-5 w-5 text-gray-500" />
                      {job.benefits.map((benefit: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <p className="text-sm text-gray-600">{job.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-1 justify-end">
                    <Button className="font-bold" onClick={() => handleRegister(job)}>
                      Candidatar-se
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup de confirmação */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inscrição realizada!</DialogTitle>
            <DialogDescription>
              Você se candidatou com sucesso à vaga: <strong>{selectedJob?.title}</strong> na empresa <strong>{selectedJob?.company}</strong>.
            </DialogDescription>
            <Button onClick={() => setIsDialogOpen(false)}>Fechar</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </section>
  );
}
