import followers from "./followers_1.json";
import following from "./following.json";
import * as fs from "fs";

let nonFollowing: object[] = [];
let count = 0;
let filesNumber = 0;

for (let i in following.relationships_following) {
  let subscribed = false
    for (let j in followers) {
        if (followers[j].string_list_data[0].value == following.relationships_following[i].title) {
          subscribed = true;
        }
  }
  if (subscribed == false) {
    count++;
    let obj = {
      name: following.relationships_following[i].title,
      link: following.relationships_following[i].string_list_data[0].href
    }
    nonFollowing.push(obj);
    if (count % 20 === 0) {
      fs.writeFileSync(`nonFollowing${filesNumber}`, JSON.stringify(nonFollowing));
      filesNumber++;
      nonFollowing = [];
    }
  }
}
