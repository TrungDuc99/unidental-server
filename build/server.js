"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connectDatabase_1 = __importDefault(require("./utils/connectDatabase"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var bodyParser = require('body-parser');
require('dotenv').config();
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT, 10) || 9888;
(0, connectDatabase_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(PORT));
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Config chat settings
var generateID = function () { return Math.random().toString(36).substring(2, 10); };
var chatRooms = [];
// routes api
app.use('/api/user', routes_1.UserRouter);
app.use('/api', routes_1.AuthRouter);
app.get('/api/chats', function (req, res) {
    res.json(chatRooms);
});
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
