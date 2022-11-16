import Stripe from "stripe";

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

export interface FromDB {
    id: number;
    image: string;
}

export interface Order {
    id: string;
    amount: number;
    fromDB: FromDB[];
    shippingAmount: number;
    timestamp: number;
    items: Stripe.LineItem[];
}
