const connectButton = document.querySelector("#connect");
const disconnectButton = document.querySelector("#disconnect");
const submitButton = document.querySelector("#submit");
const input = document.querySelector("#input");


// import {
//     Connection,
//     PublicKey,
//     Transaction,
//     clusterApiUrl,
//     SystemProgram
//   } from "@solana/web3.js";


async function signMessage(message) {
    const data = new TextEncoder().encode(message);
    // this will return the public key of signer and the txn signature in hex.
    const res = await await window.solana.request({
        method: "signMessage",
        params: {
             message: data,
             display: "hex",
        },
    });
    console.log("Message signed");
    console.dir(res);
};

// Disconnect form wallet
disconnectButton.addEventListener("click", async (e) => {
    try {
        await window.solana.request({ method: "disconnect" });
        window.solana.on('disconnect', () => console.log("disconnected!"))
    }
    catch (err) {
        alert(err.message);
        console.error(err.message)
    }
})

// Connect to wallet
connectButton.addEventListener("click", async (e) => {
    // Check if solana is installed.
    const isPhantomInstalled = window.solana && window.solana.isPhantom

    // Need to redirect to install solana here.
    if (!isPhantomInstalled) {
        window.open("https://phantom.app/", "_blank");
    }

    await window.solana.connect();


    window.solana.on("connect", () => console.log("connected!"))
})

// Handle the input
submitButton.addEventListener("click", e => {
    e.preventDefault();
    signMessage(input.value);
})