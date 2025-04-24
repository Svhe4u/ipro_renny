'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PersonalInfoFormProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  onChange: (newData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData, onChange }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
    >
      <div>
        <Label htmlFor="name" className="text-white">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-white">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
      <div>
        <Label htmlFor="address" className="text-white">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;