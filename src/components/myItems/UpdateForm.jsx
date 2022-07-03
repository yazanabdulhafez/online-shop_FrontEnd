import React from 'react'

const UpdateForm = () => {
  return (
    <div>
      <form onSubmit={(e) => this.props.update(e)}>
          <fieldset>
            <label style={{ marginLeft: "20px", marginRight: "5px" }}>Name of the Book</label>
            <input defaultValue={this.props.books.name} onChange={(e) => this.props.updateBookName(e)} type="text" />

            <label style={{ marginLeft: "20px", marginRight: "5px" }}>Description of the Book</label>
            <input
              defaultValue={this.props.books.description}
              onChange={(e) => this.props.updateDiscOfBook(e)}
              type="text"
            />

            <label style={{ marginLeft: "20px", marginRight: "5px" }}>Status of the Book</label>
            <input
              defaultValue={this.props.books.status}
              onChange={(e) => this.props.updateStatusOfBook(e)}
              type="text"
            />

            <input
              type="submit"
              value="Update Book"
              style={{ marginLeft: "20px", backgroundColor: "#5E8B7E", color: "white", border: "none" }}
            />
          </fieldset>
        </form>
    </div>
  )
}

export default UpdateForm