import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl font-bold text-green-600">¥{product.price}</p>
            <div className="border-t border-b py-4">
              <h2 className="text-lg font-semibold mb-2">商品描述</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                库存: <span className="font-semibold">{product.stock}</span> 件
              </p>
            </div>
            <button
              onClick={() => onAddToCart(product.id)}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? '加入购物车' : '暂时缺货'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;