export interface ICreate<T> {
  create: (document: T) => T | undefined;
}

export interface IUpdate<T> {
  update: (document: T) => T | undefined;
}

export interface IRemove {
  remove: (id: string) => boolean;
}

export interface IFindById<T> {
  findById: (id: string) => T | undefined;
}

export interface IFindAll<T> {
  findById: () => T[] | undefined;
}
