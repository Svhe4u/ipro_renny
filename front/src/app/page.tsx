// src/app/page.tsx
'use client';
import React from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}
      <main className="flex flex-col items-center justify-center mt-10 px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Daraalal</h1>
        <p className="mb-8 text-center max-w-md text-gray-700">
          Learn and review your vocabulary with ease. Please log in to get started.
        </p>
        <LoginForm />
      </main>
    </div>
  );
}
