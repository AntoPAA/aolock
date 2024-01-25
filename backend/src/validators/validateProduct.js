const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().max(255).required(),
  price: Joi.number().integer().min(0).required(),
  description: Joi.string().required(),
  img_front: Joi.string().max(255).required(),
  img_back: Joi.string().max(255).required(),
  img_zoom: Joi.string().max(255),
  size_id: Joi.number().required(),
  type_id: Joi.number().required(),
  season_id: Joi.number().required(),
  created_at: Joi.date().optional(),
});

const validateProduct = (req, res, next) => {
  delete req.body.id;
  const { error } = productSchema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = validateProduct;
