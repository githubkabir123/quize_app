import React, { useState } from 'react';
import styled from 'styled-components';
import { uploadQuestions } from '../api';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #f3f4f6; /* slightly darker for contrast */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  font-family: 'Arial', sans-serif;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #1f2937; /* darker text for better contrast */
  margin-bottom: 25px;
  font-size: 2rem;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #cbd5e1; /* darker border for contrast */
  border-radius: 10px;
  background: #e5e7eb; /* slightly darker background for contrast */

  &:hover {
    background: #dbeafe; /* hover background more distinct */
    border-color: #2563eb; /* stronger blue border */
  }

  h4 {
    margin-bottom: 10px;
    color: #111827; /* darker heading for better readability */
  }
`;

const FileInput = styled.input`
  padding: 8px;
  border: 1px solid #9ca3af; /* darker border */
  border-radius: 6px;
  background: #f9fafb; /* light gray instead of pure white */
  cursor: pointer;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #9ca3af; /* darker border */
  font-size: 1rem;
  background: #f3f4f6; /* slightly darker background */
  resize: vertical;
  transition: 0.3s ease;
  color: #111827; /* darker text */

  &:focus {
    border-color: #2563eb; /* stronger blue border */
    background: #ffffff; /* white on focus for clarity */
    outline: none;
  }
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 10px;
  background: #2563eb; /* stronger blue */
  color: #ffffff; /* ensure white text */
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #1d4ed8; /* darker blue for hover */
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${({ success }) => (success ? '#15803d' : '#b91c1c')}; /* green/red with contrast */
  font-weight: 500;
  margin-top: 15px;
`;


export default function UploadQuestions() {
  const [jsonData, setJsonData] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle file selection
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        await uploadQuestions(data);
        setMessage('Questions uploaded successfully via file!');
        setSuccess(true);
        setJsonData('');
      } catch (err) {
        setMessage('Upload failed: Invalid JSON file or server error');
        setSuccess(false);
      }
    };
    reader.readAsText(file);
  };

  // Handle textarea JSON
  const handleUpload = async () => {
    try {
      const data = JSON.parse(jsonData);
      await uploadQuestions(data);
      setMessage('Questions uploaded successfully via textarea!');
      setSuccess(true);
      setJsonData('');
    } catch (err) {
      setMessage('Upload failed: Invalid JSON or server error');
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Title>Upload Questions</Title>

      {/* File Upload Section */}
      <Section>
        <h4>Option 1: Upload JSON File</h4>
        <FileInput type="file" accept=".json" onChange={handleFileUpload} />
      </Section>

      {/* Textarea Upload Section */}
      <Section>
        <h4>Option 2: Paste JSON in Textarea</h4>
        <TextArea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          rows={10}
          placeholder='Paste your JSON here...'
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Section>

      {/* Message */}
      {message && <Message success={success}>{message}</Message>}
    </Container>
  );
}
