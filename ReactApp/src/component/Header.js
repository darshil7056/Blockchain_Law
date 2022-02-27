import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Police } from './Police'

export const Header = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={Logo} height={50} width={50} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <>
                                <Nav.Link as={Link} to="/police">
                                    Police
                                </Nav.Link>

                               
                            </>
                        </Nav>
                    </Navbar.Collapse>
                </Container>



                )
}
