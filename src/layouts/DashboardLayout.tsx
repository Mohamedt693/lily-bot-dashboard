import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag } from 'lucide-react';
import LogoutButton from '../components/LogoutButton';

export default function DashboardLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Overview', icon: <LayoutDashboard size={18} /> },
    { path: '/dashboard/products', name: 'Product Management', icon: <ShoppingBag size={18} /> },
  ];


  return (
    <div className="flex h-screen w-screen bg-zinc-50 font-sans text-zinc-900 antialiased" dir="ltr">
      
      {/* ─── PREMIUM SIDEBAR (Left Side) ─── */}
      <aside className="w-64 bg-zinc-900 text-zinc-200 flex flex-col justify-between border-r border-zinc-800 shadow-lg">
        <div>
          {/* Brand Logo Section */}
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-xl font-bold tracking-widest text-emerald-400">LILY CLOSET</h1>
            <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">Admin Console</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10 font-semibold'
                      : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-zinc-500'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Trigger */}
        <div className="p-4 border-t border-zinc-800">
          <LogoutButton className="w-full text-zinc-400 hover:bg-zinc-800 hover:text-rose-400" />
        </div>
      </aside>

      {/* ─── MAIN APP CONTENT ─── */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Minimal Navbar */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-sm font-medium text-zinc-600">
            Welcome back, <span className="font-semibold text-zinc-800">Dr. Mohamed</span> 👋
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Live Server Connected</span>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>

    </div>
  );
}