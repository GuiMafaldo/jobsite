import { Button } from "@/components/ui/button"

import  { SignupModal } from "./Forms/signup.modal"
 '../components/signup.modal'

export default function CallToAction() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para Impulsionar sua Carreira?</h2>
        <p className="text-xl mb-8">Junte-se a milhares de profissionais que já encontraram seu emprego ideal no JobSite.</p>
        <div className="space-x-4">
          <SignupModal title="Cadastre-se gratuitamente" />           
          <Button className="font-bold" size="lg" variant="secondary">Saiba Mais</Button>
        </div>
      </div>
    </section>
  )
}

