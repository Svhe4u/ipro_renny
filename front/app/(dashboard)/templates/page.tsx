'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  previewImage: string; // URL to the preview image
}

const TemplateCard = ({ template, onSelect }: { template: Template; onSelect: (id: string) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-white/10 overflow-hidden"
  >
    <img src={template.previewImage} alt={template.name} className="w-full h-48 object-cover" />
    <CardContent className="p-4">
      <CardTitle className="text-lg font-semibold text-white">{template.name}</CardTitle>
      <Button onClick={() => onSelect(template.id)} className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white">
        Select Template
      </Button>
    </CardContent>
  </motion.div>
);

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/templates'); // Your backend API
        if (!response.ok) {
          throw new Error(`Failed to fetch templates: ${response.status}`);
        }
        const data = await response.json();
        setTemplates(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch templates.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/cvs/new?template=${templateId}`); // Pass template ID to the new CV page
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading templates...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading templates: {error}</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold text-white">Choose a Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} onSelect={handleTemplateSelect} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}