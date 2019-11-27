const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey,
	sessionToken: process.env.sessionToken
});

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "collegedashboard-uploads",
		acl: "public-read",
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, file.originalname);
		}
	})
});

module.exports = upload;
