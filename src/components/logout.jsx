import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

export default function LogOut({
  logOutWindowOpen,
  toggleOpen,
  voidauth,
  removeUid,
  closeCollapse,
}) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticUser");
    localStorage.removeItem("currentuid");
    removeUid();
    voidauth();
    toggleOpen();
    closeCollapse();
    navigate("/");
  }
  return (
    <Modal isOpen={logOutWindowOpen} toggle={toggleOpen}>
      <ModalHeader toggle={toggleOpen}>Log Out</ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column bg-light">
          <div className="m-auto pb-2 ">
            <h1>Log Out?</h1>{" "}
          </div>
          <div className="d-flex gap-4 m-auto">
            <Button color="danger" onClick={handleLogout}>
              Yes
            </Button>
            <Button
              onClick={() => {
                toggleOpen();
              }}
            >
              No
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
