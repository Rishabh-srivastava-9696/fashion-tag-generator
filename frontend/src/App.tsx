import React, { useState } from "react";
import "./styles.css"; 

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFile = e.target.files?.[0] || null;
    setFile(chosenFile);
    if (chosenFile) {
      setPreview(URL.createObjectURL(chosenFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="lens-heading">
        <span className="lens-green">L</span>
        <span className="lens-black"> E N S</span>
      </h1>
      <h2 className="subheading">Discover fashion through AI</h2>

     
      <div className="button-section">
        <label className="file-label">
          Choose File
          <input type="file" onChange={handleFileChange} hidden />
        </label>
      </div>

      
      <div className="button-section">
        <button className="upload-btn" onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {preview && (
        <div className="preview">
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" />
        </div>
      )}

      {tags.length > 0 && (
        <ul>
          {tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;