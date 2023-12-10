import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

type Props = {
    handleStop: any;
}

function RecordMessage({ handleStop }: Props) {
  return (
    // React's default audio recorder
    <ReactMediaRecorder
        // Audio parameter
        audio
        // On stop perform action
        onStop={handleStop}
        // Status message and start-stop actions
        render={({status, startRecording, stopRecording}) => (
            <div style={{ marginTop: "0.5rem" }}>
                <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    style={{ backgroundColor: "#ffffff", padding: "1rem", borderRadius: "50%" }}
                >
                    ICON
                </button>
                <p style={{ marginTop: "0.5rem", color: "#ffffff", fontWeight: "lighter" }}>{status}</p>
            </div>
        )}
    />
  );
}

export default RecordMessage
