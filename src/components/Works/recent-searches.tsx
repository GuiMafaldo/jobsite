import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export default function RecentSearches() {

  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);
  const limited = savedJobs.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {limited && limited.length > 0 ? (
            limited.map((job, index) => (
              <div key={index}>
                <ul key={job.id}>
                  <li>{job.title}</li>
                  <li>{job.company}</li>
                </ul>
              <Button
              variant="outline"
              size="sm"
              className="font-bold w-2/6"
              >
                  Ver vaga
                </Button>
              </div>
            ))):'Nenhuma Pesquisa recente'}
        </div>
      </CardContent>
    </Card>
  );
}
