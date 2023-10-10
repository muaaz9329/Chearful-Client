export { default as ApiService } from './api-service';

export type RequestState = 'idle' | 'loading' | 'loaded' | 'erred';

export type Boolbacks<T = any> = {
  onFailure: ({ message, error }: { message: string; error?: any }) => void;
  onSuccess: ({ data, message }: { data: T; message?: string }) => unknown;

  /**
   * Callback to be called when the request is bypassed.
   * This represents a case where the request handler wants to take over and is requesting shut down any other request handlers.
   */
  onByPass?: () => unknown;
};

export type GetRequestParams = { key: string; value: any }[];

export type ServiceInitiator = {
  /**
   * The endpoint to send the request to.
   */
  url: string;
  /**
   * The body of the request.
   */
  data?: any;
  /**
   * The headers of the request.
   */
  headers?: any;
};
