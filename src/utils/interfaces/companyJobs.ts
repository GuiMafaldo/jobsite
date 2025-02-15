type Benefits = {
    benefits: []
}

interface Jobs {
    id?: string
    company_id?: string,
    title: string,
    description: string,
    salary: string,
    benefits: any,
    location: string,
    model: string
    requirements: string
    contract: string
    level?: string | any
}

interface CompanyData {
    name: string,
    email: string,
    password: string,
    confirmPass: string,
    phone: string,
    address: string,
    description: string,
  }

  interface Candidates {
    candidate: string
    create_at: string
    status: string

  }

