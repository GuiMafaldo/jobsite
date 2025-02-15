import { useState, useEffect } from "react";
import { deleteJobs, getJobsCompany, updateJob } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { TabsContent } from "@radix-ui/react-tabs";
import { Briefcase, Banknote, Building2, MapPin, GraduationCap, Gift, FileText, Trash, Pencil } from "lucide-react";

export default function JobCompany() {
  const [moreView, setMoreView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [selectedJob, setSelectedJob] = useState<Jobs | any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewJobs = moreView ? jobs : jobs.slice(0, 6).sort((a, b) => a.title.localeCompare(b.title));

  const renderJobs = async () => {
    try {
      setLoading(true);
      const result = await getJobsCompany();
      setJobs(result);
    } catch (exe) {
      console.error('Erro ao renderizar vagas disponíveis:', exe);
      setError("Erro ao buscar vagas. Por favor, recarregue a página.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    renderJobs();
  }, []);

  const handleEdit = (job: Jobs) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSelectedJob({ ...selectedJob, [name]: value });

    const updatedValue = name === "benefits" ? value.split(",").map((b:any) => b.trim()) : value

    setSelectedJob((prev: any) => ({
      ...prev,
      [name]:updatedValue
    }))
  };

const handleSave = async (e: any) => {
  e.preventDefault()
  try {
    await updateJob(selectedJob.id, selectedJob)
    setIsModalOpen(false)
    renderJobs()
  }catch(exe) {
    console.error('Erro ao salvar vaga:', exe)
  }
};

const handleDeleteJob = async (job: Jobs | any) => {
  if (!job) {
    console.error("Vaga nao encotrada");
    return;
  }

  try {
    console.log("Deletando vaga com ID:", job.id);  // Verifica o ID
    await deleteJobs(job.id);
    renderJobs();  // Recarrega as vagas
  } catch (exe) {
    console.error("Erro ao deletar vaga", exe);
  }
};


  return (
    <TabsContent value="jobs">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Vagas com candidaturas</CardTitle>
          <CardDescription>Acompanhe as candidaturas nas suas vagas postadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[auto] pr-4 mb-4">
            {loading && <p>Carregando vagas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {viewJobs.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {viewJobs.map((job, index) => (
                  <Card key={index} className="flex flex-col justify-between">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 py-3">
                      <CardTitle className="text-lg font-bold text-center text-primary">{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-3 pb-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.contract}
                        </span>
                        <span className="flex items-center gap-1">
                          <Banknote className="h-4 w-4" /> {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" /> {job.model}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-2">{job.requirements}</span>
                        </span>
                      </div>
                      <div className="mt-12">
                        <span className="flex items-center gap-1">
                          <Gift className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-2 h-4 flex-wrap text-xs gap-3 flex">
                            {job.benefits.map((benefit: string, index: number) => (
                              <li key={index} className="list-none uppercase">
                                {benefit}
                              </li>
                            ))}
                          </span>
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-2">{job.description}</span>
                        </span>
                      </div>
                    </CardContent>
                    <div className="flex justify-end gap-2 px-4 py-2">
                      <Button variant='secondary' type="button" className="p-1 rounded h-7 w-7 bg-red-400 hover:bg-red-100" onClick={() => handleDeleteJob(job)}>
                        <Trash className="h-4 w-4 text-black font-bold" />
                      </Button>
                      <Button type="button" className="p-1 rounded h-7 w-7 bg-yellow-400 hover:bg-yellow-100" onClick={() => handleEdit(job)}>
                        <Pencil className="h-4 w-4 text-black font-bold" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p>Nenhuma vaga encontrada.</p>
            )}
          </ScrollArea>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setMoreView(!moreView)} variant="secondary" className="bg-blue-500 hover:bg-blue-400 text-white font-bold">
              {moreView ? "Ver menos" : "Ver mais"}
            </Button>
          </div>
        </CardContent>
      </Card>
      {isModalOpen && selectedJob && (
        <div className="modal">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Editar Vaga</h2>

                <input type="text" name="title" value={selectedJob.title} onChange={handleChange} placeholder="Título da vaga" className="w-full border p-2 mb-2 rounded"/>
                <input type="text" name="salary" value={selectedJob.salary} onChange={handleChange} placeholder="Salary" className="w-full border p-2 mb-2 rounded"/>
                <input type="text" name="location" value={selectedJob.location} onChange={handleChange} placeholder="Localização" className="w-full border p-2 mb-2 rounded"/>

                <textarea name="description" value={selectedJob.description} onChange={handleChange} placeholder="Descrição da vaga" className="w-full border p-2 mb-2 rounded h-20"></textarea>
                <textarea name="requirements" value={selectedJob.requirements} onChange={handleChange} placeholder="Requisitos" className="w-full border p-2 mb-2 rounded h-20"></textarea>
                <textarea name="benefits" value={selectedJob.benefits ? selectedJob.benefits.join(", "): ""} onChange={handleChange} placeholder="Benefícios" className="w-full border p-2 mb-2 rounded h-20"></textarea>

                <select name="contract" value={selectedJob.contract} onChange={(e) => setSelectedJob({...selectedJob, contract: e.target.value})} className="w-full border p-2 mb-2 rounded">
                    <option value="Temporario">Temporario</option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="Estágio">Estágio</option>
                </select>

                <select name="model" value={selectedJob.model} onChange={(e) => setSelectedJob({...selectedJob, model: e.target.value})} className="w-full border p-2 mb-4 rounded">
                    <option value="Presencial">Presencial</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Hibrido">Hibrido</option>
                </select>
                  <div className="flex justify-between">
                      <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
                  </div>
              </div>
          </div>
          <button onClick={() => setIsModalOpen(false)}>Fechar</button>
        </div>
      )}
    </TabsContent>
  );
}
