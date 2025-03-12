'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  // useParams,
  usePathname,
} from 'next/navigation';
import { IconMenu, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { NAVBAR_ROUTES } from '@/common/consts';
// import { TOPICS } from '../../common/consts';
import styles from './NavBar.module.css';

export default function BurgerMenu() {
  const [opened, setOpened] = useState(false);
  const [isTopPosition, setIsTopPosition] = useState(true);
  const pathname = usePathname();
  const { t } = useTranslation();

  const { i18n } = useTranslation();

  // const { postId } = useParams();

  const isHomePage = pathname === '/';

  useEffect(() => {
    //TODO fix this
    // const isWindowScrolled =
    //   typeof window !== "undefined" && window.scrollY > 0;

    // if (isWindowScrolled) {
    //   document
    //     .getElementById("navbar")
    //     ?.classList.remove(styles.navbar_scrolled);

    //   setIsTopPosition(isWindowScrolled);
    // }

    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 0) {
        document.getElementById('navbar')?.classList.add(styles.navbar_scrolled);

        setIsTopPosition(false);
      } else {
        document.getElementById('navbar')?.classList.remove(styles.navbar_scrolled);

        setIsTopPosition(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const selectedLink =
      typeof window !== 'undefined' && document.getElementById(pathname.slice(1).split('/')[0]);

    if (selectedLink) {
      selectedLink.classList.add(styles.active_link);
    }

    return () => {
      if (selectedLink) {
        selectedLink.classList.remove(styles.active_link);
      }
    };
  }, [pathname]);

  // useEffect(() => {
  //   if (isHomePage) {
  //     if (isTopPosition) {
  //       {
  //         TOPICS.map(({ value }) => {
  //           document.getElementById(value)?.classList.add(styles.link_alt);
  //         });
  //       }

  //       document.getElementById('navLogo')?.classList.add(styles.logo_alt);
  //       document.getElementById('siteName')?.classList.add(styles.logo_alt);
  //     }
  //   } else if (!isHomePage && Boolean(postId) && isTopPosition) {
  //     document.getElementById('navbar')?.classList.add(styles.glass_background);
  //   }

  //   return () => {
  //     {
  //       TOPICS.map(({ value }) => {
  //         document.getElementById(value)?.classList.remove(styles.link_alt);
  //       });
  //     }

  //     document.getElementById('navLogo')?.classList.remove(styles.logo_alt);
  //     document.getElementById('siteName')?.classList.remove(styles.logo_alt);

  //     document.getElementById('navbar')?.classList.remove(styles.glass_background);
  //   };
  // }, [isTopPosition, isHomePage, postId]);

  return (
    <div>
      <div className={`${styles.mobile_links_wrapper} ${opened ? styles.visible : ''}`}>
        <button
          type="button"
          className={styles.close_menu}
          onClick={() => setOpened(!opened)}
          aria-label="close menu"
        >
          <IconX size={30} color="var(--color-white)" />
        </button>

        {NAVBAR_ROUTES.map((route) => (
          <Link
            href={`/${i18n.language}${route.href}`}
            key={route.transKey}
            className={styles.mobile_link}
            onClick={() => setOpened(!opened)}
          >
            {t(route.transKey)}
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="open menu"
        className={styles.burger}
        onClick={() => setOpened(!opened)}
      >
        <IconMenu
          size={30}
          color={isHomePage && isTopPosition ? 'var(--color-white)' : 'var(--color-black)'}
        />
      </button>
    </div>
  );
}
