import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false // State to manage navbar collapse
    };
  }

  // Toggle the navbar collapse state
  toggleNavbar = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    return (
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: 'rgb(3,37,65)' }}>
        <Navbar.Brand href="#" style={{ fontSize: '25px',marginLeft:20, color: '#7ECAA9' }}>MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav" className={this.state.expanded ? 'show' : ''}>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to={`/movieList/${'now_playing'}`} className="text-white">Movies</Nav.Link>
            <Nav.Link as={Link} to={`/serialList/${'top_rated'}`} className="text-white">WebSeries</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
