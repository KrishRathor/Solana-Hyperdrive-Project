import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { encodeURL, findReference, validateTransfer, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';

const myWallet = 'C8fwXpzyG4P1oGRCU2jNVAvUt4Mg7DZTrfm4M8ELDqok'; // Replace with your wallet address (this is the destination where the payment will be sent)
const recipient = new PublicKey(myWallet);
const amount = 0.0005; // 0.0001 SOL
const label = 'QuickNode Guide Store';
const memo = 'QN Solana Pay Demo Public Memo';
const quicknodeEndpoint = 'https://dark-damp-slug.solana-devnet.quiknode.pro/9d362c3dcd1b605a7ebf750dc8a133ce451baee2/';

async function generateUrl(
    recipient: PublicKey,
    amount: number,
    reference: PublicKey,
    label: string,
    message: string,
    memo: string,
) {
    const url: URL = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });
    return { url };
}

const paymentRequests = new Map<string, { recipient: PublicKey; amount: number; memo: string }>();

export async function verifyTransaction(reference: PublicKey) {
    // 1 - Check that the payment request exists
    const paymentData = paymentRequests.get(reference.toBase58());
    if (!paymentData) {
      throw new Error('Payment request not found');
    }
    const { recipient, amount, memo } = paymentData;
    // 2 - Establish a Connection to the Solana Cluster
    const connection = new Connection(quicknodeEndpoint, 'confirmed');
    console.log('recipient', recipient.toBase58());
    console.log('amount', amount);
    console.log('reference', reference.toBase58());
    console.log('memo', memo);
  
    // 3 - Find the transaction reference
    const found = await findReference(connection, reference);
    console.log(found.signature)
  
    // 4 - Validate the transaction
    const response = await validateTransfer(
      connection,
      found.signature,
      {
        recipient,
        amount,
        splToken: undefined,
        reference,
        //memo
      },
      { commitment: 'confirmed' }
    );
    // 5 - Delete the payment request from local storage and return the response
    if (response) {
      paymentRequests.delete(reference.toBase58());
    }
    return response;
}

export async function generateQrCode () {
    const reference = new Keypair().publicKey;
        const message = `QuickNode Demo - Order ID #0${Math.floor(Math.random() * 999999) + 1}`;
        const urlData = await generateUrl(
            recipient,
            amount,
            reference,
            label,
            message,
            memo
        );
        const { url } = urlData;
        const urlString = url.toString();
        const qr = createQR(urlString);
        const qrBlob = await qr.getRawData('png');
        const reader = new FileReader();
        let qrCode;
        reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
            qrCode = event.target.result;
            console.log(qrCode, 'inside function');
        }
        };
        console.log(qrCode, 'ouside function');
        reader.readAsDataURL(qrBlob);
        return qrCode;
}