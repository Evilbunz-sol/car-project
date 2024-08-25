// hooks/useRecommendations.js
import { useMutation } from '@tanstack/react-query';
import { getRecommendations } from '../services/api';
import { useRecommendationsContext } from '../contexts/RecommendationsContext';

export const useRecommendations = () => {
  const { setRecommendations } = useRecommendationsContext();

  const mutation = useMutation({
    mutationFn: getRecommendations,
    onSuccess: (data) => {
      setRecommendations(data);
    },
    onError: (error) => {
      console.error('Error fetching recommendations:', error);
    }
  });

  return {
    fetchRecommendations: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};