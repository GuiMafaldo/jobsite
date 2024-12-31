import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const applications = [
  { id: 1, jobTitle: "Desenvolvedor Full Stack", company: "TechCorp", status: "Em Análise" },
  { id: 2, jobTitle: "UX Researcher", company: "UXStudio", status: "Entrevista Agendada" },
  { id: 3, jobTitle: "DevOps Engineer", company: "CloudTech", status: "Candidatura Enviada" },
]

type BadgeVariant = "default" | "destructive" | "outline" | "secondary" | "success" | null | undefined;

export default function ApplicationStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Candidaturas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
              <div>
                <h3 className="font-semibold">{application.jobTitle}</h3>
                <p className="text-sm text-gray-600">{application.company}</p>
              </div>
              <Badge variant={application.status === "Em Análise" ? "secondary" : 
                            application.status === "Entrevista Agendada" ? "destructive" : "default"}>
                {application.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

