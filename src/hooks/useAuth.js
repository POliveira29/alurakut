export async function useAuth(userToken) {
  const {isAuthenticated} = await fetch(
    "https://alurakut-two-mu.vercel.app/api/autenticacao",
    {
      headers: {
        Authorization: userToken,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  console.log(isAuthenticated);

  return isAuthenticated;
}
