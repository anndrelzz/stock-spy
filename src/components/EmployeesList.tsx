import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockEmployees } from "@/data/mockData";
import { User, Mail, Calendar } from "lucide-react";

const EmployeesList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Funcionários Cadastrados</h2>
        <p className="text-muted-foreground">Visualize todos os membros da equipe de estoque</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockEmployees.map((employee) => (
          <Card key={employee.id} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-full">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{employee.name}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      <Badge variant="secondary" className="mt-1">
                        {employee.role}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Cadastrado em: {new Date(employee.registeredAt).toLocaleDateString("pt-BR")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
