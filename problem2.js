const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const viewsPath = path.join(__dirname, 'views')
app.use(express.static(viewsPath))

app.get('', (req, res) => {
    res.render('index', {})
})

app.listen(port, () => console.log('Listening on port ' + port))