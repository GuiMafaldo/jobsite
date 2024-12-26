import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function JobSearch() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Encontre o emprego dos seus sonhos</h1>
        <div className="flex max-w-3xl mx-auto">
          <Input 
            type="text" 
            placeholder="Cargo, palavras-chave ou empresa" 
            className="flex-grow mr-2 text-black bg-white"
          />
          <Input 
            type="text" 
            placeholder="Cidade ou estado" 
            className="flex-grow mr-2 text-black bg-white"
          />
          <Button type="submit" size="lg">
            Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}

