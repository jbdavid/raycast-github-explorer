import { Action, ActionPanel, Detail, Image, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchAllPRs } from "./api";
import { PR } from "./types";

export default function BrowseAllPRs() {
  const [result, setResult] = useState<Array<PR>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllPRs()
      .then((result) => {
        setResult(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!isLoading && !result.length) {
    return <Detail markdown={"Nothing found !"} />;
  }

  return (
    <List isLoading={isLoading}>
      {result.map((pr) => (
        <List.Item
          key={pr.id}
          title={pr.title}
          icon={{ source: pr.user.avatar_url, mask: Image.Mask.Circle }}
          accessories={[{ text: pr.user.login }]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open in browser" url={pr.html_url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
