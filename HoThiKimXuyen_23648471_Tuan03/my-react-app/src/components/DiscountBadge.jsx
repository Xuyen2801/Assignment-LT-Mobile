import React from 'react';

export function DiscountBadge({ discount, isNew = false }) {
  const label = isNew ? 'Mới' : `-${discount}%`;

  return (
    <div style={styles.badge}>
      {label}
    </div>
  );
}

const styles = {
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#FF7A59',
    color: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    zIndex: 2,
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
};
