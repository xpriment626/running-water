# Ropsten Test Faucet

This faucet project is built with pre-defined eth deposit amounts as well as a default withdrawal amount.

The app purposely reloads the window upon account and network changes on MetaMask as opposed to the dynamic changes made to ETH balance. This is to account for the functions that must be disabled if deployment, provider, and account are not found.

I set default withdrawal and deposit amounts simply cause I wanna use this app as a personal Ropsten faucet when the others are down. Makes things more managable and is a more practical implementation opposed to 24hr withdrawal restrictions (given the scope in which I'm using the app).

## Default Withdrawal:

-   0.5 ETH

## Default Funding Amounts:

-   0.5 ETH
-   1 ETH
-   3 ETH
-   5 ETH

## Tech Stack:

-   NextJS
-   Tailwind CSS
-   Truffle
-   Alchemy

## How to Use

1. Click the connect wallet button
2. Add your desired accounts
3. Make sure you're connected to the Ropsten Testnet
4. Your account address should be displayed along with the faucet balance
5. Withdraw or deposit eth as you see fit
