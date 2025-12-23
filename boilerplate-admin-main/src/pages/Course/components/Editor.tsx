import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';
import Quill, { DeltaStatic } from 'quill';
import 'quill/dist/quill.snow.css';

type EditorProps = {
    value: DeltaStatic;
    onChange: (val: DeltaStatic) => void;
    readOnly?: boolean;
};

const Editor = forwardRef<Quill, EditorProps>(
    ({ value, onChange, readOnly = false }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const quillRef = useRef<Quill | null>(null);

        useImperativeHandle(ref, () => quillRef.current!, []);

        useEffect(() => {
            if (!editorRef.current || quillRef.current) return;

            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                readOnly,
            });

            const handleTextChange = () => {
                onChange(quill.getContents());
            };

            quill.on('text-change', handleTextChange);

            quillRef.current = quill;

            return () => {
                quill.off('text-change', handleTextChange); // ✅ correct
            };
        }, []);


        useEffect(() => {
            if (!quillRef.current) return;

            const current = quillRef.current.getContents();
            if (JSON.stringify(current) !== JSON.stringify(value)) {
                quillRef.current.setContents(value);
            }
        }, [value]);

        return <div ref={editorRef} />;
    }
);

export default Editor;
