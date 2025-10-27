import { Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage: "dashboard" | "products" | "employees";
  onNavigate: (page: "dashboard" | "products" | "employees") => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  return (
    <header className="bg-card shadow-[var(--shadow-soft)] border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-md">
              <Package className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">EstoqueSpy</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gerenciamento</p>
            </div>
          </div>
          
          <nav className="flex gap-2">
            <Button
              variant={currentPage === "dashboard" ? "default" : "ghost"}
              onClick={() => onNavigate("dashboard")}
              className="transition-all"
            >
              Dashboard
            </Button>
            <Button
              variant={currentPage === "products" ? "default" : "ghost"}
              onClick={() => onNavigate("products")}
              className="transition-all"
            >
              <Package className="h-4 w-4 mr-2" />
              Produtos
            </Button>
            <Button
              variant={currentPage === "employees" ? "default" : "ghost"}
              onClick={() => onNavigate("employees")}
              className="transition-all"
            >
              <Users className="h-4 w-4 mr-2" />
              Funcionários
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
