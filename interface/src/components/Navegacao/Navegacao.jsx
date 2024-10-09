import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from './Navegacao.jsx';
import { useState, useEffect } from 'react';
import { MdLogout } from "react-icons/md";
import AuthRequests from '../../fetch/AuthRequests.js';

function Navegacao() {
    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    };

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    };

    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                </Container>
                {isAuthenticated ? (
                    <>
                        <Nav className="me-auto">
                            <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                        </Nav>
                        <NavDropdown
                            title={<span style={{ color: 'white' }}>Olá {username.split(' ')[0]}</span>}
                            id={style.collapsibleNavDropdown}
                        >
                            <NavDropdown.Item onClick={handleLogout} className={style.navDropdown}>
                                <MdLogout /> Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                ) : (
                    <Button href='/login' variant='light'>Login</Button>
                )}
            </Navbar>
        </>
    );
}

export default Navegacao;
