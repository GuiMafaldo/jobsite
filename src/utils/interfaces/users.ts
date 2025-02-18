interface Experiences {
    company_name: string
    role: string
    start_date: string
    end_date: string
    description: string
}

interface UserProfile {
    document_number: string
    phone: string
    birth_date: string
    education: string
    profile_image?: string
    address:{
        street: string
        city: string
        state: string
        zip_code: string
        country: string
    },
    experiences: Experiences[]
}

interface Credentials {
    name: string,
    email:string,
    password:string
    confirmPass?: string 
}

interface Applied {
    job_title: string
    job_localy: string
    application_status: string
    applied_date: string
    job_benefits: []

}

