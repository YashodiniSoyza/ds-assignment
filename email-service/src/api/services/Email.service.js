import mailgen from "mailgen";
import { mailConfig } from "../../config/mail.config.js";
import logger from "../../util/logger.js";

//import mail configs
let mailTransporter = mailConfig.mailConfigs();

// Configure mailgen by setting the theme and sender
let MailGenerator = new mailgen({
	theme: "cerberus",
	product: {
		name: "Online Learning Platform",
		link: "http://localhost:5173/",
	},
});

const sendWelcomeEmail = async (user) => {
	// Prepare email content
	let email = {
		body: {
			name: user.name,
			intro: "Welcome to the Online Learning Platform! We're very excited to have you on board.",
			action: {
				instructions: "Click the button below to start learning.",
				button: {
					color: "#22BC66",
					text: "Start learning",
					link: "http://localhost:5173",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	// Generate email template
	let emailTemplate = MailGenerator.generate(email);

	// Prepare mail options
	let mailOptions = {
		from: process.env.EMAIL_CLIENT,
		to: user.email,
		subject: "Welcome to the Online Learning Platform",
		html: emailTemplate,
	};

	// Send email
	mailTransporter.sendMail(mailOptions, (err) => {
		if (err) {
			logger.error("Error sending email to " + user.email + " " + err);
		} else {
			logger.info("Email sent to " + user.email);
		}
	});
};

const sendAdminAcceptanceEmail = async (user) => {
	// Prepare email content
	let email = {
		body: {
			name: user.name,
			intro: "Congratulations! Your course has been approved.",
			action: {
				instructions: "Click the button below to view your course.",
				button: {
					color: "#22BC66",
					text: "Manage platform",
					link: "http://localhost:5173",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	// Generate email template
	let emailTemplate = MailGenerator.generate(email);

	// Prepare mail options
	let mailOptions = {
		from: process.env.EMAIL_CLIENT,
		to: user.email,
		subject: "Congratulations! Your course has been approved",
		html: emailTemplate,
	};

	// Send email
	mailTransporter.sendMail(mailOptions, (err) => {
		if (err) {
			logger.error("Error sending email to " + user.email + " " + err);
		} else {
			logger.info("Email sent to " + user.email);
		}
	});
};

const sendPaymentConfirmationEmail = async (user) => {
	// Prepare email content
	let email = {
		body: {
			name: user.name,
			intro: "Your payment has been confirmed! You can now access your course.",
			action: {
				instructions: "Click the button below to view your course.",
				button: {
					color: "#22BC66",
					text: "Manage platform",
					link: "http://localhost:5173",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	// Generate email template
	let emailTemplate = MailGenerator.generate(email);

	// Prepare mail options
	let mailOptions = {
		from: process.env.EMAIL_CLIENT,
		to: user.email,
		subject: "Your payment has been confirmed",
		html: emailTemplate,
	};

	// Send email
	mailTransporter.sendMail(mailOptions, (err) => {
		if (err) {
			logger.error("Error sending email to " + user.email + " " + err);
		} else {
			logger.info("Email sent to " + user.email);
		}
	});
};

const sendEnrollmentEmail = async (user) => {
	// Prepare email content
	let email = {
		body: {
			name: user.name,
			intro: "Congratulations! You have successfully enrolled in a course.",
			action: {
				instructions: "Click the button below to view your course.",
				button: {
					color: "#22BC66",
					text: "Manage platform",
					link: "http://localhost:5173",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	// Generate email template
	let emailTemplate = MailGenerator.generate(email);

	// Prepare mail options
	let mailOptions = {
		from: process.env.EMAIL_CLIENT,
		to: user.email,
		subject: "Congratulations! You have successfully enrolled in a course",
		html: emailTemplate,
	};

	// Send email
	mailTransporter.sendMail(mailOptions, (err) => {
		if (err) {
			logger.error("Error sending email to " + user.email + " " + err);
		} else {
			logger.info("Email sent to " + user.email);
		}
	});
};

const sendNewPurchaseEmailToAuthor = async (user) => {
	// Prepare email content
	let email = {
		body: {
			name: user.name,
			intro: "Congratulations! You have a new purchase.",
			action: {
				instructions: "Click the button below to view your courses.",
				button: {
					color: "#22BC66",
					text: "Manage platform",
					link: "http://localhost:5173",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	// Generate email template
	let emailTemplate = MailGenerator.generate(email);

	// Prepare mail options
	let mailOptions = {
		from: process.env.EMAIL_CLIENT,
		to: user.email,
		subject: "Congratulations! You have a new purchase",
		html: emailTemplate,
	};

	// Send email
	mailTransporter.sendMail(mailOptions, (err) => {
		if (err) {
			logger.error("Error sending email to " + user.email + " " + err);
		} else {
			logger.info("Email sent to " + user.email);
		}
	});
};

const EmailService = {
	sendWelcomeEmail,
	sendAdminAcceptanceEmail,
	sendPaymentConfirmationEmail,
	sendEnrollmentEmail,
	sendNewPurchaseEmailToAuthor,
};

export default EmailService;
