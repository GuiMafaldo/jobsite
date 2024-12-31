import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const savedJobs = [
  { id: 1, title: "Data Scientist", company: "DataCo" },
  { id: 2, title: "Frontend Developer", company: "WebTech" },
  { id: 3, title: "Marketing Manager", company: "BrandBoost" },
]

export default function SavedJobs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vagas Salvas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
              <Button variant="ghost" size="sm">Ver</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

