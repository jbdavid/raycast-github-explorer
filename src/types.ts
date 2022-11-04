export interface PR {
  id: number;
  title: string;
  html_url: string;
  user: {
    id: number;
    login: string;
    avatar_url: string;
  };
}
