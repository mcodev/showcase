import React from 'react';
import Link from 'next/link';
import { NAVBAR_ROUTES } from '@/common/consts';
import { LanguageType, TranslationFunctionType } from '@/types/common';
import BurgerMenu from './BurgerMenu';
import styles from './NavBar.module.css';

type NavBarProps = {
  t: TranslationFunctionType;
  locale: LanguageType;
};

const NavBar = ({ t, locale }: NavBarProps) => {
  return (
    <nav className={styles.wrapper} id="navbar">
      <div className="content_restriction">
        <Link href="/" className={styles.logo}>
          <p className={styles.site_name}>Riderz</p>
        </Link>

        <div>
          <nav className={styles.links_wrapper}>
            {NAVBAR_ROUTES.map((route) => (
              <Link href={`/${locale}${route.href}`} key={route.transKey} className={styles.link}>
                {t(`layout:${route.transKey}`)}
              </Link>
            ))}
          </nav>

          <BurgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
