
import React, {useEffect} from "react";
import styles from "../../styles/styles.module.css";
import Header from "../../components/Header";
import Friends from "../../components/Friends";
import Link from "next/link";
import Head from 'next/head';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StarRating from "../../components/StarRating";
import Image from "next/image";

export async function getStaticPaths(){

  // get the current environment
let dev = process.env.NODE_ENV !== 'production';
let { DEV_URL, PROD_URL } = process.env;
  // request posts from api
let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/data`);
// extract the data
let data = await response.json();
  
  const paths = data["message"].map(item =>({
    params: {id: item._id.toString()},
  }))
  return {paths, fallback: false}
}

export async function getStaticProps({params}){

  // get the current environment
let dev = process.env.NODE_ENV !== 'production';
let { DEV_URL, PROD_URL } = process.env;
  // request posts from api
let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/data`);
// extract the data
let data = await response.json();

  const dataDB = data["message"].filter(d => d._id.toString() === params.id)
  return {
    props: {
      id: dataDB[0]._id,
      title: dataDB[0].title,
      release: dataDB[0].release,
      author: dataDB[0].author,
      icon: dataDB[0].icon,
      rating: dataDB[0].rating,
      cover: dataDB[0].cover
    }
  }
}

export default function Detail(props){

  //const index = id
  const [newRating, setNewRating] = React.useState(props.rating)
  const [hoverActive, setHoverActive] = React.useState(props.rating)
  const [isHovered, setIsHovered] = React.useState(false)
  const ratingRef = React.useRef(null)
  
  
  useEffect(() =>{
    console.log("used Effect")
  }, [])

  return(
    <div className={styles.container}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header title={props.title}/>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
          <Link href="/">
            <a className={styles.a}>
              <FontAwesomeIcon icon={faArrowLeft}/>
            </a>
          </Link>
          <h1>{props.title}</h1>
          <h2>{props.release}</h2>
          <label htmlFor="rating"> 
            <StarRating 
              setNewRating={setNewRating} 
              oldRating={newRating}
              setHoverActive={setHoverActive}
              hoverActive={hoverActive}
              setIsHovered={setIsHovered}
              isHovered={isHovered}
              ratingRef={ratingRef}
              dataFriend={props}
              id={props.id}
            />
          </label>
          <h4>Prev: {newRating} New: {hoverActive}</h4>
        </div>
        <div className={styles.right}>
          <img src={props.cover} alt="" />
        </div>

      </div>
      <Friends title={props.title}/>
    </div>
  )
}
