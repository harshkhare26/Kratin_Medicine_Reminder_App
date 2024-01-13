const express = require('express');
const router = express.Router();
const { 
    createMedicine, 
    getAllMedicines, 
    getMedicineById, 
    updateMedicine, 
    deleteMedicine,
    decrementDosageById
} = require('../controllers/medicine');


router.post('/', createMedicine); 
router.get('/', getAllMedicines); 
router.get('/:id', getMedicineById); 
router.patch('/:id', updateMedicine);
router.delete('/:id', deleteMedicine); 
router.patch('/:id/reduce', decrementDosageById);


module.exports = router;
