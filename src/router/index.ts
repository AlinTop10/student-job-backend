import { Router } from 'express';
import auth from './auth.router';
import user from './user.router';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "Routerul principal funcționează!" });
});

router.use('/auth', auth);
router.use('/user', user);


export default router;