import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const recentSearches = [
  "Desenvolvedor React",
  "UX Designer São Paulo",
  "Engenheiro de Dados Remoto",
]

export default function RecentSearches() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <Button key={index} variant="outline" size="sm">
              {search}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

