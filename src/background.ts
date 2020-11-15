import { browser } from 'webextension-polyfill-ts';
import { DropboxAuth } from 'dropbox';

let dropboxAuth = new DropboxAuth({ clientId: "" });;

(window as any).getAccessToken = async () => {
  if (dropboxAuth.getAccessTokenExpiresAt() && Date.now() < dropboxAuth.getAccessTokenExpiresAt().getMilliseconds()) return dropboxAuth.getAccessToken();

  const authorization_url = dropboxAuth.getAuthenticationUrl(browser.identity.getRedirectURL("oauth2/callback"));
  const redirect_url = await browser.identity.launchWebAuthFlow({ 'url': authorization_url, 'interactive': true });

  dropboxAuth.setAccessToken(new URLSearchParams(new URL(redirect_url).hash.substr(1)).get("access_token"));
  const expires_in = new URLSearchParams(new URL(redirect_url).hash.substr(1)).get("expires_in");
  dropboxAuth.setAccessTokenExpiresAt(new Date(Date.now() + parseInt(expires_in) + 1000));

  return dropboxAuth.getAccessToken();
}