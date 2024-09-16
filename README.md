# SmartSplit

Access it here: https://smart-split-uoax.vercel.app/

## Project Overview

**SmartSplit** is a decentralized application (dApp) designed to simplify the process of splitting bills and managing payments on the Ethereum blockchain. By leveraging smart contracts, SmartSplit allows users to efficiently split a bill among multiple participants and automate payments, ensuring a transparent and seamless experience.

### Key Features:
- **Automated Payments**: Once a bill is split, payments are automatically distributed to the designated recipients based on the split configuration.
- **Group Management**: Create and manage groups of participants, specifying the payer and the total amount to be split.
- **Payment Tracking**: Keep track of who has paid and who still owes, with automatic updates when payments are made.
- **Blockchain Security**: All transactions are secured and recorded on the Ethereum blockchain, ensuring transparency and reliability.

## Tech Stacks

**SmartSplit** utilizes the following technologies:

- **React**: A JavaScript library for building user interfaces. React is used for the front-end of the application, providing a dynamic and responsive user experience.
- **Solidity**: A programming language for writing smart contracts on the Ethereum blockchain. Solidity is used to create the smart contracts that handle the logic for splitting bills and processing payments.
- **Hardhat**: A development environment and framework for Ethereum software. Hardhat is used for testing, deploying, and managing the Ethereum smart contracts in the SmartSplit project.
- **JavaScript**: A versatile programming language used for integrating the front-end React application with the Ethereum blockchain through the use of web3.js or ethers.js libraries.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rohith-kumar-mokhara/SmartSplit.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Install Dependencies**:
   ```bash
   cd smart
   npm install
   ```
4. **Compilation**
   ```bash
   node compile.cjs
   npm i web3 solc hardhat
   ```
5. **Hardhat**
  ```bash
   npx hardhat init
   npx hardhat node
  ```
Open new terminal and
6. ***Run These***
```bash
   cd smart
   node index.cjs
   node deploy.cjs
  ```

## Contribution by Team Members:

- **K Vijay Karthick**: Has written code for smart contracts and using web3 to integrate into the project and integrating all the smart contract functions from interact.ts in to the frontend
- **Rohith**: Has written code for the frontend .
- **Sudheer**: Has debugged all the frontend code
- **Eswar**: Made sure the UI looks attractive


