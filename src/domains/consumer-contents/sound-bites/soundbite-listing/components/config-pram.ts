import { GetRequestParams } from '@app/types';

export const ConfigParams: GetRequestParams = [
  {
    key: 'limit',
    value: 10,
  }, //! ONLY CHANGE THIS LIMIT WHEN YOU WANT MORE THEN 10 ITEMS IN A PAGE
  {
    key: 'page',
    value: 1,
  },
];
