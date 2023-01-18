const client_id = /* process.env.SPOTIFY_CLIENT_ID */ "8c866db633494b45856c5a1829f40e03";
const client_secret = /* process.env.SPOTIFY_CLIENT_SECRET */ "b778d150b02e448a993bc021c0a45ec0";
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
//const basic =new Buffer(client_id + ':' + client_secret).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: "Basic " + basic,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    })

    /*  body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token
      })  */
  });
  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  console.log("fetching now playing")
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {

      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {

    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
