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
import { userProfile } from "@/services/api"; // Importe a função que faz a requisição

export default function PerfilEmprego() {
  useEffect(() => {
    document.title = 'EmpreGo - Perfil'
  })

  const [perfil, setPerfil] = useState<UserProfile>({
    fullname: '',
    phone: '',
    birth_date: '',
    address: {
      street: '',
      city: '',
      state: '',
      code_postal: '',
    },
    experiences: [{
      enterprise: '',
      function: '',
      description: '',
      period: ''
    }],
    photo: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setPerfil((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile],
          [child]: value
        }
      }))
    } else {
      setPerfil(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleExperienciaChange = (index: number, field: keyof Experiences, value: string) => {
    setPerfil(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const adicionarExperiencia = () => {
    setPerfil((prev: any) => ({
      ...prev,
      experiences: [...prev.experiences, { enterprise: '', function: '', period: '', description: '' }]
    }))
  }

  const removerExperiencia = (index: number) => {
    setPerfil(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }))
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPerfil(prev => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Função para salvar o perfil no banco de dados
  const salvarPerfil = async () => {
    try {
      const response = await userProfile(perfil); // Envia os dados do perfil para a API
      alert('Perfil salvo com sucesso!');
      console.log(response); // Opcional: Exibe a resposta da API no console
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Houve um erro ao salvar o perfil. Tente novamente.');
    }
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
                  <Input id="nome" name="fullname" value={perfil.fullname} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" name="phone" value={perfil.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input id="dataNascimento" name="birth_date" type="date" value={perfil.birth_date} onChange={handleInputChange} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="endereco">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rua">Rua</Label>
                  <Input id="rua" name="address.street" value={perfil.address.street}  onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" name="address.city" value={perfil.address.city} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" name="address.state" value={perfil.address.state} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" name="address.code_postal" value={perfil.address.code_postal} onChange={handleInputChange} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="experiencia">
              <div className="space-y-6">
                {perfil.experiences.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`empresa-${index}`}>Empresa</Label>
                          <Input
                            id={`empresa-${index}`}
                            value={exp.enterprise}
                            onChange={(e) => handleExperienciaChange(index, 'enterprise', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`cargo-${index}`}>Cargo</Label>
                          <Input
                            id={`cargo-${index}`}
                            value={exp.function}
                            onChange={(e) => handleExperienciaChange(index, 'function', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`periodo-${index}`}>Período</Label>
                          <Input
                            id={`periodo-${index}`}
                            value={exp.period}
                            onChange={(e) => handleExperienciaChange(index, 'period', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`descricao-${index}`}>Descrição</Label>
                          <Textarea
                            id={`descricao-${index}`}
                            value={exp.description}
                            onChange={(e) => handleExperienciaChange(index, 'description', e.target.value)}
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
                  <AvatarImage src={perfil.photo || ''} alt="Foto de perfil" />
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
