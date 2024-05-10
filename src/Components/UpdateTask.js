import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UpdateTaskInServer } from "../redux/Slice/tasksSlice";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";

const MyVerticallyCenteredModal = (props) => {
  const { selectedTask } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [id, Setid] = useState(0);

  const UpdateTask = () => {
    props.onHide();
    dispatch(UpdateTaskInServer({ id, title, description }));
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      SetTitle(selectedTask.title);
      SetDescription(selectedTask.description);
      Setid(selectedTask.id);
    }
  }, [selectedTask]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Task Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => SetDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => UpdateTask(e)}
          >
            Update Task
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
