import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
  background: #261C2C;
  height: 80px;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`

export const NavTop = styled.nav`
  background: #191919;
  height: 30px;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  padding: 1rem calc((100vw - 1000px) / 2);
  z-index: 10;
`

export const NavBottom = styled.nav`
  background: #191919;
  height: 30px;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  padding: 1rem calc((100vw - 1000px) / 2);
  z-index: 10;
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
`
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
`
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #3E2C41;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
  }
`