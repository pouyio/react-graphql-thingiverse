export default `
type Query {
  newest: [BaseThing]
  popular: [BaseThing]
  featured: [BaseThing]
  thing(id: Int!): Thing
}

type BaseThing {
  id: Int
  is_private: Boolean
  is_published: Boolean
  is_purchased: Boolean
  name: String
  public_url: String
  thumbnail: String
  url: String
  creator: Creator
}

type Thing inherits BaseThing {
  images: [String]
  added: String
  modified: String
  is_wip: Boolean
  is_featured: Boolean
  like_count: Int
  is_liked: Boolean
  collect_count: Int
  is_collected: Boolean
  default_image: Image,
  description: String
  instructions: String
  description_html: String
  instructions_html: String
  details: String
  license: String
  files_url: String
  images_url: String
  likes_url: String
  ancestors_url: String
  derivatives_url: String
  tags_url: String
  categories_url: String
  file_count: Int
  layout_count: Int
  layouts_url: String
  in_library: Boolean
  print_history_count: Int
  app_id: Int
  download_count: Int
  view_count: Int  
}

type Image {
  id: Int
  url: String
  name: String
  sizes: [Size],
  added: String
}

type Size {
  type: String
  size: String
  url: String
}

type Creator {
  id: Int,
  name: String
  first_name: String
  last_name: String
  url: String
  public_url: String
  thumbnail: String
}
`;