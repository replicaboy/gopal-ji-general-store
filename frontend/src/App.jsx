import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, ReceiptText, Store } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Dashboard from './pages/Dashboard';


// ✨ Page Animation Wrapper - Isse page open hote waqt smooth feel aayega ✨
const PageWrapper = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
    className="p-6"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center">
      <p className="text-gray-400 text-lg">Ye {title} ka page hai. Isme hum aage kaam karenge! 🚀</p>
    </div>
  </motion.div>
);

// 🎨 Khubsurat Sidebar Component 🎨
const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { path: '/billing', name: 'Naya Bill', icon: <ReceiptText size={22} /> },
    { path: '/inventory', name: 'Stock / Inventory', icon: <ShoppingCart size={22} /> },
    { path: '/customers', name: 'Udhaar Khata', icon: <Users size={22} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-50">
        <div className="bg-brand-500 text-white p-2.5 rounded-xl shadow-md shadow-brand-200">
          <Store size={26} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-800 leading-tight">Gopal Ji</h1>
          <p className="text-xs text-gray-500 font-medium">General Store</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-brand-50 text-brand-600 font-bold shadow-sm' // Active Tab Colors
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="flex bg-[#f8fafc] min-h-screen font-sans">
        <Sidebar />
        
        <div className="flex-1 overflow-auto">
          {/* Top Header */}
          <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center px-8 shadow-sm sticky top-0 z-10">
            <span className="text-gray-600 font-medium text-lg">Ram Ram, Gopal Ji! 👋 Aaj ki bikri kaisi chal rahi hai?</span>
          </header>
          
          {/* Page Content with Animations */}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;