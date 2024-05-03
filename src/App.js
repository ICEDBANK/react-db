import React, { useState, useEffect } from 'react';
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

    const newUser = {
      'First Name': firstName,
      'Last Name': lastName,
      'Age': age,
      'Email': formBasicEmail,
      'Password': formBasicPassword
    };

    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setUsers(prevUsers => [...prevUsers, newUser]);
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
    <Container fluid="md">
      <Row>
        <Form onSubmit={handleFormSubmit}>
          {/* Form fields */}
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
  );
}

export default App;
