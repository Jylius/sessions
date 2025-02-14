const IlIlce = require('../models/il_ilce'); 

const getAllCities = async (req, res) => {
    try {
        const cities = await IlIlce.find({}, 'il'); 
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDistrictsByCity = async (req, res) => {
    const { il } = req.params; 

    try {
        const cityData = await IlIlce.findOne({ il: il }); 
        if (!cityData) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json(cityData.ilceler);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCities,
    getDistrictsByCity,
};
