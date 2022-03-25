import React from 'react'
import Header from '../components/Header';
import Card from '../components/Card';
import styles from "../styles/styles.module.css";
import dataWeek from '../data/dataWeek';
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/data`);
  // extract the data
  let data = await response.json();

  return {
      props: {
        dataDB : data["message"]
      }
  };
}

export default function HomePage({dataDB}) {

  const dataFromDataBase = dataDB.map(item => {
    return(
      <React.Fragment key={item._id}>
        <Link href={`/overview/${item._id}`}>
          <a className={styles.a}>
            <Card
              key={item._id}
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
        {dataFromDataBase}
      </div>
    </div>
  )
}