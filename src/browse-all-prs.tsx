import { Action, ActionPanel, Detail, List } from "@raycast/api";
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
        console.debug(result);
        setIsLoading(false);
        setResult(result);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  if (!isLoading && !result.length) {
    return <Detail markdown={"Nothing found !"} />;
  }

  return (
    <List isLoading={isLoading}>
      {result.map((pr) => {
        console.debug(pr);
        return (
          <List.Item
            key={pr.id}
            title={pr.title}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open in browser" url={pr.html_url} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
