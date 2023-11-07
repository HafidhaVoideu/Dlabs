require("dotenv").config();
const express = require("express");
const axios = require("axios");
const url = require("url");

const port = process.env.PORT || 5173;
const app = express();

app.get("/dashboard", async (req, res) => {
  const { code } = req.query;

  if (code) {
    const formData = new url.URLSearchParams({
      client_id: "1170864734476697690",
      client_secret: "PdSMPCjgfqk5vK6NlU3EBwqfg5UkfFUZ",
      grant_type: "authorization_code",
      code: code.toString(),
      redirect_uri: "http://localhost:5173/dashboard/",
    });

    const output = await axios.post(
      "https://discord.com/api/oauth2/token",

      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (output.data) {
      const token = output.data.access_token;

      const userInfo = await get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(output.data);
      console.log(userInfo.data);
    }
  }
});

app.listen(port, () => {
  console.log("running on 333");
});
