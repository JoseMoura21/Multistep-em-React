//Este componente irá controlar os steps e passar as props necessárias

import React, { useState } from 'react';
import useMultiStep from '../../hooks/useMultiStep';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import type { MultiStepFormProps, CartItem, CustomerData, Product } from './types';
import { getProducts } from '../../services/api';
import { useEffect } from 'react';

const steps = [
  { id: 1, name: 'Produtos' },
  { id: 2, name: 'Dados Cliente' },
  { id: 3, name: 'Resumo' },
];

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit }) => {
  const { currentStep, next, prev, goTo, totalSteps, isFirstStep, isLastStep } = useMultiStep(steps.length);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({ name: '', address: '', phone: '' });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStepsNavigation = () => (
    <div>
      {steps.map(step => (
        <button
          key={step.id}
          onClick={() => goTo(step.id)}
          style={{ fontWeight: currentStep === step.id ? 'bold' : 'normal' }}
        >
          {step.name}
        </button>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            next={next}
            cartItems={cartItems}
            setCartItems={setCartItems}
            products={products}
            setProducts={setProducts}
            loading={loading}
            error={error}
            currentStep={currentStep}
            totalSteps={totalSteps}
            prev={prev}
            goTo={goTo}
            customerData={customerData}
            setCustomerData={setCustomerData}
            onSubmit={onSubmit}
          />
        );
      case 2:
        return (
          <Step2
            next={next}
            prev={prev}
            cartItems={cartItems}
            setCartItems={setCartItems}
            customerData={customerData}
            setCustomerData={setCustomerData}
            products={products}
            setProducts={setProducts}
            loading={loading}
            error={error}
            currentStep={currentStep}
            totalSteps={totalSteps}
            goTo={goTo}
            onSubmit={onSubmit}
          />
        );
      case 3:
        return (
          <Step3
            next={next}
            prev={prev}
            cartItems={cartItems}
            customerData={customerData}
            onSubmit={onSubmit}
            currentStep={currentStep}
            totalSteps={totalSteps}
            products={products}
            setProducts={setProducts}
            loading={loading}
            error={error}
            goTo={goTo}
            setCartItems={setCartItems}
            setCustomerData={setCustomerData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {renderStepsNavigation()}
      {renderStep()}
      {!isFirstStep && currentStep !== totalSteps && <button onClick={prev}>Anterior</button>}
      {currentStep !== totalSteps && cartItems.length > 0 && <button onClick={next}>Seguinte</button>}
      {isLastStep && <button onClick={() => onSubmit(cartItems, customerData)}>Submeter</button>}
      {currentStep === 1 && cartItems.length === 0 && <p>Selecione pelo menos um produto para continuar.</p>}
    </div>
  );
};

export default MultiStepForm;