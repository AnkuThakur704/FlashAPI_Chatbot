import express from "express"
import { GoogleGenAI } from "@google/genai";
const router = express.Router()
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY });
async function aifunc(m){
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${m}`,
  });
  console.log(response.text);
  return response.text
}


router.get("/gemini",async(req,res)=>{
    try {
      const result = await aifunc(req.query.msg)
      result.toString()
      res.send(result)
    } catch (error) {
      if(error.status===429){
        res.send("Limit exceeded")
      }
      else{
        res.send("Gemini error")
      }
    }

})

export default router