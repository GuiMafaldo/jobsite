import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from 'next/image';

interface CompanyModalProps {
  company: {
    name: string;
    logo: string;
    description: string;
    jobsPosted: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyModal({ company, isOpen, onClose }: CompanyModalProps){
  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{company.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Image src={company.logo} alt={company.name} width={200} height={100} className="mb-4" />
          <DialogDescription>{company.description}</DialogDescription>
          <p className="mt-4">Vagas postadas: {company.jobsPosted}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};



