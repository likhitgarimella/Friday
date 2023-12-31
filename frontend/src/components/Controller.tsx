import {useState} from "react";
import Title from "./Title";
import RecordMessage from "./RecordMessage";
import axios from "axios";

function Controller() {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    const createBlobUrl = (data: any) => {
        const blob = new Blob([data], { type: "audio/mpeg" });
        const url = window.URL.createObjectURL(blob); // octet stream
        return url;
    };

    const handleStop = async (blobUrl: string) => {
        setIsLoading(true)

        // Append recorded message to messages
        const myMessage = { sender: "me", blobUrl };
        const messagesArr = [...messages, myMessage];

        // Convert blob url to blob object => to send this to backend
        fetch(blobUrl)
            .then((res) => res.blob())
            .then(async (blob) => {

                // Construct audio to send file
                const formData = new FormData();
                formData.append("file", blob, "myFile.wav");

                // Send form data to API endpoint
                await axios
                    .post("http://localhost:8000/post-audio-get/", formData, {
                        headers: { "Content-Type": "audio/mpeg" },
                        responseType: "arraybuffer",
                    })
                .then((res: any) => {
                    const blob = res.data;
                    const audio = new Audio();
                    audio.src = createBlobUrl(blob);

                    // Append to audio
                    const fridayMessage = { sender: "friday", blobUrl: audio.src };
                    messagesArr.push(fridayMessage);
                    setMessages(messagesArr);

                    // Play audio
                    setIsLoading(false);
                    audio.play()
                        .then(() => {
                            console.log("Audio playback successful");
                        })
                        .catch((error) => {
                            console.error("Audio playback error:", error);
                        });
                })
                .catch((err) => {
                    alert(err.message);
                    setIsLoading(false);
                });

            });

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

                {/* Conversation */}
                <div style={{
                    marginTop: '1.25rem',
                    paddingLeft: '1.25rem',
                    paddingRight: '1.25rem'
                }}>
                    {messages.map((audio, index) => { // iterate through every message
                        // iterate through every index 0,1,2,3... for every audio message
                        return (                            
                            <div
                                key={index + audio.sender}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    ...(audio.sender == 'friday' && { alignItems: 'flex-end' })
                                }}
                            >

                                {/* Sender */}
                                <div style={{marginTop: '0rem'}}>
                                    <p style={{
                                        textAlign: audio.sender == "friday" ? 'right' : 'left',
                                        marginRight: audio.sender == "friday" ? '1rem' : '0',
                                        marginLeft: audio.sender == "me" ? '1rem' : '0',
                                        fontStyle: 'italic',
                                        color: audio.sender == "friday" ? 'green' : 'blue',
                                    }}>
                                        {audio.sender}
                                    </p>

                                    {/* Audio Message */}
                                    <audio
                                        src = {audio.blobUrl}
                                        style={{appearance: 'none'}}
                                        controls
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {messages.length == 0 && !isLoading && (
                        <div style = {{
                            textAlign: 'center',
                            fontWeight: 'lighter',
                            fontStyle: 'italic',
                            marginTop: '2.5rem'
                        }}>
                            Send Friday a message...
                        </div>
                    )}

                    {isLoading && (
                        <div style = {{
                            textAlign: 'center',
                            fontWeight: 'lighter',
                            fontStyle: 'italic',
                            marginTop: '2.5rem'
                        }}>
                            Gimme a few seconds...
                        </div>
                    )}
                </div>

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