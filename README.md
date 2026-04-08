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
bash 
git clone https://github.com/FattmaJoaque/Block-explorer.git 

### 2. Install dependancies

### 3. Start local blockchain

### 4. Configure network 

### 5. Start the app 


---

## PAGES 

# Home 
- An introduction to the application

# Blocks
- List recent blocks
- Display recent blocks and timestamps
- Links to transaction details

# Transaction 
- Shows recent transactions
- Displays sender, receiver, and value

# Create Transaction
- Send ETH between accounts
- Connected to local blockchain 

# Transaction Details 
- Full transaction information
- Status (confirmed/failed)
- Block number

---

## How it works
The application connects to a local Ethereum blockchain using VIEM library. 
- publicClient --> reads blockchain data
- walletClient --> sends transactions
  
Data such as blocks and transactions are fetched dynamically and rendered in the UI. 






