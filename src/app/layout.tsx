import ReactGA from 'react-ga4';

import Script from 'next/script';

import Toast from '@/components/common/Toast';
import Layout from '@/components/Layout';

import dungGeunMoFont from './_fonts';
import Providers from './providers';

import 'src/styles/normalize.css';
import 'src/styles/global.scss';

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

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
  testMode: process.env.NODE_ENV === 'development',
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
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
            <Script id="google-analytics">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
            </Script>
            <Script id="google-tag-manager">
              {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
          `}
            </Script>
          </>
        )}
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
