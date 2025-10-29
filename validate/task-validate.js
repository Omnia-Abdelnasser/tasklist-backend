const Joi=require('joi')
// add task validate
const PostTaskValidate = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(10).max(100).required(),
  completed: Joi.bool().required(),

});


// validate update Task

const UpdateTaskValidate = Joi.object({
   title: Joi.string().min(3).max(20),
  description: Joi.string().min(10).max(100),
  completed: Joi.bool(),

});

// func validate
function validate(Schema, data) {
  const { error } = Schema.validate(data);
  return { error }; 
}


module.exports = { UpdateTaskValidate,PostTaskValidate,validate };
