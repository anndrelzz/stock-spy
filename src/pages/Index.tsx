import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ProductsList from "@/components/ProductsList";
import EmployeesList from "@/components/EmployeesList";
import MovementReport from "@/components/MovementReport";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "products" | "employees" | "movements">("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "products" && <ProductsList />}
        {currentPage === "movements" && <MovementReport />}
        {currentPage === "employees" && <EmployeesList />}
      </main>

      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 EstoqueSpy - Sistema de Gerenciamento de Estoque</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
