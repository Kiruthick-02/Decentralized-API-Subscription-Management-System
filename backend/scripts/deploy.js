const hre = require("hardhat");

async function main() {
  console.log("Deploying Tiered APISubscription...");

  const Contract = await hre.ethers.getContractFactory("APISubscription");
  
  // REMOVE the arguments inside deploy()
  const contract = await Contract.deploy(); 

  await contract.waitForDeployment();

  console.log(`Success! Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});