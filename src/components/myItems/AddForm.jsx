import React from 'react'
import { Button, Modal } from 'react-bootstrap'

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
        <form onSubmit={(e) => props.addItem(e)}>

<fieldset>
  <label style={{ marginLeft: "20px", marginRight: "5px" }}>Id</label>
  <input defaultValue={"Id"} onChange={(e) => props.id(e)} type="number" />

  <label style={{ marginLeft: "20px", marginRight: "5px" }}>Title</label>
  <input defaultValue={"Title"} onChange={(e) => props.title(e)} type="text" />

  <label style={{ marginLeft: "20px", marginRight: "5px" }}>Price</label>
  <input defaultValue={"Price"} 
    onChange={(e) => props.price(e)}
    type="number"
  />

  <label style={{ marginLeft: "20px", marginRight: "5px" }}>Description</label>
  <input defaultValue={"Description"} 
    onChange={(e) => props.description(e)}
    type="text"
  />

  <label style={{ marginLeft: "20px", marginRight: "5px" }}>Category</label>
  <input defaultValue={"Category"} 
    onChange={(e) =>props.category(e)}
    type="text"
  /> 
  
  <label style={{ marginLeft: "20px", marginRight: "5px" }}>Image</label>
  <input defaultValue={"Image"} 
    onChange={(e) =>props.image(e)}
    type="text"
  />
  <input
    type="submit"
    value="Add Item"
    style={{ marginLeft: "20px", backgroundColor: "#5E8B7E", color: "white", border: "none" }}
  />

</fieldset>
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default AddForm