import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Flower2, ScanLine, Settings } from 'lucide-react';

export default function MainLayout() {
  const navItems = [
    { name: 'My Garden', path: '/collection', icon: Flower2 },
    { name: 'AI Scanner', path: '/dashboard/p1', icon: ScanLine }, // Hardcoded for demo
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 glass-nav fixed h-full border-r border-white/40 z-50">
        <div className="p-10 flex items-center gap-4">
           <div className="bg-forest p-3 rounded-2xl shadow-lg shadow-forest/20">
             <Flower2 className="w-8 h-8 text-sage" />
           </div>
           <h1 className="text-3xl font-extrabold text-forest tracking-tighter">Rooted</h1>
        </div>
        <nav className="flex-1 px-6 space-y-3 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-forest text-cream shadow-xl shadow-forest/10 scale-[1.02]' 
                      : 'text-forest/60 hover:bg-sage/20 hover:text-forest hover:scale-[1.02]'
                  }`
                }
              >
                <Icon className="w-6 h-6" />
                <span className="text-base">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 pb-24 md:pb-0 min-h-screen transition-all relative">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 glass-nav rounded-3xl z-50 px-6 py-4 flex justify-between items-center shadow-2xl shadow-forest/10 border border-white/50">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-forest scale-110' : 'text-forest/40 hover:text-forest'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2.5 rounded-2xl ${isActive ? 'bg-sage/20' : ''}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold tracking-wide">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
