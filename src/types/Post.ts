
class Post {
  id!: number
  post_id!: number
  _tag_string!: string
  rating!: string
  file_url!: string
  large_file_url!: string
  preview_file_url!: string

  get tag_string(): string[] {
    return this._tag_string.split(" ");
  }
}

export {Post};
