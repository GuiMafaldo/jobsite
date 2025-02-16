'use client'

import InitialPageHeader from "@/components/Headers/initialPage-header";
import PartnersAndJobs from "../../../components/Company/partnesAndJobs";
import Footer from "@/components/footer";

import {useEffect} from 'react'

export default function ContainerCompanyComponents() {

    useEffect(() => {
        document.title="EmpreGo - Empresas parceiras"
    })
    return(
        <main>
            <InitialPageHeader />
            <div className="flex flex-1 m-auto bg-blue-600 h-32 justify-center">
                <h1 className=" flex font-bold text-white text-3xl items-center">Bem vindo a nossa plataforma de empregos!</h1>
            </div>
            <PartnersAndJobs />
            <Footer />
        </main>
    )
}