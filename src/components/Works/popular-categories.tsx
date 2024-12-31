import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "Tecnologia", count: 1234 },
  { name: "Marketing", count: 567 },
  { name: "Design", count: 890 },
  { name: "Vendas", count: 432 },
  { name: "Finanças", count: 765 },
  { name: "Recursos Humanos", count: 321 },
]

export default function PopularCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Categorias Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{category.count} vagas</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

