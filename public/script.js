RESPONSE_URL =
  "http://localhost:5000/translationchat-hvjswp/us-central1/translateIntent";

sessionId = String(Math.floor(Math.random() * 1000000000000));

function addNewMessage(msg, sender = "self") {
  const divNode = document.createElement("div");
  divNode.className = sender == "self" ? "message us" : "message : them";
  const textNode = document.createTextNode(msg);
  divNode.appendChild(textNode);
  document.getElementById("messages").appendChild(divNode);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url, data = {}) {
  // Default options are marked with *

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

async function getResponse(msg) {
  const jsonRes = await postData(RESPONSE_URL, {
    text: msg,
    sessionId: sessionId
  });
  return jsonRes;
}

document
  .getElementById("msg-form")
  .addEventListener("submit", async function(e) {
    e.preventDefault();
    const msg = document.getElementById("msg-form").elements[0].value;
    addNewMessage(msg);
    document.getElementById("msg-form").reset();
    document.getElementById("msg-input").innerText = "";
    getResponse(msg).then(reply => {
      addNewMessage(reply.replyText, "them");
    });
    return true;
  });
