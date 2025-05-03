

import MultiStepForm from "../components/MultiStepForm/MultiStepForm";
import type { CartItem, CustomerData } from "../components/MultiStepForm/types";

export function meta() {
  return [{ title: "Carrinho de Compras" }];
}

export default function Checkout() {
  const handleSubmit = (cartItems: CartItem[], customerData: CustomerData) => {
    console.log("Carrinho de Compras:", cartItems);
    console.log("Dados do Cliente:", customerData);
    alert("Pedido Submetido com Sucesso!");
    // Falta lógica para renviar os dados do pedido para o seu backend ou para outro serviço.
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
      <MultiStepForm onSubmit={handleSubmit} />
    </div>
  );
}