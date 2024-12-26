'use client'

import DashboardHeader from "@/components/dashboard-header"
import Footer from "@/components/footer"

import { useEffect, useState } from "react"


export default function Applications(){
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        console.log('Vagas recuperadas do localStorage:', jobs);
        setSavedJobs(jobs);
    }, []);

    if (savedJobs.length === 0) {
        return <p>Nenhuma vaga salva ainda.</p>;
    }

    return (
        <div>
            <h2>Vagas Salvas</h2>
            <div>
                {savedJobs.map((job, index) => (
                    <div key={job.id || index} className="job-card">
                        <h3>{job.title}</h3>
                        <p><strong>Empresa:</strong> {job.company}</p>
                        <p><strong>Localização:</strong> {job.location}</p>
                        <p><strong>Salário:</strong> {job.salary}</p>
                        <p><strong>Tipo de Contrato:</strong> {job.contractType}</p>
                        <p><strong>Benefícios:</strong> {job.benefits}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}