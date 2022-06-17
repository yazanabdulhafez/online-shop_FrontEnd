import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

import Item from '../Item';

const Favorite = () => {
  const {user} = useAuth0();
  const [favoriteList, setFavoriteList] = useState([]);


  const [modalShow, setModalShow] = useState(false);
  

  useEffect(() => {
    axios.get(`https://online-shop-ya.herokuapp.com/favList/${user.email}`)
    .then((res) => {
      setFavoriteList(res.data);
    })
    .catch(error => console.log(error));
  }, [user.email])

  

    const removeFromCart=(element)=>{
      axios.delete(`https://online-shop-ya.herokuapp.com/favList/${user.email}/${element.id}`)
      .then((res) => {
        console.log(res.data.favoriteList);
        setFavoriteList(res.data.favoriteList);
       })
      .catch(error => console.log(error));
    }

  return (
    <div>
      <Row>
        {favoriteList.map((element, index) => {
          return (<Col key={index}>

            <Card style={{ width: '18rem', height: '50rem', overflow: "scroll" }}>
              <Card.Img variant="top" src={element.image}
                style={{ width: '15rem', height: '15rem' }}
                onClick={() => setModalShow(true)} />
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text style={{ height: '7rem', overflow: "scroll" }}>
                  {element.description}
                </Card.Text>
                <Card.Text>
                  {element.price}$
                </Card.Text>
                <Button variant="danger" onClick={()=>removeFromCart(element)}>remove</Button>

                <Item
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  image={element.image}
                  title={element.title}
                />
              </Card.Body>
            </Card>
          </Col>
          )
        })
        }
      </Row>
    </div>
  )
}

export default Favorite