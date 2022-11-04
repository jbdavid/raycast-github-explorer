import { Action, ActionPanel, Detail, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchAllPRs } from "./api";

export default function BrowseAllPRs() {
  //TODO : typing
  const [result, setResult] = useState<Array<any>>([]);
//   const [searchText, setSearchText] = useState("");
//   const [filteredList, filterList] = useState(items);

//   useEffect(() => {
//     filterList(items.filter((item) => item.includes(searchText)));
//   }, [searchText]);

  useEffect(() => {
    fetchAllPRs()
      .then((result) => {
        console.debug(result);
        setResult(result);
      })
      .catch(console.error);
  }, []);

  if(!result.length) {
    return <Detail markdown={'Nothing found !'} />;
  }

  return <List>
    {result.map(pr => {
        console.debug(pr)
        return <List.Item
            key={pr.id}
            title={pr.title}
            actions={
                <ActionPanel>
                  <Action.OpenInBrowser title="Open in browser" url={pr.html_url} />
                </ActionPanel>
              }
        />
    })}
  </List>;
}
