import baseUrl from '@/services/conectionApi/conection'



export const apiRequest = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    token?: string | any,
) => {
    const url = `${baseUrl}/${endpoint}`;

    try {
        // SALVA NA VARIAVEL HEADERS O FORMATO DA REQUISIÇÃO 
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        // FAZ A PASSAGEM DO TOKEN NO HEADERS PRA AUTENTICAÇAO
        if (token) {
            headers["Authorization"] = `Bearer ${token}`; // Garante que o token seja enviado corretamente
        }
        //DEFINI O QUE VAI SER PASSADO NA REQUISIÇÃO
        const options: RequestInit = {
            method,
            headers,
        };
// VERIFICA O METODO QUE ESTA SENDO PASSADO E SO EXIGE BODY CASO ATENDA O QUE FOI SETADO
        if (body && (method === "POST" || method === "PUT")) {
            options.body = JSON.stringify(body);
        }
        // PEGA A RESPOSTA DA REQUISIÇÃO
        const response = await fetch(url, options);

// VERIFICA SI OS ENDPOINTS ESTAO CORRETOS E FUNCIONANDO CASO CONTRARIO RETORNA STATUS 500
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

                    //------- LOGIN DE USUÁRIOS --------//

export const userLogin = async ({ email, password, user}: { email: string, password: string, user?: string }) => {
    const data = await apiRequest("users/login", 'POST', { email, password })

        try {
            if(data.user) {
                localStorage.setItem('username', data.user)
            } else {
                console.error('sabado name nao foi enviado')
            }

        if (data?.token) {
            localStorage.setItem('tokenUser', data.token);
        } else {
            console.error('Erro ao tentar fazer login: Token não encontrado');
        }
    } catch(exe) {
        console.error('Erro ao capturar o token do usuario:', exe)
    }
    return data; 
}

                    //------- LOGIN DE EMPRESAS --------//

export const companyLogin = async ({ email, password, name }: { email: string, password: string, name?: string }) => {
    const data = await apiRequest("company/login", 'POST', { email, password });

    
    // VERIFICA SI DATA ESTA RECEBENDO O TOKEN E SALVA NO STORAGE
    try {
        if(name) {
            localStorage.setItem('company', name)
            console.log(name)
        } else {
            console.error('Company name nao foi enviado')
        }

        if (data?.token) {
            localStorage.setItem('tokenCompany', data.token);
        } else {
            console.error('Erro ao tentar fazer login: Token não encontrado');
        }
        
    } catch(exe){
        console.error('Erro ao capturar token:', exe)
    }

    return data;
}

// # COMPLEMENTO PROFILE  DE PERFIL
export const submitUserProfile = async (profile: UserProfile) => {
    const token = localStorage.getItem('tokenUser');
    return apiRequest("users/update", "POST", profile, token);
}


// # SUBMIT JOBS
export const submitJob = async (jobs: Jobs) => {
    const token = localStorage.getItem('tokenCompany')
    const data  = await apiRequest("company/pJob", 'POST', jobs, token)

    try {
        if(data.success) {  
            console.log(data)
        } 

    }catch(exe) {
        console.error('Vaga nao cadastrada. verifique os campos obrigatorios', exe)
    }

    return data
}

// #UPDATE JOBS
export const updateJob = async (id: string, updatedFields: Partial<Jobs>) => {
    const token = localStorage.getItem('tokenCompany'); // Token da empresa

    if (!token) {
        console.error('Token da empresa não encontrado. Usuário não autenticado.');
        console.log(token)
        return;
    }

    try {
        // Passo 1: Obter os dados atuais da vaga
        const currentJob = await apiRequest(`company/pJob/${id}`, 'GET', undefined, token);

        if (!currentJob) {
            console.error('Erro ao buscar os dados da vaga.');
            console.log(currentJob)
            return;
        }

        // Passo 2: Atualizar somente os campos modificados
        const updatedJob = { ...currentJob, ...updatedFields };

        // Passo 3: Fazer o PUT com os novos dados
        const response = await apiRequest(`company/jobs/${id}`, 'PUT',  updatedJob, token);

        if (!response.jobId) {
            console.error('Erro ao atualizar a vaga:', response);
        } else {
            console.log('Vaga atualizada com sucesso!', response);
        }
    } catch (error) {
        console.error('Erro ao atualizar a vaga:', error);
    }
};
        
        

// # PEGA TODAS AS VAGAS QUE POSSUEM CANDIDATOS
export const getJobsWithCandidates = async(jobId?: string): Promise<Candidates[]> =>{
    const token = localStorage.getItem('tokenCompany')
    const tknc = localStorage.getItem('tokenJob')

    if(!token) {
        throw new Error("Token nao encontrado.")
    }
    return apiRequest(`company/jobs/:${tknc}/candidates`, 'GET', undefined, token)
} 

       
// # PEGAS AS VAGAS SOMENTE DA EMPRESA AUTHENTICADA
export const getJobsCompany = async (): Promise<Jobs[]> => {
    const token = localStorage.getItem('tokenCompany')

    if (!token) {
        console.error('Token não encontrado!')
        throw new Error("Token não encontrado!")
    }
    try {
        
        const response = await apiRequest("company/gJob", 'GET', undefined, token)

        if (response && typeof response === 'object' && 'jobs' in response) {
            // VERIFICA SI A RESPOSTA DA API E UM ARRAY
            if (Array.isArray(response.jobs)) {
                console.log(response.jobs)
                return response.jobs;
                }
                // CASO A RESPOSTA VOLTE UM OBJETO QUE E O CASO ELE TRANSFORMA EM ARRAY
                    else if (typeof response.jobs === 'object') {
                        return [response.jobs];
                }
        }

        // CASO NAO TENHA O TRATAMENTO ALI EM CIMA LANÇA ESSE ERRO
        throw new Error("Formato de resposta inválido");

    } catch (exe) {
        //CASO DE RUIM RETORNA UM ARRAY VAZIO PRA NAO QUEBRAR A APLICAÇÃO
        console.error('Erro ao buscar jobs:', exe);
        return []; 
    }
}

export const deleteJobs = async(id: string): Promise<Jobs[]> => {
    const token = localStorage.getItem('tokenCompany')

    if(!token) {
        console.error("Token nao fornecido")
        throw new Error('Token nao fornecido')
    }
    try {

        const response = await apiRequest(`company/dJob/${id}`, 'DELETE', undefined, token)

        if(response && typeof response === 'object' && 'jobs' in response) {

            if(Array.isArray(response.jobs)) {
                console.log(response.jobs)
                return response.jobs

            } else if(typeof response.jobs === 'object') {
                return [response.jobs]
            }
        }
        throw new Error("Formato de resposta invalido")
        
    } catch(exe) {
        console.error('Erro ao buscar vaga', exe)
        return []
    }
}




// # ROTA DE VAGAS PARA USUARIOS
export const getAllJobs = async(): Promise<Jobs[]> => {

    try {
        const response = await apiRequest("company/jobs", "GET", undefined)

        if(response && typeof response === 'object' && 'jobs' in response) {
            if (Array.isArray(response.jobs)) {
                console.log(response.jobs)
                return response.jobs
            } else if (typeof response.jobs === 'object') {
                return [response.jobs]
            }
        }
        console.log(response)
        throw new Error("Formato de resposta invalido.")

    } catch(exe) {
        console.error("Erro ao capturar a lista de vagas", exe)
        return []
    }     
}