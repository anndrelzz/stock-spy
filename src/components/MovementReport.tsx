import { useState } from "react";
import { mockMovements } from "@/data/mockData";
import { ProductMovement } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

const MovementReport = () => {
  const [movements] = useState<ProductMovement[]>(mockMovements);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovements = movements.filter(
    (movement) =>
      movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.date.includes(searchTerm)
  );

  const totalEntradas = movements
    .filter((m) => m.type === "entrada")
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalSaidas = movements
    .filter((m) => m.type === "saida")
    .reduce((sum, m) => sum + m.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Relatório de Movimentações</h1>
        <p className="text-muted-foreground">
          Acompanhe todas as entradas e saídas de produtos do estoque
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntradas}</div>
            <p className="text-xs text-muted-foreground">unidades adicionadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSaidas}</div>
            <p className="text-xs text-muted-foreground">unidades removidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntradas - totalSaidas}</div>
            <p className="text-xs text-muted-foreground">diferença líquida</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Movimentações</CardTitle>
          <CardDescription>Lista completa de entradas e saídas de produtos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto, responsável ou data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Responsável</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Nenhuma movimentação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.productName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={movement.type === "entrada" ? "default" : "secondary"}
                          className={
                            movement.type === "entrada"
                              ? "bg-success/10 text-success hover:bg-success/20"
                              : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                          }
                        >
                          {movement.type === "entrada" ? "Entrada" : "Saída"}
                        </Badge>
                      </TableCell>
                      <TableCell>{movement.quantity}</TableCell>
                      <TableCell>
                        {new Date(movement.date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>{movement.time}</TableCell>
                      <TableCell>{movement.responsible}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementReport;
