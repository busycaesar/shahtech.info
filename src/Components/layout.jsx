import React from "react";
import { Row, Col } from "react-bootstrap";
import NavBar from "./navBar";

const NAV_ITEMS = [
  "About",
  "Speaking",
  "Blogs & Videos",
  "Projects",
  "Certificates",
];

export default function Layout(props) {
  return (
    <Row>
      <Col sm={2}>
        <NavBar navBarItems={NAV_ITEMS} />
      </Col>
      <Col sm={10}>
        <div className="main-content">{props.children}</div>
      </Col>
    </Row>
  );
}
