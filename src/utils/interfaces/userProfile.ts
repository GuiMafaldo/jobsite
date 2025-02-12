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
    profile_image?: File | string
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


