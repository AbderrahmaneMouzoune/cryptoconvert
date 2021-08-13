import axios from "axios";
import React, { useEffect, useState } from "react";
import { Monnaie, Person } from "../types";
import { KEY } from "../../conf";

interface TableProps {
    monnaie: Monnaie;
    persons: Person[];
}

axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = KEY
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


function Table({ monnaie, persons }: TableProps) {

    const [change, setmonnaieState] = useState(monnaie.change)

    useEffect(() => {
        console.log('BROOO')
        axios.get('https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=1&convert_id=2790&id=52')
            .then((response) => {
                setmonnaieState(response.data.data.quote[2790].price.toFixed(2))
                console.log(response.data.data.quote[2790].price.toFixed(2))
            })
            .catch((error) => {
                console.log(error)
            })
            .then(() => {
                console.log('the end')
            })
    })

    return (
        <>
            <h2>
                <strong>
                    Investissement dans le <span className="yellow">{monnaie.name}</span>
                </strong>
            </h2>

            <h2>
                Taux de change actuel <span className="yellow">{change ? change.toString() : monnaie.change.toString()}</span>
            </h2>

            <table className="container">
                <thead>
                    <tr>
                        <th>
                            <h1>Nom</h1>
                        </th>
                        <th>
                            <h1>Nombre de {monnaie.name}</h1>
                        </th>
                        <th>
                            <h1>Prix à l'achat unité</h1>
                        </th>
                        <th>
                            <h1>Valeur actuel</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {persons.length > 0 &&
                        persons.map((person, i) => {
                            const nbrCrypto =
                                person.investment.find((crypto) => crypto.name === monnaie.name)
                                    .valueInitial /
                                person.investment.find((crypto) => crypto.name === monnaie.name)
                                    .changeOnBuy;

                            const changeCrypto = (change ? change : monnaie.change)
                            return (

                                <Row
                                    key={`${person.name}-${i}`}
                                    name={person.name}
                                    nbrCrypto={nbrCrypto.toFixed(2)}
                                    priceU={
                                        person.investment.find(
                                            (crypto) => crypto.name === monnaie.name
                                        ).changeOnBuy
                                    }
                                    valueActuel={(nbrCrypto * changeCrypto).toFixed(2)}
                                />
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}


function Row({ name, nbrCrypto, priceU, valueActuel }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{nbrCrypto}</td>
            <td>{priceU} €</td>
            <td>{valueActuel} €</td>
        </tr>
    )
}

export default Table;
