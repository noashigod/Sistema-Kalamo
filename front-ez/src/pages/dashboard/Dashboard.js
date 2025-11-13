import React, {useEffect, useMemo, useState} from 'react';
import {Container, Row, Col, Card, Table, Form, Button} from 'react-bootstrap';


const Dashboard = () => {
  const [locals, setLocals] = useState([]);

  useEffect(() => {

    const fetchLocals = async () => {
      try{
        const response = await fetch("http://localhost:8080/api/findAllLocals");
        const data = await response.json();

        setLocals(data);
      } catch (error) {
        console.error("Error fetching locals", error);
      }
    }

    fetchLocals();
  }, []);

  return (
    <>
       <Container className="mt-5" fluid>
        <Row>
          <Col>
            <h1 className="text-center text-primary"> Locals </h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Floor</th>
                    <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {locals.map((local) => (
                    <tr key={local.id}>
                        <td>{local.name}</td>
                        <td>{local.floor}</td>
                        <td>{local.code}</td>
                      <td>
                        <Button variant='outline-secondary'> Update </Button>{""}
                        <Button variant='outline-danger'> Delete </Button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

       </Container>
    </>
  )



}

export default Dashboard;
