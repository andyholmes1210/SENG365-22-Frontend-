import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'

export const Btn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 10px;
  
  @media screen and (max-width: 300px) {
    display: none;
  }
`

export const BtnLink = styled(Link)`
  border-radius: 4px;
  background: #6E85B2;
  padding: 5px 10px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: auto;
  margin-bottom: 5px;
  margin-top: 10px;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #191919;
  }
`

export const BackBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 10px;
  
  @media screen and (max-width: 300px) {
    display: none;
  }
`

export const BackBtnLink = styled(Link)`
  border-radius: 4px;
  background: #6E85B2;
  padding: 5px 10px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #191919;
  }
`

export const LoginBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 10px;
  
  @media screen and (max-width: 300px) {
    display: none;
  }
`

export const LoginBtnLink = styled(Link)`
  border-radius: 6px;
  background: #6E85B2;
  padding: 10px 20px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: auto;
  margin-bottom: 5px;
  margin-top: 10px;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #191919;
  }
`