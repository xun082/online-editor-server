import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseService<T> {
  _update(
    id: number,
    data: QueryDeepPartialEntity<T>
  ): Promise<T | T[] | unknown | null>;

  _destroy(id: number): Promise<T | unknown | null>;

  _store(data): Promise<T | unknown | null>;

  _findById(id: number): Promise<T | unknown | null>;

  _findByIds(ids: [number]): Promise<T[] | unknown | null>;
}
