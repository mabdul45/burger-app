import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import { burgerBuilderActions, fetchIngredients } from "../../store/burgerbuilderSlice/burgerbuilderSlice";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const BurgerBuilder = (props) => {
    const { ingredients, totalPrice } = useSelector((state) => state.burgerBuilder);
    const dispatch = useDispatch()

    // const state = {
    //     ingredients: {
    //         salad: 0,
    //         cheese: 0,
    //         meat: 0,
    //         bacon: 0,
    //     },
    //     totalPrice: 4,
    //     purchasable: false,
    //     purchasing: false,
    // }

    // const [ingredients, setIngredients] = useState({
    //     salad: 0,
    //     cheese: 0,
    //     meat: 0,
    //     bacon: 0,
    // });
    const [purchasable, setPurchasable] = useState(false)
    const [purchasing, setPurchasing] = useState(false)
    const navigate = useNavigate()


    useEffect(
        () => {
            dispatch(fetchIngredients());
        }
        , [dispatch])

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        setPurchasable(sum > 0)
            ;
    }

    const addIngredientHandler = type => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;
        // setIngredients(updatedIngredient);
        dispatch(burgerBuilderActions.setIngredient(
            updatedIngredient
        ))
        dispatch(burgerBuilderActions.setTotalPrice(newPrice))
        updatePurchasableState(updatedIngredient);
    }

    const removeIngredientHandler = type => {
        const oldCount = ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice - priceDeduction;
        // setIngredients(updatedIngredient);
        dispatch(burgerBuilderActions.setIngredient(
            updatedIngredient
        ))
        dispatch(burgerBuilderActions.setTotalPrice(newPrice))
        updatePurchasableState(updatedIngredient);
    }


    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
        // }
        // queryParams.push('price=' + totalPrice);
        // const queryString = queryParams.join('&');
        // navigate({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        navigate('/checkout')
    }

    const disabledInfo = {
        ...ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <Spinner />
    let orderSummary = null
    if (ingredients) {
        burger = <React.Fragment>
            <Burger ingredients={ingredients} />
            <BuildControls
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={totalPrice}
                purchasable={purchasable}
                ordered={purchaseHandler} />
        </React.Fragment>

        orderSummary = <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />
    }

    return (
        <div>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </div>
    )
}

export default BurgerBuilder;