import { Router } from "express";

const user = Router();


user.get('/', (req, res) => {
    res.json({ message: "Routerul secundar funcționează!" });
});

export default user;