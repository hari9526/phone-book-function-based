import React, { Fragment } from 'react';
import './Header.css';
import { useLocationDetails} from './CustomHook'; 


const Header = function (props) {
    debugger;
    const locationDetails = useLocationDetails('https://ipapi.co/json'); 
    const { city, region, country_name } = locationDetails; 


    return (
        <Fragment>
            <div className="header">
                {props.heading}
            </div>
            <h4>Welcome user, You are from {city}, - {region} on {country_name} </h4>

        </Fragment>

    )
}

export default Header;