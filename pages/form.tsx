import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import qs from 'qs';
import Image from 'next/image';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  font-family: NanumSquare Neo variable;
  font-size: 30px;
  font-weight: 700;
  position: relative;
`;


const Home: NextPage = () => {
  
  return (
    <Container>
      
    </Container>
  );
};

export default Home;
