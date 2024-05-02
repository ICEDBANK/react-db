import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
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

    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json', {
  method: 'POST',
  body: JSON.stringify(Object.fromEntries(formDate)), // Fix typo here
  headers: {
    'Content-Type': 'application/Data', // Fix typo here
  },
})
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

  }

  return (
    <>
      <Container fluid="md">
        <Row>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="firstName" onChange={e => setFirstName(e.target.value)}>
              <Form.Label>First Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" value={firstName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" onChange={e => setlastName(e.target.value)}>
              <Form.Label>Last Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" value={lastName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="age" onChange={e => setAge(e.target.value)}>
              <Form.Label>Age :</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Age" value={age}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setformBasicEmail(e.target.value)}>
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" value={formBasicEmail}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setformBasicPassword(e.target.value)}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={formBasicPassword}/>
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
