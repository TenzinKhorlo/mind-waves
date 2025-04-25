'use client';

import { useState } from 'react';
import { useLogin } from '@/contexts/UserContext';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string;
const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC as string;
const packageAddr = process.env.NEXT_PUBLIC_PACKAGE_ADDRESS as string;


export default function HomePage() {
  const { isLoggedIn, userDetails, login, logOut } = useLogin();

  const [loading, setLoading] = useState(false);
  const [txnDigest, setTxnDigest] = useState('');
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    url: '',
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNftData({ ...nftData, [e.target.name]: e.target.value });
  };

  const handleNFTMint = async () => {
    try {
      setLoading(true);
      const suiClient = new SuiClient({ url: FULLNODE_URL });
      const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC);

      const address = keypair.getPublicKey().toSuiAddress();
      console.log('👛 Sender wallet address:', address);

      const coins = await suiClient.getCoins({ owner: address, coinType: '0x2::sui::SUI' });

      if (coins.data.length === 0) {
        alert('No SUI tokens available. Please fund your wallet to mint the NFT.');
        return;
      }

      const txb = new Transaction();

      txb.moveCall({
        target:
          `${packageAddr}::coupon_nft::mint_to_address`,
        arguments: [
          txb.pure.string(nftData.name),
          txb.pure.string(nftData.description),
          txb.pure.string(nftData.url),
          txb.pure.string(nftData.imageUrl),
          txb.pure.address(userDetails.address),
        ],
      });

      const txnRes = await suiClient.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
      });

      if (txnRes?.digest) {
        setTxnDigest(txnRes.digest);
        alert(`NFT Minted! Digest: ${txnRes.digest}`);
      }
    } catch (err) {
      console.error('Error minting NFT:', err);
      alert('Minting failed. Check console.');
    } finally {
      setLoading(false);
      setNftData({
        name: '',
        description: '',
        url: '',
        imageUrl: '',
      })
    }
  };

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Create Coupon NFT</h1>

      {!isLoggedIn ? (
        <div className="text-center">
          <button
            onClick={login}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white text-black shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Coupon Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={nftData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm p-2"
                  placeholder="Enter Coupon Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={nftData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm p-2"
                  placeholder="Enter Coupon Details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="text"
                  name="url"
                  value={nftData.url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm p-2"
                  placeholder="Enter Coupon NFT URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={nftData.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm p-2"
                  placeholder="Enter image URL"
                />
              </div>
              <button
                onClick={handleNFTMint}
                disabled={loading}
                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                {loading ? 'Minting...' : 'Mint Coupon'}
              </button>
            </div>
          </div>

          {txnDigest && (
            <div className="bg-gray-100 p-4 rounded shadow">
              <p className="text-sm text-gray-700">
                <strong>Transaction Digest:</strong> {txnDigest}
              </p>
            </div>
          )}

        </div>
      )}
    </main>
  );
}
