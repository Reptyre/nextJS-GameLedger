
import React from "react";
import styles from "../styles/styles.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

export default function Card(props){

    return(
        <div className={styles.card} >
            <img src={props.cover} className={styles.cardImg} alt="" />
            <div className={`${props.author === "" ? `${styles.invisible}` : `${styles.visible}`}`}>
                <div className={styles.align}>
                    <img className={styles.icon} src={props.icon} alt="" />
                    <p className={styles.p}>{props.author} </p>
                </div>
                
                {getRating(props.rating)}
            </div>
        </div>
    )
}

function getRating(rating) {  

    return(
        <div 
            style={{
                display: "inline-flex",
                position: "relative",
                textAlign: "left"
            }}
        >
            {[...new Array(5)].map((arr, index) => {
                index += 1
                
                // show black star if rating < -1 or < index -1
                const showEmptyIcon = rating === -1 || rating < index;
                //rating === index
                const isRatingEqualToIndex = Math.ceil(rating) === index
                //rating not 0
                const isRatingUnequalZero = rating !== 0
                //rating not a value with .5
                const isRatingInteger = rating % 1 !== 0
                
                const checkRatingRequirements = isRatingEqualToIndex && isRatingInteger && isRatingUnequalZero
                
                return(
                    <div position="relative" key={index}>
                        <div>
                        {checkRatingRequirements ? 
                            <span className="fa-layers fa-fw">
                                <FontAwesomeIcon icon={faStar} style={{color:"#000"}}  />
                                <FontAwesomeIcon icon={faStarHalf}  />
                            </span> :
                            showEmptyIcon ? <FontAwesomeIcon icon={faStar} style={{color: "#000"}}  />
                            : <FontAwesomeIcon icon={faStar} style={{color: "#ccc"}}  />
                        }
                        </div>
                    </div>

                )
            })}
        </div>
    )
};
