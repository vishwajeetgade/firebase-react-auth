import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const NavBarComp = () => {
    const { currentUser, logout } = useAuth();
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Auth</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        {currentUser ? (
                            <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarComp
