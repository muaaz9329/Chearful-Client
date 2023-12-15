import { useEffect, useState } from 'react';

interface IData {
  data: null;
  loading: boolean;
  success?: boolean;
}

const useApi = () => {
  const [data, setData] = useState<IData>({
    data: null,
    loading: true,
    success: false,
  });

  // set to true for the first render
  const [reload, setReload] = useState(true);

  const reloadScreen = () => {
    setReload(true);
  };

  useEffect(() => {
    // Add your API logic here
  }, [reload]);

  return {
    reloadScreen,
  };
};

export default useApi;