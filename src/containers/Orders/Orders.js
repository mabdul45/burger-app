import React, { useEffect, useState } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useSelector } from 'react-redux';

const Orders = () => {
    const [state, setState] = useState({
        orders: [],
        loading: true
    });

    const { token, userId } = useSelector(state => state.burgerAuth)

    useEffect(
        () => {
            let ignore = false;
            const queryParams = '?auth=' + token + 'orderBy="userId"&equalTo="' + JSON.parse(userId) + '"';
            console.log(queryParams);
            axios.get('/orders.json' + queryParams)
                .then(res => {
                    const fetchedOrders = [];
                    console.log(res);
                    for (let key in res.data) {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    if (!ignore) {
                        setState({ loading: false, orders: fetchedOrders });
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    setState({ loading: false });
                });

            return () => {
                ignore = true;
            }
        }, [token, userId])

    return (
        <div>

            {state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))}
        </div>
    )
        ;
}

export default withErrorHandler(Orders, axios);