import React from 'react';
// import { useSelector } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {

    // const { token } = useSelector(state => state.bugerAuth);
    const token = null;

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="" >Burger Builder</NavigationItem>
            {
                token !== null ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {
                token === null ?
                    <NavigationItem link="/auth" >Authenticate</NavigationItem> :
                    <NavigationItem link="/logout" >Logout</NavigationItem>
            }
        </ul>
    );
}

export default NavigationItems;