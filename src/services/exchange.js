import { requestWithRetry } from '../utils/request';

/**
 *
 * @param {any} params {'project-type': 'all'}. NOT support operators like & or |. Support only ONE pair of key value.
 */
export async function queryExBalances() {
    return requestWithRetry(`/api/exchange/balances`);
}
export async function queryExGas() {
    return requestWithRetry(`/api/exchange/gas`);
}
export async function queryExCurrencies() {
    return requestWithRetry(`/api/exchange/currencies`);
}
export async function queryExPairs() {
    return requestWithRetry(`/api/exchange/pairs`);
}
