import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { uploadPolicy } from '@/services/policyService';

export const UploadForm = ({ onUploadComplete }: { onUploadComplete: (summaryId: string) => void }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsUploading(true);
    const file = data.file[0];
    const response = await uploadPolicy(file); // send to backend
    onUploadComplete(response.summaryId); // assuming backend returns this
    reset();
    setIsUploading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="file" {...register('file', { required: true })} />
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Summarize'}
      </Button>
    </form>
  );
};
