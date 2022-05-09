import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
  background: #0B2A55;
  height: 80px;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
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
`