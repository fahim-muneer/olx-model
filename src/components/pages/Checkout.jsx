import { useSelector, useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { clearCart } from "../../Redux/CartSlice";
import { fireStore } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import BackButton from "../../Button/BackButton";

function Checkout() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      for (let item of cartItems) {
        await deleteDoc(doc(fireStore, "products", item.id));
      }

      dispatch(clearCart());
      alert("Order placed successfully!");
      
    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    }
  };

  return (
  <div className="bg-gray-100 dark:bg-[#0f172a] min-h-screen p-6 md:p-12">
    <BackButton/>

    <h2 className="text-2xl font-bold mb-6 text-[#002f34] dark:text-white">
      Checkout
    </h2>

    {cartItems.length === 0 ? (
      <div className="bg-white dark:bg-[#1e293b] p-10 rounded shadow text-center flex flex-col items-center
                      border border-gray-200 dark:border-gray-700">

        <img 
          src="https://statics.olx.in/external/base/img/empty-cart.png"
          className="w-52 mb-4"
          alt=""
        />

        <p className="font-semibold mb-3 text-[#002f34] dark:text-white">
          Your cart is empty
        </p>

        <Link 
          to="/" 
          className="text-teal-600 dark:text-teal-400 font-semibold underline"
        >
          Start shopping
        </Link>
      </div>
    ) : (
      <div className="grid md:grid-cols-3 gap-6">

        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-[#1e293b] rounded shadow p-4 flex gap-4 items-center
                         border border-gray-200 dark:border-gray-700"
            >
              <img 
                src={item.imageUrl}
                className="w-28 h-24 object-contain border rounded 
                           border-gray-300 dark:border-gray-600"
                alt=""
              />

              <div className="flex-1">
                <p className="font-semibold text-[#002f34] dark:text-white">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {item.category}
                </p>

                {/* Seller Info */}
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded border
                                border-gray-200 dark:border-gray-600">

                  <p className="text-sm font-semibold text-[#002f34] dark:text-white">
                    Seller: {item.userName || "OLX User"}
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    📍 {item.sellerLocation || "Local area"}
                  </p>

                  {item.sellerPhone && (
                    <p className="text-xs text-teal-700 dark:text-teal-400 font-medium mt-1">
                      📞 {item.sellerPhone}
                    </p>
                  )}
                </div>
              </div>

              <p className="font-bold text-lg text-[#002f34] dark:text-white">
                ₹ {item.price}
              </p>
            </div>
          ))}
        </div>

        {/* Price box */}
        <div className="bg-white dark:bg-[#1e293b] rounded shadow p-5 h-fit
                        border border-gray-200 dark:border-gray-700">

          <h3 className="font-bold text-lg mb-4 text-[#002f34] dark:text-white">
            Price Details
          </h3>

          <div className="flex justify-between mb-2 text-sm text-gray-700 dark:text-gray-300">
            <span>Items ({cartItems.length})</span>
            <span>
              ₹ {cartItems.reduce((sum, i) => sum + Number(i.price), 0)}
            </span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span className="text-gray-700 dark:text-gray-300">Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="mb-4 border-gray-300 dark:border-gray-600"/>

          <div className="flex justify-between font-bold text-lg mb-6 text-[#002f34] dark:text-white">
            <span>Total</span>
            <span>
              ₹ {cartItems.reduce((sum, i) => sum + Number(i.price), 0)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-[#002f34] dark:bg-teal-600 text-white w-full py-3 rounded 
                       font-semibold hover:bg-[#004f55] dark:hover:bg-teal-700 transition"
          >
            Confirm Purchase
          </button>

        </div>
      </div>
    )}
  </div>
);

}

export default Checkout;
