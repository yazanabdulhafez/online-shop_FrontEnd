import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'
import Comments from '../comments/Comments';
import Item from '../Item';

const Home = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [products, setProducts] = useState([]);

  if (isAuthenticated) {
    axios.get("https://online-shop-ya.herokuapp.com/users")
      .then((response) => {
        console.log(response.data);
        createNewUser(response);
      }).catch(error => console.log(error.message))
  }


  useEffect(() => {
    axios.get("https://online-shop-ya.herokuapp.com/data")
      .then((response) => {
        const products=[];
        response.data.forEach(item => item.addedProducts.map(item => products.push(item)));
        console.log(response.data);
        setProducts(products);

        
        const cartItems=[];
        response.data.forEach((item) => {if(item.email===user.email){
          item.cartList.map(item => cartItems.push(item))}
         });  
        console.log(cartItems.length);
        props.changeCount(cartItems.length);
        

      })
      .catch(error => console.log(error.message))
  }, [props, user.email])

  const createNewUser = (response) => {
    if (!response.data.some(item => item === user.email)) {


      axios.post(`https://online-shop-ya.herokuapp.com/user/${user.email}`)
        .then(res => console.log(res))
        .catch(error => console.log(error.message));
    }
  }


  const [modalShow, setModalShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const modalSetting = (element) => {
    setImage(element.image);
    setTitle(element.title);
    setImageShow(true);
  }

  const modalShowSetting = (element) => {
    setId(element.id);
    setModalShow(true);
  }

  const [count, setCount] = useState(0);
  console.log(count);

  const addToCart = (e, element) => {
    e.preventDefault();
    const dataBody = {
      email: user.email,
      id: element.id,
      title: element.title,
      price: element.price,
      description: element.description,
      category: element.category,
      image: element.image,
      comments: element.comments

    }
    axios.post(`https://online-shop-ya.herokuapp.com/cart`, dataBody)
      .then((res) => {
        console.log(res.data);
        setCount(res.data.length);
        props.changeCount(res.data.cartList.length);
    
      })
      .catch(error => console.log(error));
  }

  const addToFav = (e, element) => {
    e.preventDefault();
    const dataBody = {
      email: user.email,
      id: element.id,
      title: element.title,
      price: element.price,
      description: element.description,
      category: element.category,
      image: element.image,
      comments: element.comments

    }
    axios.post(`https://online-shop-ya.herokuapp.com/favList`, dataBody)
      .then((res) => {
        setCount(res.data.length);

      })
      .catch(error => console.log(error));
  }


  return (

    <div>
      <Row>
        {products.map((element, index) => {
          return (<Col key={index}>

            <Card style={{ width: '18rem', height: '50rem', overflow: "scroll" }}>
              <Card.Img variant="top" src={element.image}
                style={{ width: '15rem', height: '15rem' }}
                onClick={() => modalSetting(element)} />
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text style={{ height: '7rem', overflow: "scroll" }}>
                  {element.description}
                </Card.Text>
                <Card.Text>
                  {element.price}$
                </Card.Text>
                {isAuthenticated && <Button variant="primary" onClick={(e) => addToFav(e, element)}>Add to Favorite</Button>}
                {isAuthenticated && <Button variant="primary" onClick={(e) => addToCart(e, element)}>Add to Cart</Button>}
                <Button variant="primary" onClick={() => modalShowSetting(element)}>
                  comments
                </Button>




              </Card.Body>
            </Card>
          </Col>
          )
        })
        }
      </Row>

      {<Comments
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
      />
      }

      {<Item
        show={imageShow}
        onHide={() => setImageShow(false)}
        image={image}
        title={title}
      />
      }
    </div>
  )
}

export default Home