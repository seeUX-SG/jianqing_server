import { User, Product, ProductCategory } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '益智拼图玩具',
    description: '1000片精美拼图，培养专注力和耐心',
    price: 129.99,
    image: 'https://picsum.photos/400/300?random=1',
    stock: 20,
    category: ProductCategory.TOYS
  },
  {
    id: '2',
    name: '休闲运动鞋',
    description: '轻便舒适，适合日常运动和休闲穿着',
    price: 399.99,
    image: 'https://picsum.photos/400/300?random=2',
    stock: 15,
    category: ProductCategory.FASHION
  },
  {
    id: '3',
    name: '真皮手提包',
    description: '高品质真皮制作，经典设计，实用美观',
    price: 599.99,
    image: 'https://picsum.photos/400/300?random=3',
    stock: 5,
    category: ProductCategory.FASHION
  },
  {
    id: '4',
    name: '智能手表',
    description: '多功能运动监测，支持消息提醒',
    price: 899.99,
    image: 'https://picsum.photos/400/300?random=4',
    stock: 8,
    category: ProductCategory.DIGITAL
  },
  {
    id: '5',
    name: '智能音箱',
    description: '高品质音响效果，支持智能语音控制',
    price: 599.99,
    image: 'https://picsum.photos/400/300?random=5',
    stock: 12,
    category: ProductCategory.DIGITAL
  },
  {
    id: '6',
    name: '多功能料理机',
    description: '强劲动力，多种功能，轻松制作美食',
    price: 899.99,
    image: 'https://picsum.photos/400/300?random=6',
    stock: 7,
    category: ProductCategory.HOME
  },
  {
    id: '7',
    name: '进口零食大礼包',
    description: '精选全球美食，多种口味',
    price: 199.99,
    image: 'https://picsum.photos/400/300?random=7',
    stock: 20,
    category: ProductCategory.IMPORTED
  },
  {
    id: '8',
    name: '新鲜水果礼盒',
    description: '时令水果，新鲜直达',
    price: 299.99,
    image: 'https://picsum.photos/400/300?random=8',
    stock: 15,
    category: ProductCategory.GROCERY
  },
  {
    id: '9',
    name: '积木拼装玩具',
    description: '多样化的积木套装，激发创造力',
    price: 199.99,
    image: 'https://picsum.photos/400/300?random=9',
    stock: 25,
    category: ProductCategory.TOYS
  },
  {
    id: '10',
    name: '遥控赛车',
    description: '高速遥控赛车，带来刺激的竞速体验',
    price: 259.99,
    image: 'https://picsum.photos/400/300?random=10',
    stock: 15,
    category: ProductCategory.TOYS
  }
];

export const users: User[] = [
  {
    id: '1',
    username: '测试用户',
    email: 'test@example.com',
    password: '123456' // 在实际项目中应该使用加密存储密码
  }
];