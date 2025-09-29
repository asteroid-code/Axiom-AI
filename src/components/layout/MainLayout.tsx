'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header'; // Assuming Header component exists

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark text-light">
      {/* Sidebar for Desktop */}
      <aside className="w-80 fixed left-0 top-0 h-screen hidden lg:flex flex-col z-50">
        <Sidebar />
      </aside>

      {/* Sidebar for Mobile (Overlay) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 glass-card p-6 flex flex-col text-white overflow-y-auto z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-80">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
