
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';

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
  const [content, setContent] = useState(value);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Handle changes and trigger onChange
  const handleChange = (val: string | undefined) => {
    const newContent = val || "";
    setContent(newContent);
    onChange(newContent);
  };

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave) return;
    
    const timer = setTimeout(() => {
      if (content !== value) {
        onChange(content);
        setLastSaved(new Date());
        if (onAutoSave) onAutoSave();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [content, value, onChange, autoSave, onAutoSave]);

  return (
    <div data-color-mode="light" className="space-y-2">
      <MDEditor
        value={content}
        onChange={handleChange}
        height={400}
        preview="edit"
      />
      {lastSaved && (
        <div className="text-xs text-gray-500 text-right">
          Auto-saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
