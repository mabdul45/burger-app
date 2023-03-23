import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from './Burgeringredient/Burgeringredient';

const Burger = (props) => {
    console.log(props.ingredients);
    let transformedIngredients =
        Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    console.log(igKey, 'secondmap', props.ingredients[igKey], props.ingredients[igKey], i)
                    return <BurgerIngredient key={igKey + i} type={igKey} />;
                });
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>please add ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger