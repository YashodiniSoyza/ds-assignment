const Joi = require('@hapi/joi');

exports.PAYMENT_MODEL = Joi.object({
    user_id: Joi.number().integer().required(),
    course_id: Joi.number().integer().required(),
    amount: Joi.number().integer().required(),
    status: Joi.string().min(5).max(20).required(),
})
		