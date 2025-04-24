'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
}

interface ExperienceFormProps {
  initialData: Experience[];
  onChange: (newData: Experience[]) => void;
}

const ExperienceItem = ({
  experience,
  onRemove,
  onUpdate,
}: {
  experience: Experience;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updatedExperience: Experience) => void;
}) => {
  const handleInputChange = (field: keyof Experience, value: string) => {
    onUpdate(experience.id, { ...experience, [field]: value });
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
        <Label htmlFor={`title-${experience.id}`} className="text-white">Title</Label>
        <Input
          id={`title-${experience.id}`}
          value={experience.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor={`company-${experience.id}`} className="text-white">Company</Label>
        <Input
          id={`company-${experience.id}`}
          value={experience.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor={`startDate-${experience.id}`} className="text-white">Start Date</Label>
        <Input
          id={`startDate-${experience.id}`}
          type="date"
          value={experience.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor={`endDate-${experience.id}`} className="text-white">End Date (or Present)</Label>
        <Input
          id={`endDate-${experience.id}`}
          placeholder="YYYY-MM-DD or Present"
          value={experience.endDate}
          onChange={(e) => handleInputChange('endDate', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div className="col-span-full">
        <Label htmlFor={`description-${experience.id}`} className="text-white">Description</Label>
        <Input
          id={`description-${experience.id}`}
          value={experience.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
          multiline
        />
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemove(experience.id)}
        className="absolute top-2 right-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({ initialData, onChange }) => {
  const [experienceList, setExperienceList] = useState<Experience[]>(initialData);

  useEffect(() => {
    onChange(experienceList);
  }, [experienceList, onChange]);

  const handleAddExperience = () => {
    setExperienceList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperienceList((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleUpdateExperience = (id: string, updatedExperience: Experience) => {
    setExperienceList((prev) =>
      prev.map((exp) => (exp.id === id ? updatedExperience : exp))
    );
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {experienceList.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            onRemove={handleRemoveExperience}
            onUpdate={handleUpdateExperience}
          />
        ))}
      </AnimatePresence>
      <Button onClick={handleAddExperience} className="bg-blue-500 hover:bg-blue-600 text-white">
        Add Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;