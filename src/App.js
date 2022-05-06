import React, { useState } from 'react';

const App = () => {
    const [buttonColor, setButtonColor] = useState('red');
    const newColor = buttonColor === 'red' ? 'blue' : 'red'
    return (
        <>
            <button
                style={{ backgroundColor: buttonColor }}
                onClick={() => setButtonColor(newColor)}
            >
                Change to {newColor}
            </button>
        </>
    );
}

export default App;