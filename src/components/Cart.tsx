import React from 'react';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
  items: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, products, onUpdateQuantity, onRemoveItem }) => {
  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = getProduct(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">购物车</h2>
      <AnimatePresence>
        {items.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-gray-500 text-center"
          >
            购物车是空的
          </motion.p>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {items.map(item => {
              const product = getProduct(item.productId);
              if (!product) return null;

              return (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">¥{product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(product.id, Math.max(0, item.quantity - 1))}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                        disabled={item.quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      删除
                    </button>
                  </div>
                </motion.div>
              );
            })}
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">总计：</span>
                <span className="text-2xl font-bold text-green-600">¥{calculateTotal().toFixed(2)}</span>
              </div>
              <button
                className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => console.log('结算')}
              >
                结算
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;