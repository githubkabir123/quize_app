import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createTopic, getSingleTopic, updateTopic } from '../api';
import styled from 'styled-components';
// Container
const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 25px;
  background: #1e1e2f; // dark background for contrast
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  font-family: 'Arial', sans-serif;
  color: #f5f5f5; // light text
`;

// Page heading
const Title = styled.h2`
  color: #ffd700; // golden heading
  margin-bottom: 20px;
  text-align: center;
`;

// Input fields
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border: 1px solid #444; // dark border
  border-radius: 8px;
  font-size: 15px;
  background: #2c2c3c; // dark input background
  color: #f5f5f5; // light text
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

// Checkbox label
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 15px;
  color: #f5f5f5; // light text
  input {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
`;

// Save button
const Button = styled.button`
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #357abd;
  }
`;

// ReactQuill wrapper
const EditorWrapper = styled.div`
  margin-bottom: 20px;
  .ql-toolbar {
    border-radius: 8px 8px 0 0;
    background-color: #2c2c3c; // dark toolbar
    color: #f5f5f5;
  }
  .ql-container {
    height: 250px;
    border-radius: 0 0 8px 8px;
    font-size: 15px;
    background-color: #2c2c3c; // dark editor background
    color: #f5f5f5; // light text
  }
`;


export default function CreateOrEditTopic() {
  const { subjectId, id } = useParams(); // id থাকলে edit mode
  const navigate = useNavigate();

  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (id) {
      // edit mode
      const fetchTopic = async () => {
        const res = await getSingleTopic(id);
        const t = res.data;
        setHeading(t.heading);
        setContent(t.content);
        setTags(t.tags.join(', '));
        setImportant(t.important);
      };
      fetchTopic();
    }
  }, [id]);

  const handleSave = async () => {
    const topicData = {
      subjectId,
      heading,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      important
    };

    if (id) {
      await updateTopic(id, topicData);
    } else {
      await createTopic(topicData);
    }

    navigate(`/topics/${subjectId}`);
  };

  return (
    <Container>
      <Title>{id ? 'Edit Topic' : 'Create Topic'}</Title>

      <Input
        type="text"
        placeholder="Topic Title"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <CheckboxLabel>
        <input
          type="checkbox"
          checked={important}
          onChange={(e) => setImportant(e.target.checked)}
        />
        Mark as Important
      </CheckboxLabel>

      <EditorWrapper>
        <ReactQuill value={content} onChange={setContent} />
      </EditorWrapper>

      <Button onClick={handleSave}>Save Topic</Button>
    </Container>
  );
}
