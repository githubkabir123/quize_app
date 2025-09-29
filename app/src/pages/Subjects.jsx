import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createSubject, getSubjects } from '../api';

// Container
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #1e1e2f; /* dark background for contrast */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
  color: #f5f5f5; /* light text for readability */
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`;

// Page Title
const Title = styled.h2`
  text-align: center;
  color: #ffd700; /* golden for strong contrast */
  margin-bottom: 25px;
  font-size: 2rem;
`;

// Form wrapper
const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// Input fields
const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #555; /* slightly lighter for dark background */
  border-radius: 8px;
  font-size: 1rem;
  background: #2c2c3c; /* darker input background */
  color: #f5f5f5; /* light text */
  transition: 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    background: #3a3a4f;
    outline: none;
  }
`;

// Button
const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #357abd;
  }
`;

// Subject List
const SubjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

// Individual Subject Item
const SubjectItem = styled.li`
  background: #2c2c3c; /* darker card for contrast */
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #444;
  transition: 0.3s ease;

  &:hover {
    background: #3a3a4f;
    border-color: #4a90e2;
  }
`;

// View link
const ViewLink = styled.a`
  color: #ffd700; /* golden link for visibility */
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    color: #4a90e2;
    text-decoration: underline;
  }
`;


export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');

  const fetchSubjects = async () => {
    const res = await getSubjects();
    setSubjects(res.data);
  };

  const handleAdd = async () => {
    if (!newSubject.trim()) return;
    await createSubject({ name: newSubject });
    setNewSubject('');
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <Container>
      <Title>My Subjects</Title>
      
      {/* Input and Add Button */}
      <Form>
        <Input
          type="text"
          value={newSubject}
          placeholder="Enter new subject"
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <Button onClick={handleAdd}>Add Subject</Button>
      </Form>

      {/* Subjects List */}
      <SubjectList>
        {subjects.map((sub) => (
          <SubjectItem key={sub._id}>
            <span>{sub.name}</span>
            <ViewLink href={`/topics/${sub._id}`}>View Topics</ViewLink>
          </SubjectItem>
        ))}
      </SubjectList>
    </Container>
  );
}
