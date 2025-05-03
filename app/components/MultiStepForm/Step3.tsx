//Este componente exibirá o resumo do carrinho e os dados do cliente

import React from 'react';
import { type StepProps } from './types';

const Step3: React.FC<StepProps> = ({ prev, cartItems, customerData, onSubmit }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Resumo do Carrinho</h2>
      <h3>Dados do Cliente:</h3>
      <p>Nome: {customerData.name}</p>
      <p>Morada: {customerData.address}</p>
      <p>Telefone: {customerData.phone}</p>

      <h3>Produtos Selecionados:</h3>
      {cartItems.length === 0 ? (
        <p>Nenhum produto selecionado.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.product.title} - Quantidade: {item.quantity} - Preço Unitário: ${item.product.price} - Total: ${(item.product.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      <h3>Preço Total: ${calculateTotal()}</h3>

      <button onClick={prev}>Anterior</button>
      <button onClick={() => onSubmit(cartItems, customerData)}>Submeter</button>
    </div>
  );
};

export default Step3;
