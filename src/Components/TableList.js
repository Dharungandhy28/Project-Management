import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import MyVerticallyCenteredModal from "./UpdateTask";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTask,
  removeFromList,
  getTaskFromServer,
  DeleteTaskFromServer,
} from "../redux/Slice/tasksSlice";

const TableList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const UpdateTask = (task) => {
    console.log("Updated");
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  useEffect(() => {
    dispatch(getTaskFromServer());
  }, [dispatch]);

  const DeleteTask = (task) => {
    console.log(" Deleted");
    dispatch(DeleteTaskFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeFromList(task));
      });
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Table Title</th>
            <th>Table Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, index) => {
              return (
                <tr className="text-center" key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={() => UpdateTask(task)}
                    >
                      <i className="bi bi-pen"></i>
                    </Button>
                    <Button variant="primary">
                      <i
                        className="bi bi-archive"
                        onClick={() => DeleteTask(task)}
                      ></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TableList;
