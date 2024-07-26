type DecryptedToken = {
  id: string;
  name: string;
  exp: number;
};

export const decryptToken = (access_token: string): DecryptedToken => {
  const {
    sub: id,
    name,
    exp,
  } = JSON.parse(Buffer.from(access_token.split(".")[1], "base64").toString());

  return { id, name, exp };
};

export default decryptToken;
