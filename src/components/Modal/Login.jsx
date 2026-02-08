import { Carousel, Modal, ModalBody } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../Redux/ModalSlice";
import { googleLogin, loginUser, registerUser } from "../../Redux/AuthSlice";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import google from "../../assets/google.png";
import mobile from "../../assets/mobile.svg";
import guitar from "../../assets/guita.png";
import love from "../../assets/love.png";
import avatar from "../../assets/avatar.png";
import clos from "../../assets/clos.svg";

function Login() {
  const status = useSelector((state) => state.modal.openModal);
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLoginForm,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: regRegister,
    handleSubmit: handleRegSubmit,
    reset: resetRegForm,
    formState: { errors: regErrors },
  } = useForm();

  const onLoginSubmit = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  const onRegisterSubmit = (data) => {
    dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (user) {
      // alert(`Welcome, ${user.name || user.email}!`);
      dispatch(close());
      resetLoginForm();
      resetRegForm();
    }
  }, [user]);

  const handleClose = () => {
    dispatch(close());
    resetLoginForm();
    resetRegForm();
  };

  return (
    <Modal
      theme={{
        content: {
          base: "relative w-full p-4 md:h-auto",
          inner:
            "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
        },
      }}
      className="bg-black rounded-none"
      position={"center"}
      size="md"
      popup={true}
      show={status}
      onClose={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="p-6 pl-2 pr-2 bg-white">
        <img
          onClick={handleClose}
          className="w-6 absolute z-10 top-4 right-4 cursor-pointer"
          src={clos}
          alt="close"
        />

        <Carousel
          slide={false}
          theme={{
            indicators: {
              active: { off: "bg-gray-300", on: "bg-teal-300" },
              base: "h-2 w-2 rounded-full",
              wrapper: "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3",
            },
            scrollContainer: {
              base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
              snap: "snap-x",
            },
            control: { base: "inline-flex items-center justify-center bg-transparent", icon: "w-8 text-black" },
          }}
          className="w-full h-56 pb-5 rounded-none"
        >
          {[guitar, love, avatar].map((img, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <img className="w-24 pb-5" src={img} alt={`Slide ${idx + 1}`} />
              <p
                style={{ color: "#002f34" }}
                className="w-60 sm:w-72 text-center pb-5 font-semibold"
              >
                {idx === 0
                  ? "Help us become one of the safest place to buy and sell."
                  : idx === 1
                  ? "Close deals from the comfort of your home."
                  : "Keep all your favorites in one place."}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      <ModalBody className="bg-white h-auto p-6 rounded-none" onClick={(e) => e.stopPropagation()}>
        
        
        
        
        <div
          onClick={() => dispatch(googleLogin())}
          className="flex items-center justify-center rounded-md border-2 border-gray-300 p-2 relative h-10 cursor-pointer active:bg-teal-100 mb-4"
        >
          <img className="w-7 absolute left-2" src={google} alt="Google" />
          <p className="text-sm text-gray-500">Continue with Google</p>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">

          <button
            className={`px-4 py-2 font-semibold ${isLogin ? "border-b-2 border-teal-500" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold ${!isLogin ? "border-b-2 border-teal-500" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>


        {/* <div className="flex flex-col items-center mb-4">
          <p className="font-semibold text-sm">OR</p>
          <p className="font-bold text-sm pt-1 underline underline-offset-4">
            {isLogin ? "Login with Email" : "Register with Email"}
          </p>
        </div> */}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              {...loginRegister("email", { required: "Email is required" })}
              className="border p-2 rounded"
            />
            {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...loginRegister("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="border p-2 rounded"
            />
            {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password.message}</p>}

            <button type="submit" disabled={loading} className="bg-[#002f34] text-white py-2 rounded mt-2">
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleRegSubmit(onRegisterSubmit)} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Full Name"
              {...regRegister("name", { required: "Name is required" })}
              className="border p-2 rounded"
            />
            {regErrors.name && <p className="text-red-500 text-sm">{regErrors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...regRegister("email", { required: "Email is required" })}
              className="border p-2 rounded"
            />
            {regErrors.email && <p className="text-red-500 text-sm">{regErrors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...regRegister("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="border p-2 rounded"
            />
            {regErrors.password && <p className="text-red-500 text-sm">{regErrors.password.message}</p>}

            <button type="submit" disabled={loading} className="bg-[#002f34] text-white py-2 rounded mt-2">
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        )}

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="text-teal-500 font-semibold cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </ModalBody>
    </Modal>
  );
}

export default Login;
