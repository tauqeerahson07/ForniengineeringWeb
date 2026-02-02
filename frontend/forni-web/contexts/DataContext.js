"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getSignedUrl } from "@/lib/supabase";

const DataContext = createContext({
    furnaces: null,
    services: null,
    loading: true,
    error: null,
    addData: function () {},
    getFurnaceByName: function (name) {},
    getServiceByName: function (name) {},
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
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (useCache = true) => {
        try {
            setLoading(true);
            setError(null);

            // Try cache first if no initial data
            if (useCache && !initialData) {
                const cachedData = getCachedData();
                if (cachedData) {
                    setFurnaces(cachedData.furnaces || []);
                    setServices(cachedData.services || []);
                    setLoading(false);
                    return;
                }
            }

            // Parallel requests for better performance
            const [furnacesResponse, servicesResponse] = await Promise.allSettled([
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
            ]);

            // Process furnaces
            let furnacesData = [];
            if (furnacesResponse.status === "fulfilled" && furnacesResponse.value.ok) {
                const rawFurnacesData = await furnacesResponse.value.json();
                furnacesData = await Promise.all(
                    rawFurnacesData.map(async (item) => {
                        const signedUrl = await getSignedUrl("forni-web-images", item.cover_image);
                        return {
                            ...item,
                            cover_image: signedUrl || item.cover_image, // Use signed URL or fallback to original
                        };
                    })
                );
            } else {
                console.warn("❌ Furnaces failed:", furnacesResponse.reason || furnacesResponse.value?.status);
            }

            // Process services
            let servicesData = [];
            if (servicesResponse.status === "fulfilled" && servicesResponse.value.ok) {
                const rawServicesData = await servicesResponse.value.json();
                servicesData = await Promise.all(
                    rawServicesData.map(async (item) => {
                        const signedUrl = await getSignedUrl("forni-web-images", item.cover_image);
                        return { ...item, cover_image: signedUrl || item.cover_image };
                    })
                );
            } else {
                console.warn("❌ Services failed:", servicesResponse.reason || servicesResponse.value?.status);
            }

            // Cache the data
            const dataToCache = {
                furnaces: furnacesData,
                services: servicesData,
            };
            setCachedData(dataToCache);

            // Update state
            setFurnaces(furnacesData);
            setServices(servicesData);
        } catch (err) {
            console.error("💥 Critical error in fetchData:", err);
            setError(err.message);
            setFurnaces([]);
            setServices([]);
        } finally {
            setLoading(false);
        }
    }, [initialData]);

    useEffect(() => {
        // Only fetch if we don't have initial data
        if (!initialData) {
            fetchData(false);
        } else {
            // Generate signed URLs for initial data
            (async () => {
                const signedFurnaces = await Promise.all(
                    (initialData.furnaces || []).map(async (item) => {
                        const signedUrl = await getSignedUrl("forni-web-images", item.cover_image);
                        return { ...item, cover_image: signedUrl || item.cover_image };
                    })
                );

                const signedServices = await Promise.all(
                    (initialData.services || []).map(async (item) => {
                        const signedUrl = await getSignedUrl("forni-web-images", item.cover_image);
                        return { ...item, cover_image: signedUrl || item.cover_image };
                    })
                );

                setFurnaces(signedFurnaces);
                setServices(signedServices);
            })();
        }
    }, [fetchData, initialData]);

    // Add data function
    const addData = (type, newItem) => {
        if (type === "furnaces" && furnaces) {
            const updatedFurnaces = [...furnaces, newItem];
            setFurnaces(updatedFurnaces);
            setCachedData({
                furnaces: updatedFurnaces,
                services: services || [],
            });
        } else if (type === "services" && services) {
            const updatedServices = [...services, newItem];
            setServices(updatedServices);
            setCachedData({
                furnaces: furnaces || [],
                services: updatedServices,
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

    // Refresh data function (bypass cache)
    const refreshData = useCallback(() => {
        fetchData(false);
    }, [fetchData]);

    const value = {
        furnaces,
        services,
        loading,
        error,
        addData,
        getFurnaceByName,
        getServiceByName,
        refreshData,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}