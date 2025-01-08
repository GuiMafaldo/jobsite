export interface Jobs {
  id: number | any
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  benefits: string[];
  contractType: string;
  level: string;

  status?: {
    enviado: string
    emAnalise: string
    selecionado: string
    naoSelecionado: string
    agendado: string
  }
}
