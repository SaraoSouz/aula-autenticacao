import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { useState, useEffect } from 'react';

function Navegacao() {
    // criando estado para controlar a renderização condicional
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    /**
    * Verifica a autenticação do usuário
    */
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');   // recupera o token do localstorage
        if (token && AuthRequests.checkTokenExpiry()) {  // varifica a validade do token
            setIsAuthenticated(true);  // caso o token seja válido, seta o valor de autenticação para true
            setUsername(username);
        } else {
            setIsAuthenticated(false);  // caso o token seja inválido, seta o valor de autenticação para false
            setUsername('');
        }
    }, []);

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    }

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    }

    const logout = () => {
        AuthRequests.removeToken();
    }

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    {/* a opção Home é renderizada para todos os usuários, independente de estarem autenticados ou não */}
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>
                    {isAuthenticated ? ( // verifica se o usuário está autenticado (true)
                        // renderiza as opções de navegação para usuário autenticado
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                            </Nav>

                            <p style={{ color: 'white', marginTop: '20px' }}>Olá, {username}</p>
                            <Button variant='light' onClick={logout} style={{ marginLeft: '20px' }}>Sair</Button>
                        </>



                    ) : (
                        // renderiza as opções de navegação para usuário não autenticado
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;