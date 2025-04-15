import Header from '../components/Header';  // Adjust path if needed

export default function Home() {
  return (
    <div>
      <Header />  {/* This renders the header component */}
      <main>
        <h1>Welcome to the main page!</h1>
        {/* Other content */}
      </main>
    </div>
  );
}
