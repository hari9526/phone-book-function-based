import React, { useContext } from 'react';
import { SubscriberCountContext } from './SubscriberCountContext';


const Footer = () => {
    const count = useContext(SubscriberCountContext); 
    return <h4>
      Number of entries : {count}
  </h4>;
};


export default Footer;
