import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextAreaInput({ type = 'text', className = '', isFocused = false, children, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (

        <textarea
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >{children}</textarea>

    );
});
