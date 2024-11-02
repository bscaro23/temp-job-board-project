const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  detailsType: {
    type: String,
    required: true,
    enum: ['School', 'Candidate'], 
  },
  details: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'detailsType', 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
