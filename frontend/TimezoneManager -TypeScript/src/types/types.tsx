import { eDropdowns, eIDName } from 'src/types/enums';
import { iFilterOption } from 'src/types/interfaces';

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type tFilterOptions = {
  [key in eDropdowns]: iFilterOption[];
};

export type tPosition = 'bottom' | 'top' | null | undefined;

export type tBaseEntity = {
  [key in eIDName]: number;
};

export type tRequestParam = { key: string; value: string | null };

export type tRequestParams = tRequestParam[];

export type tObject = { [key: string]: any };

export type tStringOrNull = string | null;
