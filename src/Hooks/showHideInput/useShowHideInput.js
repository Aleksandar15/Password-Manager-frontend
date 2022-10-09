import { useState } from "react";
const useShowHideButton = () => {
  const [showHideButton, setShowHide] = useState({
    className: "btn bg-light text-danger btn-sm",
    text: "SHOW",
    inputType: "password",
    btnStyle: {
      borderColor: "red",
    },
  });
  const showHideButtonSwitch = () => {
    setShowHide({
      className:
        showHideButton.className === "btn bg-light text-danger btn-sm"
          ? "btn bg-light text-primary btn-sm"
          : "btn bg-light text-danger btn-sm",
      text: showHideButton.text === "SHOW" ? "HIDE" : "SHOW",
      inputType: showHideButton.inputType === "password" ? "text" : "password",
      btnStyle: {
        borderColor:
          showHideButton.btnStyle.borderColor === "red" ? "blue" : "red",
      },
    });
  };
  return { showHideButton, showHideButtonSwitch };
};
export default useShowHideButton;
