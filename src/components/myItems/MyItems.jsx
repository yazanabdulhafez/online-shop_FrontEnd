import React,{useState,useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Item from '../Item';
import {MdAddCircleOutline} from 'react-icons/md';
import { Draggable } from 'drag-react';
import AddForm from './AddForm';


const MyItems = () => {

  const { user,isAuthenticated} = useAuth0();
  const [myItems,setMyItems]=useState([]);

  const [imageShow, setImageShow] = useState(false);
  const [addFormShow, setAddFormShow] = useState(false);
  const [updateFormShow, setUpdateFormShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const[id,setId]=useState(0);
  const [title, setTitle] = useState("");
  const[price,setPrice]=useState("");
  const[description,setDescription]=useState("");
  const[category,setCategory]=useState("");
  const [image, setImage] = useState("");
  

  useEffect(() => {
    axios.get("https://online-shop-ya.herokuapp.com/data")
      .then((response) => {
        const userItems = [];
              response.data.forEach((item) => {
                if (item.email === user.email) {
                  item.addedProducts.map(item => userItems.push(item))
                }
              });
              setMyItems(userItems);
            }).catch(error => console.log(error.message))
      
  }, [user.email])

  const modalSetting = (element) => {
    setImage(element.image);
    setTitle(element.title);
    setImageShow(true);
  }

  const createItem=(e)=>{
    e.preventDefault();

    const dataBody = {
      email: user.email,
      id: id,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image

    }
    axios.post(`https://online-shop-ya.herokuapp.com/item`,dataBody)
    .then((response) => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }


  const removeItem=(element)=>{
    axios.delete(`https://online-shop-ya.herokuapp.com/item/${user.email}/${element.id}`)
    .then((response) => {
      const userItems = [];
              response.data.forEach((item) => {
                if (item.email === user.email) {
                  item.addedProducts.map(item => userItems.push(item))
                }
              });
              setMyItems(userItems);
    })
    .catch(error => console.log(error));
  }



  const showAddItemForm = () => {
    setAddFormShow(true);
  }
  const closeAddItemForm = () => {
    setAddFormShow(false);
  }


  const showUpdateItemForm = () => {
   setUpdateFormShow(true);
  }
  const closeUpdateItemForm = () => {
    setUpdateFormShow(false);
  }


 const updateId = (e) =>setId(e.target.value) ;
 const updateTitle = (e) =>setTitle(e.target.value) ;
 const updatePrice = (e) =>setPrice(e.target.value) ;
 const updateDescription = (e) =>setDescription(e.target.value) ;
 const updateCategory = (e) =>setCategory(e.target.value) ;
 const updateImage = (e) =>setImage(e.target.value) ;


  return (

    <>
    <Draggable> 
    <div>
    {isAuthenticated && <Button variant="primary" title="add new item" className='add_btn'
    onClick={()=>setModalShow(true)}
    ><MdAddCircleOutline /></Button>}
    </div>
    </Draggable>
   
     <div>
      <Row>
        {myItems.map((element, index) => {
          return (<Col key={index}>

            <Card style={{ width: '18rem', height: '30rem', marginTop: '2rem' }}>
              <Card.Img variant="top" src={element.image}
                style={{ width: '17rem', height: '15rem' ,margin:'auto'}}
                onClick={() => modalSetting(element)} />
              <Card.Body style={{ height: '7rem', overflow: "scroll" }}>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text >
                  {element.description}
                </Card.Text>
                <Card.Text style={{margin:'auto'}}>
                  {element.price}$
                </Card.Text>

              </Card.Body>
              <Card.Footer style={{display:'flex',justifyContent:'space-between'}}>
              {isAuthenticated && <Button variant="primary" >update</Button>}
                
              {isAuthenticated && <Button variant="danger"onClick={() => removeItem(element)}>remove</Button>}
              </Card.Footer>

            </Card>
          </Col>
          )
        })
        }
      </Row>


      {<Item
        show={imageShow}
        onHide={() => setImageShow(false)}
        image={image}
        title={title}
      />
      }

      {<AddForm
      show={modalShow}
      onHide={() => setModalShow(false)}
      close={closeAddItemForm}
      addItem={createItem}
      id={updateId}
      title={updateTitle}
      price={updatePrice}
      description={updateDescription}
      category={updateCategory}
      image={updateImage}
      />
      }


    </div>
    </>
  )
}

export default MyItems;