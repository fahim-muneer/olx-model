import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../Redux/CartSlice";
import BackButton from "../../Button/BackButton";

function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
        <BackButton/>

      <h2 className="text-2xl font-bold mb-6 text-[#002f34]">My Cart</h2>

            {cartItems.length === 0 && (
            <div className="bg-white p-8 rounded shadow text-center flex flex-col items-center">

                <img 
                src="https://statics.olx.in/external/base/img/empty-cart.png"
                alt="Empty cart"
                className="w-52 mb-4"
                />

                <h3 className="text-lg font-semibold mb-2">
                Your cart is empty
                </h3>

                <Link 
                to="/" 
                className="text-teal-600 font-semibold underline"
                >
                Start shopping
                </Link>

            </div>
            )}


      <div className="space-y-4">
        {cartItems.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-lg shadow-sm border flex gap-4 p-4"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-24 object-contain border rounded"
            />

            <div className="flex-1">
              <p className="font-semibold text-[#002f34]">{item.title}</p>
              <p className="text-sm text-gray-500">{item.category}</p>

              <p className="font-bold text-lg mt-2 text-[#002f34]">
                ₹ {item.price}
              </p>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8 flex justify-end">
          <Link
            to="/checkout"
            className="bg-[#002f34] text-white px-6 py-3 rounded font-semibold hover:bg-[#014a50] transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}

    </div>
  );
}

export default Cart;

