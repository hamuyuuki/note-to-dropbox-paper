import { browser } from 'webextension-polyfill-ts';

let accessToken;

(window as any).getAccessToken = async () => {
  if (accessToken) return accessToken;

  const redirectUrl = browser.identity.getRedirectURL("oauth2/callback");
  const client_id = "";
  const authorization_url = `https://www.dropbox.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirectUrl}&response_type=token`;
  const redirect_url = await browser.identity.launchWebAuthFlow({ 'url': authorization_url, 'interactive': true });
  accessToken = new URLSearchParams(new URL(redirect_url).hash.substr(1)).get("access_token");

  return accessToken;
}