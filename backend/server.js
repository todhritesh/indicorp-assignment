const express = require('express');
const cors = require('cors');
require("./src/config/dbconfig")
const mechanicRouter = require("./src/routes/mechanicRouter")
const toolsRouter = require("./src/routes/toolsRouter")
const assignToolRouter = require("./src/routes/assignToolRouter")

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the CORS-enabled server!' });
});

app.use('/mechanic', mechanicRouter);
app.use('/tools', toolsRouter);
app.use('/assign-tool', assignToolRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
