import { useParams } from "react-router-dom"
import { useProductStore } from "../../hooks/useProductStore";
import { useEffect } from "react";


export const ProductCategoryPage = () => {

    const { category } = useParams();
    const { clothes, startLoadingProductsByCategory } = useProductStore();

    useEffect(() => {
      if ( category )
        startLoadingProductsByCategory(category);
    }, [category]);

    
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clothes.map(product => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img src={product.images?.[0]?.url || 'fallback.png'} alt={product.name}  className="w-full h-40 object-cover mb-2" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
};
