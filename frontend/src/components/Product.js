import React from "react";
import Footer from "./Footer";
import { Carousel } from "react-carousel-minimal";
import styles from "../styles/products.module.css";
import { useState } from "react";
const Product = () => {
  const [modal, setModal] = useState(false);
  const [like, setLike] = useState(false);
  const [detailsOn, setDetailsOn] = useState(false);
  const [counter, setConter] = useState(0);
  const data = [
    {
      image: "https://i.postimg.cc/sg5jwZQH/Nombre-5.png",
    },
    {
      image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png",
    },
    { image: "https://i.postimg.cc/JzBwmcnx/Nombre-9.png" },
  ];
  const likeCondition = like
    ? "https://i.postimg.cc/wMWsBC6s/megusta.png"
    : "https://i.postimg.cc/y6nRnZFY/megustalleno.png";
  const details = detailsOn && (
    <div className={styles.details}>
      <p>
        <span className={styles.orange}>Detalles: </span>{" "}
      </p>
      <p>
        <span className={styles.orange}>Marca: </span> MAC
      </p>
      <p>
        <span className={styles.orange}>Color: </span> MAC
      </p>
      <p>
        <span className={styles.orange}> Cerrar</span>
      </p>
    </div>
  );
  return (
    <>
      <main className={styles.productsContainer}>
        <section>
          <h1>Soy la sección de recomendados</h1>
        </section>
        <section>
          <div className={styles.info}>
            <p>Informática</p>
            <p>Oferta del día</p>
          </div>
          <div className={styles.containerProduct}>
            <div className={styles.titleIcon}>
              <h3>
                Notebook Enova 14p Tigerlake I5-1135G7 RAM 8GB SSD 480GB M.2 Win
                10 Home
              </h3>

              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${likeCondition})` }}
                onClick={() => setLike(!like)}
              ></div>
            </div>
            <div className={styles.containerImage}>
              <Carousel
                data={data}
                time={10000}
                width="25rem"
                height="25rem"
                automatic={true}
                dots={true}
                slideBackgroundColor="transparent"
                slideImageFit="cover"
                thumbnails={true}
              />
              <div className={styles.infoProduct}>
                <div className={styles.infoPrice}>
                  <p className={styles.price}>$120000</p>
                </div>
                <div
                  className={styles.promotions}
                  onClick={() => setModal(!modal)}
                >
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/Gt3ydL1C/promociones.png')",
                    }}
                  ></div>
                  <span>Ver todas las promociones</span>
                </div>
                <div className={styles.promotions}>
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/Qt37Yg4V/envio.png')",
                    }}
                  ></div>
                  <p>
                    Te llega a partir de{" "}
                    <span className={styles.orange}>Mañana 6 de Octubre</span>{" "}
                  </p>
                </div>
                <div className={styles.promotions}>
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/rpWW9Z9v/comprasegura.png')",
                    }}
                  ></div>
                  <p>
                    1 Año de garantia oficial. 10 días para cambios y
                    devoluciones
                  </p>
                </div>
                <div
                  className={styles.details}
                  onClick={() => setDetailsOn(!detailsOn)}
                >
                  <p>Características</p>
                  {details}
                </div>
                <div className={styles.counter}>
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/63nKHn7j/3-removebg-preview-2.png')",
                    }}
                    onClick={() => setConter(counter - 1)}
                  ></div>
                  <span>{counter}</span>
                  <div
                    className={styles.icon}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/0NLxdcNK/2-removebg-preview-4.png')",
                    }}
                    onClick={() => setConter(counter + 1)}
                  ></div>
                  <div className={styles.price}>
                    {" "}
                    <p>Agregar</p>{" "}
                  </div>
                </div>
              </div>
              {/* <button onClick={() => setModal(!modal)}>modal</button> */}
              {modal && (
                <div className={styles.modal}>
                  <div
                    className={styles.icon}
                    onClick={() => setModal(!modal)}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png')",
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Product;
