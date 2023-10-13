import { useEffect, useState } from "react";
import { Storage } from "@plasmohq/storage";
import type { PlasmoGetStyle } from "plasmo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import "./style.css"


import { Textarea } from "./components/ui/textarea";
import Providers from "./redux/provider";
import PromptSettings from "./components/ui/options-ui/promptSettings";
import OptionsScreen from "./components/ui/options-ui/optionsScreen";

const storage = new Storage();

function OptionsIndex() {

  return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <OptionsScreen />
      </div>
  )
}

export default OptionsIndex