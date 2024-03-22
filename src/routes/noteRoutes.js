import express from 'express';
import mynoteController from "../controllers/noteController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateJWT);
//routes with authentication
router.post('/add-note', mynoteController.createNote);
router.put('/update-notes/:id', mynoteController.updateNote);
router.delete('/delete-notes/:id', mynoteController.deleteNote);

router.post('/delete-notes-particular',mynoteController.deleteParticular);
router.get('/notes-visible', mynoteController.noteVisible);


router.get('/get-all-notes', mynoteController.getAllNotes);
router.get('/get-notes-by-id/:id', mynoteController.getNoteById);
router.get('/notes/search', mynoteController.titleSearch);
router.get('/notes/last-three', mynoteController.lastThreeNotes);

export default router;
