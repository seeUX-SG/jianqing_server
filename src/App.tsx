import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import ProductList from './components/ProductList'
import AuthForms from './components/AuthForms'
import Cart from './components/Cart'
import ProductDetail from './components/ProductDetail'
import { User, CartItem, Product } from './types'
import { mockProducts, users } from './data/users';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
    } else {
      alert('邮箱或密码错误');
    }
  };

  const handleRegister = (username: string, email: string, password: string) => {
    // 验证输入
    if (!username || !email || !password) {
      alert('请填写所有必填项');
      return;
    }
  
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('请输入有效的邮箱地址');
      return;
    }
  
    // 检查邮箱是否已被使用
    if (users.some(u => u.email === email)) {
      alert('该邮箱已被注册');
      return;
    }
  
    // 创建新用户
    const newUser: User = {
      id: (users.length + 1).toString(),
      username,
      email,
      password // 注意：实际项目中应该对密码进行加密
    };
  
    // 添加到用户列表
    users.push(newUser);
  
    // 自动登录
    setUser(newUser);
    alert('注册成功！');
  };

  const handleAddToCart = (productId: string) => {
    const existingItem = cartItems.find(item => item.productId === productId);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: Date.now().toString(),
        productId,
        quantity: 1
      }]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">seeUX</h1>
            {user ? (
              <button
                onClick={() => setUser(null)}
                className="text-blue-500 hover:text-blue-600"
              >
                退出登录
              </button>
            ) : null}
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {!user ? (
            <AuthForms onLogin={handleLogin} onRegister={handleRegister} />
          ) : (
            <Routes>
              <Route path="/" element={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <ProductList onAddToCart={handleAddToCart} />
                  </div>
                  <div>
                    <Cart
                      items={cartItems}
                      products={products}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  </div>
                </div>
              } />
              <Route path="/product/:id" element={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <ProductDetail
                      product={products.find(p => p.id === window.location.pathname.split('/').pop()) || products[0]}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                  <div>
                    <Cart
                      items={cartItems}
                      products={products}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                    />
                  </div>
                </div>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  )
}

export default App
