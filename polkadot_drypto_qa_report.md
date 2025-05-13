# QA Report: ink! Smart Contract Development Experience

## Project Repository
[https://github.com/jeytuan/polkadot_drypto](https://github.com/jeytuan/polkadot_drypto)

## Overview

This QA report documents the development experience and challenges encountered during the Encode x Polkadot Hackathon while attempting to build, compile, and deploy smart contracts written in ink! for the Polkadot ecosystem.

## Development Environment

- OS: Ubuntu Linux (remote Proxmox VM)
- Rust Toolchain: `nightly-x86_64-unknown-linux-gnu`
- `cargo-contract`: 0.8.2
- `ink!` Version: 5.1.1
- UI Interface: [polkadot.js.org/apps](https://polkadot.js.org/apps)
- Local Node: `substrate-contracts-node` v0.42.0

## Summary of Issues

### ❌ Original Contract Build Failure

- **Error Encountered:**
  ```
  error: failed to parse manifest... the target `my_contract` is a binary and can't have any crate-types set (currently "cdylib")
  ```
- **Steps Taken to Fix:**
  - Verified `[lib] crate-type = ["cdylib"]` in `Cargo.toml`
  - Installed `rust-src`
  - Cleaned `target/` and `Cargo.lock`
  - Reinstalled `cargo-contract`
  - Recreated the project in a clean directory
  - Tested minimal contract in a clean project

- **Diagnosis:** The error message was misleading and likely tied to how `cargo-contract` builds in a temp directory. This was only resolved after creating a minimal contract project from scratch.

### ✅ Minimal Contract Compilation & Deployment

- `cargo contract new minimal_ink_test` succeeded.
- Contract built successfully with `cargo +nightly contract build --release`.
- Deployment and instantiation using Alice account via Polkadot.js UI was successful.
- Interactions (`get`, `flip`) with the contract were smooth via the UI.

## Deployment QA

- ✅ Local node synced and accepted code
- ✅ Deployment gas & weight displayed accurately
- ❌ First attempt failed due to missing injected signer setup
- ✅ Second attempt succeeded

## Developer Experience Notes

- **Strengths:**
  - UI is intuitive once a `.contract` file is built correctly.
  - Logs from substrate node are very helpful.
  - Integration between `cargo contract` and ink! is strong once working.

- **Weaknesses:**
  - Poor error messages from `cargo-contract` (misleading binary vs lib message).
  - Nightly toolchain + ink! version fragility.
  - No direct remote upload via Polkadot.js for `.contract` files.

## Suggestions for Improvement

- Better error diagnostics in `cargo-contract` when handling malformed or temp manifests.
- Document troubleshooting steps for common build issues like the above.
- Improve developer onboarding with better defaults for local Substrate test chains.
- Support remote upload or GitHub linking in `polkadot-js/apps` for remote development teams.

## Final Submission Plan

- GitHub Repo: [jeytuan/polkadot_drypto](https://github.com/jeytuan/polkadot_drypto)
- Contains:
  - `minimal_ink_test` contract
  - Build and deploy logs
  - README and QA report
- Will submit within 24 hours

## Closing Thoughts

Despite significant early hurdles with `cargo-contract` and ink! build flow, we were able to complete a successful build and deployment of a minimal ink! contract. Our team is submitting detailed documentation of the debugging process, tooling feedback, and next steps to help future developers succeed.