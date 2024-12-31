'use client'

import { useState } from 'react'


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UsuarioData {
  name: string,
  email: string,
  password: string,
  confirmPass: string,
}

interface Props {
  title?: 'Cadastrar' | 'Cadastre-se gratuitamente'
  bgColor?: 'blue' | 'white'
}


export function SignupModal({title}: Props){
  const [error, setError] = useState<any>(null)
  const [usuario, setUsuario] = useState<UsuarioData>({
    name: '',
    email: '',
    password:'',
    confirmPass:''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    e.preventDefault();
    setUsuario({
      ...usuario,
      [name]: value
    })
    console.log({
      [name]:value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario.password !== usuario.confirmPass) {
      setError("As senhas não coincidem.");
      return;
    }
    if (usuario.password.length < 6) {
      setError("A senha deve conter mais de 6 caracteres.");
      return;
    }
    // Simula um processo de cadastro bem-sucedido
    console.log("Dados do usuário cadastrados", usuario);

    // Redireciona para a página inicial após o cadastro
    window.location.href = '/';
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-blue-600 text-white font-bold hover:bg-white hover:text-black'>{title ? 'Cadastre-se gartuitamente':'Cadastrar'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar uma conta no EmpreGo</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para se cadastrar.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div id='signin' className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Seu nome"
              name='name'
              onChange={handleChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com"
              name='email'
              onChange={handleChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password"
              name='password'
              onChange={handleChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              name='confirmPass'
              onChange={handleChange}
              required 
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500" variant='secondary'>Cadastrar</Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Já tem uma conta? <DialogTrigger asChild><Button variant="link" className="p-0">Faça login</Button></DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

