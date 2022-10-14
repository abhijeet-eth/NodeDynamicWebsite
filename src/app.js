const express = require("express")
const app = express();
const path = require("path")
require("./db/conn")
const hbs = require("hbs")
const User = require("./models/usermessage")

const port = process.env.PORT || 8000;

//setting the path
const staticpath = path.join(__dirname, "../public")
const templatepath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")
console.log(partialpath)

//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))//we can use this path in index.hbs
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")))
// app.use(express.static(staticpath))
app.set("view engine", "hbs")
app.set("views", templatepath)
hbs.registerPartials(partialpath)
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index")  //while using hbs use 'render' instead of 'send' cuz we are rendering to index.hbs page
})


app.post("/contact", async (req, res) => {
    try {
        const userData = new User(req.body)
        await userData.save()
        res.status(201).render("result") //this will redirect to result.hbs file
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log(`listening to ${port}`)
})