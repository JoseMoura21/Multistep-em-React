//Este componente exibirá o formulário de dados do cliente

import React, { type ChangeEvent } from 'react';
import type { StepProps } from './types';

const Step2: React.FC<StepProps> = ({ next, prev, customerData, setCustomerData }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerData(prevData => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return customerData.name.trim() !== '' && customerData.address.trim() !== '' && customerData.phone.trim() !== '';
  };

  return (
    <div>
      <h2>Dados do Cliente</h2>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Morada:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={customerData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Telefone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
        />
      </div>
      <button onClick={prev}>Anterior</button>
      <button onClick={next} disabled={!isFormValid()}>Seguinte</button>
      {!isFormValid() && <p style={{ color: 'red' }}>Por favor, preencha todos os campos.</p>}
    </div>
  );
};

export default Step2;