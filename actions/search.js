import { CALL_API } from '../middleware/api'

import * as type from './actionTypes';

export function getSearchResults(key) {
  return {
    [CALL_API]: {
      method: 'get',
      path: `/api/podcast/search/${key}`,
      successType: type.GET_SEARCH_RESULTS,
      errorType: type.GET_SEARCH_RESULTS_FAILED
    }
  }
}

export function getSearchResultsFull(key) {
  return {
    [CALL_API]: {
      method: 'get',
      path: `/api/podcast/searchall/${key}`,
      successType: type.GET_SEARCH_RESULTS_FULL,
      errorType: type.GET_SEARCH_RESULTS_FULL_FAILED
    }
  }
}
