import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styles from './Layout.module.scss';

import ClassName from 'models/classname';
import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';

import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';

const Layout = ({ children, exclude = [], pageClassName }) => {
  const layoutClassName = new ClassName(styles.layoutContainer);

  const router = useRouter();
  const { asPath } = router;

  const { homepage, metadata = {}, notices, clearNotices } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }

  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    bodyAttributes: {
      class: pageClassName,
    },
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  };

  return (
    <div className={layoutClassName.toString()}>
      <Helmet {...helmetSettings} />

      {notices && notices.length > 0 && (
        <div className={styles.notices}>
          {notices.map(({ message }) => {
            return (
              <div key={message} className={styles.notice} onClick={clearNotices}>
                <p className={styles.noticeMessage}>{message}</p>
              </div>
            );
          })}
        </div>
      )}

      {!exclude.includes('nav') && <Nav />}

      <Main>{children}</Main>

      <Footer />
    </div>
  );
};

export default Layout;
