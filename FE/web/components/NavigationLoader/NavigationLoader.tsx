'use client';

import { useEffect } from 'react';
import Router from 'next/router';
import { NavigationProgress, nprogress } from '@mantine/nprogress';

const NavigationLoader = () => {
  useEffect(() => {
    Router.events.on('routeChangeStart', nprogress.start);
    Router.events.on('routeChangeError', nprogress.complete);
    Router.events.on('routeChangeComplete', nprogress.complete);

    return () => {
      Router.events.off('routeChangeStart', nprogress.start);
      Router.events.on('routeChangeError', nprogress.complete);
      Router.events.off('routeChangeComplete', nprogress.complete);
    };
  }, []);

  return <NavigationProgress zIndex={999} />;
};

export default NavigationLoader;
