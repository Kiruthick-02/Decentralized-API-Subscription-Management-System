const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("APISubscription", function () {
  let APISubscription, contract, owner, addr1;
  const fee = ethers.parseEther("0.01"); // 0.01 ETH
  const duration = 30 * 24 * 60 * 60; // 30 Days in seconds

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    APISubscription = await ethers.getContractFactory("APISubscription");
    contract = await APISubscription.deploy(fee, duration);
  });

  it("Should set the correct owner and fee", async function () {
    expect(await contract.owner()).to.equal(owner.address);
    expect(await contract.subscriptionFee()).to.equal(fee);
  });

  it("Should allow a user to subscribe", async function () {
    await contract.connect(addr1).subscribe({ value: fee });
    expect(await contract.checkAccess(addr1.address)).to.equal(true);
  });

  it("Should fail if the wrong fee is sent", async function () {
    const wrongFee = ethers.parseEther("0.005");
    await expect(
      contract.connect(addr1).subscribe({ value: wrongFee })
    ).to.be.revertedWith("Incorrect ETH amount sent");
  });

  it("Should allow the owner to withdraw funds", async function () {
    await contract.connect(addr1).subscribe({ value: fee });
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    
    await contract.withdraw();
    
    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
    expect(finalOwnerBalance).to.be.greaterThan(initialOwnerBalance);
  });
});