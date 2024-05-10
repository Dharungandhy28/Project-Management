import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../redux/Slice/tasksSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");

  const AddTask = (e) => {
    e.preventDefault();
    console.log({ title, description });
    dispatch(addTaskToServer({ title, description }));
    SetTitle("");
    SetDescription("");
  };

  return (
    <section className="my-5">
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
        <div className="text-end">
          <Button variant="primary" type="submit" onClick={(e) => AddTask(e)}>
            Add Task
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AddTask;
