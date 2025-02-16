'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/Headers/userHome-header';
import Footer from '@/components/footer';
import { submitUserProfile } from '@/services/api'; // Função que envia os dados para a API

export default function PerfilEmprego() {
  useEffect(() => {
    document.title = 'EmpreGo - Perfil';
  }, []);

  const [perfil, setPerfil] = useState<UserProfile>({
    document_number:'',
    education:"",
    profile_image: '',
    phone: '',
    birth_date: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
      country:''
    },
    experiences: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPerfil((prev) => ({
        ...prev
      }));
    } else {
      setPerfil((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleExperienciaChange = (index: number, field: string, value: string) => {
    setPerfil((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

/*   const adicionarExperiencia = () => {
    setPerfil((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { enterprise: '', function: '', period: '', description: '' }
      ]
    }));
  }; */

  const removerExperiencia = (index: number) => {
    setPerfil((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const salvarPerfil = async () => {
    try {
      const response = await submitUserProfile(perfil);
      alert('Perfil salvo com sucesso!');
      console.log(response);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Houve um erro ao salvar o perfil. Tente novamente.');
    }
  };

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

            {/* Aba de Dados Pessoais */}
            <TabsContent value="pessoal">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" name="phone" value={perfil.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    name="birth_date"
                    type="date"
                    value={perfil.birth_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Aba de Endereço */}
            <TabsContent value="endereco">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    name="address.street"
                    value={perfil.address.street}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    name="address.city"
                    value={perfil.address.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="address.state"
                    value={perfil.address.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="address.code_postal"
                    value={perfil.address.zip_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Aba de Experiência */}
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
                            value={exp.company_name}
                            onChange={(e) => handleExperienciaChange(index, 'enterprise', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`cargo-${index}`}>Cargo</Label>
                          <Input
                            id={`cargo-${index}`}
                            value={exp.role}
                            onChange={(e) => handleExperienciaChange(index, 'function', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`periodo-${index}`}>Período</Label>
                          <Input
                            id={`periodo-${index}`}
                            value={exp.start_date}
                            onChange={(e) => handleExperienciaChange(index, 'period', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`periodo-${index}`}>Período</Label>
                          <Input
                            id={`periodo-${index}`}
                            value={exp.end_date}
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
                        <Button variant="destructive" onClick={() => removerExperiencia(index)}>
                          Remover Experiência
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button>Adicionar Experiência</Button>
              </div>
            </TabsContent>

            {/* Aba de Foto */}
            <TabsContent value="foto">
              <div className="space-y-4">
                <Avatar className="w-32 h-32 mx-auto">
                  <AvatarImage src={perfil.profile_image || ''} alt="Foto de perfil" />
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
  );
}
