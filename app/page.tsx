"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ExecuteTransaction from "./components/tx";

export default function Home() {


  return (
<div>
  <ConnectButton/>
  <ExecuteTransaction/>
</div>
  );
}
