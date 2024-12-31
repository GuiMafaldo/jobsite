import React from 'react';
import Image from 'next/image';
import { partnerCompanies } from '@/utils/mockvagas';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PartnerCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Empresas Parceiras</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {partnerCompanies.map((company: any) => (
            <CarouselItem key={company.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="relative w-full h-[100px] mb-4">
                      <Image 
                        src={company.logo} 
                        alt={company.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{company.name}</h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PartnerCarousel;

