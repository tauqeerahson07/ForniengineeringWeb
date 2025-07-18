import { getStaticData } from '@/lib/staticData';
import ClientHomePage from '@/components/ClientHomePage';

// Generate metadata with fresh data
export async function generateMetadata() {
    const { furnaces, services } = await getStaticData();
    
    return {
        title: 'Forni Engineering - Industrial Furnace Solutions',
        description: `Leading manufacturer of industrial furnaces. We offer ${furnaces.length} furnace solutions and ${services.length} specialized services for various industries.`,
        keywords: 'industrial furnaces, heat treatment, manufacturing, engineering, forni engineering',
        openGraph: {
            title: 'Forni Engineering - Industrial Furnace Solutions',
            description: 'Engineering excellence in industrial furnace solutions',
            images: ['/webpage/forni_web_banner.jpg'],
            url: '/',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Forni Engineering - Industrial Furnace Solutions',
            description: 'Engineering excellence in industrial furnace solutions',
            images: ['/webpage/forni_web_banner.jpg'],
        }
    };
}

export default async function Home() {
    // Fetch data at build time for SSG
    const staticData = await getStaticData();
    
    return <ClientHomePage initialData={staticData} />;
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 300; // Revalidate every 5 minutes