/**
 * Created by scorpio on 04.07.16.
 */
const config = require('config')
const App = require ('app')

let app = new App()

app.use((req, res) => {
    console.log(req.headers);
    res.end("Hello LOVERS");
})
app.start(config.port,config.host, () => console.log(`Server running at http://${config.host}:${config.port}`))
