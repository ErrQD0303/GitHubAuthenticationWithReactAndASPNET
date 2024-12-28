import { ActionFunctionArgs, redirect } from "react-router-dom";
import authenticateService from "../services/authenticateService";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { action } = Object.fromEntries(formData) as unknown as {
    action: string;
  };

  if (action === "login") {
    const responseObject = (await authenticateService.login()) as {
      type: string;
      message: string | object;
    };
    if (responseObject.type === "error") {
      return { type: "error", message: responseObject.message };
    }

    const { loginUrl } = responseObject.message as { loginUrl: string };

    return redirect(loginUrl);
  }

  if (action === "viewRepos") {
    return redirect("/repos");
  }

  if (action === "logout") {
    return redirect("/logout");
  }
  return {};
};

export default action;
