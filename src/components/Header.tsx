
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">К</span>
          </div>
          <span className="font-bold text-xl">КонсалтФидбэк</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Главная
          </Link>
          <Link to="/feedback" className="text-sm font-medium hover:text-primary transition-colors">
            Обратная связь
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm" className="hidden md:flex">
            <Link to="/feedback">Оставить отзыв</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/">Найти консультанта</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
