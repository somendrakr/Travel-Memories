import  express  from "express";
import { getJobs,createJobs,updateJobs } from "../controllers/jobs_route.js";
const router=express.Router();

router.get('/', getJobs);
 router.post('/',createJobs);
router.patch('/:id',updateJobs);

export default router;