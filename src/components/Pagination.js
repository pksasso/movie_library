import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Wrapper = styled.div`
  color: white;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ChangePage = styled(Link)`
  display:flex; 
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  border-radius:100%;
  background-color: #171e22;
  box-shadow: 0px 0px 14px 2px rgba(0,0,0,0.75);
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  :hover{
    transform: scale(1.1);
  }
`;

const ActualPage = styled.div`
  font-size: 26px;
  font-weight: 500;
  padding-left: 20px;
  padding-right: 20px;
`;

const PlaceHolder = styled.div`
  height: 45px;
  width: 45px;
`;

function Pagination({
  actualPage,
  route,
  setPage,
  maxPage
}) {
  return (
    <Wrapper>
      {actualPage > 1 ?
        <ChangePage
          to={`${route}?page=${actualPage - 1}`}
          onClick={() => {
            setPage(actualPage - 1)
          }}
        >
          <FiChevronLeft size={35} color="#fff" />
        </ChangePage> :
        <PlaceHolder />
      }
      <ActualPage>
        {actualPage}
      </ActualPage>
      {
        actualPage <= maxPage ?
          <ChangePage
            to={`${route}?page=${actualPage + 1}`}
            onClick={() => {
              setPage(actualPage + 1)
            }}
          >
            <FiChevronRight size={35} color="#fff" />
          </ChangePage> :
          <PlaceHolder />
      }
    </Wrapper>
  )
}


export default Pagination;