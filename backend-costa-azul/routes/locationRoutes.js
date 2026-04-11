import { Router } from "express";
import { getLocations } from '../controller/locationController.js'




    const router = Router()




    router.get('/', getLocations)


    export default router