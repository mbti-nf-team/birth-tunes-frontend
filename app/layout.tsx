import Layout from '../components/Layout';

import Providers from './providers';

import 'styles/normalize.css';
import 'styles/global.scss';

export const metadata = {
  title: 'Birth Tunes',
  description: '내 생일 1위 노래 찾기',
};

function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5352674467240753"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
