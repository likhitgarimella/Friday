import {useState} from "react";
// Web requests
import axios from "axios";

type Props = {
    setMessages: any;
}

// Title
function Title({ setMessages }: Props) {
    const [isResetting, setIsResetting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    // Reset the conversation
    const resetConversation = async () => {
        setIsResetting(true);

        await axios.get("http://localhost:8000/reset").then((res) => {
            if (res.status == 200) {
                // Delete data and Reset messages in stored data json
                // i.e. When backend confirms deletion, then do it in frontend too
                setMessages([]);
            } else {
                console.error("There was an error with the API request to backend");
            }
        })
        .catch((err) => {
            console.error(err.message);
        });

        setIsResetting(false);
    };

    return (        
        <div style={{display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "8px",
        backgroundColor: "#1a202c",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "bold",
        fontStyle: "italic",
        fontFamily: "Futura"
        }}>
        {/* <div className="flex justify-between items-center w-full p-4 bg-gray-900 text-white font-bold shadow"></div> */}
            <div>F.R.I.D.A.Y.</div>

            <button
                onClick={resetConversation}
                style={{
                    transition: "all 300ms",
                    color: isHovered ? "#fuchsia" : "#3b82f6", // pink-500 : blue-300
                    cursor: "pointer",
                    fontWeight: "normal",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={isResetting ? "animate-pulse" : ""}
                // className={"transition-all duration-300 text-blue-300 hover:text-pink-500 " + (isResetting && "animate-pulse")}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{
                        transition: "stroke 300ms",
                        width: "1rem",
                        height: "1rem"
                      }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Title;
