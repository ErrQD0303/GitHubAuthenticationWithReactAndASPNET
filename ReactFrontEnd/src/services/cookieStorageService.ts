class CookieStorageService {
  getAllCookies(): string[][] {
    return document.cookie.split("; ").map((cookie) => cookie.split("="));
  }

  getCookie(name: string): string | null {
    if (!name) return null;
    const cookies = this.getAllCookies();

    if (!cookies) return null;

    const matchedCookies = cookies.filter(([key]) => key === name);
    return matchedCookies.length > 0 ? matchedCookies[0][1] : null;
  }
}

export default new CookieStorageService();
