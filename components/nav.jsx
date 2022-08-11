import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    padding: clamp(10px, 3vh, 30px) 0;
    display: flex;
    justify-content: space-between;

    span {
      margin: 0 20px;
    }
`

const Nav = ({ children }) => {
  return ( 
    <Div>{ children }</Div>
  )
}

export default Nav