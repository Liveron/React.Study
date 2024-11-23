const Tokens = {
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
};

export function saveTokens(tokens) {
  localStorage.setItem(Tokens.AccessToken, tokens.accessToken);
  localStorage.setItem(Tokens.RefreshToken, tokens.refreshToken);
}

export function getTokens() {
  return {
    accessToken: localStorage.getItem(Tokens.AccessToken),
    refreshToken: localStorage.getItem(Tokens.RefreshToken),
  };
}

export function getAccessToken() {
  return localStorage.getItem(Tokens.AccessToken);
}
