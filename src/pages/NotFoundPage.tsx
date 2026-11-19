import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h2>404 - Không tìm thấy trang</h2>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
};