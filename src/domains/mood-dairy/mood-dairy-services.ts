import apiService from '@app/services/api-service/api-service';
import { Boolbacks } from '../../services/api-service/index';
import { getAuthHeaders } from '@app/utils';
const getMoodList = ({ onFailure, onSuccess }: Boolbacks) => {
  getAuthHeaders().then((headers) => {
    apiService.post({
      url: '/website/mood-diary/mood-entries-by-calender-view?calender_view=monthly',
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
      url: `/website/mood-diary/get-tags-against-mood?id=${moodTypeId}`,
      onSuccess,
      onFailure,
      headers,
    });
  });
};

const saveMoodDiary = ({
  onFailure,
  onSuccess,
  data,
}: Boolbacks & { data: MoodDiaryEntry }) => {
  getAuthHeaders().then((headers) => {
    apiService.post({
      url: '/website/mood-diary/save-mood-entry',
      onSuccess,
      onFailure,
      headers,
      data,
    });
  });
};

const MoodDiaryServices = {
  getMoodList,
  getMoodTags,
  saveMoodDiary
};

export default MoodDiaryServices;
