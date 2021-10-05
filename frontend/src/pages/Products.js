import React from "react";
import Footer from "../components/Footer";
import { Carousel } from "react-carousel-minimal";
import styles from "../styles/products.module.css";
function Products() {
  const data = [
    {
      image: "https://i.postimg.cc/sg5jwZQH/Nombre-5.png",
    },
    {
      image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png",
    },
    { image: "https://i.postimg.cc/JzBwmcnx/Nombre-9.png" },
  ];

  return (
    <>
      <main className={styles.productsContainer}>
        <section>
          <h1>Filtrar por:</h1>
        </section>
        <section>
          <div className={styles.info}>
            <p>Informática</p>
            <p>Oferta del día</p>
          </div>
          <div className={styles.containerProduct}>
            <h3>
              Notebook Enova 14p Tigerlake I5-1135G7 RAM 8GB SSD 480GB M.2 Win
              10 Home
            </h3>
            <div className={styles.containerImage}>
              <Carousel
                data={data}
                time={2000}
                width="25rem"
                height="25rem"
                automatic={true}
                dots={true}
                slideBackgroundColor="transparent"
                slideImageFit="cover"
                thumbnails={true}
              />
              {/* <div className={styles.image} style={{backgroundImage: "url('https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png')"}}></div> */}
            </div>
          </div>
          <div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Products;
