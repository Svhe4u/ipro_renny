import Header from '../components/Header';
import CVForm from '../components/CVForm';

export default function CVMaker() {
  return (
    <div>
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Create Your CV</h1>
        <CVForm />
      </main>
    </div>
  );
}
