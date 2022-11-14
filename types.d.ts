export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
    title: string;
    hasPrime: boolean;
    quantity: number;
}

export interface Order {
    id: string;
    amount: number;
    images: string[];
    shippingAmount: number;
    timestamp: number;
    items: Stripe.LineItem[];
}
