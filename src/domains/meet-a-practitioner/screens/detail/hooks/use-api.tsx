import meetAPractitionerServices from '@app/domains/meet-a-practitioner/meet-a-practitioner-services';
import { PractitionerDetail } from '@app/domains/meet-a-practitioner/types';
import { useEffect, useState } from 'react';

interface IData {
  data: null| PractitionerDetail;
  loading: boolean;
  success?: boolean;
}

const useApi = (slug:string) => {
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
    meetAPractitionerServices.getPractitionersDetail({
      slug,
      onSuccess: ({ ...res }) => {
        setData({
          // @ts-ignore
          data: res,
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
      }
    })
  }, [reload]);

  return {
    reloadScreen,
    ...data
  };
};

export default useApi;