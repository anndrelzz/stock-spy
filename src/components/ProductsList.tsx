import { useState, useEffect } from "react";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Package } from "lucide-react";
import ProductForm from "./ProductForm";
import { toast } from "sonner";

const API_URL = "http://localhost:3001/api/products";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // --- BUSCAR PRODUTOS (GET) ---
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 2000); // Atualiza a cada 2s
    return () => clearInterval(interval);
  }, []);

  // --- CRIAR PRODUTO (POST) ---
  const handleAddProduct = async (product: Omit<Product, "id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Falha ao criar");
      
      toast.success("Produto cadastrado com sucesso!");
      fetchProducts(); // Recarrega a lista
      setIsFormOpen(false);
    } catch (error) {
      toast.error("Erro ao cadastrar produto");
    }
  };

  // --- EDITAR PRODUTO (PUT) ---
  const handleEditProduct = async (product: Product) => {
    try {
      const response = await fetch(`${API_URL}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Falha ao editar");

      toast.success("Produto atualizado com sucesso!");
      fetchProducts();
      setIsFormOpen(false);
      setEditingProduct(undefined);
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  };

  // --- EXCLUIR PRODUTO (DELETE) ---
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem a certeza que deseja excluir este produto?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Falha ao excluir");

      toast.success("Produto excluído com sucesso!");
      fetchProducts();
    } catch (error) {
      toast.error("Erro ao excluir produto");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Gerenciamento de Produtos</h2>
          <p className="text-muted-foreground">
            {isLoading ? "A carregar..." : `${filteredProducts.length} produtos encontrados`}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="shadow-md">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por nome, categoria, cor ou fornecedor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-border bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-lg">
                    <Package className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-foreground mb-2 truncate">{product.name}</CardTitle>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline">{product.size}</Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">TAG: {product.IDRFID}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Cor:</span>
                  <p className="font-medium text-foreground">{product.color}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantidade:</span>
                  <p className="font-bold text-lg text-foreground transition-all duration-300">{product.quantity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Preço:</span>
                  <p className="font-medium text-foreground">R$ {Number(product.price).toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fornecedor:</span>
                  <p className="font-medium text-foreground truncate">{product.supplier}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditForm(product)}>
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProductForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductsList;