'use client'

import {useEffect} from 'react'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, TrendingUp } from 'lucide-react'

import InitialPageHeader from '@/components/Headers/initialPage-header'
import Footer from '@/components/footer'

export default function SobreEmpresa() {

    useEffect(() => {
        document.title="EmpreGo - Sobré nos"
    })
  return (
    <>
    <InitialPageHeader />
        <div className="container mx-auto px-4 py-8 pb-24">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sobre a EmpreGo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conectando talentos e oportunidades para construir o futuro do trabalho
            </p>
        </header>

        <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-3xl font-semibold mb-4">Nossa História</h2>
                <p className="text-lg text-muted-foreground mb-4">
                Fundada em 2015, a Emprego nasceu da visão de transformar a maneira como as pessoas encontram trabalho e as empresas descobrem talentos. Começamos como uma pequena startup em São Paulo e hoje somos líderes no mercado de recrutamento online no Brasil.
                </p>
                <p className="text-lg text-muted-foreground">
                Nossa jornada é marcada por inovação constante, sempre buscando aprimorar a experiência de candidatos e recrutadores através da tecnologia e do entendimento profundo do mercado de trabalho.
                </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                src="/placeholder.svg?height=300&width=400&text=Imagem+da+Empresa"
                alt="Escritório da Emprego"
                fill
                className="object-cover"
                />
            </div>
            </div>
        </section>

        <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Nossa Missão e Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Missão
                </CardTitle>
                </CardHeader>
                <CardContent>
                Conectar pessoas a oportunidades que transformam vidas e impulsionam o crescimento das empresas.
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Colaboração
                </CardTitle>
                </CardHeader>
                <CardContent>
                Acreditamos no poder do trabalho em equipe e na sinergia entre candidatos e empresas.
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    Excelência
                </CardTitle>
                </CardHeader>
                <CardContent>
                Buscamos constantemente a melhoria e a qualidade em tudo o que fazemos.
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Inovação
                </CardTitle>
                </CardHeader>
                <CardContent>
                Estamos sempre à frente, utilizando tecnologia de ponta para revolucionar o recrutamento.
                </CardContent>
            </Card>
            </div>
        </section>

        <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Nossa Equipe de Liderança</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { name: "Ana Silva", role: "CEO & Co-fundadora", image: "/placeholder.svg?height=100&width=100&text=AS" },
                { name: "Carlos Oliveira", role: "CTO", image: "/placeholder.svg?height=100&width=100&text=CO" },
                { name: "Mariana Santos", role: "COO", image: "/placeholder.svg?height=100&width=100&text=MS" },
                { name: "Roberto Ferreira", role: "Diretor de Produto", image: "/placeholder.svg?height=100&width=100&text=RF" },
                { name: "Juliana Costa", role: "Diretora de Marketing", image: "/placeholder.svg?height=100&width=100&text=JC" },
                { name: "Pedro Almeida", role: "Diretor de Vendas", image: "/placeholder.svg?height=100&width=100&text=PA" },
            ].map((member) => (
                <Card key={member.name}>
                <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>

        <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Nosso Impacto</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
                { label: "Vagas preenchidas", value: "500k+" },
                { label: "Empresas parceiras", value: "10k+" },
                { label: "Candidatos ativos", value: "2M+" },
                { label: "Taxa de satisfação", value: "95%" },
            ].map((stat) => (
                <Card key={stat.label}>
                <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>

        <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Reconhecimentos</h2>
            <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">Melhor Plataforma de Empregos 2023</Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">Top 10 Startups Mais Inovadoras</Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">Prêmio Excelência em RH</Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">Líder em Tecnologia para Recrutamento</Badge>
            </div>
        </section>

        <section>
            <Card>
            <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Junte-se a nós</h2>
                <p className="text-center text-muted-foreground mb-4">
                Estamos sempre em busca de talentos apaixonados por transformar o mundo do trabalho.
                Confira nossas oportunidades e faça parte do nosso time!
                </p>
                <div className="flex justify-center">
                <a href="/carreiras" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Ver vagas abertas
                </a>
                </div>
            </CardContent>
            </Card>
        </section>
        </div>
      <Footer />
    </>
  )
}

