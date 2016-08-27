var express = require('express');
var multer = require('multer');
var md5File = require('md5-file');
var fs = require('fs');

var upload = multer({dest: './uploads/'});

var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/public'));

app.post('/results', upload.single('fileToUpload'), function (req, res, next) {
  var arr = [req.body, req.file];
  arr.forEach(function (val) {
    console.log(val);
  });
  md5File(req.file.path, function (err, hash) {
    if (err) throw err;
    res.send({
      size: req.file.size,
      md5sum: hash
    });
    fs.unlink(req.file.path, function (err) {
      if (err) throw err;
    });
  });

});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
