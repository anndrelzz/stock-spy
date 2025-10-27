import { useState } from "react";
import { Product } from "@/types";
import { mockProducts as initialProducts } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Package } from "lucide-react";
import ProductForm from "./ProductForm";
import { toast } from "sonner";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([newProduct, ...products]);
    setIsFormOpen(false);
    toast.success("Produto cadastrado com sucesso!");
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setIsFormOpen(false);
    setEditingProduct(undefined);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Produto excluído com sucesso!");
  };

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
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Gerenciamento de Produtos</h2>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="shadow-md">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Search */}
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

      {/* Products Grid */}
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
                  <p className="font-medium text-foreground">{product.quantity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Preço:</span>
                  <p className="font-medium text-foreground">R$ {product.price.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fornecedor:</span>
                  <p className="font-medium text-foreground truncate">{product.supplier}</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Cadastrado por {product.registeredBy} em{" "}
                  {new Date(product.registeredAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditForm(product)}
                >
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="shadow-[var(--shadow-card)] border-border bg-card">
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-1">Nenhum produto encontrado</p>
            <p className="text-muted-foreground">Tente buscar com outros termos ou cadastre um novo produto</p>
          </CardContent>
        </Card>
      )}

      {/* Product Form Dialog */}
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
