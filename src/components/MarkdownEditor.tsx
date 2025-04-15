
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { useState, useEffect } from "react";
import { EditorToolbar } from './editor/EditorToolbar';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  autoSave?: boolean;
  onAutoSave?: () => void;
}

export function MarkdownEditor({
  value,
  onChange,
  autoSave = true,
  onAutoSave
}: MarkdownEditorProps) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !editor) return;
    
    const timer = setTimeout(() => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
        setLastSaved(new Date());
        if (onAutoSave) onAutoSave();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [editor, value, onChange, autoSave, onAutoSave]);

  return (
    <div className="space-y-2">
      <EditorToolbar editor={editor} />
      
      <EditorContent 
        editor={editor} 
        className="min-h-[400px] border rounded-b-lg p-4 prose max-w-none"
      />
      
      {lastSaved && (
        <div className="text-xs text-gray-500 text-right">
          Auto-saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
