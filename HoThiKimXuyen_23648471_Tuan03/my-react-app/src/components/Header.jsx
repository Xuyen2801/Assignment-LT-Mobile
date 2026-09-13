import React from 'react';

export function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.brandWrap}>
        <div style={styles.logoBox}>
          <span style={styles.logoText}>B</span>
        </div>
        <span style={styles.brandText}>BookStore</span>
      </div>

      <div style={styles.headerActions}>
        <div style={styles.iconButton} aria-label="Search">
          <span style={styles.iconText}>⌕</span>
        </div>

        <div style={styles.cartWrap}>
          <div style={styles.iconButton} aria-label="Cart">
            <span style={styles.iconText}>🛒</span>
          </div>
          <div style={styles.badge}>
            <span style={styles.badgeText}>2</span>
          </div>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E2A78',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    color: '#fff',
  },
  brandWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F7B267',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#1E2A78',
    fontSize: 18,
    fontWeight: 700,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 700,
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  cartWrap: {
    position: 'relative',
    marginLeft: 12,
  },
  iconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B6B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 700,
  },
};
