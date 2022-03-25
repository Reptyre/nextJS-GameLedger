import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

const StarRating = (props) => {

    const calculateRating = (e) =>{
        //get width and left of the element
        const {width, left} = props.ratingRef.current.getBoundingClientRect()
        //calculates the percentage where we have clicked in a decimal value
        let percentage = (e.clientX - left) / width
        //on which star lies the percenatge value, with 5 as the number of total stars we use
        const percentageAsStars = percentage * 5
        //rounding the value according to the precision of 0.5 (2.4 => 2.0 and 2.6 => 3.0)
        //0.5/2 is to make sure wich star we clicked or hovered (if between two stars => which star is the nearest)
        const roundNumber = Math.round((percentageAsStars + 0.5/2)/0.5) * 0.5
        return roundNumber
    }
    
    const handleClick = (e) => {
        props.setIsHovered(false);
        const rating = calculateRating(e);
        props.setNewRating(rating);
        const dataIdAndRatingToUppdate = {
            id: props.id,
            rating: rating
        }
        fetch("/api/data", {
            method: "PUT",
            body: JSON.stringify(dataIdAndRatingToUppdate)
        })
        //props.dataFriend.rating = rating;
        //const updateRating = {rating: rating}
        /* fetch("/api/updateData", {
            method: "POST",
            headers:{"Content-Type": "application/json",},
            body: JSON.stringify([props.dataFriend.id, rating]),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                props.dataFriend.rating = data.rating
            }) */
    };
    
    const handleMouseMove = (e) => {
      props.setIsHovered(true);
      props.setHoverActive(calculateRating(e));
    };

    const handleMouseLeave = (e) => {
      props.setHoverActive(props.oldRating); // Reset to default state
      props.setIsHovered(false);
    };

    return(
        <div 
            style={{
                display: "inline-flex",
                position: "relative",
                textAlign: "left"
            }}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={props.ratingRef}
        >
            {[...new Array(5)].map((arr, index) => {
                index += 1
                // If true show hovered rating, if false show rating
                const rating = props.isHovered ? props.hoverActive : props.oldRating
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
                        {/*  
                        <div style={{ 
                                width: checkRatingRequirements ? `${(rating % 1) * 20}%` : "0%",
                                overflow: "hidden", 
                                position: "absolute" 
                                }}
                        >
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc"}} size="2x" />
                        </div>

                        <div>
                            {showEmptyIcon ? 
                            <FontAwesomeIcon icon={faStar} style={{color: "#000"}} size="2x" /> :
                            <FontAwesomeIcon icon={faStar} style={{color: "#ccc"}} size="2x" />
                            }
                        </div>
                        */}
                        <div className="fa-2x">
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
}

export default StarRating