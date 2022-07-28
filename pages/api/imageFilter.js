//import { readSync } from 'fs';

/*const filter = require('node-image-filter');
const FormData = require('form-data');
const fs = require('fs')
const os = require('os')
const path = require('path')*/
const sharp = require('sharp');
var request = require('request').defaults({ encoding: null });

export default async function handle(req, res)
{
    let imageUrl = String(req.body.imgUrl) + ".jpg";
    request.get(imageUrl, function (error, response, body)
    {
        if (!error && response.statusCode == 200) {
            let data = body;
            sharp(data).greyscale().toBuffer().then((put) =>
            {
                let a = put.toString('base64');
                res.send
                ({
                    fileData: a
                });
            });
        }
    });
}

// upload image -> send image to server -> server add metadata -> send to firebase ->
// send image to server to apply filter -> return image

/* let imageUrl = String(req.body.imgUrl) + ".jpg";
    filter.render(imageUrl, filter.preset.grayscale, function(result)
    {
        let path = [os.tmpdir(), "result.jpg"].join('/');
        result.data.pipe(fs.readFileSync(path, {encoding: 'base64'}));
        res.send(result);
    });*/