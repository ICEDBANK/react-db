import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age :</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Age" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Joshua</td>
                <td>Rice</td>
                <td>36</td>
                <td>j.e.rice4101@gmail.com</td>
                <td>D8afebbd</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>

    </>
  );
}

export default App;
