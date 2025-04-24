'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CvData {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  // ... other CV sections
}

export default function ViewCvPage() {
  const { id } = useParams();
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCv = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/cvs/${id}`); // Your backend API
        if (!response.ok) {
          throw new Error(`Failed to fetch CV: ${response.status}`);
        }
        const data = await response.json();
        setCvData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch CV data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCv();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading CV...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading CV: {error}</div>;
  }

  if (!cvData) {
    return <div className="p-6 text-white">CV not found.</div>;
  }

  return (
    <div className="p-6">
      <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">CV Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p>Name: {cvData.personalInfo.name}</p>
            <p>Email: {cvData.personalInfo.email}</p>
            <p>Phone: {cvData.personalInfo.phone}</p>
            <p>Address: {cvData.personalInfo.address}</p>
          </div>
          {/* Render other CV sections based on the template */}
        </CardContent>
      </Card>
    </div>
  );
}