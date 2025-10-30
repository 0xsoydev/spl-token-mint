import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import fs from 'fs';

const keypairPath = "/home/zer0day/.config/solana/id.json";
const keypairData = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));

const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
const commitment: Commitment = "confirmed";

const connection = new Connection("https://api.devnet.solana.com", commitment);

console.log(keypairData);

(async () => {
  try {
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      null,
      6
    );

    console.log(`Successfully created a min ${mint}`);
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
  }
})();
