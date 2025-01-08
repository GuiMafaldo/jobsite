'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from '@/components/Headers/userHome-header'
import Footer from '@/components/footer'

interface Experiencia {
  empresa: string
  cargo: string
  periodo: string
  descricao: string
}

interface PerfilUsuario {
  nome: string
  email: string
  telefone: string
  dataNascimento: string
  endereco: {
    rua: string
    cidade: string
    estado: string
    cep: string
  }
  experiencias: Experiencia[]
  foto: string
}

export default function PerfilEmprego() {

  useEffect(()=>{
    document.title = 'EmpreGo - Perfil'
  })
  const [perfil, setPerfil] = useState<PerfilUsuario>({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    endereco: {
      rua: '',
      cidade: '',
      estado: '',
      cep: '',
    },
    experiencias: [],
    foto: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setPerfil(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PerfilUsuario] as Record<string, any>,
          [child]: value
        }
      }))
    } else {
      setPerfil(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleExperienciaChange = (index: number, field: keyof Experiencia, value: string) => {
    setPerfil(prev => ({
      ...prev,
      experiencias: prev.experiencias.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const adicionarExperiencia = () => {
    setPerfil(prev => ({
      ...prev,
      experiencias: [...prev.experiencias, { empresa: '', cargo: '', periodo: '', descricao: '' }]
    }))
  }

  const removerExperiencia = (index: number) => {
    setPerfil(prev => ({
      ...prev,
      experiencias: prev.experiencias.filter((_, i) => i !== index)
    }))
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPerfil(prev => ({ ...prev, foto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const salvarPerfil = () => {
    // Aqui você implementaria a lógica para salvar o perfil no backend
    console.log('Perfil salvo:', perfil)
    alert('Perfil salvo com sucesso!')
  }

  return (
  <>
  <DashboardHeader />
    <Card className="w-full max-w-4xl mx-auto mb-52">
      <CardHeader>
        <CardTitle>Meu Perfil Profissional</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pessoal">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pessoal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="endereco">Endereço</TabsTrigger>
            <TabsTrigger value="experiencia">Experiência</TabsTrigger>
            <TabsTrigger value="foto">Foto</TabsTrigger>
          </TabsList>
          <TabsContent value="pessoal">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" value={perfil.nome} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" value={perfil.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" value={perfil.telefone} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input id="dataNascimento" name="dataNascimento" type="date" value={perfil.dataNascimento} onChange={handleInputChange} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="endereco">
            <div className="space-y-4">
              <div>
                <Label htmlFor="rua">Rua</Label>
                <Input id="rua" name="endereco.rua" value={perfil.endereco.rua} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" name="endereco.cidade" value={perfil.endereco.cidade} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input id="estado" name="endereco.estado" value={perfil.endereco.estado} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" name="endereco.cep" value={perfil.endereco.cep} onChange={handleInputChange} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="experiencia">
            <div className="space-y-6">
              {perfil.experiencias.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`empresa-${index}`}>Empresa</Label>
                        <Input
                          id={`empresa-${index}`}
                          value={exp.empresa}
                          onChange={(e) => handleExperienciaChange(index, 'empresa', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`cargo-${index}`}>Cargo</Label>
                        <Input
                          id={`cargo-${index}`}
                          value={exp.cargo}
                          onChange={(e) => handleExperienciaChange(index, 'cargo', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`periodo-${index}`}>Período</Label>
                        <Input
                          id={`periodo-${index}`}
                          value={exp.periodo}
                          onChange={(e) => handleExperienciaChange(index, 'periodo', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`descricao-${index}`}>Descrição</Label>
                        <Textarea
                          id={`descricao-${index}`}
                          value={exp.descricao}
                          onChange={(e) => handleExperienciaChange(index, 'descricao', e.target.value)}
                        />
                      </div>
                      <Button variant="destructive" onClick={() => removerExperiencia(index)}>Remover Experiência</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={adicionarExperiencia}>Adicionar Experiência</Button>
            </div>
          </TabsContent>
          <TabsContent value="foto">
            <div className="space-y-4">
              <Avatar className="w-32 h-32 mx-auto">
                <AvatarImage src={perfil.foto} alt="Foto de perfil" />
                <AvatarFallback>Foto</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="foto">Escolher Foto</Label>
                <Input id="foto" type="file" accept="image/*" onChange={handleFotoChange} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Button onClick={salvarPerfil}>Salvar Perfil</Button>
        </div>
      </CardContent>
    </Card>
    <Footer />
    </>
  )
}

