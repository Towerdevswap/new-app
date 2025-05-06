let id: number | null = null;
let username: string | null = null;
let firstname: string | null = null;
let lastname: string | null = null;

(async () => {
  try {
    const WebAppModule = await import('@twa-dev/sdk');
    const WebApp = WebAppModule.default;

    if (WebApp && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user;
      id = user.id || null;
      username = user.username || null;
      firstname = user.first_name || null;
      lastname = user.last_name || null;
    }
  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
  }
})();

export { id, username, firstname, lastname };
