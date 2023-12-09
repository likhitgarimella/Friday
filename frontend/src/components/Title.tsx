import {useState} from "react";
// Web requests
import axios from "axios";

type Props = {
    setMessages: any;
}

// Title
function Title({ setMessages }: Props) {
    const [isResetting, setIsResetting] = useState(false);
    
    // Reset the conversation
    const resetConversation = async () => {
        setIsResetting(true);

        await axios.get("http://localhost:8000/reset").then((res) => {
            if (res.status == 200) {
                // Delete data and Reset messages in stored data json
                // i.e. When backend confirms deletion, then do it in frontend too
                setMessages([])
            } else {
                console.error("There was an error with the API request to backend")
            }
        })
        .catch((err) => {
            console.error(err.message);
        });

        setIsResetting(false);
    }

    return (
        <div>
            <button onClick={resetConversation} className="bg-indigo-500 p-5">RESET</button>
        </div>
    )
}

export default Title;
