import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/TheamSlice"; // named import

function ThemeButton() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-3 py-1 rounded border "
    >
      {mode === "light" ? "🌙 " : "☀ "}
    </button>
  );
}

export default ThemeButton;
