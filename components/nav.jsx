import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    padding: clamp(10px, 3vh, 30px) 0;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      align-items: end;
      gap: 15px;
    }

    span {
      margin: 0 20px;
    }

    .nav-title {
      font-size: 36px;
    }

    .nav-button {
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: center;
    }
`

const Nav = ({ children }) => {
  return ( 
    <Div>{ children }</Div>
  )
}

export default Nav