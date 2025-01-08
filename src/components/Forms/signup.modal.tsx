'use client'

import { useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

interface UserData {
  name: string,
  email: string,
  password: string,
  confirmPass: string,
}

interface CompanyData {
  name: string,
  email: string,
  password: string,
  confirmPass: string,
  phone: string,
  address: string,
  description: string,
}

interface Props {
  title?: 'Cadastrar' | 'Cadastre-se gratuitamente'
  bgColor?: 'blue' | 'white'
}

export function SignupModal({title}: Props){
  const [error, setError] = useState<string | null>(null)
  const [isCompany, setIsCompany] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password:'',
    confirmPass:''
  })
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    email: '',
    password:'',
    confirmPass:'',
    phone: '',
    address: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    if (isCompany) {
      setCompanyData(prev => ({ ...prev, [name]: value }))
    } else {
      setUserData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = isCompany ? companyData : userData;
    if (data.password !== data.confirmPass) {
      setError("As senhas não coincidem.");
      return;
    }
    if (data.password.length < 6) {
      setError("A senha deve conter mais de 6 caracteres.");
      return;
    }
    // Simula um processo de cadastro bem-sucedido
    console.log(isCompany ? "Dados da empresa cadastrados" : "Dados do usuário cadastrados", data);

    // Redireciona para a página inicial após o cadastro
    window.location.href = '/';
  }

  const toggleRegistrationType = () => {
    setIsCompany(!isCompany)
    setError(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-blue-600 text-white font-bold hover:bg-white hover:text-black'>{title ? 'Cadastre-se gratuitamente':'Cadastrar'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar uma conta no EmpreGo</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para se cadastrar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center space-x-4 mb-4">
          <Button 
            onClick={toggleRegistrationType} 
            variant={isCompany ? "outline" : "default"}
          >
            Usuário
          </Button>
          <Button 
            onClick={toggleRegistrationType} 
            variant={isCompany ? "default" : "outline"}
          >
            Empresa
          </Button>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{isCompany ? 'Nome da Empresa' : 'Nome completo'}</Label>
            <Input 
              id="name" 
              name="name"
              type="text" 
              placeholder={isCompany ? "Nome da sua empresa" : "Seu nome"}
              value={isCompany ? companyData.name : userData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="seu@email.com"
              value={isCompany ? companyData.email : userData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              value={isCompany ? companyData.password : userData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPass">Confirmar senha</Label>
            <Input 
              id="confirmPass" 
              name="confirmPass"
              type="password"
              value={isCompany ? companyData.confirmPass : userData.confirmPass}
              onChange={handleChange}
              required 
            />
          </div>
          {isCompany && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  value={companyData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address" 
                  name="address"
                  type="text"
                  value={companyData.address}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição da Empresa</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={companyData.description}
                  onChange={handleChange}
                  required 
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full bg-blue-500" variant='secondary'>
            {isCompany ? 'Cadastrar Empresa' : 'Cadastrar Usuário'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Já tem uma conta? <DialogTrigger asChild><Button variant="link" className="p-0">Faça login</Button></DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

