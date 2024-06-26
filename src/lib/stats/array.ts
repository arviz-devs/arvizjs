/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * Copyright (c) ArviZ developers and contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Cumulative sum of the given data.
 *
 * @param {number[]} data - Any array of data.
 * @returns {number[]} The cumulative sum of the given data.
 */
export const cumulativeSum = (data: number[]): number[] => {
  // eslint-disable-next-line arrow-body-style
  const cumulativeSumMap = ((sum: number) => (value: number) => {
    // eslint-disable-next-line no-return-assign
    return (sum += value);
  })(0);

  const cSum = data.map(cumulativeSumMap);
  const normalizationFactor = Math.max(...cSum);
  const cumSum = [];
  for (let i = 0; i < cSum.length; i += 1) {
    cumSum.push(cSum[i] / normalizationFactor);
  }
  return cumSum;
};

/**
 * Numerically sort the given array of numbers.
 *
 * @param {number[]} data - The array of numbers to sort.
 * @returns {number[]} The sorted array of numbers.
 */
export const numericalSort = (data: number[]): number[] => {
  const dataCopy = data.slice(0);
  return dataCopy.sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

/**
 * Determine the shape of the given array.
 *
 * @param {any[]} data - Any array of data.
 * @returns {number[]} The shape of the data as an array.
 */
export const shape = (data: any[]): number[] => {
  // From https://stackoverflow.com/questions/10237615/get-size-of-dimensions-in-array
  const computeShape = (array: any[]): any[] => {
    return array.length ? [...[array.length], ...computeShape(array[0])] : [];
  };
  const arrayShape = computeShape(data);
  // Remove the empty array that will exist at the end of the shape array, since it is
  // the returned "else" value from above.
  const dataShape = [];
  for (let i = 0; i < arrayShape.length; i += 1) {
    if (!Array.isArray(arrayShape[i])) {
      dataShape.push(arrayShape[i]);
    }
  }
  return dataShape;
};

/**
 * Create an array that starts and stops with the given number of steps.
 *
 * @param {number} start - Where to start the array from.
 * @param {number} stop - Where to stop the array.
 * @param {number} [step] - The step size to take.
 * @param {boolean} [closed] - Flag used to return a closed array or not.
 * @param {null | number} [size] - If not null, then will return an array with the given
 *     size.
 * @returns {number[]} An array that is linearly spaced between the start and stop
 *     values.
 */
export const linearRange = (
  start: number,
  stop: number,
  step: number = 1,
  closed: boolean = true,
  size: null | number = null,
): number[] => {
  if (size !== null) {
    step = (stop - start) / size;
  }
  let len = (stop - start) / step + 1;
  if (!closed) {
    len = (stop - start - step) / step + 1;
  }
  return Array.from({length: len}, (_, i) => {
    return start + i * step;
  });
};

/**
 * Return the indices that would sort the array. Follows NumPy's implementation.
 *
 * @param {number[]} data - The data to sort.
 * @returns {number[]} An array of indices that would sort the original array.
 */
export const argSort = (data: number[]): number[] => {
  const dataCopy = data.slice(0);
  return dataCopy
    .map((value, index) => {
      return [value, index];
    })
    .sort((a, b) => {
      return a[0] - b[0];
    })
    .map((value) => {
      return value[1];
    });
};

/**
 * Count the number of time a value appears in an array.
 *
 * @param {number[]} data - The numeric array to count objects for.
 * @returns {{[key: string]: number}} An object that contains the keys as the items in
 *     the original array, and values that are counts of the key.
 */
export const valueCounts = (data: number[]): {[key: string]: number} => {
  const counts: {[key: string]: number} = {};
  for (let i = 0; i < data.length; i += 1) {
    counts[data[i]] = (counts[data[i]] || 0) + 1;
  }
  return counts;
};
