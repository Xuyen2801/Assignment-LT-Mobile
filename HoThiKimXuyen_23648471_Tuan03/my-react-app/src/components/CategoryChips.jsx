import React from 'react';
import { categories } from '../data/books';

export function CategoryChips() {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <span key={category} style={styles.chip}>
          {category}
        </span>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  chip: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 999,
    border: '1px solid #2E3A8C',
    color: '#2E3A8C',
    backgroundColor: '#fff',
    fontSize: 13,
    fontWeight: 600,
  },
};
