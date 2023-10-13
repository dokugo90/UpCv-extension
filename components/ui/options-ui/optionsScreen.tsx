import { useEffect, useState } from "react";
import { Storage } from "@plasmohq/storage";
import { Textarea } from "../textarea";
import { Button } from "../button";
import { Input } from "../input";

import "../../../style.css"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import PromptSettings from "./promptSettings";

export default function OptionsScreen() {
    return (
        <>
        <Tabs defaultValue="general" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="customize">Customize Prompt</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
      <h1>Coming Soon.</h1>
      </TabsContent>
      <TabsContent value="customize">
      <PromptSettings />
      </TabsContent>
    </Tabs>
        </>
    )
}