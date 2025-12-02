import { Routes, Route } from "react-router-dom";
import { ethers } from 'ethers';  // Already imported or add via npm
const JADE_ADDR = '0x330f4fe5ef44b4d0742fe8bed8ca5e29359870df';
const provider = new ethers.providers.Web3Provider(window.ethereum);
async function getJadeBalance() {
  if (window.ethereum) {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(JADE_ADDR, [
      "function balanceOf(address) view returns (uint256)"
    ], provider);
    const balance = await contract.balanceOf(await signer.getAddress());
    return ethers.utils.formatUnits(balance, 9);  // JADE: 9 decimals
  }
}
// Call on load: setVotingPower(await getJadeBalance());
// For revoke: use setInterval(15s) to re-check & adjust votes if balance < voted.
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import CoverPage from "./screens/CoverPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/*" element={<Navbar />} />
        </Routes>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
