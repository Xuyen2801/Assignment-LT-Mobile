import React from 'react';
import { DiscountBadge } from './DiscountBadge';

export function BookGrid({ books }) {
  return (
    <div style={styles.grid}>
      {books.map((book) => (
        <div key={book.id} style={styles.item}>
          <div style={styles.imageWrap}>
            <DiscountBadge discount={book.discount} isNew={book.id % 3 === 0} />
            <div style={styles.placeholder} />
          </div>

          <div style={styles.info}>
            <div style={styles.title} title={book.title}>{book.title}</div>
            <div style={styles.author}>{book.author}</div>
            <div style={styles.priceRow}>
              <span style={styles.price}>{book.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 16,
  },
  item: {
    width: '48%',
    backgroundColor: '#f7f7ff',
    border: '2px solid #1e2a78',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 8px 18px rgba(31, 41, 55, 0.08)',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
  },
  placeholder: {
    width: '100%',
    aspectRatio: '3 / 4',
    backgroundColor: '#1E2A78',
    display: 'block',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    minHeight: 105,
    justifyContent: 'space-between',
    backgroundColor: '#e9f0ff',
    borderTop: '2px solid #1e2a78',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1F2940',
    lineHeight: 1.3,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    backgroundColor: '#dfe7ff',
    padding: '4px 6px',
    borderRadius: 6,
  },
  author: {
    marginTop: 4,
    color: '#1e2a78',
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: '#cfe3ff',
    padding: '4px 6px',
    borderRadius: 6,
  },
  priceRow: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  price: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1E2A78',
    backgroundColor: '#ffd6a5',
    padding: '4px 8px',
    borderRadius: 6,
  },
};
