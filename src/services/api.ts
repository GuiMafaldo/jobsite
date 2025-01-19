import baseUrl from '@/services/conectionApi/conection'

export const apiRequest = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
 ) => {
    const url = (`${baseUrl}/${endpoint}`)
    try{
        const response =  await fetch(url, {
            method,
            headers: {
                "Content-Type":"application/json",
            },
            body: method !== "GET" && method !== "DELETE" && body ? JSON.stringify(body): undefined,
        });  

        if(!response.ok) {
            const errorDetails = await response.text()
            console.error(`Erro na API (${endpoint}):`, response.status, errorDetails)         
            throw new Error(`Erro na requisiçao${endpoint}`)
        }
        return await response.json()
    } catch(error) {
        console.error(`Erro ao acessar a  API (${endpoint}):`, error)
        return null
    }
}

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

export const userProfile = async(profile: UserProfile) => {
    return apiRequest("users/userProfile", "POST", profile)
    
}

