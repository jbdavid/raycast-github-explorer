import fetch from "node-fetch";
import { getPreferenceValues } from "@raycast/api";

export async function fetchAllPRs(): Promise<Array<any>> {
  const { repoOwner, repoName, repoSshKey } = getPreferenceValues();

  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${repoSshKey}`,
      Accept: "application/vnd.github+json",
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    const errInfo = await responseJson;
    throw errInfo;
  }

  return (await responseJson) as Array<any>;
}
