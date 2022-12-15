import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
`;

const Detail: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return <Container>상품 리스트</Container>;
};

export default Detail;
