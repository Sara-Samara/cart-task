import React from 'react';
import Catgories from '../../component/catgories/Catgories';
import Product from '../../component/product/product';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Container from '@mui/material/Container';
import styles from './Home.module.css';


const images = [
  "/images/slider_1-1-copyright.jpg",
  "/images/slider_1-2-copyright.jpg",
  "/images/slider_1-3-copyright.jpg"
];



const Home = () => {
const text = [
  "Enjoy the new 48 pixel camera".split(''),
  "Upgrade your laptop today".split(" "),
  "A sharper view on your wrist".split(" ")
];
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    renderMode: 'performance',
    drag: true,
    created(s) {
      setInterval(() => {
        s.next()
      }, 5000) 
    }
  });

  return (
    <>
      <Container
        disableGutters
        sx={{
          width:{
            xs:'100%',
            sm:'95%',
            md:'90%',
            lg:'85%',
            xl:'80%',

          } ,
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          my: {
            xs: 1,
            sm: 3,
            md: 4
          },
          position: 'relative'
        }}
      >
        <div
          ref={sliderRef}
          className="keen-slider"
          style={{ width: '100%' }}
        >
          {images.map((src, idx) => (
            <div key={idx} className={`keen-slider__slide ${styles.mySlider}`}>
              <img
                className={styles.zoomImg}
                src={src}
                alt={`slide-${idx}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '40px',
                  display: 'block', 
                  position:'relative'
                }}
              />
            </div>
          ))}
        </div>
      </Container>

      <Product />
      <Catgories />
    </>
  );
};

export default Home;