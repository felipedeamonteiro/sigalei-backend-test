/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

interface INode {
  node: Array<
    | {
        author: { user: { login: string } | null } | null;
        additions: number;
        deletions: number;
      }
    | null
    | undefined
  >;
}

/**
 * Interface for Hash types
 */
export interface IHash<T> {
  [details: string]: T;
}

/**
 * Formats string date into locale format
 * @param date - Date to format
 * @returns {string} Locale converted string
 */
export function formatDate(date: string): string {
  const ndate = new Date(date);
  return ndate.toLocaleString();
}

/**
 * Transforms an Hash into an Array containing [key, ...data] then sorts data
 * @param hash - Hash to be converted
 * @param compareFn - Function used to sort data
 * @param {boolean} [asc=true] - If resulting array will be ascending
 * @returns {Arrau<Array<any>>} Sorted array containing [key, ...data]
 */
export function sortHashBy(
  hash: IHash<any>,
  compareFn: (a: any, b: any) => number,
  asc = true,
) {
  const array: Array<Array<any>> = [];

  for (const key in hash) {
    const obj = hash[key];
    array.push([key]);
    if (obj instanceof Array) {
      obj.forEach(el => {
        array[array.length - 1].push(el);
      });
    } else {
      array[array.length - 1].push(obj);
    }
  }

  array.sort(compareFn);
  if (!asc) {
    array.reverse();
  }

  return array;
}

/**
 * Converts and array of nodes from the graphql query into and array counting how many
 * nodes are from the same user and how many additions and deletions he made in total
 * @param node - Array of nodes containing author, additions and deletions
 * @returns Hash with key being the username and data being [commits, additions, deletions]
 */
function createRanking({ node: array }: INode) {
  const ranking: IHash<Array<number>> = {};

  array.forEach(el => {
    if (el && el.author && el.author.user) {
      if (el.author.user.login in ranking) {
        const temp: Array<number> = ranking[el.author.user.login];
        ranking[el.author.user.login] = [
          temp[0] + 1,
          temp[1] + el.additions,
          temp[2] + el.deletions,
        ];
      } else {
        ranking[el.author.user.login] = [1, el.additions, el.deletions];
      }
    }
  });

  return ranking;
}

/**
 * Parse data from the graphql query into arrays sorted by how many commits, how many additions
 * and how many deletions the user did
 * @param edges - Graphql edges
 * @returns Commits sorted by different criterias
 */
export const parseData = async (
  edges: ReadonlyArray<{
    readonly author: {
      readonly user: {
        readonly login: string;
      } | null;
    } | null;
    readonly commitedDate: Date;
    readonly additions: number;
    readonly deletions: number;
  } | null>,
) => {
  const { node: parseddata }: INode = { node: [] };
  edges.forEach(el => {
    console.log('el', el);
    if (el) {
      parseddata.push(el);
    }
  });
  console.log('parseddata', parseddata);

  const ranking: IHash<Array<number>> = createRanking({ node: parseddata });
  const array1 = sortHashBy(
    ranking,
    (a, b) => {
      return a[1] - b[1];
    },
    false,
  );

  const array2 = sortHashBy(
    ranking,
    (a, b) => {
      return a[2] - b[2];
    },
    false,
  );

  const array3 = sortHashBy(
    ranking,
    (a, b) => {
      return a[3] - b[3];
    },
    false,
  );

  return { byCommits: array1, byAdditions: array2, byDeletions: array3 };
};
