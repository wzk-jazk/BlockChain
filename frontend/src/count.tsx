import React, { useState } from "react";

interface InputValue {
    id: number;
    value: string;
}

const InputBox: React.FC<{ onValueChange: (value: number | null) => void }> = ({ onValueChange }) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [number, setNumber] = useState<number | null>(null);

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleConfirmClick = () => {
        const parsedNumber = parseInt(inputValue, 10);
        if (parsedNumber > 0) {
            setNumber(parsedNumber);
            onValueChange(parsedNumber);
        } else {
            onValueChange(null);
        }
        setShowInput(false);
        setInputValue("");
    };

    return (
        <div>
            {!showInput && (
                <button style={{width:'100px',height:'30px'}} onClick={handleButtonClick}>借用</button>
            )}

            {showInput && (
                <div>
                    <input type="text" pattern="[0-9]*" value={inputValue} onChange={handleInputChange} />天（每天100积分）
                    <div></div>
                    <button style={{width:'100px',height:'30px'}} onClick={handleConfirmClick}>确认</button>
                </div>
            )}
        </div>
    );
};
export default InputBox;