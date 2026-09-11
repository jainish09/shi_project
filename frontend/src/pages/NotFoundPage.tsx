import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400">
        <AlertOctagon className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black font-mono text-slate-100 uppercase">404 - SECTOR NOT FOUND</h1>
      <p className="text-sm text-slate-400 max-w-md">
        The requested GIS module coordinate or page route does not exist in the Thermal Sentinel command system.
      </p>
      <Button variant="primary" icon={<Home className="w-4 h-4" />} onClick={() => navigate('/')}>
        Return to Dashboard
      </Button>
    </div>
  );
};
