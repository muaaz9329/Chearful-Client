import apiService from '@app/services/api-service/api-service';
import { Boolbacks } from '../../services/api-service/index';
import { getAuthHeaders } from '@app/utils';
const getMoodList = ({
  onFailure,
  onSuccess,
  date,
}: Boolbacks & { date: string }) => {
  getAuthHeaders().then((headers) => {
    apiService.post({
      url: `/website/mood-diary/mood-entries-by-calender-view`,
      data: {
        calender_view: 'monthly',
        date,
      },
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

const getMoodDataById = ({
  onFailure,
  onSuccess,
  id,
}: Boolbacks & { id: number }) => {
  getAuthHeaders().then((headers) => {
    apiService.post({
      url: '/website/mood-diary/mood-diary-result',
      onSuccess,
      onFailure,
      headers,
      data: {
        id: id,
      },
    });
  });
};



const getMoodsIdAndSlugs =({
  onFailure,
  onSuccess,
 
}: Boolbacks) => {
  getAuthHeaders().then((headers) => {
    apiService.get({
      url: `/website/mood-diary/list`,
      onSuccess,
      onFailure,
      headers,
    });
  });
};

const MoodDiaryServices = {
  getMoodList,
  getMoodTags,
  saveMoodDiary,
  getMoodDataById,
  getMoodsIdAndSlugs
};

export default MoodDiaryServices;
