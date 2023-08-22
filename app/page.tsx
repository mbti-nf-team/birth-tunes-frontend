import Footer from '../components/Footer';
import BirthSongContainer from '../components/main/BirthSongContainer';

import styles from './index.module.scss';

function Home() {
  return (
    <>
      <main className={styles.mainWrapper}>
        <h1 className={styles.title}>
          {'+-------------------+\n¦      내 생일      ¦\n¦   1위 노래 찾기   ¦\n+-------------------+'}
        </h1>
        <BirthSongContainer />
      </main>
      <Footer />
    </>
  );
}

export default Home;
