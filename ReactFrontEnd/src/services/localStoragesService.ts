/* class LocalStorageService {
  setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export default new LocalStorageService();
 */

class LocalStorageService {
  setItem = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  };

  removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  clear = (): void => {
    localStorage.clear();
  };
}

export default new LocalStorageService();
