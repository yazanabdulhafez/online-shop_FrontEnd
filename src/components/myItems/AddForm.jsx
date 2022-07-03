import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const AddForm = (props) => {
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
          <Form onSubmit={(e) => props.addItem(e)}>

            <fieldset>

              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>Id</Form.Label>
                <Form.Control type="number" placeholder="Enter ID" onChange={(e) => props.id(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={(e) => props.title(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Price" onChange={(e) => props.price(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter Description" onChange={(e) => props.description(e)} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter Category" onChange={(e) => props.category(e)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Enter Image Source" onChange={(e) => props.image(e)} />

              </Form.Group>

              <Button variant="primary" type="submit">
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

export default AddForm