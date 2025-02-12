import baseUrl from '@/services/conectionApi/conection'


export const apiRequest = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    token?: string
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

        // Adiciona o corpo apenas se for necessário
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
                //REGISTER USERS AND COMPANIES //
export const register = async(user: Credentials) => {
    return apiRequest("users/registerUser", "POST", user)
}

export const companyRegister = async(company: CompanyData) => {
    return apiRequest("company/registerCompany", "POST", company)
}

                //LOGIN USERS AND COMPANIES //

export const userLogin = async ({ email, password }: { email: string, password: string }) => {
    const data = await apiRequest("users/userLogin", 'POST', { email, password });

    if (data && data.token) {
        // Verificação se o token foi retornado e o armazena no localStorage
        const { token } = data;

        if (token) {
            localStorage.setItem('tokenUser', data.token);
        } else {
            console.error('Token não encontrado na resposta da API');
        }
    } else {
        console.error('Erro ao tentar fazer login');
    }

    return data; 
}

export const companyLogin = async({email, password}: {email: string, password: string}) => {
    const data = await apiRequest("company/login", 'POST', {email, password})

    if(data && data.token){
        const { token } = data

        if(token) {
            localStorage.setItem('tokenCompany', data.token)
        }else{
            console.error('Token nao encontrado na Resposta da API')
        }
    }else{
        console.error('Erro ao tentar efetuar login')
    }
    return data
}

                // FINALIZAÇÃO DE ṔROFILE DE USUARIO //

export const submitUserProfile = async (profile: UserProfile) => {
    try{
        const data = await apiRequest("users/update", "POST", profile)

        if(data && data.success){
            console.log("Dados enviados com sucesso", data)
        } else{
            console.error("Erro ao tentar enviar os dados:", data?.message || "Sem resposta da api")
        }
        return data
    }catch(exe){
        console.error("Erro inesperado ao enviar os dados:", exe)
        throw exe
    }

}
export const submitJob = async (jobs: Jobs) => {
    const res = await apiRequest("company/jobs", 'POST', jobs)

    return res
}

export const getJobsCompany = async(): Promise<Jobs[]> => {
    const response = await apiRequest("company/job", 'GET')

    return response
}
