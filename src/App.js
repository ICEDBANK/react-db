import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Table } from 'react-bootstrap';
import './css/styles.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json')
      .then(response => response.json())
      .then(data => {
        const usersArray = Object.values(data);
        setUsers(usersArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setUsers(prevUsers => [...prevUsers, formData]);
      console.log('Form data submitted:', data);

      // Clear input fields after successful form submission
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: ''
      });
    })
    .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <Container fluid="md">
      <Row>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={e => handleInputChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Age"
                name="age"
                value={formData.age}
                onChange={e => handleInputChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="formBasicEmail"
                value={formData.formBasicEmail}
                onChange={e => handleInputChange(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="formBasicPassword"
                value={formData.formBasicPassword}
                onChange={e => handleInputChange(e.target.value)}
              />
            </Form.Group>
          {/* Repeat Form.Group for other form fields */}
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
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default App;