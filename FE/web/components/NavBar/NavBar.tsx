import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flex } from '@mantine/core';
import { NAVBAR_ROUTES } from '@/common/consts';
import Profile from '@/features/profile/Profile';
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
        <Flex align="center">
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="logo" width={32} height={32} />

            <p className={styles.site_name}>Riderz</p>
          </Link>
        </Flex>

        <Flex gap="var(--spacing-lg)" align="center">
          <nav className={styles.links_wrapper}>
            {NAVBAR_ROUTES.map((route) => {
              const isHomeRoute = route.href === '/';

              return (
                <Link
                  href={`/${locale}${route.href}`}
                  key={route.transKey}
                  className={`${styles.link} ${isHomeRoute && styles.hidden}`}
                  id={route.href}
                >
                  {t(`layout:${route.transKey}`)}
                </Link>
              );
            })}
          </nav>

          <Profile />

          <BurgerMenu />
        </Flex>
      </div>
    </nav>
  );
};

export default NavBar;
