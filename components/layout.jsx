import React, { Fragment } from 'react'
import styled from 'styled-components'

const Header = styled.header`
  background-color: var(--primary-color);
  div {
    max-width: clamp(10px, 90vw, 1000px);
    margin: 0 auto;
    padding: clamp(10px, 3vh, 30px) 0;
  }
`

const Main = styled.main`
  max-width: clamp(10px, 90vw, 1000px);
  margin: 0 auto;
`

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header data-cy="header-background"><div data-cy="header-title">TO DO LIST APP</div></Header >
      <Main>{children}</Main>
    </Fragment>
  )
}

export default Layout