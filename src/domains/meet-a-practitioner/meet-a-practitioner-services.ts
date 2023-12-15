import { getAuthHeaders } from '@app/utils';
import { Boolbacks } from '../../services/api-service/index';
import apiService from '@app/services/api-service/api-service';
const getPractitioners = ({ onFailure, onSuccess }: Boolbacks) => {
  getAuthHeaders().then((headers) => {
    apiService.get({
      url: '/client/schedule-a-session',
      headers,
      onSuccess,
      onFailure,
    });
  });
};

const getPractitionersDetail = ({
  onFailure,
  onSuccess,
  slug,
}: Boolbacks & {
  slug: string;
}) => {
  getAuthHeaders().then((headers) => {
    apiService.get({
      url: `/client/practitioner-profile/${slug}`,
      onSuccess,
      onFailure,
      headers,
    });
  });
};

export default {
  getPractitioners,
  getPractitionersDetail,
};
