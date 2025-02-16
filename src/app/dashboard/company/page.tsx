"use client"
import { useEffect, useState } from "react"
import { submitJob } from "@/services/api"

import Footer from "@/components/footer"
import CompanyHomeHeader from "@/components/Headers/companyHome-header"
import JobCompany from "./jobs/page"
import CandidatesAtJobs from "./candidates/page"

import PopupConfirmacao from "@/utils/functions/popup"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Briefcase, Users, PlusCircle } from "lucide-react"


export default function CompanyDashboard() {
  const [tagBenefits, setTagBenefits] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [message, setMessage] = useState('')
  const [newJob, setNewJob] = useState<Jobs>({
    company: '',
    title: "",
    description: "",
    location: "",
    salary: "",
    benefits: [],
    requirements: "",
    model: "Temporario",
    contract: "Presencial",
  })

  const handleCompany = localStorage.getItem('company')
    
  useEffect(() => {
    document.title = "Dashboard - Company"
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagBenefits.trim() !== "") {
      setNewJob((prevState) => ({
        ...prevState,
        benefits: [...prevState.benefits, tagBenefits.trim()],
      }))
      setTagBenefits("")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newJob.title || !newJob.description) {
      alert("Título e descrição são obrigatórios.")
      return
    }

    try {
      const res = await submitJob(newJob)

      if (res) {
        setMessage("Vaga cadastrada com sucesso")
        setOpenPopup(true)
  
        setNewJob({
          company:"",
          title: "",
          location: "",
          description: "",
          salary: "",
          contract: "",
          model: "",
          benefits: [],
          requirements: "",
        })
      } else {
        setMessage("Erro ao cadastrar vaga. Tente novamente.")
        setOpenPopup(true)
      }
    } catch (exe) {
      setMessage("Erro ao cadatrar vaga. Tente novamente")
      console.error("Erro ao cadastrar vaga, verifique os campos necessários:", exe)
      setOpenPopup(true)
    }
  }
  const closePopup = () => {
    setOpenPopup(false)
  }

 

  const handleDeletKeyDown = (index: number) => {
    setNewJob((prevState) => ({
      ...prevState,
      benefits: prevState.benefits.filter((_: any, indice: any) => indice !== index),
    }))
  }

  return (
    <>
      <CompanyHomeHeader />
      <div className="container mx-auto p-24 space-y-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold font-sans">Dashboard da Empresa</h1>
            <div className="bg-blue-300 w-auto p-1 h-10 rounded-lg  text-center mt-1">
              <span className="text-2xl text-white font-bold font-sans">{handleCompany}</span>
            </div>
          </div>
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
          <div>
            <JobCompany />
          </div>
         <div>
            <CandidatesAtJobs />
          </div>
              

          {/* 🔹 Aba de Nova Vaga */}
          <TabsContent value="post-job">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Postar Nova Vaga</CardTitle>
                <CardDescription>Crie uma nova oportunidade de emprego.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitJob} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Título da Vaga</Label>
                      <Input id="job-title" value={newJob.title} name="title" onChange={handleChange} required />
                    </div>
                    <div className="space-y-2 w-44">
                      <Label htmlFor="job-title">Salario</Label>
                      <Input
                        placeholder="R$: 1000,00 & 3000,00"
                        id="job-title"
                        value={newJob.salary}
                        name="salary"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Beneficios</Label>
                    <div className="flex">
                      <Textarea
                        id="job-title"
                        value={tagBenefits}
                        name="benefits"
                        style={{ resize: "none", width: "400px" }}
                        onChange={(e) => setTagBenefits(e.target.value)}
                        onKeyDown={handleKeyDown}
                        required
                      />
                      <div className="flex h-8 w-12 mt-3">
                        {newJob.benefits.map((benefit: any, index: any) => (
                          <span
                            key={index}
                            style={{
                              margin: "0 5px",
                              padding: "4px",
                              border: "1px solid black",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              textTransform:'uppercase'
                            }}
                          >
                            {benefit}{" "}
                            <Button className="h-4 w-4 rounded bg-red-200 hover:bg-red-500 pointer flex m-auto " onClick={() => handleDeletKeyDown(index)}>
                              x
                            </Button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-col w-92 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Requisitos</Label>
                        <Textarea
                          id="job-title"
                          value={newJob.requirements}
                          name="requirements"
                          style={{ resize: "none", width: "400px" }}
                          onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2 w-64">
                        <Label htmlFor="job-title">local</Label>
                        <Input
                          id="job-title"
                          value={newJob.location}
                          name="location"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="text-center m-auto">
                      <h2 className="text-6xl font-bold text-blue-600">EmpreGo</h2>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      name="contract"
                      id="contract"
                      style={{ padding: "4px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}
                      value={newJob.contract}
                      onChange={(e) => setNewJob({ ...newJob, contract: e.target.value })}
                    >
                      <option value="Contrato">Contrato</option>
                      <option value="Temporario">Temporario</option>
                      <option value="CLT">CLT</option>
                      <option value="PJ">PJ</option>
                      <option value="Estagio">Estagio</option>
                    </select>
                    <select
                      name="model"
                      id="model"
                      style={{ padding: "4px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}
                      value={newJob.model}
                      onChange={(e) => setNewJob({ ...newJob, model: e.target.value })}
                    >
                      <option value="Modelo">Modelo</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Remoto">Remoto</option>
                      <option value="Hibrido">Hibrido</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-description">Descrição da Vaga</Label>
                    <Textarea
                      id="job-description"
                      value={newJob.description}
                      name="description"
                      style={{ resize: "none", width: "600px" }}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      required
                    />
                  </div>
         
                  <Button type="submit" className="w-44 flex bg-blue-500 m-auto">
                    Publicar Vaga
                  </Button>
                </form>
                {openPopup ? (
                  <PopupConfirmacao
                    mensagem={message}
                    onFechar={closePopup} 
                  />
                ):''}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}