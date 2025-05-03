export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CustomerData {
    name: string;
    address: string;
    phone: string;
}

export interface MultiStepFormProps {
    onSubmit: (cartItems: CartItem[], customerData: CustomerData) => void;
}

export interface StepProps {
    next: () => void;
    prev: () => void;
    goTo: (step: number) => void;
    currentStep: number;
    totalSteps: number;
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    customerData: CustomerData;
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    loading: boolean;
    error: string | null;
    onSubmit: (cartItems: CartItem[], customerData: CustomerData) => void;
}