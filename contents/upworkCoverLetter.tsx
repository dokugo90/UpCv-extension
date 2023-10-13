import axios from "axios";
import cssText from "data-text:~/contents/style.css"
import type { PlasmoCSConfig, PlasmoCSUIJSXContainer, PlasmoGetOverlayAnchor, PlasmoGetStyle, PlasmoMountShadowHost, PlasmoRender } from "plasmo"
import { useEffect, useState } from "react";
import { OpenAI } from "openai";
import { Storage } from "@plasmohq/storage";
import Providers from "@/redux/provider";
import { createRoot } from "react-dom/client"

const storage = new Storage();

import "./style.css"
import { SettingOutlined } from "@ant-design/icons";


export const config: PlasmoCSConfig = {
    matches: ["https://www.upwork.com/ab/proposals/job/*"]
  }

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainerParent = document.querySelector(`div[data-v-328e1f19][data-v-c12cc8cc].form-group.up-form-group[data-v-33d8b7d8]`)
      if (rootContainerParent) {
        clearInterval(checkInterval)
        const rootContainer = document.createElement("div");
        const secondChild = rootContainerParent.children[1];
        rootContainerParent.insertBefore(rootContainer, secondChild)
        resolve(rootContainer)
      }
    }, 137)
  })





const UpWorkCoverLetter = () => {
    const [description, setDescription] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [prompt, setPrompt] = useState("");
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    // const searchParams = new URLSearchParams(new URL(window.location.href).search);

    // useEffect(() => {
    //     // Query for the currently active tab

    //     if (searchParams.get('q') !== null) {
    //         setSearch(searchParams.get('q'))
    //     } else {
    //         setSearch("You did not search anything")
    //     }
        
    // }, [window.location.href])

    useEffect(() => {
        window.addEventListener("load", () => {
            const jobDescription = document.querySelector('#up-truncation-1');
            const jobCoverLetter = document.querySelector<HTMLTextAreaElement>('.up-textarea');
            const jobSkills = document.querySelectorAll(".up-skill-badge")

            if (jobDescription && jobSkills) {
                setDescription(jobDescription.textContent)
                jobSkills.forEach((skill) => {
                    skills.push(skill.textContent)
                    setSkills(skills)
                })
            } else {
                setDescription("No Job description")
            }
            // jobCoverLetter.value = "Hey there Duke Injected this text!"
          })
    }, [])

    useEffect(() => {
        const jobCoverLetter = document.querySelector<HTMLTextAreaElement>('textarea[data-v-328e1f19][sapling-ignore="true"][rows="4"][placeholder=""][aria-labelledby="cover_letter_label"].up-textarea[spellcheck="false"]');

        if (jobCoverLetter) {
            const inputEvent = new InputEvent("input", {
                bubbles: true,
                cancelable: true,
                composed: true,
                inputType: "insertText",
                data: coverLetter, // Text you want to type
              });

            jobCoverLetter.value = coverLetter;

            jobCoverLetter.dispatchEvent(inputEvent);
        }
    }, [coverLetter])

    async function getPrompt() {

        if (!storage.get("prompt") && !storage.get("name")) {
            await storage.set("prompt", "Write me a short cover letter based on the provided job description");
            await storage.set("name", "")
            setPrompt("Write me a short cover letter based on the provided job description")
        } else {
            const savedPrompt = await storage.get("prompt");
            const savedName = await storage.get("name")
            setPrompt(savedPrompt);
            setName(savedName)
        }
    }

    storage.watch({
        "prompt": (value) => {
          setPrompt(value.newValue)
        },
        "name": (value) => {
          setName(value.newValue)
        }
      })

    useEffect(() => {
        getPrompt()
    }, [])

    async function getCoverLetter() {
        try {
            setLoading(true)
            const response = await axios.post("https://up-cv-api.vercel.app/chat", {
                prompt: `
                Hello my name is ${name.trim()}.
                Use the instructions and details provided only if it is relevant to you generating a cover letter so like their education skills and etc else ignore this -> Instructions/Details: (${prompt.trim()}): Generate the cover letter based on this job description: ${description.trim()}.
                 These are the skills required make sure to point them all out in the cover letter if necessary: ${skills.join(", ").toString().trim()}.
                (please note the cover letter should be short brief and concise and straight to the point don't say more than needed and use a maximum of 150 words also make it formal and humanize the cover letter so it sounds human and persuasive to the hiring manager)
                `,
            })

            setCoverLetter(response.data.content)
            return setLoading(false);
           // alert(response.data.content)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
       
       <div className="container-box">
            {/* <button className="settings-btn" onClick={() => {
                chrome.windows.create({
                    url: "popup.html", // Replace with the actual URL of your popup HTML file
                    type: "popup",
                    width: 300, // Adjust the width as needed
                    height: 300, // Adjust the height as needed
                  });
            }}>Settings</button> */}
            {/* <button className="settings-btn" onClick={() => {
                chrome.runtime.sendMessage({ openOptionsPage: true });
            }}>Settings</button> */}
        {
            loading == true ? 
            <div className="custom-loader"></div>
            :
            <button onClick={() => getCoverLetter()} style={{ borderRadius: "25px"}} className="generate-btn">Generate Cover Letter</button>
        }
        <SettingOutlined title="Settings" onClick={() => chrome.runtime.sendMessage({ openOptionsPage: true })} style={{ color: "#108a00", fill: "#108a00", fontSize: "25px", cursor: "pointer" }} size={20} className="settings-btn" />
        </div>
      

        
        </>
    )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
    createRootContainer
  }) => {
    const rootContainer = await createRootContainer()
    const root = createRoot(rootContainer)
    root.render(<UpWorkCoverLetter />)
  }

export default UpWorkCoverLetter;