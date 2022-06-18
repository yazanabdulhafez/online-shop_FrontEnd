import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

import Item from '../Item';

const Cart = (props) => {
  const {user} = useAuth0();
  const [cartList, setCartList] = useState([]);


  const [modalShow, setModalShow] = useState(false);
  

  useEffect(() => {
    axios.get(`https://online-shop-ya.herokuapp.com/cart/${user.email}`)
    .then((res) => {
      setCartList(res.data);
      props.changeCount(res.data.length);
    })
    .catch(error => console.log(error));
  }, [props, user.email])

  

    const removeFromCart=(element)=>{
      axios.delete(`https://online-shop-ya.herokuapp.com/cart/${user.email}/${element.id}`)
      .then((res) => {
        console.log(res.data.cartList);
        setCartList(res.data.cartList);
        props.changeCount(res.data.cartList.length);
       })
      .catch(error => console.log(error));
    }

  return (
    <div>
      <Row>
        {cartList.map((element, index) => {
          return (<Col key={index}>

            <Card style={{ width: '18rem', height: '30rem', marginTop: '2rem' }}>
              <Card.Img variant="top" src={element.image}
                style={{ width: '17rem', height: '15rem' ,margin:'auto'}}
                onClick={() => setModalShow(true)} />
              <Card.Body style={{ height: '7rem', overflow: "scroll" }}>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text >
                  {element.description}
                </Card.Text>
                <Item
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  image={element.image}
                  title={element.title}
                />
              </Card.Body>
              <Card.Footer>
              <Card.Text style={{margin:'auto'}}>
                  {element.price}$
                </Card.Text>
                <Button variant="danger" onClick={()=>removeFromCart(element)}>remove</Button>
              
              </Card.Footer>
            </Card>
          </Col>
          )
        })
        }
      </Row>
    </div>
  )
}

export default Cart