'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@/components/ui/tag'; // Assuming you have a Tag component

interface SkillsFormProps {
  initialData: string[]; // Array of skills
  onChange: (newData: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ initialData, onChange }) => {
  const [skills, setSkills] = useState<string[]>(initialData);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    onChange(skills);
  }, [skills, onChange]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="new-skill" className="text-white">Add Skill</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="new-skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="bg-gray-800 text-white border-gray-700 flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill();
              }
            }}
          />
          <Button onClick={handleAddSkill} className="bg-blue-500 hover:bg-blue-600 text-white">
            Add
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-white">Skills</Label>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-flex items-center rounded-full bg-gray-700 text-white px-3 py-1 text-sm font-medium space-x-1"
              >
                <span>{skill}</span>
                <Button
                  onClick={() => handleRemoveSkill(skill)}
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-700/20"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;