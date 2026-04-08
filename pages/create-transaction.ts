import { WalletClient, parseEther } from 'viem';
import { walletClient } from '../helpers/network';

const form = document.querySelector('#transaction-form') as HTMLFormElement;
const toInput = document.querySelector('#to') as HTMLInputElement;
const valueInput = document.querySelector('#value') as HTMLInputElement;

let client: WalletClient;

const initApp = () => {
  client = walletClient;
};

const createTransaction = async (e: SubmitEvent) => {
  e.preventDefault();

  if (!toInput.value || !valueInput.value) {
    showMessage('Please fill all fields', 'error');
    return;
  }

  if (!client.account) {
    showMessage('No wallet account found', 'error');
    return;
  }

  try {
    const hash = await client.sendTransaction({
      account: client.account, 
      to: toInput.value as `0x${string}`,
      value: parseEther(valueInput.value),
      chain: client.chain,
    });

    console.log('TX Hash:', hash);

    showMessage('Transaction sent!', 'success');

    setTimeout(() => {
      location.href = '/pages/transactions.html';
    }, 1500);

  } catch (error) {
    console.error(error);
    showMessage('Transaction failed', 'error');
  }
};

const showMessage = (text: string, type: 'success' | 'error') => {
  let msg = document.querySelector('#tx-message') as HTMLElement;

  if (!msg) {
    msg = document.createElement('p');
    msg.id = 'tx-message';
    form.appendChild(msg);
  }

  msg.textContent = text;
  msg.style.marginTop = '10px';
  msg.style.color = type === 'success' ? '#22c55e' : '#ef4444';
};

initApp();
form.addEventListener('submit', createTransaction);