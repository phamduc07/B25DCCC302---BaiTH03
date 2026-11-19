import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, selectTotalPrice } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export const CheckoutPage = () => {
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="order-success">
        <h2>Đặt hàng thành công!</h2>
        <p>Cảm ơn {user?.username} đã mua sắm tại ShopMini.</p>
        <Link to="/">Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Thanh toán</h2>
      <p>Khách hàng: {user?.username}</p>
      <p>Số mặt hàng: {items.length}</p>
      <h3>Tổng thanh toán: ${totalPrice.toFixed(2)}</h3>
      <button onClick={handleOrder} disabled={items.length === 0}>
        Đặt hàng
      </button>
    </div>
  );
};