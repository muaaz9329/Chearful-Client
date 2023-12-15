import meetAPractitionerServices from '@app/domains/meet-a-practitioner/meet-a-practitioner-services';
import { PractitionerData } from '@app/domains/meet-a-practitioner/types';
import { useEffect, useState } from 'react';

interface IData {
  data: PractitionerData | null;
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
    meetAPractitionerServices.getPractitioners({
      onSuccess: ({ data }) => {
        setData({
          data,
          loading: false,
          success: true,
        });
      },
      onFailure: () => {
        setData({
          data: null,
          loading: false,
          success: false,
        });
      },
    });
  }, [reload]);

  return {
    reloadScreen,
    ...data,
  };
};

export default useApi;
