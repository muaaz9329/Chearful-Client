import React, { useEffect, useState } from 'react';
import { TArticle } from '../../../types';
import DEFAULT_DATA_ARTICLE from '../../../constants';
import ContentService from '@app/domains/consumer-contents/service';

const useArticleDetail = (id: number, setLoading: (val: boolean) => void) => {
  // Takes Id of the Sound Bite and return the data of that sound bite
  const [data, setData] = useState<TArticle>(DEFAULT_DATA_ARTICLE);
  useEffect(() => {
    setLoading(true);
    const handleApiCall = () => {
      ContentService.getArticleDetails({
        id,
        onSuccess: (res) => {
          setData(res.data);
          setLoading(false);
        },
        onFailure: (err) => {
          console.log(err);
        },
      });
    };
    handleApiCall();
  }, []);

  return { data };
};
export default useArticleDetail;
