import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 bg-primary-500">
        <div className="container text-center text-sm text-primary-100">
          <p>© {new Date().getFullYear()} Formula One Explorer | Created by Muhammed Hesham</p>
        </div>
      </footer>
    </div>
  );
}
