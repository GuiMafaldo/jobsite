import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const jobs = [
  { id: 1, title: "Desenvolvedor Full Stack", company: "TechCorp", location: "São Paulo, SP", type: "Tempo Integral" },
  { id: 2, title: "Designer UX/UI", company: "DesignHub", location: "Rio de Janeiro, RJ", type: "Remoto" },
  { id: 3, title: "Gerente de Produto", company: "InnovateNow", location: "Belo Horizonte, MG", type: "Tempo Integral" },
  { id: 4, title: "Engenheiro de Dados", company: "DataDrive", location: "Curitiba, PR", type: "Tempo Integral" },
]

export default function FeaturedJobs() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Empregos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-600 mb-2">{job.location}</p>
                <Badge>{job.type}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

