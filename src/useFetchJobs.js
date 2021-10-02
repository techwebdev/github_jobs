import { useReducer, useEffect } from "react";
import axios from "axios";
import {BASE_GITHUB_URL} from './requests'
import { ACTIONS } from "./Actions";

const BASE_URL = BASE_GITHUB_URL;
const GET_JOBS = `${BASE_URL}positions.json`;
const SINGLE_URL = `${BASE_URL}positions/`;

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };

    case ACTIONS.MAKE_SINGLE_REQUEST:
      return { ...state, loading: true, job: {} };

    case ACTIONS.SINGLE_DATA:
      return { ...state, loading: false, job: action.payload.job };
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(GET_JOBS, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    const cancelToken2 = axios.CancelToken.source();
    axios
      .get(GET_JOBS, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
}

export function useFetchSingleJobs(id) {
  const [state, dispatch] = useReducer(reducer, { job: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_SINGLE_REQUEST });
    axios
      .get(`${SINGLE_URL}${id}.json`, {
        cancelToken: cancelToken1.token,
        params: { markdown: true },
      })
      .then((res) => {
        console.log({ data: res.data });
        dispatch({ type: ACTIONS.SINGLE_DATA, payload: { job: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken1.cancel();
    };
  }, [id]);

  return state;
}
