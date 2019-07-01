export interface ICreate<T> {
  create: (document: T) => Promise<T>;
}

export interface IUpdate<T> {
  update: (document: T) => Promise<T>;
}

export interface IRemove {
  remove: (id: string) => Promise<boolean>;
}

export interface IFindById<T> {
  findById: (id: string) => Promise<T>;
}

export interface IFindAll<T> {
  findById: () => Promise<T[]>;
}
