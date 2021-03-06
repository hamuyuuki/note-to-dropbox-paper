import { DropboxAuth } from 'dropbox'
import { browser } from 'webextension-polyfill-ts'

const dropboxAuth = new DropboxAuth({ clientId: '' })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).getAccessToken = async (): Promise<string> => {
  if (availableAccessToken()) return dropboxAuth.getAccessToken()

  const authorization_url = dropboxAuth.getAuthenticationUrl(
    browser.identity.getRedirectURL('oauth2/callback')
  )
  const redirect_url = await browser.identity.launchWebAuthFlow({
    url: authorization_url,
    interactive: true,
  })

  dropboxAuth.setAccessToken(
    new URLSearchParams(new URL(redirect_url).hash.substr(1)).get(
      'access_token'
    )
  )
  const expires_in = new URLSearchParams(
    new URL(redirect_url).hash.substr(1)
  ).get('expires_in')
  dropboxAuth.setAccessTokenExpiresAt(
    new Date(Date.now() + parseInt(expires_in) + 1000)
  )

  return dropboxAuth.getAccessToken()
}

function availableAccessToken(): boolean {
  if (!dropboxAuth.getAccessTokenExpiresAt()) return false
  return dropboxAuth.getAccessTokenExpiresAt().getMilliseconds() > Date.now()
}
