import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/ui/productSlice';
import { useCallback } from 'react';
import serendipiaApi from '../api';



export const useProductStore = () => {

    const { clothes } = useSelector( state => state.product );
    const dispatch = useDispatch();

    const startLoadingProducts = useCallback( async () => {

        try {
            const response = await serendipiaApi.get('/clothes');
            const products = response.data.clothes;
            dispatch( setProducts( products || [] ) );
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }, [dispatch]);


    const startLoadingProductsByCategory = useCallback(async (category) => {

        if ( !category ) {
            console.log('Categoria vacia');
            return;
        }

        try {
            const response = await serendipiaApi.get(`/clothes/category/${category}`);
            const products = response.data.clothes;
            dispatch( setProducts( products || [] ) );
            
            if (products.length === 0) {
                console.warn(`No products found for category: ${category}`);
          }
        } catch (error) {
            console.error("Error loading products by category:", error);
        }
    }, [dispatch]);

    const startLoadingProductsById = async( id ) => {
        //TODO: a implementar 
        try {
            
        } catch (error) {
            console.error("Error loading product by id:", error);
        }
    }

    const startDeletingProduct = async( id ) => {
        try {
            
            const del = await serendipiaApi.delete(`/clothes/${ id }`);

            dispatch( startLoadingProducts() );

        } catch (error) {
            console.log('Error deleting: ', error );
        }
    }


    return {
        //* properties
        clothes,

        //* methods
        startDeletingProduct,
        startLoadingProducts,
        startLoadingProductsById,
        startLoadingProductsByCategory,
    }
}