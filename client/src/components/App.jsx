import "./App.scss";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AirlineView from './AirlineView';

function App() {
  return (
    <div id="App">

      <div id="navbar">
        <Navbar bg="dark" expand="md" fixed="top">
          <Navbar.Brand><span id="brandText">Flight Surety</span></Navbar.Brand>
        </Navbar>
      </div>


      <Container id="main">
        <AirlineView />
      </Container>
    </div>
  );
}

export default App;
