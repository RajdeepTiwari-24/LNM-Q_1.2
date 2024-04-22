const nodemailer=require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
	const oauth2Client = new OAuth2(
	  process.env.CLIENT_ID,
	  process.env.CLIENT_SECRET,
	  "https://developers.google.com/oauthplayground"
	);
  
	oauth2Client.setCredentials({
	  refresh_token: process.env.REFRESH_TOKEN
	});
  
	const accessToken = await new Promise((resolve, reject) => {
	  oauth2Client.getAccessToken((err, token) => {
		if (err) {
		  reject();
		}
		resolve(token);
	  });
	});
  
	const transporter = nodemailer.createTransport({
	  service: "gmail",
	  auth: {
		type: "OAuth2",
		user: process.env.USER,
		accessToken,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken: process.env.REFRESH_TOKEN
	  },
	  tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false,
	  },
	});
  
	return transporter;
  };
const sendEmail= async(email,subject,text)=>{
    try{
        const transporter = await createTransporter();
        await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: text,
		});
		console.log("email sent successfully");
	} 
    catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
}

module.exports=sendEmail;
