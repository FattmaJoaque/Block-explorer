import { publicClient } from '../helpers/network';
import { formatEther } from 'viem';

const container = document.querySelector('#transaction') as HTMLElement;

const params = new URLSearchParams(window.location.search);
const hash = params.get('hash');


const createRow = (label: string, value: string | HTMLElement) => {
  const row = document.createElement('div');

  const labelEl = document.createElement('span');
  labelEl.classList.add('label');
  labelEl.textContent = `${label}: `;

  row.appendChild(labelEl);

  if (typeof value === 'string') {
    row.appendChild(document.createTextNode(value));
  } else {
    row.appendChild(value);
  }

  return row;
};

async function loadTransaction() {
  if (!hash) {
    container.textContent = 'No transaction hash provided';
    return;
  }

  try {
    const tx = await publicClient.getTransaction({
      hash: hash as `0x${string}`,
    });

    const receipt = await publicClient.getTransactionReceipt({
      hash: hash as `0x${string}`,
    });

  
    const card = document.createElement('div');
    card.classList.add('section');

  
    card.appendChild(createRow('Hash', tx.hash));
    card.appendChild(createRow('From', tx.from));
    card.appendChild(createRow('To', tx.to ?? 'Contract'));

  
    const valueEl = document.createElement('span');
    valueEl.classList.add('eth');
    valueEl.textContent = `${parseFloat(formatEther(tx.value)).toFixed(4)} ETH`;

    card.appendChild(createRow('Value', valueEl));

   
    const statusEl = document.createElement('span');
    statusEl.classList.add(
      receipt.status === 'success' ? 'status-success' : 'status-failed'
    );
    statusEl.textContent =
      receipt.status === 'success' ? 'Confirmed' : 'Failed';

    card.appendChild(createRow('Status', statusEl));
    card.appendChild(createRow('Block', receipt.blockNumber.toString()));

   
    container.innerHTML = '';
    container.appendChild(card);

  } catch (err) {
    console.error(err);

    container.innerHTML = `
      <p style="color:#ef4444;">Transaction not found. Try refreshing.</p>
    `;
  }
}

loadTransaction();
