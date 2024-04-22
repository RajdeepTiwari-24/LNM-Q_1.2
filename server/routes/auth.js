const router = require("express").Router();
const User = require("../models/userModel");
const Otp = require("../models/otpSchema");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect email", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    if(!user.verified) return res.json({ msg: "Email not Verified", status: false });
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.posts;
    delete userObject.replies;
    return res.json({ status: true, user: userObject });
  } catch (ex) {
    next(ex);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck){
      if(emailCheck.verified===false){
          return res.json({msg: "Email not verified", status:false});
      }
      return res.json({ msg: "Email already used", status: false });
    }
    // const str="@lnmiit.ac.in";
    // if(email.length<str.length)
    //   return res.json({ msg: "Not LNMIIT User", status: false });

    // const last13Substring = email.substring(email.length - 13);
    // if(last13Substring!=str)
    //   return res.json({ msg: "Not LNMIIT User", status: false });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const year=email.substring(0,2);
    const branch= email.substring(2,5);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      year,
      branch
    });
    // delete user.password;
    let code=Math.floor(100000 + Math.random() * 900000);
    const OTP = await new Otp({
			userId: user._id,
			otp: code,
		}).save();
    
    const msg = `
    <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Dear ${user.username},</p>
          <p>Thank you for registering with Us!</p>
          <p>To ensure the security of your account and verify your email address, we have sent you a One-Time Password (OTP). Please use the OTP below to complete the email verification process:</p>
          <p><strong>OTP:</strong> <span style="font-weight: bold; color: #007bff;">${code}</span></p>
          <p>If you did not request this OTP or if you have any questions, please contact our support team immediately.</p>
          <p>Thanks</p>
        </div>
      </body>
    </html>
  `;
		await sendEmail(user.email, "Verify Email", msg);
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.posts;
    delete userObject.replies;
    return res.json({ status: true, user: userObject });
  } catch (error) {
		console.log(error);
		return res.json({ msg: "Problem with OTP",status: false });
	}
});


router.post('/verify', async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found', status: false });
    }
    const otpRecord = await Otp.findOne({ userId: user._id, otp });
    if (!otpRecord) {
      return res.status(400).json({ msg: 'Invalid OTP', status: false });
    }
    user.verified = true;
    await user.save();
    await Otp.deleteOne({ _id: otpRecord._id });
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.posts;
    delete userObject.replies;
    return res.json({ status: true, user: userObject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error', status: false });
  }
});

router.post('/deleteunverified', async(req,res,next)=>{
  try{
    const unverifiedUsers = await User.find({ verified: false});
    for (const user of unverifiedUsers) {
      await User.deleteOne({ _id: user._id });
    }
    return res.status(200).json({msg:"Deletion Done", status:true});
  } catch (e){
    return res.status(500).json({msg:"Internal Server Error", status:false});
  }
  
})

module.exports = router;