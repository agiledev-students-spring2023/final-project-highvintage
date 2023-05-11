const mongoose = require('mongoose');

const StyleSchema = new mongoose.Schema({
  styles: { type: Array, required: true }
});

const Style = mongoose.model('Style', StyleSchema, 'Style');

module.exports = Style;
