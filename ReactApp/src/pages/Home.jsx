import React from "react";

import { Button } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import police from "../component/Assets/police.svg";
import lawyer from "../component/Assets/lawyer.svg";
import gov from "../component/Assets/gov.svg";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";

function Home() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

 

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login as..</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ padding: "30px" }}
            className="xs-1 md-4 modal-dialog modal-dialog-centered"
          >
            <div className="row">
              <div
                className="col-4 text-center"
                onClick={(e) => {
                  navigate("/police");
                 
                }}
              >
                <img
                  src={police}
                  height={100}
                  width={100}
                  alt="logo"
                  onClick={() => {
                    navigate("/police");
                  }}
                />
                <h3>Police</h3>
              </div>
              <div className="col-4 text-center" onClick={(e) => {
                navigate("/lawyer");
              }}>
                <img src={lawyer} height={100} width={100} alt="logo" onClick={(e) => {
                  navigate("/lawyer");
                }} />
                <h3>Lawyer</h3>
              </div>
              <div className="col-4 text-center" onClick={() => {
                navigate("/citizen");
              }}>
                <img src={gov} height={100} width={100} alt="logo" onClick={() => {
                  navigate("/citizen");
                }} />
                <h3>Citizen</h3>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Home;
