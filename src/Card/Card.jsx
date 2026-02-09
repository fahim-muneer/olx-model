import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchProducts } from '../Redux/Items';
import favorite from '../assets/favorite.svg'
import { addToCart } from '../Redux/CartSlice';
import AddCartButton from '../Button/AddCartButton';
import RefreshButton from '../Button/RefreshButton';
import LoginRequiredButton from '../Button/LoginRequiredButton';


const Card = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.item);
    const user=useSelector(state=>state.auth.user)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

 return ( 
  <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen
                  bg-gray-100 dark:bg-[#0f172a]'>
                    <div className='relative'> 
                      <RefreshButton/>
                    </div>
    
    <h1 className="text-2xl text-[#002f34] dark:text-white">
      Fresh recommendations
    </h1>


    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>

      {items.map((item) => (

        <div 
          key={item.id}
          className='relative w-full h-72 rounded-md overflow-hidden
                     bg-gray-50 dark:bg-[#1e293b]
                     border border-gray-300 dark:border-gray-700'
        >

          <Link 
            to={`/details/${item.id}`} 
            state={{ item }} 
            className="block"
          >

            <div className='w-full flex justify-center p-2 overflow-hidden'>
              <img
                className='h-36 object-contain'
                src={item.imageUrl || "https://via.placeholder.com/150"}
                alt={item.title}
              />
            </div>

            <div className='details p-1 pl-4 pr-4'>

              <h1 className="font-bold text-xl text-[#002f34] dark:text-white">
                ₹ {item.price}
              </h1>

              <p className="text-sm pt-2 text-gray-600 dark:text-gray-300">
                {item.category}
              </p>

              <p className="pt-2 text-gray-800 dark:text-gray-200">
                {item.title}
              </p>

            </div>

          </Link>

          <div className='absolute flex justify-center items-center p-2
                          bg-white dark:bg-gray-800
                          rounded-full top-3 right-3 cursor-pointer'>
            <img className='w-5' src={favorite} alt="" />
          </div>
{user ?<AddCartButton item={item} />:<LoginRequiredButton/> }
          

        </div>
      ))}

    </div>
  </div>
)

}

export default Card