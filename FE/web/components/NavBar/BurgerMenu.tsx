'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconMenu, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { NAVBAR_ROUTES } from '@/common/consts';
import styles from './NavBar.module.css';

export default function BurgerMenu() {
  const [isBurgerVisible, setIsBurgerVisible] = useState(false);
  const { t } = useTranslation();

  const pathname = usePathname();

  const { i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 0) {
        document.getElementById('navbar')?.classList.add(styles.navbar_scrolled);
      } else {
        document.getElementById('navbar')?.classList.remove(styles.navbar_scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isBurgerVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isBurgerVisible]);

  useEffect(() => {
    document.getElementById(pathname)?.style.setProperty('color', 'var(--color-primary)');
    document.getElementById(pathname)?.style.setProperty('pointer-events', 'none');

    document
      .getElementById(`mobile-${pathname}`)
      ?.style.setProperty('color', 'var(--color-primary)');

    return () => {
      document.getElementById(pathname)?.style.setProperty('color', 'var(--color-white)');
      document.getElementById(pathname)?.style.setProperty('pointer-events', 'auto');
      document
        .getElementById(`mobile-${pathname}`)
        ?.style.setProperty('color', 'var(--color-white)');
    };
  }, [pathname]);

  const handleBurgerToggle = () => {
    setIsBurgerVisible(!isBurgerVisible);
  };

  return (
    <div>
      <div className={`${styles.mobile_links_wrapper} ${isBurgerVisible ? styles.visible : ''}`}>
        <button
          type="button"
          className={styles.close_menu}
          onClick={handleBurgerToggle}
          aria-label="close menu"
        >
          <IconX size={30} color="var(--color-white)" />
        </button>

        {NAVBAR_ROUTES.map((route) => (
          <Link
            href={`/${i18n.language}${route.href}`}
            key={route.transKey}
            className={styles.mobile_link}
            onClick={handleBurgerToggle}
            id={`mobile-${route.href}`}
          >
            {t(route.transKey)}
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="open menu"
        className={styles.burger}
        onClick={handleBurgerToggle}
      >
        <IconMenu size={30} color="var(--color-white)" />
      </button>
    </div>
  );
}
