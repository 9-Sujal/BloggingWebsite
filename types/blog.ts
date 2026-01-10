export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[] | Tag[];
  featuredImage?: string;
  excerpt?: string;
  postedBy: {
    _id: string;
    name?: string;
    email?: string;
  };
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
}
