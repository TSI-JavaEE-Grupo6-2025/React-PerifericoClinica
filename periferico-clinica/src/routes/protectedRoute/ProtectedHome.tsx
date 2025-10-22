import { useTenantFetcher } from '../../hooks/use-tenant';
import { useEffect, useRef } from 'react';
import { useTenantStore } from '../../store/TenantStore';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../../components/ui/Spinner';
import { HomePage } from '../../pages';





// Ruta protegida para HomePage donde si no hay tenant osea el dominio no existe en backend , redirige a 404 page

interface ProtectedHomeProps {
    children?: React.ReactNode;
}

export const ProtectedHome: React.FC<ProtectedHomeProps> = () => {
    const { fetchTenant } = useTenantFetcher({allDomain: true});
    const { tenant, loading } = useTenantStore(); // obtenemos el tenant desde el store
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!tenant && !loading && !hasFetched.current) {
            hasFetched.current = true;
            fetchTenant().catch((error: Error) => {
                console.error('Error al obtener el tenant: ', error);
                hasFetched.current = false;
            });
        }
    }, [tenant, loading, fetchTenant]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <Spinner className="size-8 animate-spin" />
        </div>
    }
    if (!tenant) return <Navigate to="/404" />




    return <HomePage/>;
}