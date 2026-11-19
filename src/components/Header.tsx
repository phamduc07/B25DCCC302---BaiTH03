import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const Header = () => {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <Link to="/" className="logo">ShopMini</Link>
      <nav className="nav-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/cart">Giỏ hàng ({totalQuantity})</Link>
        {user ? (
          <>
            <span>Xin chào, {user.username}</span>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Tối' : 'Sáng'}
        </button>
      </nav>
    </header>
  );
};