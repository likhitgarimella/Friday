import {useState} from "react";
import Title from "./Title";

function Controller() {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    const createBlobUrl = (data: any) => {};

    const handleStop = async () => {};
    
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
                    background: "linear-gradient(to right, #00c2e0, #4CAF50)"
                    }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                        }}>
                        <div>Recorder</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Controller;