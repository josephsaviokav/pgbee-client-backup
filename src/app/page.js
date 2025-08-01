'use client';

import React, { useState, useEffect } from 'react';
import Data from '@/components/dashboard/Data';
import Footer from '@/components/dashboard/Footer';
import Header from '@/components/dashboard/Header';
import HostelCard from '@/components/dashboard/HostelCard';
import { Icon, ICONS } from '@/components/dashboard/Icons';
import MobileSidebar from '@/components/dashboard/MobileBar';
import FiltersSidebar from '@/components/dashboard/SideBar';

export default function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const result = await Data();
        console.log('✅ Fetched hostels:', result);
        setHostels(result);
      } catch (error) {
        console.error('❌ Failed to load hostels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Icon path={ICONS.filter} className="w-5 h-5 mr-2 -ml-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 xl:w-1/5`}>
            <FiltersSidebar />
          </div>

          {/* Main content */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Hostels in College Of Engineering, Trivandrum ({hostels.length} search results)
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading hostels...</p>
            ) : Array.isArray(hostels) && hostels.length > 0 ? (
              <div>
                {hostels.map((hostel) => (
                  <HostelCard key={hostel.id} hostel={hostel} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hostels found.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
