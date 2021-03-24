export async function checkLogin(code: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/login/logged?` +
        new URLSearchParams({
          code,
        })
    );

    console.log(response);
    return await response.json();
  } catch (err) {
    console.log('err: ', err);
    return null;
  }
}
