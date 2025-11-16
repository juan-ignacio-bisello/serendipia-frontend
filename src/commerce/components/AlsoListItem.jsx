import { useDispatch } from 'react-redux';
import { increment } from '../../store';

const products = [
  {
    id: 0,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    
    color: 'Black',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'public/ropa/pan5.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'public/ropa/pan2.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'public/ropa/pan1.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'public/ropa/pan3.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 7,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'public/ropa/pan4.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  // More products...
]

export const AlsoListItem = ({ id, name, href, imageSrc, imageAlt, price, color }) => {

  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch( increment() ); // 
  };

  return (
    <div className="bg-Black">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-White">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          { products.map(( product ) => (
            <div key={ product.id } className="group relative">
              <img
                alt={ product.imageAlt }
                src={ product.imageSrc }
                className="aspect-square w-full rounded-md bg-Gray object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-Gray">
                    <a href={ product.href }>
                      <span aria-hidden="true" className="absolute inset-0" />
                      { product.name }
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-Gray">{ product.color }</p>
                </div>
                <p className="text-sm font-medium text-Gray">{ product.price }</p>
                <button className="mt-1 text-sm text-Gray" onClick={ onAddToCart }>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
