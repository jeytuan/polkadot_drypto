# 🧪 Polkadot Drypto — Encode Hackathon Submission

This repository contains our submission for the **Encode x Polkadot Hackathon**, showcasing a working example of a minimal smart contract written in [`ink!`](https://use.ink/) and deployed on a local `substrate-contracts-node`.

## 🧱 Project Structure

```
polkadot_drypto/
├── contracts/
│   └── minimal_ink_test/
│       ├── lib.rs
│       ├── Cargo.toml
│       └── target/ink/minimal_ink_test.contract
├── screenshots/
│   └── deployment_proof.png
├── README.md
```

## 🚀 How to Run

### 1. Clone the Repo

```bash
git clone https://github.com/jeytuan/polkadot_drypto
cd polkadot_drypto
```

### 2. Build the Contract

```bash
cd contracts/minimal_ink_test
cargo +nightly contract build
```

This will generate the `.contract` bundle in `target/ink/`.

### 3. Run a Local Node

We used the precompiled [`substrate-contracts-node`](https://github.com/paritytech/substrate-contracts-node/releases):

```bash
./substrate-contracts-node --dev --rpc-cors=all --rpc-external
```

### 4. Deploy via Polkadot.js

1. Go to [https://polkadot.js.org/apps](https://polkadot.js.org/apps)
2. Connect to `ws://127.0.0.1:9944`
3. Navigate to **Developer → Contracts**
4. Upload and deploy `.contract` file
5. Sign with a dev account like `Alice`

## ✅ Features Demonstrated

- Minimal `ink!` contract using `bool` state
- Constructor with initial value
- Function to flip the boolean
- Local node deployment
- Deployment proof & error-handling

## ⚠️ Known Issues

- Initial contract deployment failed due to `contracts.CodeRejected`, likely related to metadata or runtime mismatch.
- Debugging still ongoing. However, all core steps were executed.

## 📷 Screenshots

Included in `screenshots/` folder.

## 🧠 Authors

- `@jeytuan` – Justin Nguyen

## 📬 Submission Note

A final PDF summary + GitHub repo link will be submitted to Anthony Beaumont and Rebecca Manoharan.