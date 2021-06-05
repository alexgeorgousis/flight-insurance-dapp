import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function AirlineView() {
    return (
        <div>
            <h1>Airline</h1>
            <h2>Register New Airline</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Airline Address</Form.Label>
                    <Form.Control type="text" placeholder="e.g. 0x6c540196bF38a54d559630161544b9C9FDaB6ae0"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Airline Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g. Rainbow Airways"></Form.Control>
                </Form.Group>
                <Button>Submit</Button>
            </Form>

            <hr />

            <h2>Register New Flight</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Flight Number</Form.Label>
                    <Form.Control type="text" placeholder="e.g. RA1234"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Flight Time</Form.Label>
                    <Form.Control type="text" placeholder="e.g. some convenient timestamp format...."></Form.Control>
                </Form.Group>
                <Button>Submit</Button>
            </Form>

            <hr />

            <h2>Fund Insurance Pool</h2>
            <Form>
                <Form.Group inline>
                    <Form.Label>Flight Number</Form.Label>
                    <Form.Control type="text" placeholder="e.g. RA1234"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Flight Time</Form.Label>
                    <Form.Control type="text" placeholder="e.g. some convenient timestamp format...."></Form.Control>
                </Form.Group>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}

export default AirlineView;
