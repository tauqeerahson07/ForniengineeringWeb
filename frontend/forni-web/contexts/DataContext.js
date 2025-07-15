"use client"
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext({
    furnaces: null,
    services: null,
    loading: true,
    error: null,
    addData: function(){},
    showData: function(){},
    refreshData: function(){}
});

export default DataContext;

export function DataContextProvider({children}) {
    const [furnaces, setFurnaces] = useState(null);
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async() => {
        try {
            setLoading(true);
            setError(null);
            
            // Initialize default values
            let furnacesData = [];
            let servicesData = [];
            
            // Fetch furnaces with individual error handling
            try {
                const furnacesResponse = await fetch("http://127.0.0.1:8080/api/furnaces/");
                if (furnacesResponse.ok) {
                    furnacesData = await furnacesResponse.json(); 
                    console.log('Furnaces loaded:', furnacesData);
                } else {
                    console.warn('Furnaces API failed:', furnacesResponse.status);
                    furnacesData = []; 
                }
            } catch (furnaceError) {
                console.error('Furnaces fetch error:', furnaceError);
                furnacesData = []; 
            }

            // Fetch services with individual error handling
            try {
                const servicesResponse = await fetch("http://127.0.0.1:8080/api/services/");
                if (servicesResponse.ok) {
                    servicesData = await servicesResponse.json(); 
                    console.log('Services loaded:', servicesData);
                } else {
                    console.warn('Services API failed:', servicesResponse.status);
                    servicesData = []; 
                }
            } catch (serviceError) {
                console.error('Services fetch error:', serviceError);
                servicesData = []; 
            }

            setFurnaces(furnacesData);
            setServices(servicesData);

        } catch (err) {
            // Only for critical errors
            console.error('Critical error in fetchData:', err);
            setError(err.message);
            // Set empty arrays as fallback
            setFurnaces([]);
            setServices([]);
        } finally {
            setLoading(false); // Always set loading to false
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Add data function
    const addData = (type, newItem) => {
        if (type === 'furnaces' && furnaces) {
            setFurnaces([...furnaces, newItem]);
        } else if (type === 'services' && services) {
            setServices([...services, newItem]);
        }
    };

    // Show data function
    const showData = () => {
        return { furnaces, services };
    };

    // Refresh data function
    const refreshData = () => {
        fetchData();
    };

    const value = {
        furnaces,
        services,
        loading,
        error,
        addData,
        showData,
        refreshData
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}