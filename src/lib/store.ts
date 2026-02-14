import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: number;
    nombre: string;
    precio: number;
    imagen_url: string;
    stock: number;
    // Phase 2: Dynamic Labels & Filters
    is_new?: boolean;
    is_best_seller?: boolean;
    discount_price?: number;
    discount_end_date?: string;
    color?: string;
    type?: string;
}

export interface CartItem extends Product {
    cantidad: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, cantidad: item.cantidad + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...product, cantidad: quantity }] });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.precio * item.cantidad,
                    0
                );
            },
        }),
        {
            name: 'shopping-cart',
        }
    )
);
