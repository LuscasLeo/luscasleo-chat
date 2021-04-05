export function getWebsocketConnectionUrl() {
  const url = process.env.APP_WS_CONNECTION_URL;
  if (!url) throw new Error('No websocket url provided');
  return url;
}
