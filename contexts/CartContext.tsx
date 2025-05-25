"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define types
export interface CartItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Create context
interface CartContextProps {
  cart: CartState;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item already exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
        };
      }

      // Add new item to cart
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalItems: state.totalItems + 1,
      };
    }

    case "REMOVE_ITEM": {
      const removedItem = state.items.find((item) => item.id === action.payload);
      const removedQuantity = removedItem ? removedItem.quantity : 0;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: state.totalItems - removedQuantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
          totalItems: state.totalItems - (state.items.find(item => item.id === id)?.quantity || 0),
        };
      }

      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          const quantityDifference = quantity - item.quantity;
          return { ...item, quantity };
        }
        return item;
      });

      const newTotalItems = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems: newTotalItems,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load cart from localStorage on initial render
  const [persistedState, setPersistedState] = React.useState<CartState | null>(null);
  
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setPersistedState(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setPersistedState(initialState);
      }
    } else {
      setPersistedState(initialState);
    }
  }, []);

  const [cart, dispatch] = useReducer(
    cartReducer, 
    persistedState || initialState
  );

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (persistedState !== null) { // Only save after initial load
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, persistedState]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {persistedState === null ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-pulse text-primary">در حال بارگذاری...</div>
        </div>
      ) : (
        children
      )}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
