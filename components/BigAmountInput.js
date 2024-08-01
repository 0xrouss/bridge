import { useEffect, useState } from "react";

const BigAmountInput = ({ inputValue, setInputValue }) => {
    const [fontSize, setFontSize] = useState("4rem");

    useEffect(() => {
        // Adjust font size based on input length
        const length = inputValue.length;
        if (length > 11) {
            setFontSize("1.5rem");
        } else if (length > 7) {
            setFontSize("2rem");
        } else if (length > 5) {
            setFontSize("3rem");
        } else {
            setFontSize("4rem");
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if ((!isNaN(value) || value === "") && value.length <= 10) {
            setInputValue(value);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="0"
                type="text"
                style={{ fontSize, transition: "font-size 0.3s ease-in-out" }}
                className={`h-16 w-3/4 outline-none custom-input text-center font-bold bg-transparent`}
            />
        </div>
    );
};

export default BigAmountInput;
