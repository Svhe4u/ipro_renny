'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SummaryFormProps {
  initialData: string;
  onChange: (newData: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ initialData, onChange }) => {
  const [summary, setSummary] = useState(initialData);

  useEffect(() => {
    onChange(summary);
  }, [summary, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <Label htmlFor="summary" className="text-white">Professional Summary / Objective</Label>
      <Input
        id="summary"
        value={summary}
        onChange={handleInputChange}
        className="bg-gray-800 text-white border-gray-700"
        multiline
        rows={5}
        placeholder="A brief summary of your professional experience and goals."
      />
    </motion.div>
  );
};

export default SummaryForm;