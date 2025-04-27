declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        initDataUnsafe?: {
          user?: {
            username?: string;
            photo_url?: string;
          };
        };
      };
    };
  }
}

export {};
