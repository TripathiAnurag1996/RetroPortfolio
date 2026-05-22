import { memo } from 'react';
import { useWindows } from '../../context/WindowContext';
import styles from './ProductsFolderWindow.module.css';
import Icon from '../Icons/Icon';
import { playClickSound } from '../../utils/audio';
import { event } from '../../lib/gtag';

const PRODUCTS = [
  {
    id: 'vscode-ext',
    label: 'VS CODE EXTENSION',
    icon: 'vscode',
    url: 'anurag-os://promptive-sentry-ide'
  },
  {
    id: 'chrome-ext',
    label: 'CHROME EXTENSION',
    icon: 'chrome',
    url: 'anurag-os://promptive-sentry'
  }
];

function ProductsFolderWindow() {
  const { openWindow } = useWindows();

  const handleOpenProduct = (id: string, url: string) => {
    playClickSound();
    openWindow('browser');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('browser-navigate', { detail: url }));
    }, 100);
    event('external_link_clicked', {
      category: 'navigation',
      label: id.toUpperCase(),
      source: 'products_folder'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.menuItem}>File</div>
        <div className={styles.menuItem}>Edit</div>
        <div className={styles.menuItem}>View</div>
        <div className={styles.menuItem}>Help</div>
      </div>
      <div className={styles.content}>
        {PRODUCTS.map(product => (
          <div 
            key={product.id} 
            className={styles.iconWrapper}
            onDoubleClick={() => handleOpenProduct(product.id, product.url)}
            onClick={() => playClickSound()}
          >
            <Icon name={product.icon} size={48} />
            <span className={styles.iconLabel}>{product.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ProductsFolderWindow);
