import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { TranslationFunctionType } from '@/types/common';
// import { TOPICS } from '../../common/consts';
import NavbarActions from './NavbarActions';
import styles from './NavBar.module.css';

type NavBarProps = {
  t: TranslationFunctionType;
};

const NavBar = ({ t }: NavBarProps) => {
  // Client side translations

  return (
    <nav className={styles.wrapper} id="navbar">
      <div className="content_restriction">
        <Link href="/" className={styles.logo}>
          {/* <Image src="/logo.webp" alt="logo" width={32} height={37} id="navLogo" priority /> */}

          <p className={styles.site_name} id="siteName">
            Riderz
          </p>
        </Link>

        <p>{t('layout:layout')}</p>

        <div>
          <nav className={styles.links_wrapper}>
            {/* {TOPICS.map(({ label, value }) => (
            TODO add locale before each href in whole app
              <Link href={`/${value}`} key={label} className={styles.link} id={value}>
                {label}
              </Link>
            ))} */}
          </nav>

          <NavbarActions />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
