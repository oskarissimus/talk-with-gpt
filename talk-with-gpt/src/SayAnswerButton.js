import React from "react";
import { Button } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useHandleSayAnswerButtonClick } from "./presenter";




const SayAnswerButton = ({ answer }) => {
    const handleClick = useHandleSayAnswerButtonClick(answer);

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<RecordVoiceOverIcon />}
            onClick={handleClick}
        >
            Say answer
        </Button>
    );
};

export default React.memo(SayAnswerButton);
