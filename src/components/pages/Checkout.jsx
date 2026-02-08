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
  <div className="bg-gray-100 min-h-screen p-6 md:p-12">
    <BackButton/>
    <h2 className="text-2xl font-bold mb-6 text-[#002f34]">
      Checkout
    </h2>

    {cartItems.length === 0 ? (
      <div className="bg-white p-10 rounded shadow text-center flex flex-col items-center">
        <img 
          src="https://statics.olx.in/external/base/img/empty-cart.png"
          className="w-52 mb-4"
          alt=""
        />
        <p className="font-semibold mb-3">Your cart is empty</p>
        <Link to="/" className="text-teal-600 font-semibold underline">
          Start shopping
        </Link>
      </div>
    ) : (
      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded shadow p-4 flex gap-4 items-center"
            >
              <img 
                src={item.imageUrl}
                className="w-28 h-24 object-contain border rounded"
                alt=""
              />

              <div className="flex-1">
                    <p className="font-semibold text-[#002f34]">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>

                    {/* Seller Info */}
                    <div className="mt-3 bg-gray-50 p-3 rounded border">
                        <p className="text-sm font-semibold text-[#002f34]">
                        Seller: {item.userName || "OLX User"}
                        </p>

                        <p className="text-xs text-gray-600">
                        📍 {item.sellerLocation || "Local area"}
                        </p>

                        {item.sellerPhone && (
                        <p className="text-xs text-teal-700 font-medium mt-1">
                            📞 {item.sellerPhone}
                        </p>
                        )}
                    </div>
                    </div>


              <p className="font-bold text-lg">₹ {item.price}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded shadow p-5 h-fit">

          <h3 className="font-bold text-lg mb-4">Price Details</h3>

          <div className="flex justify-between mb-2 text-sm">
            <span>Items ({cartItems.length})</span>
            <span>
              ₹ {cartItems.reduce((sum, i) => sum + Number(i.price), 0)}
            </span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="mb-4"/>

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>
              ₹ {cartItems.reduce((sum, i) => sum + Number(i.price), 0)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-[#002f34] hover:bg-[#004f55] text-white w-full py-3 rounded font-semibold transition"
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
