import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'
import Comments from '../comments/Comments';
import Item from '../Item';
import {GrFavorite} from 'react-icons/gr';
import { GiShoppingCart } from 'react-icons/gi'

const Home = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [products, setProducts] = useState([]);
  // const [userProducts, setUserProducts] = useState([]);

  if (isAuthenticated) {
    axios.get("https://online-shop-ya.herokuapp.com/users")
      .then((response) => {
        console.log(response.data);
        createNewUser(response);
      }).catch(error => console.log(error.message))
  }

  useEffect(() => {
    axios.get("https://online-shop-ya.herokuapp.com/products")
      .then(response =>
        setProducts(response.data)
      ).catch(error => console.log(error.message))

  }, [])

  // useEffect(() => {
  //   axios.get("https://online-shop-ya.herokuapp.com/data")
  //     .then((response) => {
  //       const products = [];
  //       response.data.forEach(item => item.addedProducts.map(item => products.push(item)));
  //       console.log(response.data);
  //       setProducts(products);

  //       const userItems = [];
  //       response.data.forEach((item) => {
  //         if (item.email === user.email) {
  //           item.addedProducts.map(item => userItems.push(item))
  //         }
  //       });
  //       setUserProducts(userItems);
  //     }).catch(error => console.log(error.message))

  // }, [])

  if (isAuthenticated) {
    const cartItems = [];
    axios.get("https://online-shop-ya.herokuapp.com/data")
      .then(response => response.data.forEach((item) => {
        if (item.email === user.email) {
          item.cartList.map(item => cartItems.push(item))
        }
      }));
    console.log(cartItems.length);
    props.changeCount(cartItems.length);
  }


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

            <Card style={{ width: '18rem', height: '30rem', marginTop: '2rem' }}>
              <Card.Img variant="top" src={element.image}
                style={{ width: '17rem', height: '15rem' ,margin:'auto'}}
                onClick={() => modalSetting(element)} />
              <Card.Body style={{ height: '7rem', overflow: "scroll" }}>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text >
                  {element.description}
                </Card.Text>
             

              </Card.Body>
              <Card.Footer>
             
                <div style={{display:'flex',justifyContent:'space-between'}}>
                {isAuthenticated && <Button variant="primary" onClick={(e) => addToFav(e, element)}><GrFavorite /></Button>}
                <Card.Text style={{margin:'auto'}}>
                  {element.price}$
                </Card.Text>
                {isAuthenticated && <Button variant="primary" onClick={(e) => addToCart(e, element)}><GiShoppingCart /></Button>}
                </div>
                <Button style={{marginTop:'2rem'}} variant="success" onClick={() => modalShowSetting(element)}>
                  comments
                </Button>
                {/* {(userProducts.some(item=>item.id===element.id))&&
                isAuthenticated && <Button variant="primary" >Remove</Button>
                } */}
              </Card.Footer>

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