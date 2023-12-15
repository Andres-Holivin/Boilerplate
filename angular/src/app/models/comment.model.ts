export interface Comment {
  id: number;
  body: string;
  user: {
    id: number;
    username: string;
  };
}
export interface ListComment {
  comments: Comment[];
  total: number;
}
