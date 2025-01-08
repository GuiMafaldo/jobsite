'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function LoginModal() {
  const router = useRouter()
  const [isCompany, setIsCompany] = useState(false)
  const [credentials, setCredentials] = useState({
    userEmail: 'admin@email.com',
    userPass: 'admin123',
    companyEmail: 'company@email.com',
    companyPass: 'company123'
  })

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    const username = email.split('@')[0]
    const initialName = username.substring(0, 2)
    
    localStorage.setItem('username', username)
    localStorage.setItem('initialname', initialName)
    setName(username)
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isCompany) {
      if (credentials.companyEmail === email && credentials.companyPass === password) {
        router.push('/dashboard/companyHome')
      } else {
        setError('Verifique suas credenciais de empresa')
      }
    } else {
      if (credentials.userEmail === email && credentials.userPass === password) {
        router.push('/dashboard/userHome')
      } else {
        setError('Verifique suas credenciais de usuário')
      }
    }
  }

  const toggleLoginType = () => {
    setIsCompany(!isCompany)
    setError('')
    setEmail('')
    setPassword('')
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
        <div className="flex justify-center space-x-4 mb-4">
          <Button 
            onClick={toggleLoginType} 
            variant={isCompany ? "outline" : "default"}
          >
            Usuário
          </Button>
          <Button 
            onClick={toggleLoginType} 
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
        <form id='login' onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={isCompany ? "empresa@email.com" : "seu@email.com"}
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
          <Button type="submit" className="w-full">
            {isCompany ? "Entrar como Empresa" : "Entrar como Usuário"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Não tem uma conta? <DialogTrigger asChild><Button variant="link" className="p-0">Cadastre-se</Button></DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

