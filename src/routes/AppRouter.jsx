import { Routes, Route, useLocation } from 'react-router-dom';
import { AdminRoutes, HomePage, Navbar, ProductCategoryPage, ProductModal } from '../commerce';
import { AuthRoutes } from '../auth';
import { AnimatePresence } from 'framer-motion';
import { PrivateRoute } from './PrivateRoute';
import { useEffect } from 'react';
import { useAuthStore } from '../hooks';
import { HelmetProvider } from 'react-helmet-async';

export const AppRouter = () => {

    const location = useLocation();
    const { checkAuthToken } = useAuthStore();
    
    useEffect(() => {
      checkAuthToken();
    }, []);

    return (
        <HelmetProvider>
            <Navbar />
            <ProductModal />

            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>

                    {/* ------------------- RUTAS PUBLICAS ------------------- */}

                    <Route 
                        path="/product/category/:category" 
                        element={
                            <>
                                <PageSEO 
                                    title="Productos por Categoría | Serendipia"
                                    description="Explorá nuestros productos filtrados por categoría. Encontrá las mejores ofertas en tecnología, hogar, indumentaria y más."
                                />
                                <ProductCategoryPage />
                            </>
                        } 
                    />

                    <Route 
                        path="/auth/*" 
                        element={
                            <>
                                <PageSEO 
                                    title="Ingresar o Registrarse | Serendipia"
                                    description="Accedé a tu cuenta Serendipia o creá una nueva. Empezá a comprar al mejor precio en Argentina."
                                />
                                <AuthRoutes />
                            </>
                        }
                    />

                    <Route 
                        path="/*" 
                        element={
                            <>
                                <PageSEO 
                                    title="Serendipia | Tienda Online"
                                    description="Comprá productos de calidad al mejor precio. Tecnología, hogar, deportes, indumentaria y más. Envíos a todo el país."
                                />
                                <HomePage />
                            </>
                        } 
                    />

                    {/* ------------------- RUTA PRIVADA ------------------- */}

                    <Route 
                        path="/product/admin/*" 
                        element={
                            <PrivateRoute>
                                <>
                                    <PageSEO 
                                        title="Panel de Administración | Serendipia"
                                        description="Gestión de productos, categorías y órdenes. Panel exclusivo para administradores."
                                        noIndex={true}
                                    />
                                    <AdminRoutes />
                                </>
                            </PrivateRoute>
                        }
                    />

                </Routes>
            </AnimatePresence>
        </HelmetProvider>
    );
};


// Componente Reusable SEO

import { Helmet } from 'react-helmet-async';

const PageSEO = ({ title, description, noIndex = false }) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
);
