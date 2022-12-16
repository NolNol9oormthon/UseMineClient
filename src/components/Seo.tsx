import Head from 'next/head';

interface SeoProps {
  title: string;
}

const Seo = ({ title }: SeoProps) => {
  const appTitle = `${title} | 제주고올레`;
  return (
    <Head>
      <title>{appTitle}</title>
      <meta
        name="description"
        content="제주고올레🏝 | 제주고올레에서 남은 여행용품을 나누고 자연을 지켜요🥰"
      />
      <link rel="icon" type="image/png" href="/image/jeju_logo.png" />
    </Head>
  );
};

export default Seo;
