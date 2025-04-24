'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoForm from '@/components/cv-editor/personal-info-form';
import { Button } from '@/components/ui/button';

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

export default function EditCvPage() {
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

  const handlePersonalInfoChange = (newInfo: PersonalInfoFormProps['initialData']) => {
    setCvData((prevData) =>
      prevData ? { ...prevData, personalInfo: newInfo } : null
    );
  };

  const handleSaveCv = async () => {
    if (cvData) {
      try {
        const response = await fetch(`/api/cvs/${id}`, { // Your backend API
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cvData),
        });

        if (response.ok) {
          // Show success message
          console.log('CV saved successfully!');
        } else {
          console.error('Failed to save CV:', response.status);
          // Handle error
        }
      } catch (error) {
        console.error('Error saving CV:', error);
        // Handle error
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading CV editor...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading CV editor: {error}</div>;
  }

  if (!cvData) {
    return <div className="p-6 text-white">CV not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Edit CV</h1>
      <Card className="bg-gray-800/80 backdrop-blur-md border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonalInfoForm initialData={cvData.personalInfo} onChange={handlePersonalInfoChange} />
        </CardContent>
      </Card>

      {/* Add other CV sections (ExperienceForm, EducationForm, etc.) here */}

      <Button onClick={handleSaveCv} className="bg-green-500 hover:bg-green-600 text-white">
        Save CV
      </Button>
    </div>
  );
}