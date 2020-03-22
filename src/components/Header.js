import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 25px;
`;

const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0;
  color: #fff;
  margin: 0 0 1rem 1rem;
`;

const Title = styled.h2`
  font-weight: 200;
  font-size: 25px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: #fff;
  margin: 15px 0 0 15px;
  @media (max-width: 768px) {
  font-size:18px; 
  }
`;

function Header({ title, subtitle }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Wrapper>
  )
}

export default Header
