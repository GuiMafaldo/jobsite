interface Experiences {
    enterprise: string
    function: string
    period: string
    description: string
}

interface UserProfile {
    fullname: string
    phone: string
    birth_date: string
    address:{
        street: string
        city: string
        state: string
        code_postal: string
    },
    experiences: Experiences[]
    photo: string | null
}
interface Credentials {
    name: string,
    email:string,
    password:string | any,
    confirmPass?: string | any
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