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
          {limited && limited.length > 0 ?(
            limited.map((search, index) => (
            <div key={index}>
              <ul className="flex flex-1 gap-24 justify-between">
                <div className="flex flex-col gap-2">
                  <li className="font-bold text-sm">{search.title}</li>
                  <li>{search.company}</li>
                </div>
                <Button
                  key={search.id}
                  variant="outline"
                  size="sm"
                  className="font-bold w-2/6"
                >
                  Ver vaga
                </Button>
              </ul>
              <hr className="mt-4" />
            </div>
          ))): 'Carregando informações...'}
        </div>
      </CardContent>
    </Card>
  );
}
