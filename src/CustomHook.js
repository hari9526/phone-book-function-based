import { useEffect, useState} from 'react'; 
export async function downloadLocationDetail(url) {
    const rawResponse = await fetch(url); 
    const response = rawResponse.json(); 
    return response; 
}

//Custom hook
export const useLocationDetails = (url) => {
    debugger; 
    const [locationDetails, setLocationDetails] = useState({ "city": "", "region": "", "country_name": "" }); 
    

    useEffect(() => {        
        updateLocation(); 
    }, []); 

    async function updateLocation() {
        const response = await downloadLocationDetail(url); 
        setLocationDetails(response); 
    }
    debugger;
    return  locationDetails; 
}