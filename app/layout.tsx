import localFont from 'next/font/local';
import Script from 'next/script';

import Toast from '../components/common/Toast';
import Layout from '../components/Layout';

import Providers from './providers';

import 'styles/normalize.css';
import 'styles/global.scss';

const title = '내 생일에 1위를 한 노래 찾기';
const description = '선택한 날에 1위한 곡 확인하기';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: process.env.NEXT_PUBLIC_ORIGIN,
    images: ['./share-img.png'],
  },
  twitter: {
    description,
    title,
    images: ['./share-img.png'],
  },
};

const dungGeunMoFont = localFont({
  src: [
    {
      path: './fonts/korean/DungGeunMo.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: [
    'DungGeunMo',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});

function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={dungGeunMoFont.className}>
      <head>
        {/* NOTE: 구글 광고 승인 실패 */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5352674467240753"
          crossOrigin="anonymous"
        /> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-H2HKSRPVH9" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-H2HKSRPVH9');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <Layout>
            {children}
            <Toast />
          </Layout>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
