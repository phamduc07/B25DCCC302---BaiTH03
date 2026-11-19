import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  updateQuantity,
  selectTotalPrice,
  selectTotalQuantity,
} from '../features/cart/cartSlice';

export const CartPage = () => {
  const items = useAppSelector((state) => state.cart.items);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Giỏ hàng trống</h2>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Giỏ hàng ({totalQuantity} sản phẩm)</h2>
      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <div className="item-info">
              <h4>{product.title}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))
                }
              >
                +
              </button>
            </div>
            <button onClick={() => dispatch(removeFromCart(product.id))}>
              Xóa
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Tổng tiền: ${totalPrice.toFixed(2)}</h3>
        <button onClick={() => navigate('/checkout')}>Thanh toán</button>
      </div>
    </div>
  );
};