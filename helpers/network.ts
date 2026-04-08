import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';


const ganache = {
  id: 1337,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_RPC_URL],
    },
  },
};



const account = privateKeyToAccount(import.meta.env.VITE_PRIVATE_KEY);

export const publicClient = createPublicClient({
  chain: ganache,
  transport: http(import.meta.env.VITE_RPC_URL),
});

export const walletClient = createWalletClient({
  account,
  chain: ganache,
  transport: http(import.meta.env.VITE_RPC_URL),
});