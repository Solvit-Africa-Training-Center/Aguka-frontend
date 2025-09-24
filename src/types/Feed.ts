export interface Feed {
  id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  // add other fields as necessary
}

export interface FeedCreate {
  title: string;
  content: string;
}

export interface FeedUpdate {
  title?: string;
  content?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  feedId: string;
}

export interface CommentUpdate {
  content?: string;
}
