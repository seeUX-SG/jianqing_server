import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <motion.div
        className="bg-white border rounded-xl overflow-hidden shadow-sm"
        whileHover={{ 
          scale: 1.02,
          y: -5,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        <div className="relative pb-[100%] overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">¥{product.price.toFixed(2)}</span>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product.id);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={product.stock <= 0}
              whileHover={{ backgroundColor: '#2563eb' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {product.stock > 0 ? '加入购物车' : '暂时缺货'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;