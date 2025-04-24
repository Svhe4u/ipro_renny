'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function NewCvPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('template');

  useEffect(() => {
    const createNewCv = async () => {
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
      if (!user?.id) {
        router.push('/login');
        return;
      }

      const initialData = {
        userId: user.id,
        templateId: templateId || null, // Use selected template or null for blank
        personalInfo: {
          name: user.name || '', // Populate with user info if available
          email: user.email || '',
          phone: '',
          address: '',
        },
        experience: [],
        education: [],
        skills: [],
        summary: '',
        // ... other CV sections
      };

      try {
        const response = await fetch('/api/cvs', { // Your backend API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initialData),
        });

        const data = await response.json();

        if (response.ok) {
          router.push(`/cvs/${data.id}/edit`); // Redirect to the edit page of the new CV
        } else {
          console.error('Failed to create new CV:', data.message || 'Something went wrong.');
          // Handle error (e.g., show a toast)
        }
      } catch (error) {
        console.error('Error creating new CV:', error);
        // Handle error
      }
    };

    createNewCv();
  }, [router, templateId]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      Creating your new CV...
    </div>
  );
}