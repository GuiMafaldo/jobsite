"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import { candidatesAtJobs } from "@/services/api"
import { TabsContent } from "@radix-ui/react-tabs"


const SubscribesInJobs = () => {
  const [applications, setApplications] = useState<Candidates | any>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await candidatesAtJobs()
        setApplications(response)
        console.log("Isso esta sendo passado aqui", response)
      } catch (error) {
        console.error("Erro ao carregar as candidaturas:", error)
        alert("Erro ao carregar as candidaturas. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  const handleSendMessage = (applicantId: number) => {
    console.log("Sending message to applicant", applicantId, ":", message)
    setMessage("")
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <TabsContent value="applications">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Candidaturas Recentes</CardTitle>
          <CardDescription>Gerencie as candidaturas para suas vagas</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {applications && applications.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app: any, index: any) => (
                  <Card key={index} className="flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex items-center m-auto">
                          <CardTitle>{app.job_title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={app.avatar} alt="Avatar usuario" />
                          <AvatarFallback>{app.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant='outline'>Nome:</Badge>
                          <span className="text-sm text-muted-foreground">{app.username}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Status:</Badge>
                          <span className="text-sm text-muted-foreground">{app.application_status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Data da Candidatura:</Badge>
                          <span className="text-sm text-muted-foreground">{new Date(app.applied_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 mt-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default" className="w-full">
                            <MessageSquare className="mr-2 h-4 w-4" /> Mensagem
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Enviar Mensagem</DialogTitle>
                            <DialogDescription>Envie uma mensagem para {app.name}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Textarea
                              placeholder="Digite sua mensagem aqui..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => handleSendMessage(app.id)}>
                              Enviar Mensagem
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">Nenhuma candidatura disponível</div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

    </TabsContent>
  )
}

export default SubscribesInJobs

