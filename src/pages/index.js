import SearchBar from "../components/SearchBar";
import { Handshake } from "lucide-react";

export default function Home() {
  return (
  <>
    <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-8 mt-8 tracking-tight flex items-center justify-center gap-4">
    <Handshake className="w-10 h-10 text-blue-600" />
    Mergers & Acquisitions Search
    </h1>
    <SearchBar />
  </>);
}
