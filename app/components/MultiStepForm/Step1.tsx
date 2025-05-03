
//Este componente exibirá a lista de produtos

import React, { useState, useEffect, type ChangeEvent } from 'react';
import type { StepProps, Product } from './types';

const Step1: React.FC<StepProps> = ({ next, cartItems, setCartItems, products, setProducts, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (products.length > 0) return;

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await (await fetch('https://dummyjson.com/products')).json().then(data => data.products || []);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProducts();
  }, [setProducts, products.length]);

  const handleAddToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
    if (existingItemIndex > -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar produtos: {error}</div>;
  }

  return (
    <div>
      <h2>Selecione os Produtos</h2>
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Preço: ${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && <button onClick={next}>Seguinte</button>}
      {cartItems.length === 0 && <p>Selecione pelo menos um produto para continuar.</p>}
    </div>
  );
};

export default Step1;