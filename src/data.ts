import { Product, SavedAddress } from './types';

export const CATEGORIES = ['All Coffee', 'Iced Coffee', 'Hot Brew', 'Non-Caffeine', 'Pastries'];

export const PRODUCTS: Product[] = [
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    sub: 'Daily Special',
    description: 'Our signature ceremonial grade matcha whisked with creamy steamed oat milk.',
    price: 5.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJxQigF58_YIhjV7d0kaINP7ryhWRlwIwU2E3CfEzgAoHL8R9adrTzEFqmAYqtTOeS057j6iMsEOR7vyptwa3x5yPJjupvhFgrW8D5jGQatD8WCZH6Heh5FvTokrwOF8kBNAeTAVemODIsJvtZzDW4Ilrbbvz-FKf2fzqfQuD1XDmKYl1OwbBN7M2OtcTHSkjxhyXBzlqlVM00qsU_znHxm1yze2t7bn4L6625CdGn9dkOlZ7He3uuPt3RMoOzVtx2I39aYlMShA',
    category: 'All Coffee',
    tag: 'Hot',
    calories: '140 kcal',
    quality: 'Ceremonial',
    isBestseller: true
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    sub: 'House Favorite',
    description: 'Layers of rich espresso, creamy milk, and decadent golden caramel drizzle.',
    price: 4.75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3LDS9ffRhRpn1KDRMZYZ4UhFFYbIFig8at6Ti61bpaE2476Oo6ky0xEFW7zvkpetqF7t8WqaRBMFumTqgiA9-gfv0oHgJIaOHR-s7a2SHdU0p8ubUk6hXEkuC4-AwCjLLhGFyoN0M0n_5DAUyHc-NwVih1jYR8xLP_r2HygZRKaCT6Gj3kqyXscPVGNN3gn-UTxiwdrPWdC7mPwujgGU11vRr7IX0_iBnlR06LJWR5PZmILb1fdfOEKTZlT5pSIhTiURPFmAoqg',
    category: 'Iced Coffee',
    tag: 'Iced',
    calories: '220 kcal',
    quality: 'Premium Blend'
  },
  {
    id: 'espresso',
    name: 'Espresso',
    sub: 'Pure Shot',
    description: 'Pure, bold energy. Complex, full-bodied espresso pulled with a sweet crema layer.',
    price: 3.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFnV36XFff7KLpNSTTi5Q0XfjW2YbsxH75FGDkq92QBlM3g6xmqpC34nTx4S19z8e9rm8WkBG_kWMGNuN0VJ-qH6jDR7ELLsH4ID3Dl_N7X1EQyMnr12-vB67P3FLyP5O9vvKRRPM5m3LV1rwadG7qEvc3Pf8MmyXqV_tcEIoXTK4YbqQ1jyQ04CuqxECXkxEEEWDmpk-jJKszpWGnGu4Gfj9FiJW_sffV9WdgNnpnLQqlPJQNKHPzzEPxr5FLGEymOXSx_fyQmA',
    category: 'Hot Brew',
    tag: 'Hot',
    calories: '5 kcal',
    quality: 'Signature Roast'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    sub: 'Classic Froth',
    description: 'Perfect balance of rich espresso, velvety steamed milk, and beautiful airy foam.',
    price: 4.25,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC38hj7I9NKQ4VkRz9y_SI6as4o-faWEiJQ6jXa5EcdfHawuIkjwHpx5W6PvIaqP1pFIf3OsEk67Nh5lLhDHt9b5-yG3_UtwETxeDs_BY7n566gkD1iPvp3rp25tUdX_pNOt5PvTJ5wRtbtsqsfM8-Cb5o-HWHWW8YLY8_hE0NHVPC6ol54XrlJeiYD2paDRD_xIxDodMksRcZ4ENLT5DG19qgpwr2kFLGKk4ReSv_7HdBvHiilCego0Vh2YJWM08GGmOf_LPGKCQ',
    category: 'Hot Brew',
    tag: 'Hot',
    calories: '120 kcal',
    quality: 'Velvety Foam'
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Smash Toast',
    sub: 'Bestselling Grub',
    description: 'Gourmet sliced avocado spread over warm toasted organic sourdough bread, topped with vibrant microgreens, lemon zest, and red chili flakes.',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaGdUIHuUQxMkU0zbpZyrvKD_Nk7bmXmne-k1ofoUmFiqYB4NOSJT3H9MNeVvtqUJMW2mhcR_vlbRaHDZJ0YQDpNMURNLH0Z9rV0ZYyEs_WWbrTy-Od_DxM9iOJ7tr_ktPG5ugw3ZLS6YKI_mTGMmkd0i7QnhDubvo_CtuxRFwqgXtjqFio2rX8erDLK365ZOuTZFaZJnFx_vbbJa6jSdITWmJEahQVac-4X6Hw5ugjnSv1-zRAGj15xxiE4OuGsVGsqOBtv693g',
    category: 'Pastries',
    tag: 'Vegan',
    calories: '340 kcal',
    quality: 'Artisanal Sourdough'
  },
  {
    id: 'earl-grey-tea',
    name: 'Steeped Earl Grey',
    sub: 'Aroma Infusion',
    description: 'Pure bergamot organic black tea leaves steeped with care, serving notes of subtle sweetness and a touch of lavender.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    category: 'Non-Caffeine',
    tag: 'Hot',
    calories: '0 kcal',
    quality: 'Organic Leaves'
  },
  {
    id: 'chocolate-croissant',
    name: 'Chocolate Croissant',
    sub: 'Hot Pastry',
    description: 'Flaky baked croissant filled with premium melted Belgian dark chocolate chips.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
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
