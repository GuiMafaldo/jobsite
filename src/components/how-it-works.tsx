import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, Building } from 'lucide-react'

const steps = [
  { 
    title: "Busque Vagas", 
    description: "Explore milhares de oportunidades de emprego em diversas áreas.",
    icon: Search 
  },
  { 
    title: "Candidate-se", 
    description: "Envie seu currículo e candidature-se às vagas que mais combinam com você.",
    icon: FileText 
  },
  { 
    title: "Comece a Trabalhar", 
    description: "Receba ofertas de emprego e inicie sua nova jornada profissional.",
    icon: Building 
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

