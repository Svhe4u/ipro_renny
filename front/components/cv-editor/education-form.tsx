'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
}

interface EducationFormProps {
  initialData: Education[];
  onChange: (newData: Education[]) => void;
}

const EducationItem = ({
  education,
  onRemove,
  onUpdate,
}: {
  education: Education;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updatedEducation: Education) => void;
}) => {
  const handleInputChange = (field: keyof Education, value: string) => {
    onUpdate(education.id, { ...education, [field]: value });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-gray-700 last:border-b-0"
    >
      <div>
        <Label htmlFor={`institution-${education.id}`} className="text-white">Institution</Label>
        <Input
          id={`institution-${education.id}`}
          value={education.institution}
          onChange={(e) => handleInputChange('institution', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor={`degree-${education.id}`} className="text-white">Degree</Label>
        <Input
          id={`degree-${education.id}`}
          value={education.degree}
          onChange={(e) => handleInputChange('degree', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor={`startDate-${education.id}`} className="text-white">Start Date</Label>
        <Input
          id={`startDate-${education.id}`}
          type="date"
          value={education.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor={`endDate-${education.id}`} className="text-white">End Date (or Expected)</Label>
        <Input
          id={`endDate-${education.id}`}
          placeholder="YYYY-MM-DD or Expected"
          value={education.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div className="col-span-full">
        <Label htmlFor={`description-${education.id}`} className="text-white">Description (Optional)</Label>
        <Input
          id={`description-${education.id}`}
          value={education.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
          multiline
        />
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemove(education.id)}
        className="absolute top-2 right-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

const EducationForm: React.FC<EducationFormProps> = ({ initialData, onChange }) => {
  const [educationList, setEducationList] = useState<Education[]>(initialData);

  useEffect(() => {
    onChange(educationList);
  }, [educationList, onChange]);

  const handleAddEducation = () => {
    setEducationList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemoveEducation = (id: string) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleUpdateEducation = (id: string, updatedEducation: Education) => {
    setEducationList((prev) =>
      prev.map((edu) => (edu.id === id ? updatedEducation : edu))
    );
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {educationList.map((education) => (
          <EducationItem
            key={education.id}
            education={education}
            onRemove={handleRemoveEducation}
            onUpdate={handleUpdateEducation}
          />
        ))}
      </AnimatePresence>
      <Button onClick={handleAddEducation} className="bg-blue-500 hover:bg-blue-600 text-white">
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;