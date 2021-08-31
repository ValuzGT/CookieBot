const fetch = require('node-fetch')
const xml2js = require('xml2js');
const got = require('got');
module.exports = {
    category: 'Testing',
    description: 'Replies with pong', // Required for slash commands
    slash: 'both', // Create both a slash and legacy command
    testOnly: false, // Only register a slash command for the testing guilds
    expectedArgs: 'character',
    minArgs: 1,
    maxArgs: 1,
    callback: ({ message, args, interaction }) => {   
      async function getLewd(message, args) {
        const arguments = args[0] ? args[0] : ''
        const url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + arguments;
        try {
          const response = await fetch(url)
          apiData = await response.text()
      
          var parser = new xml2js.Parser();
          parser.parseStringPromise(apiData).then(function (r34Result) {
            let postCount = r34Result.posts.$.count - 1;
            if(postCount > 100) {
              postCount = 100;
            }
            if(postCount > 0) {
              var picNum = Math.floor(Math.random() * postCount) + 0;
              var r34Pic = r34Result.posts.post[picNum].$.file_url;
              try {
                fetch(r34Pic, {method: 'HEAD'}).then(function (r34PicResponse){
                  r34PicSize = r34PicResponse.headers.get("Content-Length");
                  if(parseInt(r34PicSize, 10) < 8000000) {
                    message.reply({
                      files: [r34Pic]
                    });
                  } else {
                    message.reply("File was too large ;__;");
                  }
                })
              } catch (error) {
                message.reply("There was error with rule34 content")
                console.log(error);
              }
            } else {
              message.reply("Nobody here but us chickens!");
            }
          })
          .catch(function (error) {
            console.log(error)
            message.reply("There was error with rule34 content")
          });
        } catch (error) {
          console.log(error)
          message.reply("There was error with rule34.xxx")
        }
  }  
      if (message) {
        getLewd(message, args)
}
}
}