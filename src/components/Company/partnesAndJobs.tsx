"use client"

import React, { useState } from 'react';
import PartnerCarousel from '../Company/partnerCarousel';
import JobsDashboard from '../Company/jobsDashboar';
import CompanyModal from '../Company/companyModal';
import { partnerCompanies } from '@/utils/mockvagas';
import { Button } from "@/components/ui/button";

const PartnersAndJobs = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCompanyModal = (company: any) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PartnerCarousel />
      <JobsDashboard />
      
      <div className="w-full max-w-4xl mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Informações das Empresas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partnerCompanies.map((company) => (
            <Button
              key={company.id}
              onClick={() => openCompanyModal(company)}
              variant="outline"
              className="p-2 text-center"
            >
              {company.name}
            </Button>
          ))}
        </div>
      </div>

      <CompanyModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PartnersAndJobs;

