import express from "express";
import Joi from "joi";
 
const port = process.env.API_PORT;

const app = express();

app.get("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate({ name:req.query.name });

    if (error) {
      return res.status(400).send({ error });
    }

  res.status(200).send();
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
