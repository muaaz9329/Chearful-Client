import apiService from '@app/services/api-service/api-service';
import { Boolbacks } from '../../services/api-service/index';
import { getAuthHeaders } from '@app/utils';
const getMoodList = ({ onFailure, onSuccess }: Boolbacks) => {
  getAuthHeaders().then((headers) => {
    apiService.get({
      url: '/website/mood-diary/list',
      onSuccess,
      onFailure,
      headers,
    });
  });
};

const getMoodTags = ({
  onFailure,
  onSuccess,
  moodTypeId,
}: Boolbacks & { moodTypeId: number }) => {
  getAuthHeaders().then((headers) => {

    apiService.post({
        url:`/website/mood-diary/get-tags-against-mood?id=${moodTypeId}`,
        onSuccess,
        onFailure,
        headers,
    })
  });
};

const MoodDiaryServices = {
  getMoodList,
  getMoodTags
};

export default MoodDiaryServices;
