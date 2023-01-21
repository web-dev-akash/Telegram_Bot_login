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
const bot = new Telegraf(botToken);

bot.start((ctx) => {
  let message = `Hi, ${ctx.chat.first_name} Use these Commands \n \n /add - To add a Task \n \n For Exmaple - /add <Your Task> \n \n/delete - To delete the task using Task ID \n\n For Example - /delete <Task ID> \n \n/status - To change the status of your task using Task ID \n\n For Example - /status <pending, completed> <Task ID> \n\n Use this link to view the Tasks: \n\n https://flamecloud-bot-akash.netlify.app/`;
  ctx.reply(message);
});
bot.command("add", async (ctx) => {
  try {
    ctx.reply("Adding Todo, Please wait !!!");
    const body = ctx.update.message.text.split(" ");
    let data = "";
    1;
    for (let i = 1; i < body.length; i++) {
      data += body[i] + " ";
    }
    const newTodo = new Todo({ task: data, status: "null" });
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
    // console.log(ctx.update.message.text);
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

bot.command("status", async (ctx) => {
  try {
    ctx.reply("Changing Todo Status, Please wait !!!");
    const body = ctx.update.message.text.split(" ");
    const state = body[1];
    const id = body[2];
    if (state.toLowerCase() == "pending") {
      await Todo.findOneAndUpdate({ _id: id }, { status: "false" });
    }
    if (state.toLowerCase() == "completed") {
      await Todo.findOneAndUpdate({ _id: id }, { status: "true" });
    }
    ctx.reply(`Successfully Changed your To-do Status`);
  } catch (error) {
    console.log("error", error);
    ctx.reply("Something Went Wrong");
  }
});

bot.on("text", async (ctx) => {
  await ctx.reply(`Hello ${ctx.chat.first_name}`);
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
