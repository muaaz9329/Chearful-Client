/* eslint-disable eqeqeq */
import axios from 'axios';
import { isObjectValid } from '@app/utils/';
import { BASE_URL } from '@app/constants';
import { Boolbacks, ServiceInitiator } from '.';

function generateApiUrl(url: string) {
  return `${BASE_URL}${url}`;
}

async function service({
  proposal,
  boolBacks,
}: {
  proposal: ServiceInitiator & { method: 'get' | 'delete' | 'put' | 'post' };
  boolBacks: Boolbacks;
}) {
  const { onSuccess, onFailure } = boolBacks;

  try {
    const response = await axios(proposal);

    if (response.status === 200) {
      const { data, status } = response;

      // Well, an extra layer of protection never hurts 😉
      // Here data is the response sent by the server and we are passing it down to the onSuccess callback

      if (data && status == 200) {
        // We are assuming data to be {data: any, message: string}
        onSuccess?.(data);
        return;
      }
    }

    // Why do we fall Bruce? Only to rise back up.
    console.error(JSON.stringify(response));
    // @ts-ignore
    onFailure?.(JSON.stringify(response));
  } catch (error: any) {
    // This is the recommended error handling approach by axios.
    if (error.response) {
      // Status code is not 200.
      console.error('Something went wrong', error);

      onFailure?.({
        message: error.response.data?.message || 'Something went wrong',
        error: error.response,
      });
      return;
    }

    if (error.request) {
      // No response was received.
      console.error('Server timed out!', error);
      onFailure?.({ message: 'Server timed out!', error });
      return;
    }

    if (error.message) {
      // Error setting up the request.
      console.error('Error setting up the service!', error);
      onFailure?.({ message: 'Something went wrong', error });
      return;
    }

    console.error('There was an unidentified error', error);
    onFailure?.({ message: 'Something went wrong', error });
  }
}

function getProposal({
  url,
  headers,
  method,
}: Omit<ServiceInitiator, 'data'> & {
  method: 'get' | 'delete' | 'put' | 'post';
}) {
  if (!url) throw new Error('ApiService requires a valid url to proceed!');

  // @ts-ignore
  const proposal: {
    url: string;
    method: 'get' | 'delete' | 'put' | 'post';
    headers?: any;
  } = {};

  if (isObjectValid(headers)) proposal['headers'] = headers;

  proposal['url'] = generateApiUrl(url);
  proposal['method'] = method;

  return proposal;
}

/**
 * Perform a GET request.
 *
 * The body of the request, must be an
 * array of the objects of the form {key, value} where;
 * - key: the string-based URL query parameter,
 * - value: the value for the URL query parameter
 */
function get({
  url,
  data,
  headers,
  ...boolBacks
}: Omit<ServiceInitiator, 'data'> &
  Boolbacks & { data?: { key: string; value: string | Array<any> }[] }) {
  const params: Record<string, string> = {};

  data?.[0]?.key &&
    data?.[0]?.value &&
    data.forEach(({ key, value }) => {
      if (value)
        params[key] = Array.isArray(value) ? JSON.stringify(value) : value;
    });

  return service({
    boolBacks,
    proposal: getProposal({
      headers,
      method: 'get',
      url: isObjectValid(params)
        ? `${url}?${new URLSearchParams(params)}`
        : url,
    }),
  });
}

/**
 * Perform a POST request.
 *
 * @param object The parameters passed.
 */
function post({
  url,
  data,
  headers,
  method = 'post',
  ...boolBacks
}: ServiceInitiator & Boolbacks & { method?: 'post' | 'put' }) {
  return service({
    boolBacks,
    proposal: { ...getProposal({ url, method, headers }), data },
  });
}

/**
 * Perform a POST request but also send some query parameters.
 *
 * @param  object The parameters passed.
 * @param  object.params The query parameters.
 */
function postAndGet({
  url,
  params,
  ...props
}: Omit<ServiceInitiator, 'data'> &
  Boolbacks & { params: { key: string; value: string | Array<any> }[] }) {
  // URLSearchParams accepts a Record<string, string>
  const queryParams: Record<string, string> = {};

  // We have to make the record directly from the array of objects passed as the params.
  params.forEach((param) =>
    Object.entries(param).forEach(
      ([key, value]) =>
        (queryParams[key] = Array.isArray(value)
          ? // An array of keys needs to be passed as it is, such as [1,2,3,4,5]
            JSON.stringify(value)
          : value),
    ),
  );

  post({
    ...props,
    url: `${url}?${new URLSearchParams(queryParams)}`,
  });
}

/**
 * Perform a DELETE request.
 *
 * @param object The parameters passed.
 *
 * @param object.recordId The record to delete.
 */
function deleteRecord({
  url,
  recordId,
  headers,
  ...boolBacks
}: Omit<ServiceInitiator, 'data'> & Boolbacks & { recordId: number }) {
  const finalUrl = recordId ? `${url}/${recordId}` : url;

  return service({
    boolBacks,
    proposal: getProposal({
      headers,
      url: finalUrl,
      method: 'delete',
    }),
  });
}

const apiService = {
  get,
  post,
  postAndGet,
  delete: deleteRecord,
};

export default apiService;
