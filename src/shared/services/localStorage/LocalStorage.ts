export class LocalStorageService {
  private static _instance: LocalStorageService;

  public static get Instance(): LocalStorageService {
    return this._instance || (this._instance = new this());
  }

  public save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }
}
