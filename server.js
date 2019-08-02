const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/Images');
	},
	filename: (req, file, cb) => {
		console.log(`${file.fieldname}_${Date.now()}_${file.originalname}`);
		cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
	}
});
const upload = multer({ storage: storage });
const multiUpload = multer({ storage: storage }).array('imgUploader', 3);

app.get('/', (req, res) => {
	res.status(200).send('Welcome to MEAN stack RESTful API!');
});

app.post('/api/upload', upload.single('avatar'), (req, res) => {
	return res.status(200).json('File uploaded successfuly!');
});

app.post('/api/multiupload', (req, res) => {
	multiUpload(req, res, function(err) {
		if (err) {
			console.dir(err);
			return res.end('Something went wrong!');
		}
		return res.status(200).json('File uploaded successfuly!');
	});
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
