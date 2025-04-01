import App from "../components/App";
import { Handshake } from "lucide-react";

export default function Home() {
  return (
  <>
    <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-4 mt-8 tracking-tight flex items-center justify-center gap-4">
    <Handshake className="w-10 h-10 text-blue-600" />
    Mergers & Acquisitions Search
    </h1>
    <p className="text-center mb-8">Find recent or historic M&A activity by company name</p>
    <App />
  </>);
}
