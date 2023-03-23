import React, { useEffect, useState } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = () => {
    const [state, setState] = useState({
        orders: [],
        loading: true
    });

    useEffect(
        () => {
            let ignore = false;
            axios.get('/orders.json')
                .then(res => {
                    const fetchedOrders = [];
                    for (let key in res.data) {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    if (ignore) {
                        setState({ loading: false, orders: fetchedOrders });
                    }
                })
                .catch(err => {
                    setState({ loading: false });
                });

            return () => {
                ignore = true;
            }
        }, [state])
    if (state.orders === []) {
        return <Spinner />
    } else {
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
    };
}

export default withErrorHandler(Orders, axios);