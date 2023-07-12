import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "../stylesheets/NavigationBar.css";
import PreferencesModal from "./PreferencesModal";

const NavigationBar = () => {
  const { loggedInDetails, dispatch } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Navbar className="bg-body-tertiary" fixed="top" variant="light">
      {isModalOpen ? (
        <PreferencesModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
      <Container>
        <Navbar.Brand
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          News Website
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end navbar-left">
          {!loggedInDetails.isLoggedIn && (
            <Nav.Link
              href="/sign-in"
              onClick={(e) => {
                e.preventDefault();
                navigate("/sign-in");
              }}
            >
              Sign In
            </Nav.Link>
          )}
          {!loggedInDetails.isLoggedIn && (
            <Nav.Link
              href="/sign-up"
              onClick={(e) => {
                e.preventDefault();
                navigate("/sign-up");
              }}
            >
              Sign Up
            </Nav.Link>
          )}
          {loggedInDetails.isLoggedIn && (
            <Navbar.Text>Signed in as: {loggedInDetails.name}</Navbar.Text>
          )}
          {loggedInDetails.isLoggedIn && (
            <Nav.Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
          )}
          {loggedInDetails.isLoggedIn && (
            <Nav.Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch({
                  type: "UserLogout",
                });
                localStorage.removeItem("NW_UserDetails");
                navigate("/sign-in");
              }}
            >
              Logout
            </Nav.Link>
          )}
          {loggedInDetails.isLoggedIn && (
            <Nav.Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(!isModalOpen);
              }}
            >
              Preferences
            </Nav.Link>
          )}
          {loggedInDetails.isLoggedIn && (
            <Nav.Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              NewsLetter
            </Nav.Link>
          )}
          {loggedInDetails.isLoggedIn && loggedInDetails.role === 9878 && (
            <Nav.Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
            >
              Admin
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
