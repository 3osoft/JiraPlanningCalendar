import { FETCH_DATA, FILTER_DATA } from './action-types';

export function fetchData(data) {
    return {
        type: FETCH_DATA,
        data
    };
}

export function filterData(data) {
    return {
        type: FILTER_DATA,
        data
    };
}