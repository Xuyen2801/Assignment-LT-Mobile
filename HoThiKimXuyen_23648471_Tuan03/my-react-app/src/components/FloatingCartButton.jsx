import React from 'react';

export function FloatingCartButton({ count = 0 }) {
  return (
    <div style={styles.wrapper}>
      <button style={styles.button} aria-label="Cart button">
        🛒
      </button>
      {count > 0 && (
        <div style={styles.badge}>{count}</div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'fixed',
    right: 20,
    bottom: 24,
    width: 62,
    height: 62,
    zIndex: 20,
  },
  button: {
    width: 62,
    height: 62,
    borderRadius: 31,
    border: 'none',
    backgroundColor: '#1E2A78',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(30, 42, 120, 0.35)',
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    color: '#fff',
    fontWeight: 700,
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
};
