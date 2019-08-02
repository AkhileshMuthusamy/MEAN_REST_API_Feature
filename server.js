const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
