import React from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate, Route, Routes } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


const Checkout = (props) => {
    // const [state, setState] = useState({
    //     ingredients: null,
    //     price: 0
    // })
    // const [searchParams] = useSearchParams()
    // console.log(searchParams, 'checkoutsummary');

    const { ingredients } = useSelector(state => state.burgerBuilder)
    const navigate = useNavigate()

    // useEffect(
    //     () => {

    //         const query = searchParams;

    //         const ingredients = {};
    //         let price = 0;
    //         console.log(query, ingredients, 'checkoutsummary');
    //         for (let param of query.entries()) {
    //             // ['salad', '1']
    //             if (param[0] === 'price') {
    //                 price = param[1];
    //                 setState(state => ({ ...state, Price: price }));
    //             } else {
    //                 ingredients[param[0]] = +param[1];
    //                 setState(state => ({ ...state, ingredients: ingredients }));
    //             }
    //         }
    //     }, [searchParams, state]
    // )

    const checkoutCancelledHandler = () => {
        navigate("/")
    }

    const checkoutContinuedHandler = () => {
        // props.history.replace('/checkout/contact-data');
        navigate('contact-data', { replace: true })
    }

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler} />
            <Routes>
                <Route
                    path={'contact-data'}
                    element={<ContactData />} />
            </Routes>
        </div>
    );
}

export default Checkout;