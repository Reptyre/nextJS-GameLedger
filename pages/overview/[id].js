
import React, {useEffect} from "react";
import styles from "../../styles/styles.module.css";
import Header from "../../components/Header";
import Friends from "../../components/Friends";
import dataFriends from "../../data/dataFriends";
import Link from "next/link";
import Head from 'next/head';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StarRating from "../../components/StarRating";

export async function getStaticPaths(){
  const paths = dataFriends.map(item =>({
    params: {id: item.id.toString()},
  }))
  return {paths, fallback: false}
}

export async function getStaticProps({params}){
  const data = dataFriends.filter(d => d.id.toString() === params.id)
  return {
    props: {
      id: data[0].id
    }
  }
}

export default function Detail({id}){

  const index = id
  const [newRating, setNewRating] = React.useState(dataFriends[index].rating)
  const [hoverActive, setHoverActive] = React.useState(dataFriends[index].rating)
  const [isHovered, setIsHovered] = React.useState(false)
  const ratingRef = React.useRef(null)
  
  
  useEffect(() =>{
    console.log("used Effect")
  }, [])

  return(
    <div className={styles.container}>
      <Head>
        <title>{dataFriends[index].title}</title>
      </Head>
      <Header title={dataFriends[index].title}/>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
          <Link href="/">
            <a className={styles.a}>
              <FontAwesomeIcon icon={faArrowLeft}/>
            </a>
          </Link>
          <h1>{dataFriends[index].title}</h1>
          <h2>{dataFriends[index].release}</h2>
          <label htmlFor="rating"> 
            <StarRating 
              setNewRating={setNewRating} 
              oldRating={newRating}
              setHoverActive={setHoverActive}
              hoverActive={hoverActive}
              setIsHovered={setIsHovered}
              isHovered={isHovered}
              ratingRef={ratingRef}
              dataFriend={dataFriends[index]}
            />
          </label>
          <h4>Prev: {newRating} New: {hoverActive}</h4>
        </div>
        <div className={styles.right}>
          <img src={dataFriends[index].cover} />
        </div>

      </div>
      <Friends title={dataFriends[index].title}/>
    </div>
  )
}
