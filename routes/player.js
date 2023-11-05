const express=require('express')
const playerController=require('../controllers/player')
const router=express.Router()


router.post('/add-player',playerController.postPlayer)
router.get('/search',playerController.searchPlayer)
router.delete('/delete-player/:id',playerController.deletePlayer)
router.put('/edit-player/:id',playerController.editPlayer)
router.get('/get-player/:id',playerController.getPlayer)

module.exports=router;
