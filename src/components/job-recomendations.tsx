import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const recommendedJobs = [
  { id: 1, title: "Desenvolvedor React Senior", company: "TechInova", location: "São Paulo, SP", salary: "R$ 12.000 - R$ 15.000" },
  { id: 2, title: "Product Manager", company: "StartupXYZ", location: "Remoto", salary: "R$ 10.000 - R$ 13.000" },
  { id: 3, title: "UX Designer", company: "DesignMaster", location: "Rio de Janeiro, RJ", salary: "R$ 8.000 - R$ 11.000" },
]

export default function JobRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações de Emprego</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="flex justify-between items-start border-b pb-4 last:border-b-0 last:pb-0">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-sm text-gray-600">{job.salary}</p>
              </div>
              <div className="space-y-2">
                <Badge>Recomendado</Badge>
                <Button variant="outline" size="sm" className="w-full">Ver Vaga</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

