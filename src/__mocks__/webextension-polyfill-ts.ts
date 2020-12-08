// src/__mocks__/webextension-polyfill-ts
// Update this file to include any mocks for the `webextension-polyfill-ts` package
// This is used to mock these values for Storybook so you can develop your components
// outside the Web Extension environment provided by a compatible browser



export const browser: any = {
  storage: {
    local: {
      get(key: string): { [key: string]: any } {
        if (!localStorage.getItem(key)) return {}

        return {
          [key]: localStorage.getItem(key)
        }
      },
      set(items: { [key: string]: any }): void {
        Object.entries(items).forEach(([key, value]) => {
          localStorage.setItem(key, value)
        })
      }
    }
  },
  runtime: {
    getBackgroundPage(): { getAccessToken(): string } {
      return {
        getAccessToken(): string {
          return "access token"
        }
      }
    }
  }
};
