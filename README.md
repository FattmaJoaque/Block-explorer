# Block Explorer

A frontend application that interacts with an Ethereum blockchain.  
The app allows users to explore blocks, view transactions, check balances, and create new transactions using a local blockchain (Ganache).

---

## Features

-  View latest blocks on the blockchain  
-  Check account balance (in Ether)  
-  Browse recent transactions  
-  View detailed transaction information  
-  Create and send new transactions  
-  Responsive design (mobile & tablet support)

---

## Tech Stack

- **Frontend:** HTML, CSS, TypeScript  
- **Blockchain Client:** `viem`  
- **Local Blockchain:** Ganache  
- **Build Tool:** Vite  

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/FattmaJoaque/Block-explorer.git 
cd block-explorer




How It Works

The application connects to a local Ethereum blockchain using the viem library.

publicClient → reads blockchain data
walletClient → sends transactions

Data such as blocks and transactions are fetched dynamically and rendered in the UI.


