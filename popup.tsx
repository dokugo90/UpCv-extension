import { useState } from "react";
// import { Storage } from "@plasmohq/storage"

import "./style.css"


function IndexPopup() {
  const [data, setData] = useState("")
 // popup.tsx

// Add an event listener to receive messages from the background script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   // Handle the received message here
//   console.log("Message received in popup script:" + message);

// });


  return (
    <div style={{ width: "200px" }}>
      <h1>Open UpWork and apply to a job and our generate cover letter will pop up!</h1>
    </div>
  )
}

export default IndexPopup
