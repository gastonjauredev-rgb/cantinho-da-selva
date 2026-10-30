
import { useEffect, useReducer } from 'react';
import { CartContext } from './CartContext.js';

// =========================================
// CONFIGURACIÓN
// =========================================

const STORAGE_KEY = 'cantinho_cart';

const initialState = {
  items: [],
};

// =========================================
// RECUPERAR CARRITO GUARDADO
// =========================================

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return initialState;
    }

    const parsedCart = JSON.parse(savedCart);

    if (!parsedCart || !Array.isArray(parsedCart.items)) {
      return initialState;
    }

    const validItems = parsedCart.items
      .filter((item) => {
        return (
          item &&
          typeof item.id === 'string' &&
          item.id.length > 0 &&
          typeof item.name === 'string' &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          Number.isInteger(item.stock) &&
          item.stock > 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
        );
      })
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        stock: item.stock,
        quantity: Math.min(item.quantity, item.stock),
      }));

    return {
      items: validItems,
    };
  } catch (error) {
    console.warn(
      'No se pudo recuperar el carrito guardado:',
      error
    );

    return initialState;
  }
}

// =========================================
// REDUCER DEL CARRITO
// =========================================

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const id = product._id || product.id;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.stock,
                    item.quantity + quantity
                  ),
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            stock: Number(product.stock),
            quantity,
          },
        ],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload
        ),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          }

          return {
            ...item,
            quantity: Math.max(
              1,
              Math.min(
                item.stock,
                action.payload.quantity
              )
            ),
          };
        }),
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// =========================================
// PROVEEDOR GLOBAL DEL CARRITO
// =========================================

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    loadCart
  );

  // =========================================
  // GUARDAR CARRITO AUTOMÁTICAMENTE
  // =========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.warn(
        'No se pudo guardar el carrito:',
        error
      );
    }
  }, [state]);

  // =========================================
  // AGREGAR PRODUCTO
  // =========================================

  function addToCart(product, quantity = 1) {
    if (!product) return;

    const id = product._id || product.id;
    const stock = Number(product.stock);
    const amount = Number(quantity);

    if (
      !id ||
      !Number.isFinite(stock) ||
      stock <= 0 ||
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        quantity: Math.min(amount, stock),
      },
    });
  }

  // =========================================
  // ELIMINAR PRODUCTO
  // =========================================

  function removeFromCart(id) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  }

  // =========================================
  // ACTUALIZAR CANTIDAD
  // =========================================

  function updateQuantity(id, quantity) {
    const amount = Number(quantity);

    if (!Number.isInteger(amount)) return;

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id,
        quantity: amount,
      },
    });
  }

  // =========================================
  // VACIAR CARRITO
  // =========================================

  function clearCart() {
    dispatch({
      type: 'CLEAR_CART',
    });
  }

  // =========================================
  // TOTALES
  // =========================================

  const cartCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = state.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
