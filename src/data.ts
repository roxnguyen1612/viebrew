import { Product, SavedAddress } from './types';
import naudaImg from './assets/naudaImg.jpg';
import dendaImg from './assets/dendaImg.jpg';
import bacxiuImg from './assets/bacxiuImg.jpg';
import cfmuoiImg from './assets/cfmuoiImg.jpg';
import cfduaImg from './assets/cfduaImg.jpg';
import setImg from './assets/setImg.png';



export const CATEGORIES = ['All Coffee', 'Iced Coffee', 'Hot Brew', 'Non-Caffeine', 'Pastries'];

export const PRODUCTS: Product[] = [
  {
    id: 'nau-da',
    name: 'Nâu Đá',
    sub: 'Brown',
    description: '',
    price: 6,
    image: naudaImg,
    category: 'All Coffee',
    tag: 'Hot',
    calories: '140 kcal',
    quality: 'Ceremonial',
    isBestseller: true
  },
  {
    id: 'den-da',
    name: 'Đen Đá',
    sub: 'Black',
    description: '',
    price: 5.5,
    image: dendaImg,
    category: 'Iced Coffee',
    tag: 'Iced',
    calories: '220 kcal',
    quality: 'Premium Blend'
  },
  {
    id: 'bac-xiu',
    name: 'Bạc Xỉu',
    sub: '---',
    description: '',
    price: 6.5,
    image: bacxiuImg,
    category: 'Hot',
    tag: 'Hot',
    calories: '5 kcal',
    quality: 'Signature Roast'
  },
  {
    id: 'cf-muoi',
    name: 'Cà phê muối',
    sub: '---',
    description: '',
    price: 6.5,
    image: cfmuoiImg,
    category: 'Hot Brew',
    tag: 'Hot',
    calories: '120 kcal',
    quality: 'Velvety Foam'
  },
  {
    id: 'cf-dua',
    name: 'Cà phê sữa dừa',
    sub: '---',
    description: '',
    price: 6.5,
    image: cfduaImg,
    category: 'Non-Caffeine',
    tag: 'Hot',
    calories: '0 kcal',
    quality: 'Organic Leaves'
  },
  {
    id: 'set',
    name: 'Vietnamese Coffee Set',
    sub: 'hmm',
    description: '',
    price: 30,
    image: setImg,
    category: 'Pastries',
    tag: 'Hot',
    calories: '280 kcal',
    quality: 'Baked Daily'
  }
];

export const SAVED_ADDRESSES: SavedAddress[] = [
  {
    label: 'Home',
    address: '123 Willow Lane, Spring Valley'
  },
  {
    label: 'Work',
    address: '456 Business Ave, Suite 200'
  }
];