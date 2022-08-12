import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: ${props => props?.delete ? 'var(--tertiary-color)' : props?.cancel ? 'var(--tertiary-text-color)' : 'var(--primary-color)'};
    color: ${props => props?.cancel ? 'var(--primary-text-color)' : 'var(--secondary-text-color)'};
    font-size: 18px;
    border-radius: 45px;
    padding: 13px 21px;
    outilne: none;
    border: 0;
`

const Button = (props) => {
  return (
    <StyledButton {...props} />
  )
}

export default Button