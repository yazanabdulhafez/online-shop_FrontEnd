import axios from 'axios';
import React, { useState } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'

const Comments = (props) => {

  const [comments, setComments] = useState([]);

  axios.get("https://online-shop-ya.herokuapp.com/comments/fso361435@gmail.com/1")
    .then((res) => {
      // console.log(res.data);
      setComments(res.data);
    })
    .catch((error) => console.log(error.message));

  // console.log(comments);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(comments.size !== 0) ?
          <ListGroup>
            {comments.map((element, index) => {
              return (<ListGroup.Item variant="primary" key={index}>{element.text}</ListGroup.Item>)
            })}

          </ListGroup> :
          <p>no comments for this item</p>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Comments