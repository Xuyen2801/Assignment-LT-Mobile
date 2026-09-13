import React from 'react';
import { Header } from './components/Header';

const book = {
  title: 'Sach1',
  author: 'Ho Thi Kim Xuyen',
  price: '23.648.471đ'
};

const categories = ['Tất cả', 'Làm việc', 'Yêu thương', 'Kỹ năng sống', 'Truyện tranh', 'Sức khỏe'];

const books = [
  { id: 1, name: 'Sach 1', author: 'Xuyen', price: '245.000đ', badge: '-20%' },
  { id: 2, name: 'Sach 2', author: 'Xuyen', price: '189.000đ', badge: 'Mới' },
  { id: 3, name: 'Sach 3', author: 'Xuyen', price: '220.000đ', badge: '-15%' },
  { id: 4, name: 'Sach 4', author: 'Xuyen', price: '175.000đ', badge: 'Mới' },
];

export default function App() {
  return (
    <div style={styles.screen}>
      <Header />

      <div style={styles.floatingCart}>
        <div style={styles.cartBadge}>2</div>
        🛒
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cover} />

          <div style={styles.infoColumn}>
            <div>
              <div style={styles.tag}>Bestseller</div>
              <div style={styles.title}>{book.title}</div>
              <div style={styles.author}>{book.author}</div>
            </div>

            <div style={styles.priceBox}>
              <span style={styles.price}>{book.price}</span>
            </div>
          </div>
        </div>

        <div style={styles.chipsWrap}>
          {categories.map((category) => (
            <span key={category} style={styles.chip}>
              {category}
            </span>
          ))}
        </div>

        <div style={styles.gridWrap}>
          {books.map((item) => (
            <div key={item.id} style={styles.gridItem}>
              <div style={styles.imageWrap}>
                <div style={styles.badge}>{item.badge}</div>
                <div style={styles.gridCover} />
              </div>

              <div style={styles.gridInfo}>
                <div style={styles.gridTitle}>{item.name}</div>
                <div style={styles.gridAuthor}>{item.author}</div>
                <div style={styles.gridPrice}>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  screen: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#F4F6FB',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  floatingCart: {
    position: 'fixed',
    right: 22,
    bottom: 26,
    width: 62,
    height: 62,
    borderRadius: '50%',
    backgroundColor: '#1E2A78',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    boxShadow: '0 12px 24px rgba(30, 42, 120, 0.35)',
    zIndex: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: '#FF6B6B',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    border: '2px solid #FFFFFF',
  },
  container: {
    padding: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.08)',
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#1E2A78',
    marginRight: 14,
  },
  infoColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 110,
  },
  tag: {
    display: 'inline-block',
    backgroundColor: '#E8EDFF',
    color: '#1E2A78',
    borderRadius: 999,
    padding: '4px 8px',
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1F2940',
    lineHeight: 1.35,
    maxWidth: '100%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  author: {
    marginTop: 6,
    color: '#667085',
    fontSize: 14,
  },
  priceBox: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  price: {
    fontWeight: 700,
    color: '#1E2A78',
    fontSize: 18,
    backgroundColor: '#FFD9A8',
    padding: '4px 8px',
    borderRadius: 8,
  },
  chipsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    backgroundColor: '#DDE7FF',
    padding: 12,
    borderRadius: 12,
    border: '2px solid #1E2A78',
  },
  chip: {
    backgroundColor: '#FFFFFF',
    color: '#1E2A78',
    border: '2px solid #1E2A78',
    borderRadius: 999,
    padding: '8px 12px',
    fontWeight: 700,
    fontSize: 13,
  },
  gridWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 14,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    border: '2px solid #1E2A78',
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.08)',
  },
  imageWrap: {
    position: 'relative',
  },
  gridCover: {
    width: '100%',
    aspectRatio: '3 / 4',
    backgroundColor: '#1E2A78',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: 6,
    zIndex: 2,
  },
  gridInfo: {
    padding: 10,
    backgroundColor: '#E9F0FF',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 96,
    justifyContent: 'space-between',
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1F2940',
    lineHeight: 1.3,
  },
  gridAuthor: {
    marginTop: 4,
    fontSize: 12,
    color: '#475467',
  },
  gridPrice: {
    marginTop: 8,
    fontWeight: 700,
    color: '#1E2A78',
    fontSize: 15,
    backgroundColor: '#FFD9A8',
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
};
