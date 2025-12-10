import { useState, useEffect } from "react";
import { ProductMovement } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const MovementReport = () => {
  const [movements, setMovements] = useState<ProductMovement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar dados reais
  const fetchMovements = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/movements");
      if (!response.ok) throw new Error("Erro ao buscar dados");
      const data = await response.json();
      
      // Inverte a ordem para mostrar o mais recente primeiro
      setMovements([...data].reverse());
      setIsLoading(false);
    } catch (error) {
      console.error("Erro:", error);
      // Não mostramos toast de erro no loop para não inundar a tela
    }
  };

  useEffect(() => {
    fetchMovements();
    // Atualiza automaticamente a cada 3 segundos para ver as tags passando
    const interval = setInterval(fetchMovements, 3000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Relatório de Movimentações</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Acompanhe as leituras do RFID e ajustes manuais
            {!isLoading && <span className="text-green-500 text-xs animate-pulse">● Ao vivo</span>}
          </p>
        </div>
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
            <CardTitle className="text-sm font-medium">Total de Saídas (RFID)</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSaidas}</div>
            <p className="text-xs text-muted-foreground">unidades removidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo do Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntradas - totalSaidas}</div>
            <p className="text-xs text-muted-foreground">movimentação líquida</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico Recente</CardTitle>
          <CardDescription>
            Registros vindos do Leitor ESP32 e do Sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto, leitor ou data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border max-h-[500px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto / Tag</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Origem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                      {isLoading ? "Carregando dados..." : "Nenhuma movimentação registrada ainda."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovements.map((movement, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {movement.productName}
                        {movement.productName === "TAG DESCONHECIDA" && (
                           <span className="ml-2 text-xs text-red-400">(Não cadastrado)</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={movement.type === "entrada" ? "default" : "secondary"}
                          className={
                            movement.type === "entrada"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {movement.type === "entrada" ? "Entrada" : "Saída"}
                        </Badge>
                      </TableCell>
                      <TableCell>{movement.quantity}</TableCell>
                      <TableCell>
                        {movement.date}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{movement.time}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {movement.responsible}
                      </TableCell>
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