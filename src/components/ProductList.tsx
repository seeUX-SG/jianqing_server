import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product, ProductCategory } from '../types';
import { mockProducts } from '../data/users';


interface ProductListProps {
  onAddToCart?: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    // 模拟从服务器获取数据
    setProducts(mockProducts);
  }, []);

  const handleAddToCart = (productId: string) => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-3 rounded-full transition-colors ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          全部
        </button>
        {Object.values(ProductCategory).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full transition-colors ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-10">
        <input
          type="text"
          placeholder="搜索商品..."
          className="w-full max-w-lg px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;