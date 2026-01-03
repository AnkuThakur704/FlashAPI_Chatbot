import express from "express"
import router from "./routes/code.js"
import cors from "cors"
const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use("/api/routes",router)
app.listen(port,()=>{
    console.log(`running on port:${port}`)
})