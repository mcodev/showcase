import React from 'react';
import { NAMESPACE } from '@/i18n/consts';
import initTranslations from '@/i18n/i18n';
import { ParamsType } from '@/types/common';

const News = async ({ params }: ParamsType) => {
  const { locale } = await params;

  // Server side translations
  const { t } = await initTranslations(locale, NAMESPACE.HOME);

  return <div>{t('news')}</div>;
};

export default News;
