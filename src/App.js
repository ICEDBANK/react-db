import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import './css/styles.css';

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [age, setAge] = useState('');
  const [formBasicEmail, setformBasicEmail] = useState('');
  const [formBasicPassword, setformBasicPassword] = useState('');

  const [data, setData] = useState([]);

  const handleFormSubmit = (e) => {

    e.preventDefault();

    const formDate = new FormData();
    formDate.append('First Name', firstName);
    formDate.append('Last Name', lastName);
    formDate.append('Age', age);
    formDate.append('Email', formBasicEmail);
    formDate.append('Password', formBasicPassword);

    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/', {

      method: 'POST',
      body: JSON.stringigy(Object.fromEntries(formDate)),
      header: {
          
        'Content-Type' : "application/Data",

      },

    })

  }

  return (
    <>
      <Container fluid="md">
        <Row>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="firstName" onChange={e => setFirstName(e.target.value)}>
              <Form.Label>First Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" onChange={e => setlastName(e.target.value)}>
              <Form.Label>Last Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age" onChange={e => setAge(e.target.value)}>
              <Form.Label>Age :</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Age" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setformBasicEmail(e.target.value)}>
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setformBasicPassword(e.target.value)}>
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
