import React, { useState } from "react";
import copyText from "../../Utils/copyText";

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = `!@#$%^&*()_+=-/"\\~|,.;:[]{}<>?'\``;

const PasswordGenerator = () => {
  const generateLowercase = () => {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  };

  const generateUppercase = () => {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
  };

  const generateNumber = () => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const generateSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const [genPassword, setGenPassword] = useState({
    pwLength: 10,
    canContainLowerCase: false,
    canContainUpperCase: false,
    canContainNumbers: false,
    canContainSymbols: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "pwLength":
        return setGenPassword((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      default:
        setGenPassword((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
    }
  };
  const generatePW = () => {
    const pw = [];
    if (genPassword.canContainLowerCase) {
      pw.push(generateLowercase());
    }
    if (genPassword.canContainUpperCase) {
      pw.push(generateUppercase());
    }
    if (genPassword.canContainNumbers) {
      pw.push(generateNumber());
    }
    if (genPassword.canContainSymbols) {
      pw.push(generateSymbol());
    }

    return pw[Math.floor(Math.random() * pw.length)];
  };

  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const {
      pwLength,
      canContainLowerCase,
      canContainUpperCase,
      canContainNumbers,
      canContainSymbols,
    } = genPassword;
    let password = "";
    if (pwLength === "" || pwLength < 1) {
      return alert("Length of password can't be less than 1 character");
    } else if (
      !canContainLowerCase &&
      !canContainUpperCase &&
      !canContainNumbers &&
      !canContainSymbols
    ) {
      return alert("Select at least one of the boxes!");
    } else {
      let i = 0;
      while (i < pwLength) {
        i++;
        const addPW = generatePW();
        password += addPW;
      }
      setGeneratedPassword(password);
    }
  };

  return (
    <div className="modal" id={"generatePassword"}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-success">
              GENERATE RANDOM PASSWORD
            </h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body">
            <form
              autoComplete="off"
              className="text-secondary text-left"
              onChange={handleChange}
            >
              <div className="form-group">
                <div className="form-group">
                  <div className="form-inline">
                    <label htmlFor="len" className="font-weight-bold mr-2">
                      Password Length:
                    </label>
                    <input
                      id="len"
                      type="number"
                      className="form-control font-weight-bold"
                      min="1"
                      placeholder="Enter password length"
                      name="pwLength"
                      value={genPassword.pwLength}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-check">
                  <input
                    id="lower"
                    type="checkbox"
                    className="form-check-input"
                    name="canContainLowerCase"
                    value={genPassword.canContainLowerCase}
                    onChange={handleChange}
                    checked={genPassword.canContainLowerCase}
                  />
                  <label
                    htmlFor="lower"
                    className="form-check-label font-weight-bold text-secondary"
                  >
                    Can Contain Lowercase Letters
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="upper"
                    type="checkbox"
                    className="form-check-input"
                    name="canContainUpperCase"
                    checked={genPassword.canContainUpperCase}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="upper"
                    className="form-check-label font-weight-bold"
                  >
                    Can Contain Uppercase Letters
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="number"
                    type="checkbox"
                    className="form-check-input"
                    name="canContainNumbers"
                    onChange={handleChange}
                    checked={genPassword.canContainNumbers}
                  />
                  <label
                    htmlFor="number"
                    className="form-check-label font-weight-bold"
                  >
                    Can Contain Numbers
                  </label>
                </div>
                <div className="form-check">
                  <label
                    htmlFor="symbol"
                    className="form-check-label font-weight-bold"
                  >
                    <input
                      id="symbol"
                      type="checkbox"
                      className="form-check-input"
                      name="canContainSymbols"
                      onChange={handleChange}
                      checked={genPassword.canContainSymbols}
                    />
                    Can Contain Symbols
                  </label>
                </div>
              </div>
              <button
                type="button"
                className="btn m-0 py-0 px-1 bg-secondary mr-2"
                style={{ color: "aqua", borderColor: "aqua", fontSize: "14px" }}
                onClick={() =>
                  setGenPassword((prevState) => ({
                    ...prevState,
                    canContainLowerCase: true,
                    canContainUpperCase: true,
                    canContainNumbers: true,
                    canContainSymbols: true,
                  }))
                }
              >
                SELECT ALL
              </button>
              <button
                className="btn m-0 py-0 px-1 bg-secondary text-warning"
                style={{ borderColor: "gold", fontSize: "14px" }}
                type="button"
                onClick={() => {
                  setGenPassword((prevState) => ({
                    ...prevState,
                    canContainLowerCase: false,
                    canContainUpperCase: false,
                    canContainNumbers: false,
                    canContainSymbols: false,
                  }));
                  //
                  setGeneratedPassword("");
                }}
              >
                RESET FIELDS
              </button>

              <div className="text-center">
                <label
                  htmlFor="generatedPassword"
                  className="text-success mt-2 font-weight-bold"
                >
                  GENERATED PASSWORD:
                </label>
                <input
                  id="generatedPassword"
                  type="text"
                  className="form-control"
                  //
                  value={generatedPassword}
                  disabled
                />
              </div>

              <div className="input-group">
                <div className="input-group-append"></div>
              </div>
            </form>
          </div>

          {/* <!-- Modal footer --> */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success text-light mt-2 changeNameMobile"
              onClick={() => generatePassword()}
            >
              GENERATE PASSWORD
            </button>
            <button
              type="button"
              className="btn btn-outline-primary mt-2 mt-sm-2 bg-light text-primary"
              onClick={() =>
                copyText(generatedPassword, "No password generated yet")
              }
            >
              COPY
            </button>
            <button
              type="button"
              className="btn btn-danger mt-2"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
