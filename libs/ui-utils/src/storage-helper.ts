type StorageKey = 'tms-access-token';

export class StorageHelper {
  protected static storage: Storage = localStorage;

  public static setItem(key: StorageKey, value: string): void {
    this.storage.setItem(key, value);
  }

  public static getItem(key: StorageKey): string | undefined {
    return this.storage.getItem(key) || undefined;
  }

  public static removeItem(key: StorageKey): void {
    this.storage.removeItem(key);
  }
}
