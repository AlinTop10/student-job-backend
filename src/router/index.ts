import { Router } from 'express';
import auth from './auth.router';
import user from './user.router';
import cerere from './cerere.router';


const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "Routerul principal funcționează!" });
});

router.use('/auth', auth);
router.use('/user', user);
router.use('/cereri', cerere);



export default router;