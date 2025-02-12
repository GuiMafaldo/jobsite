type Benefits = {
    benefits: []
}

interface Jobs {
    company_id?: string,
    title: string,
    description: string,
    status: string
    create_at?: string
    salary: string,
    company_name: string,
    benefits: any,
    location: string,
    model: string
    requirements: string
    contract: string
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

