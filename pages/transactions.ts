import { PublicClient, formatEther, Hash } from 'viem';
import { publicClient } from '../helpers/network';
import { createElement } from '../helpers/dom';

const list = document.querySelector('#list') as HTMLElement;
let client: PublicClient;

const createRow = (label: string, value: string | HTMLElement) => {
  const row = createElement('div');

  const labelEl = createElement('span');
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

const initApp = () => {
  client = publicClient;
  listTransactions();
};

const listTransactions = async () => {
  const latestBlock = await client.getBlockNumber();

  const LIMIT = 20n;

  for (let i = latestBlock; i > latestBlock - LIMIT && i >= 0n; i--) {
    const block = await client.getBlock({
      blockNumber: i,
      includeTransactions: false,
    });

    if (block.transactions.length === 0) continue;

    for (const txHash of block.transactions) {
      const tx = await client.getTransaction({ hash: txHash as Hash });

      const div = createElement('div');
      div.classList.add('section');


      div.appendChild(createRow('Hash', tx.hash.slice(0, 18) + '...'));
      div.appendChild(createRow('From', tx.from.slice(0, 14) + '...'));
      div.appendChild(
        createRow(
          'To',
          tx.to ? tx.to.slice(0, 14) + '...' : 'Contract'
        )
      );


      const valueEl = createElement('span');
      valueEl.classList.add('eth');
      valueEl.textContent = `${parseFloat(formatEther(tx.value)).toFixed(4)} ETH`;

      div.appendChild(createRow('Value', valueEl));


      const button = document.createElement('a');
      button.innerText = 'Show';
      button.classList.add('btn');
      button.href = `transaction.html?hash=${tx.hash}`;

      div.appendChild(button);

      list.appendChild(div);
    }
  }
};

initApp();