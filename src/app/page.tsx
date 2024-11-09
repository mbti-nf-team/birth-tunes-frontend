import { Metadata, ResolvingMetadata } from 'next';

import { getStringOrDefault } from '@nf-team/core';
import dayjs from 'dayjs';

import Footer from '@/components/Footer';
import BirthSongContainer from '@/components/main/BirthSongContainer';

import { metadata } from './layout';

import styles from './index.module.scss';

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const date = searchParams?.date;

  if (!date) {
    return metadata;
  }

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  const description = `${dayjs(date).format('YY년 MM월 DD일')}에 1위한 곡 확인하기`;
  return {
    title: metadata.title,
    description,
    openGraph: {
      title: metadata.title,
      images: previousImages,
      description,
      url: `${process.env.NEXT_PUBLIC_ORIGIN}?date=${date}`,
    },
    twitter: {
      title: metadata.title,
      description,
    },
  };
}

function Home({ searchParams }: Props) {
  const defaultBirthDate = getStringOrDefault(searchParams?.date);

  const isNotValidDefaultDate = defaultBirthDate
    && (!dayjs(defaultBirthDate).isValid() || dayjs().isBefore(dayjs(defaultBirthDate)));

  return (
    <>
      <main className={styles.mainWrapper}>
        <h1 className={styles.title}>
          {'+-------------------+\n¦      내 생일      ¦\n¦   1위 노래 찾기   ¦\n+-------------------+'}
        </h1>
        <BirthSongContainer defaultBirthDate={isNotValidDefaultDate ? '' : defaultBirthDate} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
