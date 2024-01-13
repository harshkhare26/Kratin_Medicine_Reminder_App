const Medicine = require('../models/medicine');
const {BadRequestError,NotFoundError} = require('../errors')


const createMedicine = async (req, res) => {
    if(!req.body.name || !req.body.dosage){
        throw new BadRequestError('Name and dosage are required')
    }
    const medicine = await Medicine.find({name:req.body.name})
    if(medicine.length>0){
        throw new BadRequestError('Medicine already exists')
    }
    const newMedicine = await Medicine.create(req.body);
    
    res.status(201).json(newMedicine);
};

const getAllMedicines = async (req, res) => {
    const medicines = await Medicine.find();
    res.json(medicines);
};


const getMedicineById = async (req, res) => {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
        throw new NotFoundError('Medicine not found')
    }
    res.json(medicine);
};



const decrementDosageById = async (req, res) => {
    
        const medicine = await Medicine.findById(req.params.id);
        
        if (!medicine) {
            throw new NotFoundError('Medicine not found')
        }

        medicine.dosage -= 1;

        if (medicine.dosage <= 0) {
            await Medicine.findByIdAndDelete(req.params.id);
          return  res.json({ message: 'Medicine deleted as dosage reached zero' });
        } else {
            await medicine.save();
           return res.json(medicine);
        }
};






const updateMedicine = async (req, res) => {
 
    if(!req.body.name || !req.body.dosage){
        throw new BadRequestError('Name and dosage are required')
    } 
    const medicine = await Medicine.find({name:req.body.name})
    //console.log(medicine[0]._id,req.params.id)
    if(medicine.length>0 && !medicine[0]?._id.equals(req.params.id)){
        throw new BadRequestError('Medicine already exists')
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators : true});
    if (!updatedMedicine) {
        throw new NotFoundError('Medicine not found')
    }
   return res.json(updatedMedicine);
};


const deleteMedicine = async (req, res) => {
  const medicine =   await Medicine.findByIdAndDelete(req.params.id);
  if (!medicine) {
    throw new NotFoundError('Medicine not found')
}
   return res.json({ message: 'Medicine deleted successfully' });
};

module.exports = { createMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine,decrementDosageById };
