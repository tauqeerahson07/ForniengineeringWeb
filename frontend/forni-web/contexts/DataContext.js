"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const DataContext = createContext({
    furnaces: null,
    services: null,
    spareParts: null,
    loading: true,
    error: null,
    addData: function () {},
    getFurnaceByName: function (name) {},
    getServiceByName: function (name) {},
    getSparePartByName: function (name) {},
    refreshData: function () {},
});

export default DataContext;

// Cache configuration
const CACHE_KEY = "forni_data_cache";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND;

// Local storage cache helpers
const getCachedData = () => {
    if (typeof window === "undefined") return null; // SSR check

    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            const now = Date.now();
            if (now - timestamp < CACHE_DURATION) {
                console.log("📦 Using cached data");
                return data;
            }
        }
    } catch (error) {
        console.warn("Cache read error:", error);
    }
    return null;
};

const setCachedData = (data) => {
    if (typeof window === "undefined") return; // SSR check

    try {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                data,
                timestamp: Date.now(),
            })
        );
    } catch (error) {
        console.warn("Cache write error:", error);
    }
};

export function DataContextProvider({ children, initialData = null }) {
    const [furnaces, setFurnaces] = useState(initialData?.furnaces || null);
    const [services, setServices] = useState(initialData?.services || null);
    const [spareParts, setSpareParts] = useState(initialData?.spareParts || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (useCache = true) => {
        try {
            setError(null);

            // Try cache first if no initial data
            if (useCache && !initialData) {
                const cachedData = getCachedData();
                if (cachedData) {
                    setFurnaces(cachedData.furnaces || []);
                    setServices(cachedData.services || []);
                    setSpareParts(cachedData.spareParts || []);
                    setLoading(false);
                    return;
                }
            }

            // Parallel requests for better performance
            const [furnacesResponse, servicesResponse, sparePartsResponse] = await Promise.allSettled([
                fetch(`${BACKEND_URL}/furnaces`, {
                    headers: {
                        "Cache-Control": "max-age=300", // 5 minutes browser cache
                    },
                }),
                fetch(`${BACKEND_URL}/services`, {
                    headers: {
                        "Cache-Control": "max-age=300",
                    },
                }),
                fetch(`${BACKEND_URL}/spare-parts`, {
                    headers: {
                        "Cache-Control": "max-age=300",
                    },
                }),
            ]);

            // Process furnaces
            let furnacesData = [];
            if (furnacesResponse.status === "fulfilled" && furnacesResponse.value.ok) {
                furnacesData = await furnacesResponse.value.json();
            } else {
                console.warn(
                    "❌ Furnaces failed:",
                    furnacesResponse.reason || furnacesResponse.value?.status
                );
            }

            // Process services
            let servicesData = [];
            if (servicesResponse.status === "fulfilled" && servicesResponse.value.ok) {
                servicesData = await servicesResponse.value.json();
            } else {
                console.warn("❌ Services failed:", servicesResponse.reason || servicesResponse.value?.status);
            }

            // Process spare parts
            let sparePartsData = [];
            if (sparePartsResponse.status === "fulfilled" && sparePartsResponse.value.ok) {
                sparePartsData = await sparePartsResponse.value.json();
            } else {
                console.warn(
                    "❌ Spare Parts failed:",
                    sparePartsResponse.reason || sparePartsResponse.value?.status
                );
            }

            // Cache the data
            const dataToCache = {
                furnaces: furnacesData,
                services: servicesData,
                spareParts: sparePartsData,
            };
            setCachedData(dataToCache);

            // Update state
            setFurnaces(furnacesData);
            setServices(servicesData);
            setSpareParts(sparePartsData);
        } catch (err) {
            console.error("💥 Critical error in fetchData:", err);
            setError(err.message);
            setFurnaces([]);
            setServices([]);
            setSpareParts([]);
        } finally {
            setLoading(false);
        }
    }, [initialData]);

    useEffect(() => {
        const processData = async () => {
            if (!initialData) {
                // No initial data - fetch from API
                await fetchData(true);
            } else {
                // Simply set initial data as-is (no URL processing needed)
                setFurnaces(initialData.furnaces || []);
                setServices(initialData.services || []);
                setSpareParts(initialData.spareParts || []);
                setLoading(false);
            }
        };
        processData();
    }, [fetchData, initialData]);

    // Add data function
    const addData = (type, newItem) => {
        if (type === "furnaces" && furnaces) {
            const updatedFurnaces = [...furnaces, newItem];
            setFurnaces(updatedFurnaces);
            setCachedData({
                furnaces: updatedFurnaces,
                services: services || [],
                spareParts: spareParts || [],
            });
        } else if (type === "services" && services) {
            const updatedServices = [...services, newItem];
            setServices(updatedServices);
            setCachedData({
                furnaces: furnaces || [],
                services: updatedServices,
                spareParts: spareParts || [],
            });
        } else if (type === "spareParts" && spareParts) {
            const updatedSpareParts = [...spareParts, newItem];
            setSpareParts(updatedSpareParts);
            setCachedData({
                furnaces: furnaces || [],
                services: services || [],
                spareParts: updatedSpareParts,
            });
        }
    };

    // Get specific furnace by name (memoized)
    const getFurnaceByName = useCallback(
        (name) => {
            if (!name || !furnaces?.length) return null;

            const decodedName = decodeURIComponent(name);
            const furnace = furnaces.find((f) => f.name.toLowerCase() === decodedName.toLowerCase());

            if (!furnace) {
                console.warn(`⚠️ Furnace not found: ${decodedName}`);
            }

            return furnace || null;
        },
        [furnaces]
    );

    // Get specific service by name (memoized)
    const getServiceByName = useCallback(
        (name) => {
            if (!name || !services?.length) return null;

            const decodedName = decodeURIComponent(name);
            const service = services.find((s) => s.name.toLowerCase() === decodedName.toLowerCase());

            if (!service) {
                console.warn(`⚠️ Service not found: ${decodedName}`);
            }

            return service || null;
        },
        [services]
    );

    // Get specific spare part by name (memoized)
    const getSparePartByName = useCallback(
        (name) => {
            if (!name || !spareParts?.length) return null;

            const decodedName = decodeURIComponent(name);
            const sparePart = spareParts.find((sp) => sp.name.toLowerCase() === decodedName.toLowerCase());

            if (!sparePart) {
                console.warn(`⚠️ Spare Part not found: ${decodedName}`);
            }

            return sparePart || null;
        },
        [spareParts]
    );

    // Refresh data function (bypass cache)
    const refreshData = useCallback(() => {
        fetchData(false);
    }, [fetchData]);

    const value = {
        furnaces,
        services,
        spareParts,
        loading,
        error,
        addData,
        getFurnaceByName,
        getServiceByName,
        getSparePartByName,
        refreshData,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}