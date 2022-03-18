import React from 'react'
import Header from '../components/Header';
import dataFriends from '../data/dataFriends';
import Card from '../components/Card';
import styles from "../styles/styles.module.css";
import dataWeek from '../data/dataWeek';
import Head from 'next/head';
import Link from 'next/link';


export default function HomePage() {
  
  const cardsFriends = dataFriends.map(item => {
    return(
      <React.Fragment key={item.id}>
        <Link href={`/overview/${item.id}`}>
          <a className={styles.a}>
            <Card
              key={item.id}
              {...item}
            />
          </a>
        </Link>  
      </React.Fragment>
    )
  })

  const cardsWeek = dataWeek.map(item => {
    return(
      <React.Fragment key={item.id}>
         <Link href={`/overview/${item.id}`}>
          <a className={styles.a}>
            <Card
              key={item.id}
              {...item}
            />
          </a>
        </Link>  
      </React.Fragment>
    )
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Title of the Application</title>
      </Head>
      <Header title="Title of the Application" />
      <h2 style={{paddingLeft:"1rem"}}>Popular this week</h2>
      <div className={styles.cardContainer}>
        {cardsWeek}
      </div>
      <h2 style={{paddingLeft:"1rem"}}>New from friends</h2>
      <div className={styles.cardContainer}>
        {cardsFriends}
      </div>
    </div>
  )
}