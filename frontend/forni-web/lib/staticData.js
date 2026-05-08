const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND

// Add a timeout wrapper for fetch requests
const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Request timeout: ${url}`)), timeout)
        )
    ]);
};

export async function getStaticData() {
    try {
        const [furnacesRes, servicesRes, sparePartsRes] = await Promise.allSettled([
            fetchWithTimeout(`${BACKEND_URL}/furnaces`, { next: { revalidate: 300 } }, 8000),
            fetchWithTimeout(`${BACKEND_URL}/services`, { next: { revalidate: 300 } }, 8000),
            fetchWithTimeout(`${BACKEND_URL}/spare-parts`, { next: { revalidate: 300 } }, 8000),
        ]);

        const furnaces = furnacesRes.status === 'fulfilled' && furnacesRes.value?.ok 
            ? await furnacesRes.value.json() 
            : [];
            
        const services = servicesRes.status === 'fulfilled' && servicesRes.value?.ok 
            ? await servicesRes.value.json() 
            : [];
        
        const spareParts = sparePartsRes.status === 'fulfilled' && sparePartsRes.value?.ok
            ? await sparePartsRes.value.json()
            : [];

        return { furnaces, services, spareParts };
    } catch (error) {
        console.error('Static data fetch error:', error);
        return { furnaces: [], services: [], spareParts: [] };
    }
}