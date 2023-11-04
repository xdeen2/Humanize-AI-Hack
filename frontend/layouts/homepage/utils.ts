export const getRefreshToken = (codeResponse: any, setEmailUser: any) => {
    // get refresh token using authorization code
    let payload = {
      grant_type: 'authorization_code',
      code: codeResponse,
      client_id: '656861677540-vciqnqigidvsap6f6egcc106bclij1h1.apps.googleusercontent.com',
      client_secret: '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',
      // redirect_uri: 'https://www.humanizeai.in',
      redirect_uri: 'http://localhost:3000',
    };
    console.log("payload: ", payload)

    fetch(`https://www.googleapis.com/oauth2/v4/token`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
        },
        body: JSON.stringify(payload),
    })
      .then((res: any) => {
        console.log("RESR", res)
        return res.json();
      })
      .then((response: any) => {
        setEmailUser(response);
        // console.log('response: ', response)
      })
      .catch((err) => console.log('err: ', err));
  };

export const getNewAccessToken = (emailUser: any) => {
    // get new access token using refresh token
    let payloadForAccessToken = {
      grant_type: 'refresh_token',
      refresh_token: emailUser.refresh_token,
      client_id: '************.apps.googleusercontent.com',
      client_secret: '********************',
    };

    fetch(`https://oauth2.googleapis.com/token`, 
    {
        method: 'POST',
        body: JSON.stringify(payloadForAccessToken),
        headers: {
          'Content-Type': 'application/json;',
        },
      })
      .then((res: any) => {
        return res.data;
      })
      .then((res) => {
        console.log('new token response: ', res);
      })
      .catch((err) => console.log('err: ', err));
  };