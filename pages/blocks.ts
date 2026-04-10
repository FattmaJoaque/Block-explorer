import { PublicClient, formatEther, Address } from 'viem';
import { publicClient } from '../helpers/network';
import { createElement, createTextElement } from '../helpers/dom';

const blockList = document.querySelector('#list') as HTMLDivElement;
const balanceHeader = document.querySelector('#balance') as HTMLHeadingElement;

let client: PublicClient;

const createRow = (label: string, value: string) => {
  const row = createElement('div');

  const labelEl = createElement('span');
  labelEl.classList.add('label');
  labelEl.textContent = `${label}: `;

  row.appendChild(labelEl);
  row.appendChild(document.createTextNode(value));

  return row;
};

const initApp = () => {
  client = publicClient;
  getBalance('0xe884815698a33b9979582087a2BD78e8b7ec6009' as Address);
  listBlocks();
};

const getBalance = async (address: Address) => {
  const balance = await client.getBalance({ address });
  balanceHeader.innerText =
    `Current balance: ${parseFloat(formatEther(balance)).toFixed(2)} ETH`;
};

const listBlocks = async () => {
  const latestBlock = await client.getBlockNumber();

  const LIMIT = 20n;

  for (let i = latestBlock; i > latestBlock - LIMIT && i >= 0n; i--) {
    const block = await client.getBlock({
      blockNumber: i,
      includeTransactions: true,
    });

    const div = createElement('div');
    div.classList.add('section');


    div.appendChild(createRow('Block', block.number!.toString()));
    div.appendChild(createRow('Hash', block.hash ?? ''));
    div.appendChild(
      createRow(
        'Time',
        new Date(Number(block.timestamp) * 1000).toLocaleString()
      )
    );


    if (block.transactions.length > 0) {
      const firstTx = block.transactions[0];

      const button = document.createElement('a');
      button.innerText = 'Show Transactions';
      button.classList.add('btn');
      button.href = `transaction.html?hash=${firstTx.hash}`;

      div.appendChild(button);
    } else {
      const noTx = createElement('div');
      noTx.textContent = 'No transactions';
      div.appendChild(noTx);
    }

    blockList.appendChild(div);
  }
};

initApp();