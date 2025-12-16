import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';

// Simulates API-like data fetching
const fetchData = (endpoint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (endpoint) {
        case 'personal':
          resolve(portfolioData.personal);
          break;
        case 'education':
          resolve(portfolioData.education);
          break;
        case 'experience':
          resolve(portfolioData.experience);
          break;
        case 'blogs':
          resolve(portfolioData.blogs);
          break;
        case 'all':
          resolve(portfolioData);
          break;
        default:
          resolve(null);
      }
    }, 500); // Simulated network delay
  });
};

export const usePortfolioData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchData(endpoint);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, loading, error };
};

export default usePortfolioData;
