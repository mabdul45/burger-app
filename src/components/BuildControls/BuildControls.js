import React from 'react';
import { useSelector } from 'react-redux';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
];

const BuildControls = (props) => {
    const { token } = useSelector(state => state.burgerAuth)

    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong> {props.price.toFixed(2)} </strong></p>
            {controls.map(ctrl => {
                return (<BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />)
            })

            }
            <button
                className={styles.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered} >
                {token !== null ? 'ORDER NOW' : 'SighnUp'}
            </button>
        </div>
    );
}

export default BuildControls;