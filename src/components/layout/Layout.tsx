import { Outlet, Link } from 'react-router-dom';
import logo from '@/assets/img/logo.webp';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-5">
        <div className="container">
          <Link to="/" className="mx-auto block w-fit">
            <img src={logo} alt="logo" className="w-30" />
          </Link>
        </div>
      </header>

      <main className="flex-1 pb-24">
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
