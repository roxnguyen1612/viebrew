import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Coffee, Search, SlidersHorizontal, Heart, Plus, Minus, Trash2, 
  MapPin, Calendar, Clock, ChevronRight, ChevronDown, Settings, 
  CreditCard, Bell, LogOut, CheckCircle2, Award, ArrowLeft, 
  ShoppingBag, ShoppingCart, User, X, Star, Sparkles, Check, Download
} from 'lucide-react';
import { Product, CartItem, Screen, Customization, Order } from './types';
import { PRODUCTS, CATEGORIES, SAVED_ADDRESSES } from './data';

export default function App() {
  // Navigation & Screen States
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  
  // App Store / User Database State
  const [user, setUser] = useState({
    name: 'Alex',
    points: 120,
    maxPoints: 150,
    memberSince: '2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjGNMbsSwU52VKgfa2IfJlZVKam97vR6KdZtloTJ1Q-rSBca7hfQ-rUWvKebGty8YceupTy93H4D2IhLnyeHwbOqL_DNlpsrvqnEnmdyLG1bwmFScil0InoKu-PQeJcVrIVU0sMZRm8eF2XYV6_cG_0RcOA1K80p-UuuLtUGlqr6unx0srxGmlpLi9WzG7lQlWT-gPIFOsf9hoqJWnVb0I87aEZv3flaIzid9ACgNhQhlpN1vDsdDkt05a6XkV5fWgosCyDjMaUA'
  });

  // Prepopulate cart with items matching mockups
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0], // Matcha Latte
      quantity: 1,
      customization: { milk: 'Oat Milk', sugar: '50%', ice: 'Less Ice' }
    },
    {
      id: 'cart-2',
      product: PRODUCTS[1], // Caramel Macchiato
      quantity: 1,
      customization: { milk: 'Whole Milk', sugar: '75%', ice: 'Regular' }
    }
  ]);

  // Selected details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailCustomization, setDetailCustomization] = useState<Customization>({
    milk: 'Whole Milk',
    sugar: '50%',
    ice: 'Regular'
  });
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  
  // Address & Checkout settings
  const [selectedAddress, setSelectedAddress] = useState<string>(SAVED_ADDRESSES[0].address);
  const [isDelivery, setIsDelivery] = useState<boolean>(true);
  const [pickupStore, setPickupStore] = useState<string>('VieBrew Central • 120 Coffee Way');
  const [scheduleDate, setScheduleDate] = useState<string>('Today, Jun 09');
  const [scheduleTime, setScheduleTime] = useState<string>('ASAP (15-20 mins)');
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState<boolean>(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState<boolean>(false);
  const [hasShownWelcomePopup, setHasShownWelcomePopup] = useState<boolean>(false);

  useEffect(() => {
    if (currentScreen === 'HOME' && !hasShownWelcomePopup) {
      setIsWelcomePopupOpen(true);
      setHasShownWelcomePopup(true);
    }
  }, [currentScreen, hasShownWelcomePopup]);

  const [tempScheduleDate, setTempScheduleDate] = useState<string>('Today, Jun 09');
  const [tempScheduleTime, setTempScheduleTime] = useState<string>('ASAP (15-20 mins)');

  // Authentication Form States
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  const openSchedulingModal = () => {
    setTempScheduleDate(scheduleDate);
    setTempScheduleTime(scheduleTime);
    setIsSchedulingModalOpen(true);
  };
  
  // Active filter state
  const [activeCategory, setActiveCategory] = useState<string>('All Coffee');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Favorite items register
  const [favorites, setFavorites] = useState<string[]>(['caramel-macchiato']);

  // Order history
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'MB-810243',
      date: 'Jun 05, 2026',
      items: [
        { name: 'Steeped Earl Grey', description: 'Organic, Whole Milk', price: 3.50, quantity: 1, image: PRODUCTS[5].image }
      ],
      subtotal: 3.50,
      serviceFee: 1.20,
      total: 4.70,
      status: 'completed',
      estimatedTime: 0,
      pickupLocation: 'VieBrew Central • 120 Coffee Way',
      isDelivery: false
    }
  ]);

  // Last placed order for the success screen
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Active Screen transition notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const getFormattedDate = (day: number) => {
    if (day === 9) return 'Today, Jun 09';
    if (day === 10) return 'Tomorrow, Jun 10';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(2026, 5, day); // June 2026 (month is 0-indexed, so 5 is June)
    const dowStr = daysOfWeek[date.getDay()];
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    return `${dowStr}, Jun ${dayStr}`;
  };

  // Switch filter tabs or categories
  const filteredProducts = PRODUCTS.filter((p) => {
    // Filter by Category
    const matchesCategory = activeCategory === 'All Coffee' || p.category === activeCategory;
    // Filter by Search Match
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate Subtotals & Totals
  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const serviceFee = cart.length > 0 ? 1.20 : 0;
  const grandTotal = subtotal + serviceFee;

  // Actions
  const toggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      showToast('Removed from your favorites');
    } else {
      setFavorites([...favorites, productId]);
      showToast('Added to your favorites ❤️');
    }
  };

  const handleAddToCartDirect = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const existingIndex = cart.findIndex(item => 
      item.product.id === product.id && 
      item.customization.milk === 'Whole Milk' && 
      item.customization.sugar === '50%' && 
      item.customization.ice === 'Regular'
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, {
        id: `cart-${Date.now()}`,
        product,
        quantity: 1,
        customization: { milk: 'Whole Milk', sugar: '50%', ice: 'Regular' }
      }]);
    }
    showToast(`Added ${product.name} to your Cart! ✨`);
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailCustomization({
      milk: product.category === 'Pastries' ? 'None' : 'Whole Milk',
      sugar: product.category === 'Pastries' ? 'None' : '50%',
      ice: product.category === 'Pastries' ? 'None' : 'Regular'
    });
    setDetailQuantity(1);
    setCurrentScreen('PRODUCT_DETAIL');
  };

  const handleAddCustomizedToCart = () => {
    if (!selectedProduct) return;
    
    // Check if exactly same item with same customizations is present
    const existingIndex = cart.findIndex(item => 
      item.product.id === selectedProduct.id && 
      item.customization.milk === detailCustomization.milk &&
      item.customization.sugar === detailCustomization.sugar &&
      item.customization.ice === detailCustomization.ice
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += detailQuantity;
      setCart(updated);
    } else {
      setCart([...cart, {
        id: `cart-${Date.now()}`,
        product: selectedProduct,
        quantity: detailQuantity,
        customization: { ...detailCustomization }
      }]);
    }
    
    showToast(`Added ${detailQuantity}x ${selectedProduct.name} with custom choices!`);
    setCurrentScreen('HOME');
  };

  const updateCartQuantity = (cartItemId: string, change: number) => {
    const updated = cart.map(item => {
      if (item.id === cartItemId) {
        const nextQty = item.quantity + change;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    setCart(updated);
  };

  const deleteCartItem = (cartItemId: string) => {
    setCart(cart.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }

    const orderId = `MB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      items: cart.map(item => ({
        name: item.product.name,
        description: `${item.customization.milk !== 'None' ? item.customization.milk + ', ' : ''}${item.customization.sugar !== 'None' ? item.customization.sugar + ' Sugar, ' : ''}${item.customization.ice !== 'None' ? item.customization.ice : ''}`,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      subtotal,
      serviceFee,
      total: grandTotal,
      status: 'brewing',
      estimatedTime: isDelivery ? 20 : 8,
      pickupLocation: pickupStore,
      isDelivery,
      deliveryAddress: isDelivery ? selectedAddress : undefined
    };

    // Update loyalty points
    const earnedPoints = Math.round(subtotal * 2);
    const nextPoints = user.points + earnedPoints;
    setUser(prev => {
      const nextVal = nextPoints >= prev.maxPoints ? (nextPoints % prev.maxPoints) : nextPoints;
      return { ...prev, points: nextVal };
    });

    setLastPlacedOrder(newOrder);
    setOrders([newOrder, ...orders]);
    setCart([]); // Clear cart
    setCurrentScreen('ORDER_CONFIRMED');
    showToast('Ordering successful! Order placed with love ❤️');
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col items-center">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-50 bg-inverse-surface text-inverse-on-surface text-sm px-6 py-3 rounded-full shadow-xl flex items-center gap-3 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-primary-container" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Responsive Layout shell */}
      <div className="w-full max-w-md bg-surface min-h-screen flex flex-col relative shadow-2xl border-x border-[#eae8e7] overflow-hidden">
          {/* ==================== SCREEN 1: WELCOME SCREEN ==================== */}
          {currentScreen === 'WELCOME' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col justify-center items-center px-8 py-12 text-center bg-[#fbf9f8]"
            >
              <div className="max-w-sm w-full space-y-10 my-auto flex flex-col items-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-[#4d6450]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#4d6450]">
                    <Coffee className="w-8 h-8" />
                  </div>
                  <h1 className="font-display text-4xl font-extrabold text-[#4d6450] tracking-tight">VieBrew</h1>
                  <p className="text-[#434842] text-sm px-4 leading-relaxed">
                    Start your morning ritual with a touch of fresh pastoral energy.
                  </p>
                </div>

                <div className="w-full space-y-5">
                  {/* Input Fields */}
                  <div className="space-y-3.5">
                    {authMode === 'signup' && (
                      <div className="text-left">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#656460] mb-1.5 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Name (e.g. Alex Mercer)" 
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#efeded] rounded-xl text-sm focus:outline-none focus:border-[#4d6450] focus:ring-1 focus:ring-[#4d6450] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all placeholder:text-[#c3c8c0] text-[#1b1c1c]"
                        />
                      </div>
                    )}
                    
                    <div className="text-left">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#656460] mb-1.5 ml-1">Email or Username</label>
                      <input 
                        type="text" 
                        placeholder="alex@example.com" 
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#efeded] rounded-xl text-sm focus:outline-none focus:border-[#4d6450] focus:ring-1 focus:ring-[#4d6450] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all placeholder:text-[#c3c8c0] text-[#1b1c1c]"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#656460] mb-1.5 ml-1">Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#efeded] rounded-xl text-sm focus:outline-none focus:border-[#4d6450] focus:ring-1 focus:ring-[#4d6450] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all placeholder:text-[#c3c8c0] text-[#1b1c1c]"
                      />
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        let displayName = 'Alex';
                        if (authMode === 'signup') {
                          displayName = authName.trim() || 'Alex';
                          setUser(prev => ({ ...prev, name: displayName }));
                          showToast(`Account created! Welcome, ${displayName}!`);
                        } else {
                          if (authEmail.includes('@')) {
                            displayName = authEmail.split('@')[0];
                            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                          } else if (authEmail.trim()) {
                            displayName = authEmail.trim();
                          }
                          setUser(prev => ({ ...prev, name: displayName }));
                          showToast(`Welcome back, ${displayName}!`);
                        }
                        setCurrentScreen('HOME');
                      }}
                      className="w-full py-3.5 bg-[#4d6450] text-[#ffffff] font-semibold rounded-xl shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{authMode === 'login' ? 'Login' : 'Sign Up'}</span>
                      <Sparkles className="w-4 h-4 text-white/80" />
                    </button>

                    {/* Toggle link underneath Login button */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                        className="text-xs text-[#4d6450] font-semibold hover:underline hover:opacity-90 active:scale-95 transition-all"
                      >
                        {authMode === 'login' 
                          ? "Haven't had an account? Signup here" 
                          : "Already have an account? Login here"
                        }
                      </button>
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="flex items-center justify-center gap-3 py-1">
                    <div className="h-px bg-[#efeded] flex-1"></div>
                    <span className="text-[10px] uppercase tracking-widest text-[#656460] font-bold">Or</span>
                    <div className="h-px bg-[#efeded] flex-1"></div>
                  </div>

                  {/* Social Login Button */}
                  <button 
                    onClick={() => {
                      showToast("Connected using digital account");
                      setCurrentScreen('HOME');
                    }}
                    className="w-full py-3 border border-[#c3c8c0] bg-white hover:bg-[#fbf9f8] text-[#434842] font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-colors active:scale-98"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="text-sm">Continue with Google</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#656460] leading-relaxed px-4">
                  By continuing, you agree to VieBrew's <span className="text-[#4d6450] underline font-medium cursor-pointer">Terms</span> and <span className="text-[#4d6450] underline font-medium cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 2: HOME / MENU SCREEN ==================== */}
          {currentScreen === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col pb-24"
            >

            <AnimatePresence mode="wait">
              {/* Header */}
              <header className="h-20 px-6 flex items-center justify-between border-b border-[#efeded] bg-[#fbf9f8]/80 backdrop-blur-md z-30 sticky top-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4d6450] rounded-xl flex items-center justify-center shadow-sm">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-[#4d6450] font-display" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>VieBrew</span>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => setCurrentScreen('PROFILE')}
                    className="flex items-center gap-1.5 bg-[#e5e2dc] px-3.5 py-2 rounded-full cursor-pointer hover:opacity-90 active:scale-95 transition-all text-left shrink-0"
                  >
                    <span className="text-[11px] font-bold text-[#656460] uppercase tracking-wider">{user.points} PTS</span>
                  </div>
                  <button 
                    onClick={() => setCurrentScreen('PROFILE')} 
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm active:scale-95 transition-transform shrink-0"
                  >
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
                  </button>
                </div>
              </header>

              <div className="px-6 pt-6 pb-2">
                {/* Greeting */}
                <div className="mb-8 text-left">
                  <h1 className="text-[34px] font-bold leading-tight mb-2 tracking-tight text-[#1b1c1c]" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    Good morning, <span className="text-[#4d6450]">{user.name}</span>
                  </h1>
                  <p className="text-[#434842] text-[16px] leading-relaxed">
                    The scent of freshly roasted beans is waiting for you.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search your favorite coffee..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline transition-all"
                  />
                  {searchQuery ? (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-1.5 rounded-lg active:scale-95 transition-transform">
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Horizontal Category Slider */}
                <div className="flex gap-2 overflow-x-auto scroll-hide pb-3 mb-6">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full font-semibold text-[14px] whitespace-nowrap transition-all duration-200 active:scale-95 ${
                          isActive 
                            ? 'bg-[#4d6450] text-[#ffffff] shadow-sm' 
                            : 'bg-white border border-[#c3c8c0] text-[#434842] hover:bg-[#fbf9f8]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Hero / Bento Featured Daily Special (Only show if matches active filter) */}
                {activeCategory === 'All Coffee' && !searchQuery && (
                  <div 
                    onClick={() => handleOpenProductDetail(PRODUCTS[0])}
                    className="mb-8 bg-[#4d6450] rounded-[24px] p-6 flex justify-between items-center text-white relative overflow-hidden shadow-[0_20px_40px_rgba(77,100,80,0.15)] cursor-pointer group hover:brightness-105 transition-all text-left"
                  >
                    <div className="relative z-10 max-w-[62%] flex flex-col items-start">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3.5 inline-block">Seasonal Pick</span>
                      <h2 className="text-2xl font-bold mb-1.5 leading-tight font-display text-white" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Pistachio Matcha Latte</h2>
                      <p className="text-white/80 mb-5 text-xs leading-relaxed line-clamp-3">House-made pistachio cream topped with ceremonial grade matcha and a dash of sea salt.</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProductDetail(PRODUCTS[0]);
                        }}
                        className="bg-white text-[#4d6450] font-bold px-5 py-2.5 rounded-lg text-xs shadow-md hover:shadow-lg transition-all active:scale-95"
                      >
                        Order Now
                      </button>
                    </div>
                    <div className="w-36 h-36 bg-[#b5cfb7] rounded-full flex items-center justify-center opacity-40 absolute -right-8 -bottom-8 shrink-0">
                      <div className="w-24 h-24 border-4 border-white rounded-full"></div>
                    </div>
                    <div className="w-64 h-64 bg-white/10 rounded-full absolute -top-20 -right-20 blur-3xl"></div>
                  </div>
                )}

                {/* Subtitle list */}
                <h3 className="font-display text-lg font-bold text-on-surface mb-4">
                  {searchQuery ? 'Search Results' : activeCategory === 'All Coffee' ? 'Artisanal Selection' : activeCategory}
                </h3>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-surface-container-low rounded-2xl">
                    <p className="text-secondary text-base">No items found matching your search.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveCategory('All Coffee'); }}
                      className="mt-4 text-primary font-bold text-sm bg-white px-5 py-2 rounded-full border border-surface-container-high shadow-xs"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {filteredProducts.map((p) => {
                      // Skip featured item on first view if we're filtering on all to avoid duplication,
                      // except when we're searching or filtering specifically
                      if (p.id === 'matcha-latte' && activeCategory === 'All Coffee' && !searchQuery) return null;
                      
                      const isFav = favorites.includes(p.id);

                      return (
                        <div 
                          key={p.id}
                          onClick={() => handleOpenProductDetail(p)}
                          className="bg-white rounded-[16px] p-4 shadow-[0_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#efeded] flex flex-col hover:border-[#4d6450]/30 transition-all cursor-pointer group text-left"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#f5f3f3] mb-3 shrink-0">
                            <img 
                              src={p.image} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              alt={p.name} 
                              referrerPolicy="no-referrer"
                            />
                            <button 
                              onClick={(e) => toggleFavorite(p.id, e)}
                              className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white active:scale-90 transition-transform shadow-xs"
                            >
                              <Heart className={`w-4.5 h-4.5 ${isFav ? 'fill-red-500 text-red-500' : 'text-[#4d6450]'}`} />
                            </button>
                          </div>
                          
                          <div className="flex-grow flex flex-col justify-between">
                            <div className="mb-2">
                              <h4 className="font-bold text-[15px] text-[#1b1c1c] line-clamp-1">{p.name}</h4>
                              <p className="text-[#656460] text-xs line-clamp-1 mt-0.5">{p.sub}</p>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-[#efeded]">
                              <span className="font-bold text-[#4d6450] text-sm">${p.price.toFixed(2)}</span>
                              <button 
                                onClick={(e) => handleAddToCartDirect(p, e)}
                                className="w-8 h-8 rounded-full bg-[#4d6450] text-white flex items-center justify-center hover:brightness-110 transition-colors active:scale-90"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </AnimatePresence>
            </motion.div>
          )}

          {/* ==================== SCREEN 3: PRODUCT DETAIL SCREEN ==================== */}
          {currentScreen === 'PRODUCT_DETAIL' && selectedProduct && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-grow flex flex-col pb-36"
            >
              {/* Top Bar Navigation */}
              <header className="fixed top-0 max-w-md w-full z-40 bg-surface flex items-center justify-between px-6 py-4 border-b border-surface-container">
                <button 
                  onClick={() => setCurrentScreen('HOME')}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-primary hover:bg-surface-container active:scale-95 transition-transform"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="font-display text-lg font-bold text-primary">Customize Brew</h1>
                <button 
                  onClick={(e) => toggleFavorite(selectedProduct.id, e)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-primary hover:bg-surface-container active:scale-95 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </header>

              <div className="pt-20 px-6">
                {/* Hero Banner Large Product Image */}
                <div className="relative w-full aspect-square rounded-[32px] overflow-hidden bg-surface-container-lowest my-4 shadow-sm border border-surface-container">
                  <img 
                    src={selectedProduct.image} 
                    className="w-full h-full object-cover" 
                    alt={selectedProduct.name} 
                    referrerPolicy="no-referrer"
                  />
                  {selectedProduct.isBestseller && (
                    <div className="absolute top-4 right-4 bg-primary text-on-primary px-4 py-1.5 rounded-full font-display text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Bestseller</span>
                    </div>
                  )}
                </div>

                {/* Details text area */}
                <div className="my-5">
                  <span className="text-primary font-display text-xs font-bold tracking-widest uppercase">{selectedProduct.sub || 'House Special'}</span>
                  <h2 className="font-display text-3xl font-extrabold text-on-surface mt-1">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-display text-2xl font-bold text-primary">${selectedProduct.price.toFixed(2)}</span>
                    <span className="px-3 py-1 bg-surface-container text-secondary text-xs rounded-full font-medium">{selectedProduct.tag || 'Hot'}</span>
                  </div>
                </div>

                <div className="h-px bg-outline-variant/30 w-full my-4"></div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-display text-sm font-bold text-on-surface mb-2">About the Brew</h3>
                  <p className="text-secondary text-sm leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Conditional Customizations - Skip if product category is pastries */}
                {selectedProduct.category !== 'Pastries' ? (
                  <div className="space-y-6">
                    {/* Milk Selection Chips */}
                    <div>
                      <h3 className="font-display text-sm font-bold text-on-surface mb-3">Milk Preference</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Whole Milk', 'Oat Milk', 'Almond Milk', 'Soy Milk'].map((milkOpt) => {
                          const isSel = detailCustomization.milk === milkOpt;
                          return (
                            <button
                              key={milkOpt}
                              onClick={() => setDetailCustomization({ ...detailCustomization, milk: milkOpt })}
                              className={`px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all duration-150 active:scale-95 ${
                                isSel 
                                  ? 'bg-primary text-on-primary border-primary' 
                                  : 'border-[#c3c8c0] text-secondary hover:border-primary/50'
                              }`}
                            >
                              {milkOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sugar Level Chips */}
                    <div>
                      <h3 className="font-display text-sm font-bold text-on-surface mb-3">Sugar Level</h3>
                      <div className="flex flex-wrap gap-2">
                        {['0%', '25%', '50%', '75%', '100%'].map((sugarOpt) => {
                          const isSel = detailCustomization.sugar === sugarOpt;
                          return (
                            <button
                              key={sugarOpt}
                              onClick={() => setDetailCustomization({ ...detailCustomization, sugar: sugarOpt })}
                              className={`px-4.5 py-2.5 rounded-2xl border text-sm font-semibold transition-all duration-150 active:scale-95 ${
                                isSel 
                                  ? 'bg-primary text-on-primary border-primary' 
                                  : 'border-[#c3c8c0] text-secondary hover:border-primary/50'
                              }`}
                            >
                              {sugarOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ice level */}
                    <div>
                      <h3 className="font-display text-sm font-bold text-on-surface mb-3">Ice Level</h3>
                      <div className="flex flex-wrap gap-2">
                        {['No Ice', 'Less Ice', 'Regular', 'Extra Ice'].map((iceOpt) => {
                          const isSel = detailCustomization.ice === iceOpt;
                          return (
                            <button
                              key={iceOpt}
                              onClick={() => setDetailCustomization({ ...detailCustomization, ice: iceOpt })}
                              className={`px-4.5 py-2.5 rounded-2xl border text-sm font-semibold transition-all duration-150 active:scale-95 ${
                                isSel 
                                  ? 'bg-primary text-on-primary border-primary' 
                                  : 'border-[#c3c8c0] text-secondary hover:border-primary/50'
                              }`}
                            >
                              {iceOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Warm option for pastries */}
                    <h3 className="font-display text-sm font-bold text-on-surface mb-3">Preparation</h3>
                    <div className="flex gap-2">
                      <button className="px-5 py-2.5 rounded-2xl bg-primary text-on-primary font-semibold text-sm">
                        Warm
                      </button>
                      <button className="px-5 py-2.5 rounded-2xl border border-outline text-secondary font-semibold text-sm">
                        Standard
                      </button>
                    </div>
                  </div>
                )}

                {/* Additional metadata specs */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="p-4 bg-surface-container-low rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-xs">
                      <Sparkles className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-secondary uppercase font-bold">Nutrition</p>
                      <p className="text-xs font-bold font-display text-on-surface">{selectedProduct.calories || '150 kcal'}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-xs">
                      <Award className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-secondary uppercase font-bold">Standard</p>
                      <p className="text-xs font-bold font-display text-on-surface">{selectedProduct.quality || 'Artisanal'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Custom Quantity Modifier Bar */}
              <footer className="fixed bottom-0 max-w-md w-full z-45 bg-[#fbf9f8]/95 backdrop-blur-md pb-6 pt-4 px-6 border-t border-surface-container shadow-[0_-4px_30px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Custom Quantity Bar Row Component */}
                  <div className="flex items-center bg-surface-container-high rounded-full p-1 gap-2 border border-surface-container-highest">
                    <button 
                      onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface active:scale-90 transition-transform"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-display text-base font-bold px-1.5 min-w-[20px] text-center">{detailQuantity}</span>
                    <button 
                      onClick={() => setDetailQuantity(detailQuantity + 1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface active:scale-90 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add action */}
                  <button 
                    onClick={handleAddCustomizedToCart}
                    className="flex-grow bg-primary text-on-primary py-4 px-6 rounded-full font-display text-base font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all shadow-md shadow-primary/15"
                  >
                    <ShoppingCart className="w-4.5 h-4.5 text-white/90" />
                    <span>Add — ${(selectedProduct.price * detailQuantity).toFixed(2)}</span>
                  </button>
                </div>
              </footer>
            </motion.div>
          )}

          {/* ==================== SCREEN 4: CART SCREEN ==================== */}
          {currentScreen === 'CART' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex-grow flex flex-col pb-36"
            >
              {/* Header */}
              <header className="fixed top-0 max-w-md w-full z-40 bg-surface flex items-center justify-between px-6 py-4 border-b border-surface-container">
                <button 
                  onClick={() => setCurrentScreen('HOME')}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low active:scale-95 transition-transform"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="font-display text-lg font-bold text-primary">Your Cart</h1>
                <div className="w-10 h-10"></div> {/* placeholder spacers */}
              </header>

              <div className="pt-20 px-5">
                {/* Delivery Address Block */}
                <div className="mb-6 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-primary w-4 h-4" />
                    <h2 className="font-display text-xs font-bold text-secondary uppercase tracking-widest">
                      {isDelivery ? 'Delivery Address' : 'Store Pickup'}
                    </h2>
                  </div>
                  
                  <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container flex justify-between items-center">
                    <div className="flex-grow pr-4">
                      {isDelivery ? (
                        <>
                          <h3 className="font-display text-base font-bold text-on-surface">Home Sweet Home</h3>
                          <p className="text-secondary text-xs mt-0.5 line-clamp-1">{selectedAddress}</p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-display text-base font-bold text-on-surface">VieBrew Central</h3>
                          <p className="text-secondary text-xs mt-0.5 line-clamp-1">{pickupStore}</p>
                        </>
                      )}
                    </div>
                    <button 
                      onClick={() => setCurrentScreen('SELECT_LOCATION')}
                      className="text-primary text-xs font-bold bg-primary/5 hover:bg-primary/10 px-3.5 py-2 rounded-xl transition-colors shrink-0"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Scheduling Option Panel */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-primary w-4 h-4" />
                    <h2 className="font-display text-xs font-bold text-secondary uppercase tracking-widest">Schedule Time</h2>
                  </div>
                  
                  <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm cursor-pointer hover:opacity-85" onClick={openSchedulingModal}>
                      <div className="flex items-center gap-2.5 text-on-surface">
                        <Calendar className="text-secondary w-4 h-4" />
                        <span className="font-medium">{scheduleDate}</span>
                      </div>
                      <ChevronDown className="text-secondary w-4.5 h-4.5" />
                    </div>
                    <div className="h-px bg-surface-container w-full"></div>
                    <div className="flex justify-between items-center text-sm cursor-pointer hover:opacity-85" onClick={openSchedulingModal}>
                      <div className="flex items-center gap-2.5 text-on-surface">
                        <Clock className="text-secondary w-4 h-4" />
                        <span className="font-medium">{scheduleTime}</span>
                      </div>
                      <ChevronDown className="text-secondary w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-on-surface mb-3">Order Summary</h3>

                {/* Cart list items */}
                {cart.length === 0 ? (
                  <div className="text-center py-12 px-6 bg-surface-container-low rounded-3xl">
                    <ShoppingCart className="w-12 h-12 text-outline mx-auto mb-3" />
                    <p className="text-secondary text-sm">Your cart is feeling dynamic today! Let's fill it with fresh coffee.</p>
                    <button 
                      onClick={() => setCurrentScreen('HOME')}
                      className="mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs font-bold"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-surface-container-lowest rounded-2xl p-3 flex gap-3 shadow-xs border border-surface-container hover:border-primary/10 transition-all"
                      >
                        <div className="w-18 h-18 rounded-xl overflow-hidden bg-primary-container/20 shrink-0">
                          <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} referrerPolicy="no-referrer" />
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-display text-sm font-bold text-on-surface">{item.product.name}</h4>
                              <p className="text-secondary text-[11px] font-medium leading-tight">
                                {item.product.category !== 'Pastries' ? (
                                  <>
                                    {item.customization.milk}, Custom Sugar ({item.customization.sugar})
                                  </>
                                ) : (
                                  'Warmed Pastry'
                                )}
                              </p>
                            </div>
                            <button 
                              onClick={() => deleteCartItem(item.id)}
                              className="text-secondary hover:text-error p-1 rounded-full hover:bg-red-50 transition-all shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-display text-sm font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                            
                            {/* Simple Cart Quantity Bar Component */}
                            <div className="flex items-center bg-secondary-container rounded-full p-[2px] gap-1.5">
                              <button 
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center text-primary active:scale-90 transition-transform"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-display text-xs font-bold text-on-surface px-1 min-w-[12px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="w-6.5 h-6.5 rounded-full bg-primary flex items-center justify-center text-on-primary active:scale-90 transition-transform"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Billing Summary List */}
                {cart.length > 0 && (
                  <div className="mt-8 space-y-3 pt-4 border-t border-surface-container">
                    <div className="flex justify-between items-center text-sm font-medium text-secondary">
                      <span>Subtotal</span>
                      <span className="text-on-surface">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-secondary">
                      <span>Service Fee</span>
                      <span className="text-on-surface">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-secondary">
                      <span>Delivery Fee</span>
                      <span className="text-primary font-bold">FREE</span>
                    </div>
                    <div className="pt-2 border-t border-surface-container flex justify-between items-center">
                      <span className="font-display text-base font-bold text-on-surface">Total</span>
                      <span className="font-display text-xl font-black text-primary">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Now Footer bottom action block */}
              {cart.length > 0 && (
                <footer className="fixed bottom-0 max-w-md w-full z-45 bg-[#fbf9f8]/95 backdrop-blur-md pb-6 pt-4 px-6 border-t border-surface-container shadow-[0_-4px_30px_rgba(0,0,0,0.03)] flex flex-col gap-3">
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary text-on-primary py-4 rounded-full font-display text-base font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
                  >
                    <span>Order Now — ${grandTotal.toFixed(2)}</span>
                    <ArrowLeft className="w-4.5 h-4.5 text-white/90 rotate-180" />
                  </button>
                </footer>
              )}
            </motion.div>
          )}

          {/* ==================== SCREEN 5: SELECT LOCATION SCREEN ==================== */}
          {currentScreen === 'SELECT_LOCATION' && (
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="flex-grow flex flex-col pb-24"
            >
              {/* Header */}
              <header className="w-full top-0 sticky bg-background/90 backdrop-blur-md z-40 flex items-center justify-between px-6 py-4 border-b border-surface-container">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentScreen('CART')}
                    className="active:scale-95 transition-transform text-primary hover:opacity-80 p-1.5 bg-surface-container rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="font-display text-lg font-bold text-on-surface">Select Location</h1>
                </div>
                <button className="active:scale-95 transition-transform text-primary hover:opacity-80 p-1 bg-surface-container rounded-full">
                  <Search className="w-4.5 h-4.5" />
                </button>
              </header>

              <div className="px-6 pt-5">
                {/* Segmented Toggle Control */}
                <div className="bg-surface-container-low p-1.5 rounded-full flex gap-1 mb-8 border border-surface-container-high shadow-xs">
                  <button 
                    onClick={() => setIsDelivery(true)}
                    className={`flex-1 py-3 px-5 rounded-full font-display text-sm font-bold transition-all duration-300 active:scale-95 ${
                      isDelivery 
                        ? 'bg-primary text-on-primary shadow-sm' 
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Delivery
                  </button>
                  <button 
                    onClick={() => setIsDelivery(false)}
                    className={`flex-1 py-3 px-5 rounded-full font-display text-sm font-bold transition-all duration-300 active:scale-95 ${
                      !isDelivery 
                        ? 'bg-primary text-on-primary shadow-sm' 
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Pick Up
                  </button>
                </div>

                {isDelivery ? (
                  /* ==================== DELIVERY MODE SUB-SECTION ==================== */
                  <div className="space-y-6">
                    {/* Search address bar inside sub-panel */}
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Search for your address..." 
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none bg-surface-container-low focus:ring-2 focus:ring-primary focus:bg-white text-sm text-on-surface placeholder:text-outline transition-all"
                      />
                    </div>

                    {/* GPS Selector Link option */}
                    <button 
                      onClick={() => {
                        setSelectedAddress('Coordinates: 37.7749° N, 122.4194° W');
                        showToast('Retrieved location via browser GPS!');
                        setCurrentScreen('CART');
                      }}
                      className="w-full flex items-center gap-4 p-4 rounded-xl bg-white border border-surface-container hover:bg-surface-container-low active:scale-98 transition-all group shadow-xs"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-container/40 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-display text-sm font-bold text-primary">Current Location</p>
                        <p className="text-xs text-on-surface-variant">Using secure GPS</p>
                      </div>
                    </button>

                    {/* Saved Addresses Lists */}
                    <div>
                      <h2 className="font-display text-sm font-bold text-on-surface mb-3 uppercase tracking-wider text-secondary">Saved Addresses</h2>
                      <div className="space-y-3">
                        {SAVED_ADDRESSES.map((item) => (
                          <div 
                            key={item.label}
                            onClick={() => {
                              setSelectedAddress(item.address);
                              showToast(`Address selected: ${item.label}`);
                              setCurrentScreen('CART');
                            }}
                            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-xs border border-surface-container hover:border-primary/20 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
                                {item.label === 'Home' ? <Coffee className="w-4.5 h-4.5" /> : <Settings className="w-4.5 h-4.5" />}
                              </div>
                              <div>
                                <p className="font-display text-sm font-bold text-on-surface">{item.label}</p>
                                <p className="text-secondary text-xs">{item.address}</p>
                              </div>
                            </div>
                            <ChevronRight className="text-outline group-hover:text-primary transition-colors w-4.5 h-4.5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ==================== PICK-UP MODE SUB-SECTION ==================== */
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-container">
                      {/* Stylized top map placeholder inside container frame */}
                      <div className="w-full h-44 relative bg-[#e3ecdf]/60 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(#b5cfb7_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-40"></div>
                        
                        {/* Map decorative road lines */}
                        <div className="absolute top-1/2 left-0 w-full h-4 bg-white/70 -translate-y-1/2"></div>
                        <div className="absolute left-1/2 top-0 w-4 h-full bg-white/70 -translate-x-1/2"></div>

                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg animate-bounce relative z-10">
                          <Coffee className="w-6 h-6 fill-white/10" />
                        </div>
                        
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xs text-[10px] font-bold text-primary border border-surface-container">
                          🗺️ View Map
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-display text-lg font-bold text-on-surface">VieBrew Central</h3>
                            <p className="text-secondary text-xs mt-0.5">120 Coffee Way, Downtown Sector</p>
                          </div>
                          <div className="px-3 py-1 bg-primary-container/45 text-on-primary-container rounded-full text-[10px] font-bold font-display uppercase tracking-wide shrink-0">
                            0.8 mi away
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-5 p-3 bg-surface-container-low rounded-xl">
                          <Clock className="text-tertiary w-5 h-5 shrink-0" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-secondary">Store Hours</span>
                            <p className="text-xs font-bold text-on-surface">7:00 AM - 8:00 PM Daily</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setPickupStore('VieBrew Central • 120 Coffee Way');
                            showToast('Pickup store selection verified!');
                            setCurrentScreen('CART');
                          }}
                          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-display text-sm font-bold active:scale-[0.98] transition-transform shadow-sm"
                        >
                          Confirm Pickup Location
                        </button>
                      </div>
                    </div>

                    {/* Nearby Stores lists */}
                    <div>
                      <h2 className="font-display text-sm font-bold text-on-surface mb-3 uppercase tracking-wider text-secondary">Other Nearby Stores</h2>
                      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-xs border border-surface-container cursor-pointer hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                          <Coffee className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-display text-sm font-bold text-on-surface">VieBrew Westside</p>
                          <p className="text-secondary text-xs">2.4 miles away • Closed at 9 PM</p>
                        </div>
                        <button 
                          onClick={() => {
                            setPickupStore('VieBrew Westside • 85 Walnut Boulevard');
                            showToast('Pickup store changed to Westside!');
                            setCurrentScreen('CART');
                          }}
                          className="text-primary font-bold text-xs bg-primary/5 hover:bg-primary/10 px-3.5 py-2 rounded-xl transition-colors shrink-0 font-display"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 6: ORDER CONFIRMED SCREEN ==================== */}
          {currentScreen === 'ORDER_CONFIRMED' && lastPlacedOrder && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col pt-12 pb-24 justify-between px-6 bg-[#fbf9f8]"
            >
              {/* Succession Header */}
              <header className="flex flex-col items-center text-center mt-4">
                <div className="relative mb-6">
                  {/* Animated background concentric rings */}
                  <div className="absolute inset-x-0 inset-y-0 bg-[#b5cfb7]/30 blur-2xl rounded-full scale-150"></div>
                  
                  {/* Floating badge */}
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="relative bg-[#4d6450] w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center text-white border border-[#4d6450]/20"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <h1 className="font-display text-3xl font-bold tracking-tight text-[#1b1c1c] mt-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Order Confirmed!</h1>
                <p className="text-[#434842] text-[15px] font-medium mt-1.5 leading-relaxed italic">
                  Your coffee is being brewed with love.
                </p>
              </header>

              {/* Order Detail Canvas Container card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#efeded] mt-6 text-left">
                
                <div className="flex justify-between items-center mb-5 pb-3.5 border-b border-[#efeded]">
                  <div>
                    <h2 className="font-bold text-[16px] text-[#1b1c1c]">Receipt Summary</h2>
                    <p className="text-[#656460] text-xs">ID: {lastPlacedOrder.id}</p>
                  </div>
                  <div className="bg-[#4d6450]/10 text-[#4d6450] text-[11px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider shrink-0">
                    Estimated: {lastPlacedOrder.estimatedTime} mins
                  </div>
                </div>

                {/* Scrolled list of customized checkout items */}
                <div className="space-y-4 max-h-48 overflow-y-auto pr-1">
                  {lastPlacedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#f5f3f3]">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-xs text-[#1b1c1c] leading-snug line-clamp-1">{item.name}</h4>
                        <p className="text-[#656460] text-[11px] leading-snug line-clamp-1">{item.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#1b1c1c]">${(item.price * item.quantity).toFixed(2)}</span>
                        <p className="text-[#656460] text-[10px]">x{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[#efeded] w-full my-4"></div>

                {/* Subtotals breakdown */}
                <div className="space-y-2 mt-4 text-xs font-medium text-[#434842]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1b1c1c] font-bold">${lastPlacedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span className="text-[#1b1c1c] font-bold">${lastPlacedOrder.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-[#1b1c1c] pt-3.5 border-t border-[#efeded] mt-2">
                    <span>Total Paid</span>
                    <span className="text-[#4d6450]">${lastPlacedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Fulfillment spec */}
                <div className="mt-5 p-4 bg-[#f5f3f3] rounded-xl flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-[#b5cfb7] rounded-lg flex items-center justify-center text-[#4d6450] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#656460] uppercase font-bold tracking-wider">Fulfillment Pickup</p>
                    <p className="text-xs font-bold text-[#1b1c1c] mt-0.5">VieBrew Central • 120 Coffee Way</p>
                  </div>
                </div>
              </div>

              {/* Success Bottom Action layout Buttons */}
              <div className="space-y-3 mt-8">
                <button 
                  onClick={() => {
                    setCurrentScreen('HOME');
                    showToast("Let's customize another morning ritual! ☕");
                  }}
                  className="w-full py-3.5 bg-[#4d6450] text-[#ffffff] rounded-xl font-bold text-[13px] hover:brightness-105 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return Menu Home</span>
                </button>
                <button 
                  onClick={() => showToast('📥 Receipt PDF receipt successfully saved to Downloads!')}
                  className="w-full py-3.5 border border-[#c3c8c0] bg-white hover:bg-[#fbf9f8] text-[#434842] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 7: PROFILE SCREEN ==================== */}
          {currentScreen === 'PROFILE' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="flex-grow flex flex-col pb-24"
            >
              {/* Header */}
              <header className="bg-surface sticky top-0 z-30 w-full flex items-center justify-between px-6 py-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <h1 className="font-display text-lg font-bold text-primary">Your Ritual Profile</h1>
                </div>
                <button 
                  onClick={() => showToast('Notification settings is already at optimal levels.')}
                  className="hover:bg-primary-container/20 p-2 rounded-full transition-transform duration-200 active:scale-95"
                >
                  <Settings className="w-5 h-5 text-on-surface-variant z-10" />
                </button>
              </header>

              <div className="px-5 pt-6">
                {/* Profile Detail header section */}
                <section className="flex flex-col items-center mb-8">
                  <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container shadow-md">
                      <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-background cursor-pointer active:scale-90 transition-transform">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-on-surface">{user.name}</h2>
                  <p className="text-secondary text-xs font-semibold tracking-wide">Coffee Enthusiast since {user.memberSince}</p>
                </section>

                {/* Loyalty Point Tracker Card */}
                <section className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#efeded] mb-8">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h4 className="text-[17px] font-bold mb-0.5 text-[#1b1c1c]">Rewards Status</h4>
                      <p className="text-[13px] text-[#656460]">Silver Member</p>
                    </div>
                    <div className="text-[#4d6450] font-bold text-[19px]">{user.points}/{user.maxPoints}</div>
                  </div>
                  <div className="w-full h-2 bg-[#efeded] rounded-full overflow-hidden mb-5">
                    <div className="h-full bg-[#4d6450]" style={{ width: `${(user.points / user.maxPoints) * 100}%` }}></div>
                  </div>
                  <div className="bg-[#f5f3f3] p-4 rounded-xl flex items-center gap-3 text-left">
                    <div className="w-9 h-9 bg-[#b5cfb7] rounded-lg flex items-center justify-center text-[#4d6450] shrink-0">
                      <Sparkles className="w-4.5 h-4.5" />
                    </div>
                    <p className="text-[12px] text-[#434842] leading-snug">
                      Order drink to earn points. Only <strong>{user.maxPoints - user.points} more points</strong> to unlock a free coffee!
                    </p>
                  </div>
                </section>

                {/* Profile list items settings */}
                <div className="space-y-3">
                  <h3 className="font-display text-sm font-bold text-secondary uppercase tracking-widest pl-1 mb-2">My Account</h3>

                  {/* Previous Order Historian Panel */}
                  <div className="bg-white rounded-2xl border border-surface-container overflow-hidden pt-1 shadow-xs">
                    <div className="px-4 py-3 border-b border-surface-container flex justify-between items-center">
                      <span className="font-display text-sm font-bold text-on-surface">Recent Order History</span>
                      <span className="text-[10px] font-bold text-primary uppercase bg-primary-container/25 px-2 py-0.5 rounded-full">Active</span>
                    </div>

                    <div className="divide-y divide-surface-container">
                      {orders.length === 0 ? (
                        <p className="text-center py-6 text-xs text-secondary">No previous orders recorded yet.</p>
                      ) : (
                        orders.map((o) => (
                          <div key={o.id} className="p-4 flex justify-between items-center transition-colors hover:bg-surface-container-low">
                            <div>
                              <p className="font-display text-sm font-bold text-on-surface">Order {o.id}</p>
                              <p className="text-secondary text-[11px] font-medium">{o.date} • {o.items.length} items</p>
                            </div>
                            <div className="text-right">
                              <span className="font-display text-sm font-bold text-primary">${o.total.toFixed(2)}</span>
                              <p className="text-[10px] text-primary bg-[#eae8e7] px-2 py-0.5 rounded-full mt-1.5 capitalize font-bold leading-none">
                                {o.status}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Settings Item Lists */}
                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={() => showToast('💳 Card integrations already loaded!')}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-xs hover:bg-surface-container-low transition-colors group border border-surface-container"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                          <CreditCard className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-display text-sm font-bold text-on-surface">My Saved Payments</span>
                      </div>
                      <ChevronRight className="text-outline group-hover:translate-x-0.5 transition-transform w-4.5 h-4.5" />
                    </button>

                    <button 
                      onClick={() => showToast('🔔 Inbox alerts verified!')}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-xs hover:bg-surface-container-low transition-colors group border border-surface-container"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                          <Bell className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-display text-sm font-bold text-on-surface">Notification Settings</span>
                      </div>
                      <ChevronRight className="text-outline group-hover:translate-x-0.5 transition-transform w-4.5 h-4.5" />
                    </button>

                    <button 
                      onClick={() => {
                        setCart([]);
                        setCurrentScreen('WELCOME');
                        showToast('Logged out of system device.');
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3.5 border-2 border-red-500/10 hover:bg-red-50 text-error rounded-2xl transition-colors font-display text-sm font-bold mt-4"
                    >
                      <LogOut className="w-4.5 h-4.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>


            </motion.div>
          )}

        
        {/* ==================== DESKTOP GLOBAL FLOATING OVERVIEW FOR COFFEE CART ==================== */}
        {currentScreen === 'HOME' && cart.length > 0 && (
          <button 
            onClick={() => setCurrentScreen('CART')}
            className="absolute bottom-24 right-4 bg-[#4d6450] text-[#ffffff] py-3 px-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all z-40 flex items-center gap-2 border border-white/20"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span className="text-xs font-bold uppercase tracking-wider shrink-0">
              Checkout ({cart.reduce((s, c) => s + c.quantity, 0)}) • ${grandTotal.toFixed(2)}
            </span>
          </button>
        )}

        {/* Sleek Floating Bottom Navigation Bar */}
        {['HOME', 'CART', 'PROFILE', 'SELECT_LOCATION'].includes(currentScreen) && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-full px-6 py-3 flex items-center justify-around">
              <button 
                onClick={() => setCurrentScreen('HOME')}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  currentScreen === 'HOME' ? 'text-[#4d6450] bg-[#4d6450]/10' : 'text-[#434842]/40 hover:text-[#4d6450]'
                }`}
              >
                <Coffee className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentScreen('CART')}
                className={`p-2.5 rounded-full transition-all duration-300 relative ${
                  currentScreen === 'CART' ? 'text-[#4d6450] bg-[#4d6450]/10' : 'text-[#434842]/40 hover:text-[#4d6450]'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#4d6450] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cart.reduce((s, c) => s + c.quantity, 0)}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setCurrentScreen('PROFILE')}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  currentScreen === 'PROFILE' ? 'text-[#4d6450] bg-[#4d6450]/10' : 'text-[#434842]/40 hover:text-[#4d6450]'
                }`}
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== INTERACTIVE SCHEDULING CALENDAR & TIME SLOT BOTTOM SHEET ==================== */}
        <AnimatePresence>
          {isSchedulingModalOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSchedulingModalOpen(false)}
                className="absolute inset-0 bg-[#1b1c1c]/50 backdrop-blur-xs z-45"
              />
              
              {/* Bottom Sheet Modal */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 max-h-[85%] bg-white rounded-t-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-50 flex flex-col overflow-hidden text-left"
              >
                {/* Header */}
                <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#efeded] shrink-0">
                  <h3 className="text-lg font-bold text-[#1b1c1c] font-display">Select Date & Time</h3>
                  <button 
                    onClick={() => setIsSchedulingModalOpen(false)}
                    className="p-1.5 rounded-full hover:bg-[#f5f3f3] active:scale-95 transition-all text-[#656460]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 scroll-hide">
                  {/* Calendar area */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-[#656460]">June 2026</span>
                      <span className="text-xs font-bold text-[#4d6450] bg-[#4d6450]/15 px-3 py-1 rounded-full">{tempScheduleDate}</span>
                    </div>

                    {/* Grid with days of June 2026. June 1, 2026 is a Monday. */}
                    {/* Day headers: M, T, W, T, F, S, S */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#656460] mb-2">
                      <div>M</div>
                      <div>T</div>
                      <div>W</div>
                      <div>T</div>
                      <div>F</div>
                      <div>S</div>
                      <div>S</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 30 }).map((_, index) => {
                        const day = index + 1;
                        const isPast = day < 9;
                        const formatted = getFormattedDate(day);
                        const isSelected = tempScheduleDate === formatted;

                        return (
                          <button
                            key={day}
                            disabled={isPast}
                            onClick={() => setTempScheduleDate(formatted)}
                            className={`h-9 w-full rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                              isPast 
                                ? 'text-[#c3c8c0] cursor-not-allowed line-through' 
                                : isSelected
                                  ? 'bg-[#4d6450] text-white shadow-sm'
                                  : 'bg-[#f5f3f3] text-[#1b1c1c] hover:bg-[#eae8e7]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slot area */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-[#656460]">Available Time Slots</span>
                      <span className="text-xs font-bold text-[#4d6450] bg-[#4d6450]/10 px-3 py-1 rounded-full">{tempScheduleTime}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'ASAP (15-20 mins)',
                        '08:00 AM - 08:30 AM',
                        '09:30 AM - 10:00 AM',
                        '11:00 AM - 11:30 AM',
                        '12:30 PM - 01:00 PM',
                        '02:00 PM - 02:30 PM',
                        '03:30 PM - 04:00 PM',
                        '05:00 PM - 05:30 PM',
                        '06:30 PM - 07:00 PM',
                        '07:30 PM - 08:00 PM'
                      ].map((slot) => {
                        const isSelected = tempScheduleTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setTempScheduleTime(slot)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all border ${
                              isSelected 
                                ? 'bg-[#4d6450] text-white border-[#4d6450] shadow-sm'
                                : 'bg-white border-[#efeded] text-[#434842] hover:bg-[#f5f3f3]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Confirm Footer */}
                <div className="p-4 border-t border-[#efeded] bg-[#fbf9f8] flex gap-3 shrink-0">
                  <button 
                    onClick={() => setIsSchedulingModalOpen(false)}
                    className="flex-1 py-3 border border-[#c3c8c0] rounded-xl text-xs font-bold text-[#434842] hover:bg-[#f5f3f3] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setScheduleDate(tempScheduleDate);
                      setScheduleTime(tempScheduleTime);
                      setIsSchedulingModalOpen(false);
                      showToast(`Scheduled for ${tempScheduleDate} at ${tempScheduleTime}`);
                    }}
                    className="flex-1 py-3 bg-[#4d6450] text-white rounded-xl text-xs font-bold hover:brightness-105 active:scale-[0.98] transition-all shadow-sm"
                  >
                    Set Schedule
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ==================== FRIENDLY WELCOME POP-UP NOTIFICATION ==================== */}
        <AnimatePresence>
          {isWelcomePopupOpen && currentScreen === 'HOME' && (
            <>
              {/* Backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsWelcomePopupOpen(false);
                }}
                className="absolute inset-0 bg-[#1b1c1c]/40 backdrop-blur-xs z-50 pointer-events-auto"
              />
              
              {/* Centered Popup Card */}
              <div className="absolute inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="bg-white rounded-[32px] p-6 max-w-xs w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#efeded] flex flex-col items-center text-center gap-5 pointer-events-auto"
                >
                  <div className="w-12 h-12 bg-[#4d6450]/15 rounded-full flex items-center justify-center text-[#4d6450]">
                    <Coffee className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#1b1c1c] font-display">Friendly Note</h3>
                    <p className="text-xs text-[#656460] leading-relaxed">
                      We only do cash/ bank transfer. You just need to place the order and it's done~
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setIsWelcomePopupOpen(false);
                    }}
                    className="w-full bg-[#4d6450] text-[#ffffff] py-3 rounded-xl font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-md"
                  >
                    Got it!
                  </button>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
