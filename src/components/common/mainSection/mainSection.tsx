import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


import mainimg from "@assets/svg/mainimg.svg";
import styles from './styles.module.css';
import HeaderCounter from '../Header/HeaderCounter/HeaderCounter';



const { mainText, Text, headerLeftBar,} = styles;

function MainSection() {
    const navigate = useNavigate();
  return (
    <>
<Row
  className="align-items-center p-5"
  style={{
    backgroundImage: `url(${mainimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin:"-2rem 0px 2rem 0px",
  }}
>
      <Col>
      <h1 className={mainText}>
      FIND CLOTHES THAT MATCHES YOUR STYLE
      </h1>
      <p className={Text}>
      Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
      </p>
      <Button
              variant="info"
              style={{ color: "white", padding: "8px 25px", borderRadius: "2rem",     marginBottom:"2rem" }}
              className="mt-auto"
             onClick={() => navigate("categories")}
            >
              Shop Now
            </Button>
            <div className={headerLeftBar}>
      <HeaderCounter
        to=""
        title="Lockal Brands"
        // totalQuantity={wishlistTotalQuantity}
        svgIcon="150 +"
        type="textCoumter"
      />
      <HeaderCounter
        to="/"
        title="High-Quality Products"
        // totalQuantity={cartTotalQuantity}
        svgIcon="650 +"
        type="textCoumter"
      />
       <HeaderCounter
        to=""
        title=" StHappy Customersyles"
        // totalQuantity={cartTotalQuantity}
        svgIcon="1000 + "
        type="textCoumter"
      />
    </div>

      </Col>
      
      <Col>
     
      </Col>
    </Row>
    </>
  )
}

export default MainSection
