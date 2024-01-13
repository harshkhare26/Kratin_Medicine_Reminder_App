require('dotenv').config();
require('express-async-errors');

const cors = require('cors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// routers
const medicineRoutes = require('./routes/medicine');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());
app.use(cors());




// Use routes
app.use('/api', medicineRoutes);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
