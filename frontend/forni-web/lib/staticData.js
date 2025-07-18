const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND
export async function getStaticData() {
    try {
        const [furnacesRes, servicesRes] = await Promise.allSettled([
            fetch(`${BACKEND_URL}/furnaces`, { next: { revalidate: 300 } }),
            fetch(`${BACKEND_URL}/services`, { next: { revalidate: 300 } })
        ]);

        const furnaces = furnacesRes.status === 'fulfilled' && furnacesRes.value.ok 
            ? await furnacesRes.value.json() 
            : [];
            
        const services = servicesRes.status === 'fulfilled' && servicesRes.value.ok 
            ? await servicesRes.value.json() 
            : [];

        return { furnaces, services };
    } catch (error) {
        console.error('Static data fetch error:', error);
        return { furnaces: [], services: [] };
    }
}