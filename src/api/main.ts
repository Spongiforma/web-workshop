import {BooruAPI} from "@/api/api";

async function main(): Promise<string> {
  return new BooruAPI().popularPosts.then(it => {
    return it[0] as unknown as string;
  });
}

export default {
  main
};
