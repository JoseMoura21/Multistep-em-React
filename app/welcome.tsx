// welcome/welcome.tsx (exemplo)

import { Link } from "react-router";

export function Welcome() {
  return (
    <div>
      <h1>Bem-vindo!</h1>
      <Link to="/checkout">Ir para o Carrinho de Compras</Link>
    </div>
  );
}