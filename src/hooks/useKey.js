import React from 'react'

export default function useKey({ callback, keyCode }) {
  React.useEffect(() => {
    console.log("render key")
    function handleKeyDown(event) {
      if (event.code === keyCode) {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, keyCode])
}