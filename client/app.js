import { Connection } from "@solana/web3.js";

const connectButton = document.querySelector("#connect");
const disconnectButton = document.querySelector("#disconnect");
const submitButton = document.querySelector("#submit");
const input = document.querySelector("#input");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const amount = document.querySelector("#amount");
const send = document.querySelector("#send");

// Connect to the local blockchain 
let connection = new Connection("http://localhost:8899");
// console.dir(connection)

// Get window.solana
const getProvider = () => {
    // Check if phantom is installed
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    }

    // Prompt to install phantom
    window.open("https://phantom.app/", "_blank");
}


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
    const provider = getProvider();

    await provider.connect();

    // This will fail if not connected properly
    from.value = provider.publicKey.toString();
})

// Handle the input
submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await signMessage(input.value);
    }
    catch (error) {
        console.log(error);
        alert(error.message);
    }
})

// Handle send money
send.addEventListener("click", async(e) => {
    e.preventDefault();

    // Validate these two.
    const amount = amount.value;
    const toAddress = to.value;


    
})