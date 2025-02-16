'use client'

import Footer from "@/components/footer"
import InitialPageHeader from "@/components/Headers/initialPage-header"

import { useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Target, Clock, Star, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { StaticStarRating } from "@/components/StaticStarRating"

export default function About() {

    useEffect(() => {
        document.title = "EmpreGo - Sobré"
    })

    const testimonials = [
        { name: 'Maria Silva', role: 'Desenvolvedora Web', content: 'Graças à JobConnect, encontrei minha vaga dos sonhos em apenas duas semanas!', rating: 5 },
        { name: 'João Santos', role: 'Gerente de RH', content: 'A plataforma simplificou nosso processo de recrutamento e melhorou significativamente a qualidade dos candidatos.', rating: 5 }
      ]
  return (
    <>
    <InitialPageHeader />
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Sobre a EmpreGo</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Conectar talentos às melhores oportunidades, impulsionando carreiras e ajudando empresas a encontrar os profissionais ideais para seu crescimento.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Nossos Valores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Transparência em todas as interações</li>
              <li>Inovação constante em nossas soluções</li>
              <li>Promoção da diversidade e inclusão no ambiente de trabalho</li>
              <li>Excelência no atendimento a candidatos e empresas</li>
              <li>Compromisso com o desenvolvimento profissional</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2" />
            Nossa História
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Fundada em 2010, a EmpreGo nasceu da visão de simplificar o processo de recrutamento e seleção. Ao longo dos anos, evoluímos de uma pequena startup para uma das principais plataformas de empregos do país, sempre focados em inovação e na satisfação de candidatos e empresas.</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 font-bold">2010</div>
              <div>Fundação da EmpreGo</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-bold">2013</div>
              <div>Lançamento do primeiro aplicativo móvel</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-bold">2016</div>
              <div>Expansão para 5 países da América Latina</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-bold">2019</div>
              <div>Implementação de IA para matching de vagas</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 font-bold">2022</div>
              <div>Alcance de 10 milhões de usuários ativos</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-4 gap-8 mb-12 text-center">
        <Card>
          <CardHeader>
            <CardTitle>1M+</CardTitle>
          </CardHeader>
          <CardContent>Vagas publicadas mensalmente</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>10M+</CardTitle>
          </CardHeader>
          <CardContent>Usuários ativos</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>500k+</CardTitle>
          </CardHeader>
          <CardContent>Empresas parceiras</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>20+</CardTitle>
          </CardHeader>
          <CardContent>Países atendidos</CardContent>
        </Card>
      </div>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Nossa Equipe</CardTitle>
          <CardDescription>Conheça alguns dos talentos por trás da EmpreGo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['CEO', 'CTO', 'COO', 'CMO'].map((role, index) => (
              <div key={index} className="text-center">
                <Image
                  src={`/placeholder.svg?height=100&width=100`}
                  alt={`${role} Avatar`}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-2"
                />
                <h3 className="font-semibold">Nome do {role}</h3>
                <p className="text-sm text-gray-600">{role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Depoimentos</CardTitle>
          <CardDescription>O que nossos usuários dizem sobre nós</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="mb-2">{testimonial.content}</p>
                  <StaticStarRating rating={testimonial.rating} />
                  <p className="font-semibold mt-2">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Por que escolher a EmpreGo</CardTitle>
          <CardDescription>Descubra as vantagens de usar nossa plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <Briefcase className="mr-2 mt-1" />
              <span>Milhares de vagas atualizadas diariamente</span>
            </li>
            <li className="flex items-start">
              <Users className="mr-2 mt-1" />
              <span>Conexão direta com recrutadores</span>
            </li>
            <li className="flex items-start">
              <Target className="mr-2 mt-1" />
              <span>Recomendações de vagas personalizadas com IA</span>
            </li>
            <li className="flex items-start">
              <Clock className="mr-2 mt-1" />
              <span>Processo de candidatura simplificado</span>
            </li>
            <li className="flex items-start">
              <Star className="mr-2 mt-1" />
              <span>Avaliações e feedbacks de empresas</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="mr-2 mt-1" />
              <span>Recursos de desenvolvimento de carreira</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg">
            Comece a buscar vagas agora
          </Button>
        </CardFooter>
      </Card>
    </div>
    <Footer />
    </>
  )
}

