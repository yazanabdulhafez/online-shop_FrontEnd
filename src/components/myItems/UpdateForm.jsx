import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const UpdateForm = (props) => {
  return (
    <div>

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => props.updateItem(e)}>

            <fieldset>

              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Id</Form.Label>
                <Form.Control type="number" defaultValue={props.element.id} onChange={(e) => props.id(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={props.element.title} onChange={(e) => props.title(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" defaultValue={props.element.price} onChange={(e) => props.price(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={props.element.description} onChange={(e) => props.description(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" defaultValue={props.element.category} onChange={(e) => props.category(e)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" defaultValue={props.element.image} onChange={(e) => props.image(e)} />

              </Form.Group>

              <Button variant="primary" type="submit" onClick={props.onHide}>
                Submit
              </Button>

            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default UpdateForm