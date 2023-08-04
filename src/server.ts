import express, { Request, Response } from 'express'
import connectDatabase from './utils/connectDatabase'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { AuthRouter, UserRouter } from './routes'

const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
const PORT = parseInt(<string>process.env.PORT, 10) || 9888

connectDatabase()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Config chat settings
const generateID = () => Math.random().toString(36).substring(2, 10)
let chatRooms: any = []

// routes api
app.use('/api/user', UserRouter)
app.use('/api', AuthRouter)
app.get('/api/chats', (req, res) => {
  res.json(chatRooms)
})

// const express = require("express");
// const app = express();
// const http = require("http").Server(app);
// const cors = require("cors");
// const PORT = 4000;
// const socketIO = require("socket.io")(http, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 	},
// });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// const generateID = () => Math.random().toString(36).substring(2, 10);
// let chatRooms :any = [];

// socketIO.on("connection", (socket) => {
// 	console.log(`⚡: ${socket.id} user just connected!`);

// 	socket.on("createRoom", (name) => {
// 		socket.join(name);
// 		chatRooms.unshift({ id: generateID(), name, messages: [] });
// 		socket.emit("roomsList", chatRooms);
// 	});

// 	socket.on("findRoom", (id) => {
// 		let result = chatRooms.filter((room) => room.id == id);
// 		// console.log(chatRooms);
// 		socket.emit("foundRoom", result[0].messages);
// 		// console.log("Messages Form", result[0].messages);
// 	});

// 	socket.on("newMessage", (data) => {
// 		const { room_id, message, user, timestamp } = data;
// 		let result = chatRooms.filter((room) => room.id == room_id);
// 		const newMessage = {
// 			id: generateID(),
// 			text: message,
// 			user,
// 			time: `${timestamp.hour}:${timestamp.mins}`,
// 		};
// 		console.log("New Message", newMessage);
// 		socket.to(result[0].name).emit("roomMessage", newMessage);
// 		result[0].messages.push(newMessage);

// 		socket.emit("roomsList", chatRooms);
// 		socket.emit("foundRoom", result[0].messages);
// 	});
// 	socket.on("disconnect", () => {
// 		socket.disconnect();
// 		console.log("🔥: A user disconnected");
// 	});
// });

// app.get("/api", (req, res) => {
// 	res.json(chatRooms);
// });

// http.listen(PORT, () => {
// 	console.log(`Server listening on ${PORT}`);
// });
