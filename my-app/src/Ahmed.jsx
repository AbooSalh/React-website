import axios from "axios";

export default function Ahmed() {
  axios.get("https://api.audiomack.com/am0507979/user").then((e) => {
    console.log(e);
  });
}
