import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="text-center p-8">
        <h1 className="text-4xl font-bold">Welcome to the CV Maker</h1>
        <p className="mt-4 text-xl">Create and download your professional CV quickly!</p>
      </main>
    </div>
  );
}
