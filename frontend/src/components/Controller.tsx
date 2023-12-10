import {useState} from "react";
import Title from "./Title";
import RecordMessage from "./RecordMessage";

function Controller() {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    const createBlobUrl = (data: any) => {
        const blob = new Blob([data], { type: "audio/mpeg" });
        const url = window.URL.createObjectURL(blob); // octet stream
        return url;
    };

    const handleStop = async (blobUrl: string) => {
        console.log(blobUrl)
        setIsLoading(true)

        // Append recorded message to messages
        const myMessage = { sender: "Me", blobUrl };
        const messagesArr = [...messages, myMessage];

        // Convert blob url to blob object => to send this to backend
        fetch(blobUrl)
            .then((res) => res.blob())
            .then(async (blob) => {

                // Construct audio to send file
                const formData = new FormData();
                formData.append("file", blob, "myFile.wav");

            });

        setIsLoading(false)
    };
    
    return (
        <div style={{
            height: "100vh",
            overflowY: "hidden"
            }}>
            <Title setMessages={setMessages} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                overflowY: "scroll",
                paddingBottom: "96px"
                }}>
                {/* Recorder */}
                <div style={{
                    position: "fixed",
                    bottom: "0",
                    width: "100%",
                    padding: "1.5rem",
                    borderTop: "1px solid #ccc",
                    textAlign: "center",
                    background: "linear-gradient(to right, #00c2e0, #4caf50)"
                    }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                        }}>
                        <RecordMessage handleStop={handleStop}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Controller;