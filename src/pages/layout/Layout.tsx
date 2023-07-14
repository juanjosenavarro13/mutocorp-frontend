import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../../shared/components';
import { Analytics } from '@vercel/analytics/react';

export default function Layout() {
  return (
    <main className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <section
        className="mx-10 md:mx-20 pb-36 pt-20"
        style={{ minHeight: '92vh' }}
      >
        <Outlet />
      </section>

      <Footer />
      <Analytics />
    </main>
  );
}
