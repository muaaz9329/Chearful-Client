/*
    The idea behind this hook is that we have two type of api calls in components
    that are fetching data from api. The data fetching is being done by service for 
    that component like a notes service which has a method getNotes. 

    The service is designed in a way that it accepts the params needed for that api call
    and then passes the received data to a onSuccess handler. The service itself does not 
    interact with states or stores in any way. It is only responsible for fetching the data.
    The onSuccess handler then manages the states and stores.

    The problem is that in one kind of api calls, we want to replace old data in the store.
    These are api calls that are new queries like a search query. In the other kind of api calls
    we want to merge the new data with the old data in the store. These are api calls that are
    fetching more data like a pagination query and we calling them batch queries.

    We have a component named NextBatchLoader and its concept was that it will get the 
    method that calls service with params. It will show a loader when the call is being made
    or a retry action if the call failed. It will also show a button to load more data if
    the call was successful.  

    These helpers will help us in dual call components.
*/

import { useState } from 'react';
import { RequestState } from '@app/services/api-service';

export default function useBatchLoaderHelpers() {
  const [triggerer, setTriggerer] = useState(0);

  const [page, setPage] = useState(1);

  const [mergeNextBatch, setMergeNextBatch] = useState(false);
  const [batchLoadState, setBatchLoadState] = useState<RequestState>('idle');

  const [callType, setCallType] = useState<'batch' | 'new'>('new');

  const trigger = () => setTriggerer((prev) => prev + 1);

  const makingBatchCall = () => {
    // Batch call increases page number
    setPage((prev) => prev + 1);

    setMergeNextBatch(true);
    setBatchLoadState('loading');
    setCallType('batch');
  };

  const makingNewCall = () => {
    setPage(1);
    setMergeNextBatch(false);
    setBatchLoadState('idle');
    setCallType('new');
  };

  const callSuccess = () => {
    if (callType === 'batch') {
      setBatchLoadState('loaded');

      // If the call was batch call, we need to set the mergeNextBatch to false. This is also being done
      // by the makingNewCall method and is as a backup here.
      setMergeNextBatch(false);
      setCallType('new');
    }
  };

  const callFailure = () => {
    // If the call was batch call, we need to decrease the page number
    if (callType === 'batch') {
      setBatchLoadState('erred');
      setPage((prev) => prev - 1);
    }
  };

  return {
    /**
     * The current page number
     */
    page,

    /**
     * This function is used to trigger
     */
    trigger,

    /**
     * It gets updated by trigger method
     */
    triggerer,

    /**
     * Whether the next batch should be merged with the old data or not
     */
    mergeNextBatch,

    /**
     * The current state of the batch load
     */
    batchLoadState,

    /**
     * The current type of call
     */
    callType,

    /**
     * This method resets the helpers for batch type call.
     * @description It sets the mergeNextBatch to true, batchLoadState to loading and callType to batch
     */
    makingBatchCall,

    /**
     * This method resets the helpers for new type call.
     * @description It sets the mergeNextBatch to false, batchLoadState to idle and callType to new
     */
    makingNewCall,

    /**
     * This method sets the batchLoadState to loaded and mergeNextBatch to false
     */
    callSuccess,

    /**
     * This method sets the batchLoadState to erred
     */
    callFailure,
  };
}
