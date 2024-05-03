// Import useState and useEffect hooks from React
import { useState, useEffect } from 'react';
// Import Bootstrap components for layout and form elements
import { Container, Row, Form, Button, Table } from 'react-bootstrap';
// Import custom CSS styles
import './css/styles.css';

// Define the main App component
function App() {
  // Define state variables for form inputs and user data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [formBasicEmail, setFormBasicEmail] = useState('');
  const [formBasicPassword, setFormBasicPassword] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch user data from the server when the component mounts
  useEffect(() => {
    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json')
      .then(response => response.json())
      .then(data => {
        // Convert object to array of users
        const usersArray = Object.values(data);
        // Update users state with fetched data
        setUsers(usersArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct form data object
    const formData = {
      'First Name': firstName,
      'Last Name': lastName,
      'Age': age,
      'Email': formBasicEmail,
      'Password': formBasicPassword
    };

    // Send form data to server
    fetch('https://api-db-a57ed-default-rtdb.firebaseio.com/user.json', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(data => {
        // Construct user object with unique identifier
        const userData = { 
          'First Name': firstName,
          'Last Name': lastName,
          'Age': age,
          'Email': formBasicEmail,
          'Password': formBasicPassword,
          'id': data.name // assuming 'name' is the unique identifier
        };
        // Update users state with newly added user
        setUsers(prevUsers => [...prevUsers, userData]);
        // Log form data for debugging
        console.log('Form data submitted:', userData);

        // Clear input fields after successful form submission
        setFirstName('');
        setLastName('');
        setAge('');
        setFormBasicEmail('');
        setFormBasicPassword('');
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  // Render the UI
  return (
    <>
      <Container fluid="md">
        <Row>
          {/* Form for user input */}
          <Form onSubmit={handleFormSubmit}>
            {/* Input fields for user information */}
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>
            {/* Similar Form.Group elements for Last Name, Age, Email, and Password */}
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Row>
        {/* Table to display user data */}
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
              {/* Map over users array to display user data */}
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

// Export the App component as default
export default App;
