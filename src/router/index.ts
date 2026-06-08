import { Router } from 'express';
import auth from './auth.router';
import user from './user.router';
import cerere from './cerere.router';
import claim from "./claim.router";
import payment from "./payment.router";

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "Routerul principal funcționează!" });
});

router.use('/auth', auth);
router.use('/user', user);
router.use('/cereri', cerere);
router.use("/claim", claim);
router.use("/payment", payment);


export default router;