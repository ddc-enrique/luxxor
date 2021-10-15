import React from "react";
import styles from "../styles/photoCard.module.css";

const PhotoCard = () => {
  return (
    <div className={styles.checkout}>
      <div className={styles.creditCardBox}>
        <div className={styles.flip}>
          <div className={styles.front}>
            <div className={styles.chip}></div>
            <div className={styles.logo}></div>
            <div className={styles.number}></div>
            <div className={styles.cardHolder}>
              <label>Card holder</label>
              <div></div>
            </div>
            <div className={styles.cardExpirationDate}>
              <label>Expires</label>
              <div></div>
            </div>
          </div>
          <div className={styles.back}>
            <div className={styles.logo}>
              <div className={styles.cardBack}></div>
            </div>
            <div className={styles.ccv}>
              <label>CCV</label>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
