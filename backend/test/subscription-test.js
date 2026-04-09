const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("APISubscription", function () {
  let APISubscription, contract, owner, addr1;
  const basicFee = ethers.parseEther("0.01");

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    APISubscription = await ethers.getContractFactory("APISubscription");
    // No arguments here because the constructor is now empty
    contract = await APISubscription.deploy(); 
  });

  it("Should allow a user to subscribe to Basic tier", async function () {
    // We pass '0' for Basic tier
    await contract.connect(addr1).subscribe(0, { value: basicFee });
    const sub = await contract.getSubscription(addr1.address);
    expect(sub[2]).to.equal(true); // sub[2] is the 'active' boolean
  });

  it("Should fail if the wrong fee is sent", async function () {
    const wrongFee = ethers.parseEther("0.005");
    await expect(
      contract.connect(addr1).subscribe(0, { value: wrongFee })
    ).to.be.revertedWith("Incorrect ETH amount");
  });

  it("Should allow the owner to withdraw funds", async function () {
    await contract.connect(addr1).subscribe(0, { value: basicFee });
    const initialBalance = await ethers.provider.getBalance(owner.address);
    await contract.withdraw();
    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.be.greaterThan(initialBalance);
  });
});