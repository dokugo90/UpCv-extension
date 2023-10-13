import { useEffect, useState } from "react";
import { Storage } from "@plasmohq/storage";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { Input } from "../input";

import "../../../style.css"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

const storage = new Storage();

export default function PromptSettings() {
    const [prompt, setPrompt] = useState("Write me a short cover letter based on the provided job description");
    const [name, setName] = useState("")
    
  
    async function saveData() {
      await storage.set("prompt", prompt)
      await storage.set("name", name)
    }
  
    async function getData() {
      const savedPrompt = await storage.get("prompt");
      const savedName = await storage.get("name");
      setPrompt(savedPrompt);
      setName(savedName);
    }
  
    useEffect(() => {
      getData()
    }, [])

    return (
        <>
        <Card>
          <CardHeader>
            <CardTitle>Customize Prompt</CardTitle>
            <CardDescription>
              To make the cv generated more personalized provide your name and give specific instructions or details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input onChange={(e) => setName(e.target.value)} id="name" value={name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prompt">Prompt Instructions/Details (e.g. Education, etc)</Label>
              <Textarea maxLength={200} onChange={(e) => setPrompt(e.target.value)} id="prompt" value={prompt} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => saveData()}>Save changes</Button>
          </CardFooter>
        </Card>

        
        </>

    )
}