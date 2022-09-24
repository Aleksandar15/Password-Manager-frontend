const copyText = (text, failAlert) => {
  if (text === "") {
    return alert(failAlert);
  }
  navigator.clipboard.writeText(text);
  alert("Password copied!");
};

export default copyText;
