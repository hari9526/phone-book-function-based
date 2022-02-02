import React, { Component, Fragment, useState, useEffect, useCallback, useMemo ,useReducer } from 'react';
import AddSubscriber from './AddSubscriber';
import ShowSubscribers from './ShowSubscribers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './Footer';
import { SubscriberCountContext } from './SubscriberCountContext';
import TotalSubscribersReducer from './TotalSubscribersReducer'; 



export default function PhoneDirectory() {

    const [subscribersList, setSubscribersList] = useState([]);

    const [state, dispatch] = useReducer(TotalSubscribersReducer, {count : 0});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        // fetch('http://localhost:7081/api/contacts')
        //     .then(input => input.json())
        //     .then(data => setSubscribersList(data));
        const rawResponse = await fetch('http://localhost:7081/api/contacts');
        const data = await rawResponse.json();
        dispatch({"type" : "UPDATE_COUNT", payload : data.length }); 
        setSubscribersList(data);
    }

    const deleteSubscriberHandler = useCallback(async (subscriberId) => {
        const rawResponse = await fetch(`http://localhost:7081/api/contacts/${subscriberId}`, { method: 'DELETE' });
        const data = await rawResponse.json();           
        loadData();
    }); 

    // async function deleteSubscriberHandler(subscriberId) {
    //     // fetch(`http://localhost:7081/api/contacts/${subscriberId}`, { method: 'DELETE' })
    //     //     .then(res => res.json())
    //     //     .then(data => loadData());


    //     const rawResponse = await fetch(`http://localhost:7081/api/contacts/${subscriberId}`, { method: 'DELETE' });
    //     const data = await rawResponse.json();
    //     loadData();
    // }

    async function addSubscriberHandler(newSubscriber) {

        const rawResponse = await fetch(`http://localhost:7081/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newSubscriber)
        });
        const data = await rawResponse.json();
        loadData();

    }
 
    // const numberOfSubscribers = useMemo(() => {    
    //     return subscribersList.length; 
    // }, [subscribersList]); 
    

    return (
        <Fragment>
            <Router>
                <div>
                    <Route exact path="/" render={(props) => <ShowSubscribers {...props} subscribersList={subscribersList} deleteSubscriberHandler={(subscriberId) => deleteSubscriberHandler(subscriberId)} />} />
                    <Route exact path="/add" render={({ history }, props) => <AddSubscriber history={history} {...props} addSubscriberHandler={(newSubscriber) => addSubscriberHandler(newSubscriber)} />} />
                </div>
            </Router>
            <SubscriberCountContext.Provider value={state.count}>
                <Footer />
            </SubscriberCountContext.Provider>
        </Fragment>

    )
}
//
// class PhoneDirectory extends Component {
//
//     constructor() {
//         super();
//         this.state = {
//             subscribersList: [
//                 {
//                     id: 1,
//                     name: "Shilpa Bhat",
//                     phone: "9999999999"
//                 },
//                 {
//                     id: 2,
//                     name: "Srishti Gupta",
//                     phone: "8888888888"
//                 }
//             ]
//         }
//     }
//
//     deleteSubscriberHandler = (subscriberId) => {
//         let subscribersList = this.state.subscribersList;
//         let subscriberIndex = 0;
//         subscribersList.forEach(function (subscriber, index) {
//             if (subscriber.id === subscriberId) {
//                 subscriberIndex = index;
//             }
//         }, this);
//         let newSubscribers = subscribersList;
//         newSubscribers.splice(subscriberIndex, 1);
//         this.setState({subscribers: newSubscribers});
//     }
//
//     addSubscriberHandler = (newSubscriber) => {
//         let subscribersList = this.state.subscribersList;
//         if (subscribersList.length > 0) {
//             newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
//         } else {
//             newSubscriber.id = 1;
//         }
//         subscribersList.push(newSubscriber);
//         this.setState({ subscribersList: subscribersList });
//     }
//
//     render() {
//         return (
//             <Router>
//                 <div>
//                     <Route exact path="/" render={(props) => <ShowSubscribers {...props} subscribersList={this.state.subscribersList} deleteSubscriberHandler={this.deleteSubscriberHandler} />} />
//                     <Route exact path="/add" render={({history}, props) => <AddSubscriber history={history} {...props} addSubscriberHandler={this.addSubscriberHandler} />} />
//                 </div>
//             </Router>
//         )
//     }
// }
//
// export default PhoneDirectory;
