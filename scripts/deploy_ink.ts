// scripts/deploy_ink.ts
import fs from "fs";
import path from "path";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { CodePromise } from "@polkadot/api-contract";
import type { WeightV2 } from "@polkadot/types/interfaces";

async function main() {
  // 1) Connect to Westend
  const wsProvider = new WsProvider("wss://westend-rpc.polkadot.io");
  const api = await ApiPromise.create({ provider: wsProvider });

  // 2) Load your dev account (Alice)
  const keyring = new Keyring({ type: "sr25519" });
  const alice = keyring.addFromUri("//Alice");

  // 3) Read the .contract bundle and .wasm
  const contractPath = path.resolve(
    __dirname,
    "../contracts/ink/my_contract/target/ink"
  );
  const bundle = JSON.parse(
    fs.readFileSync(
      path.join(contractPath, "my_contract.contract"),
      "utf8"
    )
  );
  const wasm = fs.readFileSync(
    path.join(contractPath, "my_contract.wasm")
  );

  // 4) Instantiate a CodePromise
  const code = new CodePromise(api, bundle, wasm);

  // 5) Build a gas limit & endowment
  //    (createType returns Codec so we cast it to WeightV2)
  const rawGas = api.registry.createType("WeightV2", {
    refTime: 1_000_000_000_000n,
    proofSize: 1_000_000_000_000n,
  });
  const gasLimit = rawGas as unknown as WeightV2;
  const endowment = 0;

  console.log("📦 Uploading code…");
  const tx = code.tx.new({ gasLimit, value: endowment }, true);

  const unsub = await tx.signAndSend(alice, (result) => {
    if (result.status.isInBlock) {
      console.log("✅ In block", result.status.asInBlock.toHex());

      // Look for the Instantiated event to get the contract address
      result.events
        .filter(({ event }) =>
          api.events.contracts.Instantiated.is(event)
        )
        .forEach(({ event: { data } }) => {
          // data = [deployer, contractAddress]
          const [, contractAddress] = data;
          console.log("🏁 Deployed at", contractAddress.toString());
        });

      unsub();
      process.exit(0);
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
