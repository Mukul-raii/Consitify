"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const tweetScrapper_route_1 = __importDefault(require("./routes/tweetScrapper.route"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const consitifyFirebase_json_1 = __importDefault(require("./utils/consitifyFirebase.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(consitifyFirebase_json_1.default)
});
console.log("firebase connected");
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/v0/user", user_routes_1.default);
app.use("/api/v0/userProfile", tweetScrapper_route_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
