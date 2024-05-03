// Update useState imports as per the actual names of the components
import { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Table } from 'react-bootstrap';
import './css/styles.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [formBasicEmail, setFormBasicEmail] = useState('');
  const [formBasicPassword, setFormBasicPassword] = useState('');
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

  const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = {
    'First Name': firstName,
    'Last Name': lastName,
    'Age': age,
    'Email': formBasicEmail,
    'Password': formBasicPassword
  };

  fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    setUsers(prevUsers => [...prevUsers, data]);
    console.log('Form data submitted:', data);

    // Clear input fields after successful form submission
    setFirstName('');
    setLastName('');
    setAge('');
    setFormBasicEmail('');
    setFormBasicPassword('');
  })
  .catch(error => console.error('Error submitting form:', error));
};

  return (
    <>
      <Container fluid="md">
        <Row>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Age"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={formBasicEmail}
                onChange={e => setFormBasicEmail(e.target.value)}
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
                value={formBasicPassword}
                onChange={e => setFormBasicPassword(e.target.value)}
              />
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
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user['First Name']}</td>
                  <td>{user['Last Name']}</td>
                  <td>{user['Age']}</td>
                  <td>{user['Email']}</td>
                  <td>{user['Password']}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}

export default App;
