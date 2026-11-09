import { Router } from "express";
import { createReservation,  getReservations, getReservationsByDate,getReservationsByStatus, updateReservation, updateReservationStatus,updatePriceReservation, deleteReservationCancelled, getAllReservations  } from '../controller/reservationController.js'
import { protect } from '../middlewares/authMiddleware.js'



const router = Router()

// Rutas protegidas (requieren autenticación)
router.use(protect)

// Listar todas las reservas requiere autenticación (antes estaba expuesta sin token)
router.get('/public', getAllReservations)

router.get( '/me', getReservations )
router.post('/', createReservation)
router.get('/date', getReservationsByDate)
router.get('/status', getReservationsByStatus)
router.put('/:id', updateReservation)
router.patch('/:id/status', updateReservationStatus)
router.patch('/:id/precio', updatePriceReservation)
router.delete('/cancelled', deleteReservationCancelled)


export default router











