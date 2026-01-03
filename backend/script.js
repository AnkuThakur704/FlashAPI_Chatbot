import express from "express"
import router from "./routes/code.js"
import cors from "cors"
const app = express()
app.use(cors())
app.use("/api/routes",router)
app.listen(8080,()=>{
    console.log("running on 8080")
})