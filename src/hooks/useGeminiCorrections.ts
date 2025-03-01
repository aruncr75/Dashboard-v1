import { useState } from 'react';
import { sendMessageToGemini } from '@/lib/gemini-api';

export const useGeminiCorrections = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const correctText = async (text: string, prompt: string, correctionType: string) => {
    setLoadingStates(prev => ({ ...prev, [correctionType]: true }));
    setError(null);
    
    try {
      const response = await sendMessageToGemini(`${prompt}:\n\n${text}`);
      setLoadingStates(prev => ({ ...prev, [correctionType]: false }));
      return response;
    } catch (err) {
      setError('Failed to correct text. Please try again.');
      setLoadingStates(prev => ({ ...prev, [correctionType]: false }));
      return null;
    }
  };

  return { correctText, loadingStates, error };
};
