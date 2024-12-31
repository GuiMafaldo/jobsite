import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Jobs } from "../../types";
import { initialized } from '../store/slice'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import lista from "../utils/lista";


export default function JobRecommendations() {
  const limitedList = lista.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações de Emprego</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedList.length > 0 ? (
            limitedList.map((vaga) => (
              <div
                key={vaga.id}
                className="flex justify-between items-start border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <h3 className="font-semibold">{vaga.title}</h3>
                  <p className="text-sm text-gray-600">{vaga.company}</p>
                  <p className="text-sm text-gray-600">{vaga.location}</p>
                  <p className="text-sm text-gray-600">{vaga.salary}</p>
                </div>
                <div className="space-y-2">
                  <Badge>Recomendado</Badge>
                  <Button variant="outline" size="sm" className="w-full">
                    <a className="font-bold" href="/dashboard/searchJobs">
                      Ver vagas
                    </a>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            "Nenhuma vaga Recomendada"
          )}
        </div>
      </CardContent>
    </Card>
  );
}
