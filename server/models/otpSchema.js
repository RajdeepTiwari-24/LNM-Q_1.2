const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
		unique: true
	},
	otp: { 
        type: Number, 
        required: true 
    },
	createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 600
    },
});

module.exports = mongoose.model("otp", otpSchema);