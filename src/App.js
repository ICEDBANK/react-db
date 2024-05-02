import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
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

    const formData = new FormData();
    formData.append('First Name', firstName);
    formData.append('Last Name', lastName);
    formData.append('Age', age);
    formData.append('Email', formBasicEmail);
    formData.append('Password', formBasicPassword);

    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Update the users state with the new user data
      setUsers(prevUsers => [...prevUsers, data]);
      console.log('Form data submitted:', data);
    })
    .catch(error => console.error('Error submitting form:', error));
}


  return (
    <>
      <Container fluid="md">
        <Row>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="firstName" onChange={e => setFirstName(e.target.value)}>
              <Form.Label>First Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" defaultValue={firstName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" onChange={e => setLastName(e.target.value)}>
              <Form.Label>Last Name :</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" defaultValue={lastName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="age" onChange={e => setAge(e.target.value)}>
              <Form.Label>Age :</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Age" defaultValue={age}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setFormBasicEmail(e.target.value)}>
              <Form.Label>Email :</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" defaultValue={formBasicEmail}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setFormBasicPassword(e.target.value)}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" defaultValue={formBasicPassword}/>
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
