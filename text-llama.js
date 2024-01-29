import fetch from "node-fetch";
import dotenv from "dotenv";
import input from "@inquirer/input";

dotenv.config();

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  return result;
}

async function dialog() {
  const inputs = await input({ message: "💬: " });

  if (inputs) {
    await query({ inputs }).then((response) => {
      console.log(JSON.stringify(response?.generated_text));

      if (response?.generated_text) dialog();
    });
  } else {
    console.log("See you next time ~");
  }
}

dialog();
