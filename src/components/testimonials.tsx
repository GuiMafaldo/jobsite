import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "João Silva",
    role: "Desenvolvedor Web",
    content: "Graças ao EmpreGo, encontrei minha vaga dos sonhos em apenas duas semanas. A plataforma é intuitiva e as recomendações são muito precisas!",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Maria Santos",
    role: "Designer UX",
    content: "A EmpreGo revolucionou minha busca por emprego. A variedade de oportunidades e a facilidade de candidatura fizeram toda a diferença na minha carreira.",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Carlos Oliveira",
    role: "Gerente de Projetos",
    content: "Como recrutador, a EmpreGo simplificou nosso processo de contratação. Encontramos candidatos qualificados rapidamente e melhoramos nossa eficiência.",
    avatar: "/placeholder.svg?height=40&width=40"
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">O que Dizem Nossos Usuários</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">{`${testimonial.content}`}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

