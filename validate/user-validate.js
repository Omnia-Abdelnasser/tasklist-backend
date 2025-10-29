const Joi=require('joi')
// register validate
const RegisterValidate = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(5).max(100).required(),
  password: Joi.string().min(5).max(100).required(),

});
//login validate
const LoginValidate = Joi.object({
  email: Joi.string().min(5).max(100).required(),
  password:Joi.string().min(5).max(100).required()
  
  
});

// validate update

const UpdateValidate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().min(5).max(30),
  password: Joi.string().min(5).max(20),

});

// func validate
function validate(Schema, data) {
  const { error } = Schema.validate(data);
  return { error }; 
}


module.exports = { LoginValidate,RegisterValidate,UpdateValidate, validate };
