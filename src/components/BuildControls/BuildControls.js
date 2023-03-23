import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
];

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong> {props.price.toFixed(2)} </strong></p>
        {controls.map(ctrl => {
            console.log(props.disabled[ctrl.type], [ctrl.type])
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
            ORDER NOW
        </button>
    </div>
);

export default BuildControls;