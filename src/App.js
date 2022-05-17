import React, { useState } from 'react';

const App = () => {
    const [buttonColor, setButtonColor] = useState('red');
    const newColor = buttonColor === 'red' ? 'blue' : 'red';
    const [isDisabled, setIsDisabled] = useState(false)
    return (
        <>
            <button
                style={{ backgroundColor: isDisabled ? 'gray' : buttonColor }}
                disabled={isDisabled}
                onClick={() => setButtonColor(newColor)}
            >
                Change to {newColor}
            </button>
            <label htmlFor='disableBtn'>Disable button</label>
            <input
                type="checkbox"
                id="disableBtn"
                onChange={() => setIsDisabled(!isDisabled)}
            />
        </>
    );
}

export default App;