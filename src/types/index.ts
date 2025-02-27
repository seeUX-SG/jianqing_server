// 商品分类枚举
export enum ProductCategory {
  DIGITAL = '3C数码',
  HOME = '居家优品',
  GROCERY = '百货生鲜',
  FASHION = '时尚达人',
  IMPORTED = '进口好物',
  TOYS = '玩具天地'
}

// 商品接口
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: ProductCategory;
}

// 用户接口
export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}

// 购物车项目接口
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

// 订单接口
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}

// 订单项目接口
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}