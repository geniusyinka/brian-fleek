"use client";
import { useWalletClient, useAccount } from "wagmi";
import { useState, useEffect } from "react";

type TransactionStep = {
  [key: string]: any; // Replace with exact transaction properties
};

export default function ExecuteTransaction() {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [transactionStep, setTransactionStep] = useState<TransactionStep | null>(null);
  const [loading, setLoading] = useState(false);

  // Effect to log connected account details
  useEffect(() => {
    if (isConnected) {
      console.log("Connected account:", address);
    }
  }, [isConnected, address]);

  // Function to fetch transaction details from the backend API
  const fetchTransactionDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://thundering-island-early.functions.on-fleek.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "swap 0.001 ETH for USDC on sepolia to 0x05CC0391045d49BE3DA54e49041Ad5c5eDB555Db",
          address: "0x0eD6b59C8BFfd2DB1019Ea8938F11Ad19c8Be0a5",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transaction details");
      }

      const data = await response.json();
      setTransactionStep(data); // Store the transaction details for later use
      console.log("Fetched transaction details:", data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to execute the transaction using Wagmi
  const handleTransaction = async () => {
    try {
      if (!walletClient) {
        console.error("Wallet client not found");
        return;
      }

      if (!transactionStep) {
        console.error("No transaction details available");
        return;
      }

      const result = await walletClient.sendTransaction({
        ...transactionStep, // Use transaction details fetched from the backend
      });

      console.log("Transaction executed:", result);
    } catch (error) {
      console.error("Error executing transaction:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchTransactionDetails} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Transaction Details"}
      </button>
      <button onClick={handleTransaction} disabled={!transactionStep || loading}>
        Execute Transaction
      </button>
      {isConnected ? (
        <p>Connected Account: {address}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
