import { NAMESPACE } from '@/i18n/consts';
import initTranslations from '@/i18n/i18n';
import { ParamsType } from '@/types/common';
import { Welcome } from '../../components/Welcome/Welcome';

export default async function HomePage({ params }: ParamsType) {
  const { locale } = await params;

  // Server side translations
  // const { t } = await initTranslations(locale, ['common', 'home']);
  const { t } = await initTranslations(locale, NAMESPACE.HOME);

  return (
    <>
      <Welcome t={t} />
      <p
        style={{
          color: 'white',
        }}
      >
        {t('home')}
        {/* {t('common:back')} */}
      </p>
    </>
  );
}
