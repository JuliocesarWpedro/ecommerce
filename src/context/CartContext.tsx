'use client';

import CartItem from '@/components/CartItem';
import { CartValue } from '@/types/cart';
import { ProductDataType } from '@/types/productsFetchResponse';
import FormatPrice from '@/utilities/FormatPrice';
import React from 'react';

interface CartContextProps {
  cartItems: CartValue[];
  setCartItems: React.Dispatch<React.SetStateAction<CartValue[]>>;
  updateLocalStorage: (newValue: CartValue[]) => void;
  handleUpdateQuantity: (id: number, quantity: number) => void;
  handleDeleteItem: (id: number) => void;
  totalPrice: (value: CartValue[]) => number;
  freightPrice: number;
  totalPriceWithfreight: string;
  totalItems: number;
  handleAddToCart: (product: ProductDataType) => void;
}

export const CartContext = React.createContext<CartContextProps | undefined>(
  undefined,
);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = React.useState<CartValue[]>([]);
  const [totalItems, setTotalItems] = React.useState<number>(
    cartItems.length || 0,
  );

  React.useEffect(() => {
    const storedCart = localStorage.getItem('cart-items');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setTotalItems(parsedCart.length);
    }
  }, []);

  React.useEffect(() => {
    setTotalItems(cartItems.length);
  }, [cartItems]);

  const updateLocalStorage = (newValue: CartValue[]) => {
    setCartItems(newValue);
    localStorage.setItem('cart-items', JSON.stringify(newValue));
  };

  const handleAddToCart = (product: ProductDataType) => {
    const idProduct = Number(product.id);

    let cartItems = localStorage.getItem('cart-items');
    if (cartItems) {
      let cartItemsArray = JSON.parse(cartItems);
      let existingProduct = cartItemsArray.find(
        (item: { id: number }) => item.id === idProduct,
      );
      if (existingProduct) {
        if (existingProduct.quantity < 5) {
          existingProduct.quantity += 1;
        }
      } else {
        cartItemsArray.push({ ...product, quantity: 1, id: idProduct });
      }

      updateLocalStorage(cartItemsArray);
    } else {
      const newCart = [{ ...product, quantity: 1 }];
      updateLocalStorage(newCart);
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    const newValue = cartItems.map((item) => {
      if (item.id !== id) return item;
      else {
        return { ...item, quantity: quantity };
      }
    });
    updateLocalStorage(newValue);
  };

  const handleDeleteItem = (id: number) => {
    const newValue = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(newValue);
  };

  React.useEffect(() => {
    setTotalItems(cartItems.length);
  }, [cartItems]);

  const totalPrice = (value: CartValue[]) => {
    return value.reduce((sum, item) => (sum += item.price * item.quantity), 0);
  };

  let freightPrice = 40;

  if (totalPrice(cartItems) >= 500) {
    freightPrice = 0;
  }
  const totalPriceWithfreight = FormatPrice(
    String(totalPrice(cartItems) + freightPrice),
  );

  const context = {
    cartItems,
    handleUpdateQuantity,
    handleDeleteItem,
    totalPriceWithfreight,
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        updateLocalStorage,
        handleUpdateQuantity,
        handleDeleteItem,
        totalPrice,
        freightPrice,
        totalPriceWithfreight,
        totalItems,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
}
