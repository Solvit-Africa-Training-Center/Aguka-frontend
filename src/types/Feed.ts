// export interface Feed {
//   id: string;
//   title: string;
//   message: string;
//   likes: number;
//   createdAt: string; // server timestamp
//   updatedAt: string;
//   userName: string; // add the author's name
//   groupId: string;  // add group id
//   comments?: Comment[];
// }

export interface Feed {
  id: string;
  message: string;      // your post content
  authorId: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; email: string };
  comments: Comment[];
  likes: any[];
}


export interface FeedCreate {
  message: string;       // send this, not "content" or "title"
  //groupId: string;
}

export interface FeedUpdate {
  title?: string;
  content?: string;
}

export interface Comment {
  id: string;
  message: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  feedId: string;
}

export interface CommentUpdate {
  content?: string;
}
