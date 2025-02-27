import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative pb-[100%] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">¥{product.price.toFixed(2)}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product.id);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? '加入购物车' : '暂时缺货'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;