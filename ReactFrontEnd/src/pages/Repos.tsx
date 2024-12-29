import { Link, useLoaderData } from "react-router-dom";
import { IReposLoader } from "../types/repos";

function Repos() {
  const { repos } = useLoaderData() as IReposLoader;
  console.log(repos.length);
  return (
    <div>
      {repos && repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <Link to={repo.html_url}>{repo.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        "No repos found"
      )}
    </div>
  );
}

export default Repos;
