import { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue } from 'react';

export default function UseEmojis (initialState) {
    const [ emojis, setEmojis ] = useState(initialState);

    useEffect (() => {
        const emojis = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥥', '🥝'];
        setEmojis(emojis);
    }, []);
    return [emojis, setEmojis];
}
