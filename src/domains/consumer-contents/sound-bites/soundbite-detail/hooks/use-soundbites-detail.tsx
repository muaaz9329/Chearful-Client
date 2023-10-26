import ContentService from "@app/services/content-services";
import React, { useEffect, useState } from "react";
import { DEFAULT_DATA_SOUNDBITES } from "../../soundbite-listing/components/defaultData";

/**
 * 
 * @param id {number} id of the soundbite
 * @param setLoading {function} function to invoke loading screen when data is loading
 * @returns 
 */

const useSoundbitesDetail = (
  id: number,
  setLoading: (val: boolean) => void
) => {
  // Takes Id of the Sound Bite and return the data of that sound bite
  const [data, setData] = useState<ISoundBitesDetail>(DEFAULT_DATA_SOUNDBITES);
  useEffect(() => {
    setLoading(true);
    const handleApiCall = () => {
      ContentService.getSoundBiteDetails({
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
export default useSoundbitesDetail;
