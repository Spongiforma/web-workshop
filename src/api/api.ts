
import axios, {AxiosInstance} from "axios";
import {Post} from "@/types/Post";

class BooruAPI {
  private _baseURL = "https://safebooru.donmai.us"
  private _axios: AxiosInstance = axios.create({baseURL: this._baseURL});

  get baseURL(): string {
    return this._baseURL;
  }

  set baseURL(value: string) {
    this._baseURL = value;
  }

  get randomPost(): Promise<Post> {
    return this._axios.get("/posts/random.json").then(it => it.data);
  }
  get popularPosts(): Promise<Post[]> {
    return this._axios.get("/explore/posts/popular.json").then(it => it.data);
  }
}

export {BooruAPI};
