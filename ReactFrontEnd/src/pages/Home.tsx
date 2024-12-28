import React from "react";
import { useFetcher, useOutletContext } from "react-router-dom";
import { IAppLayoutContext } from "../types/app";

function Home() {
  const {
    appLoader: { accessToken },
  } = useOutletContext<IAppLayoutContext>();

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
