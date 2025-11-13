import {Nav, Navbar, NavLink} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand to="/"><strong> Sistema Kalamo </strong></Navbar.Brand>
                    <Nav className="ml-auto">
                        <NavLink as={Link} to = "/" className="nav-link"> Home </NavLink>
                        <NavLink as={Link} to = "/libros" className="nav-link"> Libros </NavLink>
                        <NavLink as={Link} to = "/editoriales" className="nav-link"> editoriales </NavLink>
                        <NavLink as={Link} to = "/prestamos" className="nav-link"> prestamos </NavLink>
                        <NavLink as={Link} to = "/autores" className="nav-link"> autores </NavLink>
                        <NavLink as={Link} to = "/usuarios" className="nav-link"> usuarios </NavLink>
                    </Nav>

                </Container>
            </Navbar>

        </>
    )
}

export default Header;