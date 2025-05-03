import React from 'react';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import type { CartItem, CustomerData } from './components/MultiStepForm/types';

const App: React.FC = () => {
  const handleFormSubmit = (cartItems: CartItem[], customerData: CustomerData) => {
    console.log('Carrinho de Compras:', cartItems);
    console.log('Dados do Cliente:', customerData);
    alert('Pedido Submetido com Sucesso!');
  };

  return (
    <div className="App">
      <MultiStepForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;