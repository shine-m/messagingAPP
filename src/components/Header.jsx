import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  NavbarToggler,
  Collapse,
  NavbarText,
  Modal,
  ModalHeader,
  Container,
  ModalBody,
  FormGroup,
  Label,
  Col,
  Row,
  Input,
  Button,
} from "reactstrap";
import { useEffect, useRef, useState } from "react";

import {
  NavLink as RRNavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getValueByKey } from "../backend/appwriteFunctions";
import Signup from "./Signup";

import { updateuid } from "../redux/uidslice";
import { useSelector, useDispatch } from "react-redux";
import LogOut from "./logout";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginMOpen, setLoginMOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [islogOutOpen, setIsLogOutOpen] = useState(false);

  const uiref = useRef();
  const passref = useRef();

  const [uid, setUid] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isAuthenticUser, setIsAuthenticUser] = useState(false);

  const location = useLocation(); // this is a react hook and must be present on the top portion of a component , not inside any useeffect of loop or condition.

  useEffect(() => {
    const savedAuth = JSON.parse(
      localStorage.getItem("isAuthenticUser") || "false"
    );
    const savedUid = localStorage.getItem("currentuid") || "";

    setIsAuthenticUser(savedAuth);
    setUid(savedUid);

    console.log(location.pathname);
    if (savedAuth && savedUid && location.pathname == "/") {
      navigate(`/home/${savedUid}`);
    }
    // }, [navigate]);
  }, []);

  // const logoutAction = () => {
  //   setIsLogOutOpen(true);
  //   localStorage.removeItem("currentuid");
  //   localStorage.removeItem("isAuthenticUser");
  //   setIsAuthenticUser(false);
  //   setUid("");
  //   navigate("/");
  // };

  const checkCred = async (e) => {
    e.preventDefault();
    console.log(uiref.current.value);
    console.log(passref.current.value);
    const value = await getValueByKey(uiref.current.value);
    // console.log("Final Value:", value);
    if (value === passref.current.value) {
      setLoginMOpen(false);
      //
      localStorage.setItem("isAuthenticUser", JSON.stringify(true));
      localStorage.setItem("currentuid", uiref.current.value);
      setIsAuthenticUser(true);
      setUid(uiref.current.value);
      //
      dispatch(updateuid(uiref.current.value));
      navigate(`/home/${uiref.current.value}`);
    } else {
      alert("wrong uid or password");
    }
  };

  return (
    <>
      <div className="px-3 ">
        <Navbar color="light" expand="lg" className="position-relative">
          <NavbarToggler
            onClick={() => setIsOpen(!isOpen)}
            style={{ zIndex: 20 }}
          />
          {/* <Collapse
            isOpen={isOpen}
            navbar
            className=" bg-light shadow position-absolute"
            style={{ width: "30vw", top: "20%", zIndex: "10" }}
         
              {/* Login */}
          <Collapse
            isOpen={isOpen}
            navbar
            className="position-absolute"
            style={{ top: "100%", zIndex: "10", width: "fit-content" }}
          >
            <Nav
              navbar
              className="p-1 d-flex flex-column align-items-start gap-2"
              style={{ padding: "2px" }}
            >
              {!isAuthenticUser && (
                <NavItem className="nav-btn-wrapper">
                  <Button
                    className="nav-btn "
                    onClick={() => setLoginMOpen(true)}
                  >
                    Login
                  </Button>
                </NavItem>
              )}
              {/* Sign Up */}
              {!isAuthenticUser && (
                <NavItem className="nav-btn-wrapper">
                  <Button
                    className="nav-btn "
                    onClick={() => setIsSignUpOpen(true)}
                  >
                    Sign Up
                  </Button>
                </NavItem>
              )}
              {/* About */}
              <NavItem className="nav-btn-wrapper">
                <Button
                  className="nav-btn"
                  onClick={() => (window.location.href = "/")}
                >
                  About
                </Button>
              </NavItem>

              {/* Log Out */}
              {isAuthenticUser && (
                <NavItem className="nav-btn-wrapper">
                  <Button
                    className="nav-btn"
                    onClick={() => setIsLogOutOpen(true)}
                  >
                    Log Out
                  </Button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
          <div className="flex-grow-1"></div>
          <NavbarBrand
            className="ms-auto z-1"
            href={isAuthenticUser ? `/home/${uid}` : "/"}
          >
            <img
              src="/logos/logo.png"
              style={{ width: "60px", height: "auto" }}
              alt="logo"
            />
          </NavbarBrand>
        </Navbar>
        <Modal isOpen={loginMOpen} toggle={() => setLoginMOpen(false)}>
          <ModalHeader toggle={() => setLoginMOpen(!loginMOpen)}>
            <div className="d-flex flex-column align-items-center">Log In</div>
          </ModalHeader>
          <ModalBody>
            <Container>
              <form onSubmit={checkCred}>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label htmlFor="ui">uid {"   "}</Label>
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        innerRef={uiref}
                        id="ui"
                        placeholder="uid"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label htmlFor="pass">Password</Label>
                    </Col>
                    <Col>
                      <Input
                        type="password"
                        id="pass"
                        innerRef={passref}
                        placeholder="password"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="d-flex flex-column align-items-center">
                  <Button type="submit" className="bg-primary">
                    {" "}
                    Log In
                  </Button>
                </div>
              </form>
            </Container>
          </ModalBody>
        </Modal>
        <Signup
          isSignUpOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          setIsAuthenticUser={setIsAuthenticUser}
          setUid={() => setUid("")}
        />
        <LogOut
          logOutWindowOpen={islogOutOpen}
          toggleOpen={() => setIsLogOutOpen(!islogOutOpen)}
          voidauth={() => setIsAuthenticUser(false)}
          removeUid={() => setUid("")}
        />
      </div>
    </>
  );
}
