import { useState, useRef } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  FormGroup,
  Col,
  Row,
  Button,
  Label,
  Input,
  Alert,
} from "reactstrap";

import { saveKeyValue } from "../backend/appwriteFunctions";
import { useNavigate } from "react-router-dom";

export default function Signup({
  isSignUpOpen,
  onClose,
  setIsAuthenticUser,
  closeCollapse,
}) {
  const uiref = useRef(null);
  const passref = useRef(null);
  const nameref = useRef(null);
  const retypepassref = useRef(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  async function handleSignUp() {
    if (!nameref.current.value.trim()) {
      setErrorMsg("name must be given and it can not be empty");
      setIsAlertOpen(true);
      return;
    }
    let res;
    if (passref.current.value === retypepassref.current.value) {
      try {
        res = await saveKeyValue(
          uiref.current.value,
          passref.current.value,
          nameref.current.value
        );

        if (res?.saved) {
          localStorage.setItem("currentuid", uiref.current.value);
          localStorage.setItem("isAuthenticUser", JSON.stringify(true));

          setIsAuthenticUser(true); // this function has been passed via props
          closeCollapse();
          navigate(`/home/${uiref.current.value}`);

          onClose(); // function passed here through props
        } else {
          setErrorMsg("UserID already exists or invalid");
          setIsAlertOpen(true);
        }
      } catch (err) {
        setErrorMsg("Something went wrong. Please try again.");
        setIsAlertOpen(true);
      }
    } else {
      setErrorMsg("Passwords Don''t Match");
      setIsAlertOpen(true);
    }
    // console.log(res);
  }
  if (isSignUpOpen)
    return (
      <>
        <Modal isOpen={isSignUpOpen} toggle={onClose}>
          <ModalHeader toggle={onClose}>
            <div className="d-flex flex-column align-items-center">Sign Up</div>
          </ModalHeader>
          <ModalBody>
            <Container>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleSignUp();
                }}
              >
                <FormGroup>
                  <Row>
                    <Col>
                      <Label htmlFor="name">Name {"   "}</Label>
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        innerRef={nameref}
                        id="name"
                        placeholder="name..."
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label htmlFor="ui">Unique Username {"   "}</Label>
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        innerRef={uiref}
                        id="ui"
                        placeholder="username"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col>
                      <Label htmlFor="pass">Create Password</Label>
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
                <FormGroup>
                  <Row>
                    <Col>
                      <Label htmlFor="repass">Retype Password</Label>
                    </Col>
                    <Col>
                      <Input
                        type="password"
                        id="repass"
                        innerRef={retypepassref}
                        placeholder="password"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="d-flex flex-column align-items-center">
                  <Button type="submit" className="bg-primary">
                    {" "}
                    Sign Up
                  </Button>
                </div>
              </form>
            </Container>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={isAlertOpen}
          toggle={() => setIsAlertOpen(!isAlertOpen)}
          centered
          // style={{ zIndex: 10 }}
        >
          <ModalHeader toggle={() => setIsAlertOpen(!isAlertOpen)}>
            Problem occured !
          </ModalHeader>
          <ModalBody className="text-center">{errorMsg}</ModalBody>
        </Modal>
      </>
    );
  else return null;
}
