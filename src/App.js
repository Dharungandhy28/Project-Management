import "./App.css";
import Navbar from "./Components/Navbar";
import AddTask from "./Components/AddTask";
import Container from "../node_modules/react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableList from "./Components/TableList";

function App() {
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddTask />
          <TableList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
