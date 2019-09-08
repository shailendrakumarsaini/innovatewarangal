const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/innovatewarangal'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/innovatewarangal/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080,()=>{
    console.log("Server Started At 8080")
});
