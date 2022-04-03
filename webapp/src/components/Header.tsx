import React, { useCallback, useState, useEffect, useRef, useContext, FC, Fragment } from 'react';
import {Navbar, Nav, NavDropdown, Dropdown} from "react-bootstrap";
import "bootswatch/dist/morph/bootstrap.min.css"
import { LangContext } from '../lang';
import logo from '../img/logo-dede.svg';
import homeIcon from '../img/home-icon.svg';
import catalogIcon from '../img/catalog-icon.svg';
import englishIcon from '../img/english-icon.svg';
import loginIcon from '../img/login-icon.svg';
import logoutIcon from '../img/logout-icon.svg';
import spanishIcon from '../img/spanish-icon.svg';
import registerIcon from '../img/register-icon.svg';
import ordersIcon from '../img/checkout-icon.svg';

interface HeaderProps {
  setUser:(user:string) => void
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {dispatch: { setLanguage, translate } } = useContext(LangContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

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

  const logOut = () => {
    localStorage.setItem("cart", "[]");
    localStorage.removeItem("token");
    props.setUser("not logged");
  }

  if (localStorage.getItem("currentUser") !== "not logged" && !(localStorage.getItem("currentUser")?.includes("admin"))) {
      return (
        <Nav>
        {
          <Nav className="container-fluid">
            {
              <Fragment>
                <Navbar.Brand>
                  <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                  DeDesktop
                </Navbar.Brand>
                <Link to="/" className="float-left nav-link">
                  <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.home')}
                </Link>
                <Link to="/catalog" className="nav-link">
                    <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.catalog')}
                  </Link>
                <Link onClick={logOut} to="/login" className="nav-link">
                  <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                  {translate('nav.logout')}
                </Link>
                <Link href="/orders">
                  <img alt="" src={ordersIcon} width="25" height="25" className="d-inline-block align-top nav-link" />
                  {translate("nav.orders")}
                </Link>
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
      </Nav>
  );
  } else if (localStorage.getItem("currentUser") !== "not logged" && (localStorage.getItem("currentUser")?.includes("admin"))) {
      return (
        <Nav>
          {
            <Nav className="container-fluid">
              {
                <Fragment>
                  <Navbar.Brand>
                    <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
                    DeDesktop
                  </Navbar.Brand>
                  <Link to="/" className="float-left nav-link">
                    <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.home')}
                  </Link>
                  <Link to="/catalog" className="nav-link">
                    <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.catalog')}
                  </Link>
                  <NavDropdown title={translate('nav.admin')} id="productos-admin-dropdown">
                    <Dropdown.Item to="/addProduct">
                      {translate('crud.add')}
                    </Dropdown.Item>
                    <Dropdown.Item to="/editProduct">
                      {translate('crud.update')}
                    </Dropdown.Item>
                    <Dropdown.Item to="/deleteProduct">
                      {translate('crud.delete')}
                    </Dropdown.Item>
                  </NavDropdown>
                  <Link onClick={logOut} to="/login" className="nav-link">
                    <img alt="" src={logoutIcon} width="20" height="20" className="d-inline-block align-top" />
                    {translate('nav.logout')}
                  </Link>
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
        </Nav>
      );
    } else{
    return (
      <Nav>
      {
        <Nav className="container-fluid">
          {
            <Fragment>
              <Navbar.Brand>
                <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                DeDesktop
              </Navbar.Brand>
              <Link to="/" className="float-left nav-link">
                <img alt="" src={homeIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.home')}
              </Link>
              <Link to="/catalog" className="nav-link">
                <img alt="" src={catalogIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.catalog')}
              </Link>
              <Link to="/signup" className="nav-link">
                <img alt="" src={registerIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.register')}
              </Link>
              <Link onClick={logOut} to="/login" className="nav-link">
                <img alt="" src={loginIcon} width="20" height="20" className="d-inline-block align-top" />
                {translate('nav.login')}
              </Link>
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
    </Nav>
    
 );}
}
export default Header;