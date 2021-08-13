import Head from 'next/head'
import React, { useEffect, useState } from "react";
import Table from './component/Table'
import { cryptomonnaies } from './crypto'
import { Persons } from './person'
import axios from 'axios'


export default function Home() {

  const [cryptoState, setCryptoState] = useState(cryptomonnaies)

  return (
    <div className="container">
      <Head>
        <title>Crypto converter</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="./css/style.css" />
      </Head>

      <main>
        <h1>
          Résumé des crypto<span className="yellow">Trader</span>
        </h1>

        {cryptoState.length > 0 &&

          cryptoState.map((monnaie, i) => {
            const PersonsWithThisMonnaie = Persons.filter(person => person.investment.some(investment => investment.name === monnaie.name))

            if (PersonsWithThisMonnaie.length > 0) {
              return <Table key={`${monnaie.name}-${i}`} monnaie={monnaie} persons={PersonsWithThisMonnaie} />
            }
          })
        }
      </main>
    </div>
  )
}