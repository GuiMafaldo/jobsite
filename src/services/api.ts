import baseUrl from '@/services/conectionApi/conection'



export const apiRequest = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    token?: string | any
) => {
    const url = `${baseUrl}/${endpoint}`;

    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`; // Garante que o token seja enviado corretamente
        }

        const options: RequestInit = {
            method,
            headers,
        };

        if (body && (method === "POST" || method === "PUT")) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`Erro na API (${endpoint}):`, response.status, errorDetails);
            throw new Error(`Erro na requisição ${endpoint}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Erro ao acessar a API (${endpoint}):`, error);
        return null;
    }
};

// REGISTRO DE USUÁRIOS E EMPRESAS
export const register = async(user: Credentials) => {
    return apiRequest("users/register", "POST", user)
}

export const companyRegister = async(company: CompanyData) => {
    return apiRequest("company/register", "POST", company)
}

// LOGIN DE USUÁRIOS E EMPRESAS
export const userLogin = async ({ email, password }: { email: string, password: string }) => {
    const data = await apiRequest("users/login", 'POST', { email, password });

    if (data?.token) {
        localStorage.setItem('tokenUser', data.token);
    } else {
        console.error('Erro ao tentar fazer login: Token não encontrado');
    }

    return data; 
}

export const companyLogin = async ({ email, password }: { email: string, password: string }) => {
    const data = await apiRequest("company/login", 'POST', { email, password });

    if (data?.token) {
        localStorage.setItem('tokenCompany', data.token);
    } else {
        console.error('Erro ao tentar fazer login: Token não encontrado');
    }

    return data;
}

// FINALIZAÇÃO DE PROFILE DO USUÁRIO
export const submitUserProfile = async (profile: UserProfile) => {
    const token = localStorage.getItem('tokenUser');
    return apiRequest("users/update", "POST", profile, token);
}

// CADASTRO DE VAGAS
export const submitJob = async (jobs: Jobs) => {
    const token = localStorage.getItem('tokenCompany');
    return apiRequest("company/jobs", 'POST', jobs, token);
}

// BUSCA VAGAS DA EMPRESA
export const getJobsCompany = async(): Promise<Jobs[]> => {
    const token = localStorage.getItem('tokenCompany');
    return apiRequest("company/jobs", 'GET', undefined, token);
}

export const getJobsWithCandidates = async(jobId?: string): Promise<Candidates[]> =>{
    const token = localStorage.getItem('tokenCompany')

    if(!token) {
        throw new Error("Token nao encontrado.")
    }

    if(!jobId) {
        throw new Error("JobId nao foi fornecido.")
    }
    return apiRequest(`company/jobs/${jobId}/candidates`, 'GET', undefined, token)
}
