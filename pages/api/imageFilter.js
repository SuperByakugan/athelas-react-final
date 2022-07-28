//Importing sharp for compression and filter
const sharp = require('sharp');
//Importing reqest to get image from web
var request = require('request').defaults({ encoding: null });

export default async function handle(req, res)
{
    //Extracting url from reqest and adding .jpg at the end as good practice
    let imageUrl = String(req.body.imgUrl) + ".jpg";
    //Fetching the image using requests
    //Can't just use imgUrl because sharp assumes the url is a 
    //JPG/asdk123mdfdald-?./jskjd instead of a JPG because of how the url is formated
    request.get(imageUrl, function (error, response, body)
    {
        //checks if there is no reqest error
        if (!error && response.statusCode == 200) {
            //image stored in data
            let data = body;
            //Constructs sharp obj and uses the grey scale function to turn it
            //to black and white
            //Uses to Buffer so we can convert it to base 64
            sharp(data).greyscale().toBuffer().then((put) =>
            {
                //convert to base 64
                let a = put.toString('base64');
                //return base 64 in json format
                res.send
                ({
                    fileData: a
                });
            });
        }
    });
}


//import { readSync } from 'fs';

/*const filter = require('node-image-filter');
const FormData = require('form-data');
const fs = require('fs')
const os = require('os')
const path = require('path')*/


// upload image -> send image to server -> server add metadata -> send to firebase ->
// send image to server to apply filter -> return image

/* let imageUrl = String(req.body.imgUrl) + ".jpg";
    filter.render(imageUrl, filter.preset.grayscale, function(result)
    {
        let path = [os.tmpdir(), "result.jpg"].join('/');
        result.data.pipe(fs.readFileSync(path, {encoding: 'base64'}));
        res.send(result);
    });*/