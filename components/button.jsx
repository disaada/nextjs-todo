import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: var(--primary-color)
`

const Button = (props) => {
  return (
    <StyledButton {...props} />
  )
}

export default Button