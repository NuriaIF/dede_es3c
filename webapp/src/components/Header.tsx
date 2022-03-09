import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Navbar, Form, Nav, Button, NavDropdown, DropdownButton, Dropdown, Container} from "react-bootstrap";
import "bootswatch/dist/superhero/bootstrap.min.css"
import logo from '../img/logo-dede.svg'
import homeIcon from '../img/home-icon.svg'
import catalogIcon from '../img/catalog-icon.svg'
import englishIcon from '../img/english-icon.svg'
import loginIcon from '../img/login-icon.svg'
import logoutIcon from '../img/logout-icon.svg'
import shoppingCartIcon from '../img/shopping-cart-icon.svg'
import spanishIcon from '../img/spanish-icon.svg'
import registerIcon from '../img/register-icon.svg'

import { LangContext } from '../lang';

interface HeaderProps {
  fixed?: boolean;
  transparent?: boolean;
}

const Header: FC<HeaderProps> = ({ fixed, transparent }) => {
  const { state: { language}, dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

  let headerClass = 'header';

  if(fixed) {
    headerClass += ' header--fixed';
  }

  if(transparent) {
    headerClass += ' header--transparent';
  }

  const handleClickOutside = useCallback((e) => {
    if(showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
      setShowDropdown(false);
    }
  }, [showDropdown, setShowDropdown, dropdownEl]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [handleClickOutside]);

  const chooseLanguageHandler = (value: string) => {
    setShowDropdown(false);
    setLanguage(value);
  }

  return(

    <Navbar id="basic-navbar-nav">
      {
        <Nav className="container-fluid">
          {
            <Fragment>
              <Navbar.Brand>
                <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                DeDesktop
              </Navbar.Brand>
              <Nav.Link href="/home" className="float-left">
                <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.home')}
              </Nav.Link>
              <Nav.Link href="/catalogo">
                <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.catalogue')}
              </Nav.Link>
              <Nav.Link href="/signup">
                <img alt="" src={registerIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.register')}
              </Nav.Link>
              <Nav.Link href = "/login">
                <img alt="" src={loginIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.login')}
              </Nav.Link>
              <Nav.Link href="/home">
                <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.logout')}
              </Nav.Link>
              <Nav.Link href="/carrito">
                <img alt="" src={shoppingCartIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.shoppingcart')}
              </Nav.Link>
              <NavDropdown title={translate('nav.languaje')} id="idioma-dropdown" className="ms-auto">
                <Dropdown.Item as="button" onClick={() => chooseLanguageHandler('ES')}>
                  <img alt="" src={spanishIcon} width="20" height="20" className="d-inline-block align-top" />
                  Español
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => chooseLanguageHandler('EN')}>
                  <img alt="" src={englishIcon} width="20" height="20" className="d-inline-block align-top" />
                  English
                </Dropdown.Item>
              </NavDropdown>
            </Fragment>
          }
        </Nav>
      }
  </Navbar>
  );
}

export default Header;