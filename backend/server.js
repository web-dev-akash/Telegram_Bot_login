const TelegramBot = require("node-telegram-bot-api");
const { Telegraf } = require("telegraf");
const connect = require("./database/db");
const Todo = require("./models/todo.model");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const botToken = process.env.BOT_TOKEN;
const app = express();
app.use(express.json());
app.use(cors());
// const bot = new TelegramBot(botToken, { polling: true });
const bot = new Telegraf(botToken);

bot.start((ctx) => {
  let message = `Hi, ${ctx.chat.first_name} Use these Commands \n /add <Your data> \n /delete <Task ID>`;
  ctx.reply(message);
});
bot.command("add", async (ctx) => {
  try {
    ctx.reply("Adding Todo, Please wait !!!");
    const body = ctx.update.message.text.split(" ");
    let data = "";
    for (let i = 1; i < body.length; i++) {
      data += body[i] + " ";
    }
    const newTodo = new Todo({ task: data, status: false });
    await newTodo.save();
    ctx.reply(`Successfully added "${data}" to your to-do list!`);
  } catch (error) {
    console.log("error", error);
    ctx.reply("Something Went Wrong");
  }
});
bot.command("delete", async (ctx) => {
  try {
    ctx.reply("Deleting Todo, Please wait !!!");
    console.log(ctx.update.message.text);
    const body = ctx.update.message.text.split(" ");
    const id = body[1];
    const res = await Todo.findOneAndDelete({ _id: id });
    // console.log(res);
    ctx.reply(`Successfully Deleted your to-do`);
  } catch (error) {
    console.log("error", error);
    ctx.reply("Something Went Wrong");
  }
});

app.get("/", async (req, res) => {
  const body = await Todo.find();
  try {
    res.status(200).send({
      data: body,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
    });
    console.log(error);
  }
});

bot.launch();
app.listen(PORT, () => {
  connect();
  console.log("Server Running");
});
