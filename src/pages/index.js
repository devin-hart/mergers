import App from "../components/App";

export default function Home() {
  return (
  <>
  <header className="px-4 sm:px-0 mb-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-4 mt-8 tracking-tight flex items-center justify-center gap-4">
            <img src="https://res.cloudinary.com/dlk1wqemy/image/upload/v1744140831/taxmaven-logo_qw5txu.png" alt="taxmaven logo"/>
        </h1>
        <p className="text-center mb-8">Find recent M&A activity</p>
  </header>
    <App />
  </>);
}
