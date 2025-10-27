import { useState, useEffect } from "react";
import { Product } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockEmployees } from "@/data/mockData";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product | Omit<Product, "id">) => void;
  product?: Product;
}

const ProductForm = ({ isOpen, onClose, onSubmit, product }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    size: "",
    color: "",
    quantity: "",
    price: "",
    supplier: "",
    registeredBy: mockEmployees[0].name,
    registeredAt: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        size: product.size,
        color: product.color,
        quantity: product.quantity.toString(),
        price: product.price.toString(),
        supplier: product.supplier,
        registeredBy: product.registeredBy,
        registeredAt: product.registeredAt,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        size: "",
        color: "",
        quantity: "",
        price: "",
        supplier: "",
        registeredBy: mockEmployees[0].name,
        registeredAt: new Date().toISOString().split("T")[0],
      });
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...(product && { id: product.id }),
      name: formData.name,
      category: formData.category,
      size: formData.size,
      color: formData.color,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      supplier: formData.supplier,
      registeredBy: formData.registeredBy,
      registeredAt: formData.registeredAt,
    };
    onSubmit(productData as Product);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            {product ? "Editar Produto" : "Cadastrar Novo Produto"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {product
              ? "Atualize as informações do produto abaixo"
              : "Preencha os dados do novo produto para adicioná-lo ao estoque"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Ex: Camiseta Básica"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="Ex: Camisetas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Tamanho</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
                placeholder="Ex: M, 38, P"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Cor</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                required
                placeholder="Ex: Azul"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                placeholder="Ex: 100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="Ex: 29.90"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                required
                placeholder="Ex: Confecções Lima"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registeredBy">Cadastrado por</Label>
              <select
                id="registeredBy"
                value={formData.registeredBy}
                onChange={(e) => setFormData({ ...formData, registeredBy: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                {mockEmployees.map((employee) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {product ? "Atualizar Produto" : "Cadastrar Produto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
