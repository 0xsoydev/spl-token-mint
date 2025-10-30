import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from 'fs';

const keypairPath = '/home/zer0day/.config/solana/id.json';
const keypairData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'));

const MINT_ACCOUNT = new PublicKey('6VeH5bEYvKx8BzY52nLWg2u3AUHEjwWkksEbxzLhHSTg');
const commitment: Commitment = "confirmed";
const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));

const connection = new Connection('https://api.devnet.solana.com', commitment);

(async () => {
  try {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, MINT_ACCOUNT, keypair.publicKey);
    console.log(`Token account created: ${tokenAccount.address}`);

    const amount = 1_000_000 * (10**6);

    await mintTo(
      connection,
      keypair,
      MINT_ACCOUNT,
      tokenAccount.address,
      keypair.publicKey,
      amount
    )

  } catch (e) {
    console.error(`Error Occured: ${e}`);
  }
})();
