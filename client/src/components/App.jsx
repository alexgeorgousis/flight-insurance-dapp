import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">

      <Navbar bg="dark" expand="md">
        <Navbar.Brand><span style={{ color: "white" }}>Flight Surety</span></Navbar.Brand>
      </Navbar>

      <Container style={{ background: "#000", color: "#fff", opacity: 0.8 }}>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
