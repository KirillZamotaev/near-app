import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
export const ParamsPreserver = () => {
  const [urlSearchParams] = useSearchParams();

  console.log('params');

  useEffect(() => {
    function populateStorage() {
      console.log('params', urlSearchParams.toString());
      localStorage.setItem('params', urlSearchParams.toString());
    }

    populateStorage();
  }, [urlSearchParams]);

  return null;
};
