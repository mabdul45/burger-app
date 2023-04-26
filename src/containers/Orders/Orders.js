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
    const [mounted, setMounted] = useState(false)
    const { token, userId } = useSelector(state => state.burgerAuth)

    useEffect(
        () => {
            let ignore = false
            if (mounted) {
                const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
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
            } else { setMounted(true) }

            return () => {
                ignore = true;
            }
        }, [token, userId, mounted])

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