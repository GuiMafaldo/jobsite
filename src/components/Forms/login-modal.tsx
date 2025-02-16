'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { companyLogin, userLogin } from '@/services/api'

export function LoginModal() {

  const router = useRouter()
  const [isCompany, setIsCompany] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Estados para Usuário
  const [mailUser, setMailUser] = useState<string>('')
  const [passUser, setPassUser] = useState<string>('')

  // Estados para Empresa
  const [mailCompany, setMailCompany] = useState<string>('')
  const [passCompany, setPassCompany] = useState<string>('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let response
      // Lógica para verificar o tipo de login (usuário ou empresa)
      if (isCompany) {
        response = await companyLogin({ email: mailCompany, password: passCompany })
        if (response && response.token) {
          localStorage.setItem('company', mailCompany.split('@')[0])
          localStorage.setItem('token', response.token)
          router.push('/dashboard/company')
        } else {
          setError('Credenciais inválidas')
        }
      } else {
        response = await userLogin({ email: mailUser, password: passUser })
        if (response && response.token) {
          localStorage.setItem('mail', mailUser)
          localStorage.setItem('token', response.token)
          router.push('/dashboard/users')
        } else {
          setError('Credenciais inválidas')
        }
      }

    } catch (exception) {
      setError(`Erro ao autenticar. Tente novamente. ${exception || error}`)
      console.error('Erro ao fazer login:', exception)
    } finally {
      setLoading(false)
    }
  }

  const toggleLoginType = () => {
    setIsCompany(!isCompany)
    setError('')
    setMailUser('') // Limpar campos ao trocar de tipo de login
    setPassUser('')
    setMailCompany('')
    setPassCompany('')
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
        <form id='login' onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={isCompany ? "empresa@email.com" : "seu@email.com"}
              value={isCompany ? mailCompany : mailUser}
              onChange={(e) => isCompany ? setMailCompany(e.target.value) : setMailUser(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password"
              value={isCompany ? passCompany : passUser}
              onChange={(e) => isCompany ? setPassCompany(e.target.value) : setPassUser(e.target.value)}
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
