'use client';

import { useState, useEffect } from 'react';
import { SeededButton } from '@/components/seeded';

interface ResearchFile {
  filename: string;
  size: number;
  lastModified: string;
}

export default function ResearchPage() {
  const [files, setFiles] = useState<ResearchFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/research/list');
      if (!res.ok) throw new Error('Failed to fetch files');
      const data = await res.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
      setMessage({ type: 'error', text: 'Failed to load research files' });
    } finally {
      setLoading(false);
    }
  };

  const fetchFile = async (filename: string) => {
    try {
      const res = await fetch(`/api/research/read?file=${encodeURIComponent(filename)}`);
      if (!res.ok) throw new Error('Failed to fetch file');
      const data = await res.json();
      setContent(data.content);
      setEditContent(data.content);
      setSelectedFile(filename);
      setIsEditing(false);
    } catch (error) {
      console.error('Error fetching file:', error);
      setMessage({ type: 'error', text: 'Failed to load file content' });
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/research/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: selectedFile,
          content: editContent,
        }),
      });
      
      if (!res.ok) throw new Error('Failed to save file');
      
      setMessage({ type: 'success', text: 'File saved successfully' });
      setContent(editContent);
      setIsEditing(false);
      fetchFiles();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving file:', error);
      setMessage({ type: 'error', text: 'Failed to save file' });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNew = async () => {
    const filename = prompt('Enter filename (without .md extension):');
    if (!filename) return;
    
    try {
      const res = await fetch('/api/research/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: filename,
          content: `# ${filename}\n\nWrite your content here...`,
        }),
      });
      
      if (!res.ok) throw new Error('Failed to create file');
      
      setMessage({ type: 'success', text: 'File created successfully' });
      fetchFiles();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error creating file:', error);
      setMessage({ type: 'error', text: 'Failed to create file' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6" data-testid="research-title">
        Research Files
      </h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {message.text}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Files List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900" data-testid="research-files-title">
                Files
              </h2>
              <SeededButton
                seedPage="settings"
                size="sm"
                onClick={handleCreateNew}
                data-testid="research-create-btn"
              >
                New
              </SeededButton>
            </div>
            <div className="space-y-2">
              {files.map(file => (
                <div
                  key={file.filename}
                  onClick={() => fetchFile(file.filename)}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedFile === file.filename ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  data-testid={`research-file-${file.filename.replace('.md', '')}`}
                >
                  <div className="font-medium text-gray-900">{file.filename}</div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB • {new Date(file.lastModified).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* File Content */}
        <div className="lg:col-span-2">
          {selectedFile ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900" data-testid="research-content-title">
                  {selectedFile}
                </h2>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <SeededButton
                        seedPage="settings"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false);
                          setEditContent(content);
                        }}
                        data-testid="research-cancel-edit"
                      >
                        Cancel
                      </SeededButton>
                      <SeededButton
                        seedPage="settings"
                        size="sm"
                        onClick={handleSave}
                        disabled={saving}
                        data-testid="research-save"
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </SeededButton>
                    </>
                  ) : (
                    <SeededButton
                      seedPage="settings"
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      data-testid="research-edit"
                    >
                      Edit
                    </SeededButton>
                  )}
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="research-edit-content"
                />
              ) : (
                <div
                  className="prose max-w-none"
                  data-testid="research-content"
                >
                  <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans">
                    {content}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500" data-testid="research-select-prompt">
                Select a file to view its content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
