import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, TrendingUp, Shield } from "lucide-react";
import { mockProducts, mockEmployees } from "@/data/mockData";

const Dashboard = () => {
  const totalProducts = mockProducts.reduce((sum, p) => sum + p.quantity, 0);
  const totalValue = mockProducts.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  
  const stats = [
    {
      title: "Total de Produtos",
      value: totalProducts.toString(),
      description: `${mockProducts.length} produtos cadastrados`,
      icon: Package,
      gradient: "from-primary to-accent",
    },
    {
      title: "Valor em Estoque",
      value: `R$ ${totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      description: "Valor total do inventário",
      icon: TrendingUp,
      gradient: "from-accent to-primary",
    },
    {
      title: "Funcionários Ativos",
      value: mockEmployees.length.toString(),
      description: "Equipe cadastrada",
      icon: Users,
      gradient: "from-primary to-secondary",
    },
  ];

  const features = [
    {
      title: "Gerenciamento Completo",
      description: "Controle total sobre seu estoque com sistema intuitivo de cadastro, edição e exclusão de produtos.",
      icon: Package,
    },
    {
      title: "Busca Avançada",
      description: "Encontre produtos rapidamente usando filtros por nome, categoria, cor, tamanho e fornecedor.",
      icon: Shield,
    },
    {
      title: "Equipe Integrada",
      description: "Visualize todos os funcionários cadastrados e acompanhe quem registrou cada produto no sistema.",
      icon: Users,
    },
    {
      title: "Controle em Tempo Real",
      description: "Monitore quantidades, valores e movimentações do estoque com informações sempre atualizadas.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-border bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-3">
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-lg w-fit mb-2`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg text-foreground">{stat.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{stat.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recursos do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-border bg-card">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="shadow-[var(--shadow-card)] border-border bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Bem-vindo ao EstoqueSpy</CardTitle>
          <CardDescription className="text-base text-muted-foreground leading-relaxed mt-2">
            O EstoqueSpy é seu aliado completo no gerenciamento de estoque para moda e vestuário. 
            Com ele, você tem controle total sobre produtos, funcionários e movimentações, garantindo 
            eficiência e organização para o seu negócio. Navegue pelos menus acima para começar a gerenciar 
            seu estoque de forma profissional.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
