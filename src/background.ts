chrome.runtime.onInstalled.addListener(function() {
  const redirectUrl = chrome.identity.getRedirectURL("oauth2/callback");
  const client_id = "";
  chrome.identity.launchWebAuthFlow(
    {'url': `https://www.dropbox.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirectUrl}&response_type=token`, 'interactive': true},
    function(redirect_url) {
      console.log(redirect_url);
    }
  );
});
