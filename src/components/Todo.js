import React, { useState } from "react";
import db from "../firebase";
import "./Todo.scss";
import {
  ListItemText,
  List,
  ListItem,
  Modal,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

function Todo(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // Modal styles and content
  const [modalStyle] = useState(getModalStyle);

  const updateTodo = () => {
    // update the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <FormControl>
            <InputLabel>{props.todo.todo}</InputLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={(e) => updateTodo()}>Update Todo</Button>
          </FormControl>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Todo" />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}>Edit</Button>
        <DeleteIcon
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            db.collection("todos").doc(props.todo.id).delete(); // deletes an item from firebase based on their unique id
          }}
        />
      </List>
    </>
  );
}

export default Todo;
