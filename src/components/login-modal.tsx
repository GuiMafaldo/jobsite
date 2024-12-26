'use client'

import { useState, useEffect } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function LoginModal() {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')
  const [name, setName] = useState<string | any>('')

  useEffect(() => {
    const username = email.split('@')[0]
    localStorage.setItem('uusername', username)
    setName(username)
  },[email])

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (email != 'admin@email.com' && password != 'admin123') {
      if(email.length > 0) {
        const username = email.split('@')[0];
        localStorage.setItem('username', username)
        console.log(username)
      } 
      setError('Por favor, preencha todos os campos.')      
    } 

    // Aqui você implementaria a lógica de autenticação
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Login attempt', { email, password })
      // If login is successful, you would typically:
      // - Set the user in your global state
      // - Redirect to the dashboard
    } catch (err) {
      setError('Falha no login. Por favor, verifique suas credenciais.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Entrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Entrar no JobSite</DialogTitle>
          <DialogDescription>
            Entre com suas credenciais para acessar sua conta.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form id='login' onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <Button type="submit" className="w-full"> <a href="/dashboard">Entrar</a></Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Não tem uma conta? <DialogTrigger asChild><Button variant="link" className="p-0">Cadastre-se</Button></DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

