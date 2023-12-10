import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Home/AuthContext';

function NavBar({handleSearchChange}) {
    const [profileTitle, setProfileTitle] = useState();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        setProfileTitle("Hello, Guest");
        navigate('/home'); // Redirect to the home page 
    };
    useEffect(()=>{
        setProfileTitle(user ?`Hello, ${user.username}` :"Hello, Guest");
    },[])
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#"></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" style={{justifyContent:"space-between",color:"white",height:38}}>
          <div>
          <Nav.Link style={{marginLeft:30}}><Link to="/Home">Home</Link></Nav.Link>
          </div>
          <div>
          {handleSearchChange && <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onSubmit={(e) => e.preventDefault()}
            onChange={handleSearchChange}
          />
        </Form>}
        </div>
        <div style={{marginRight:50}}>
          <NavDropdown title={profileTitle} id="navbarScrollingDropdown">
            {user? (<>
            {user.role !== 3 && <NavDropdown.Item><Link to={`/profile/${user.id}`}>Profile</Link></NavDropdown.Item>}
            {user.role === 3 && <NavDropdown.Item><Link to={`/admin`}>Admin Page</Link></NavDropdown.Item>}
            {user.role === 2 && <NavDropdown.Item><Link to={`/seller`}>Products page</Link></NavDropdown.Item>}
            <NavDropdown.Item>
            <button onClick={handleLogout}>Logout</button>
            </NavDropdown.Item></>) : (<NavDropdown.Item>
                  <Link to="/login">Sign up/Login</Link></NavDropdown.Item>
              )} 
          </NavDropdown>
          </div>
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;