import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import { IHomeLoader } from "../types/app";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function Home() {
  const { accessToken } = useLoaderData<IHomeLoader>();
  const location = useLocation();

  const [, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    if (accessToken) {
      setCookie("access_token", accessToken);
    }
  }, [setCookie, accessToken]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("from")) return;

    url.searchParams.delete("from");
    window.history.replaceState(null, "", url.toString());
  }, [location.search]);

  const fetcher = useFetcher();

  /* React.useEffect(() => {
    const fetchAccessToken = async (): Promise<void> => {
      setAccessToken(localStoragesService.getItem<string>("access_token"));
    };
    fetchAccessToken();
  }, []); */

  return (
    <div>
      {accessToken ? (
        <>
          <h3>Logged In</h3>

          <fetcher.Form method="POST">
            <button type="submit" name="action" value="viewRepos">
              View Repos
            </button>
          </fetcher.Form>
          <fetcher.Form method="POST">
            <button type="submit" name="action" value="logout">
              Log out
            </button>
          </fetcher.Form>
        </>
      ) : (
        <>
          <h3>Not logged in</h3>
          <fetcher.Form method="POST">
            <button type="submit" name="action" value="login">
              Log in
            </button>
          </fetcher.Form>
        </>
      )}
    </div>
  );
}

export default Home;
