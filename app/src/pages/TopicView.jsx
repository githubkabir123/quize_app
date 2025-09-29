import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleTopic } from '../api';
import styled from 'styled-components';

// Container with contrasting background
const Container = styled.div`
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  background-color: #1e1e2f; // dark background
  color: #f5f5f5; // light text for contrast
  border-radius: 12px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
`;

// Topic heading
const Heading = styled.h1`
  color: #ffd700; // golden heading for emphasis
  margin-bottom: 10px;
`;

// Metadata (created / updated dates)
const Meta = styled.div`
  font-size: 13px;
  color: #a0a0a0;
  margin-bottom: 20px;
`;

// Content area
const Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #e0e0e0;

  p {
    margin-bottom: 12px;
  }
`;

// Edit button
const EditButton = styled(Link)`
  display: inline-block;
  margin-top: 25px;
  padding: 10px 18px;
  background-color: #4a90e2;
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s ease;
  &:hover {
    background-color: #357abd;
  }
`;

export default function TopicView() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await getSingleTopic(id);
        setTopic(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopic();
  }, [id]);

  if (!topic) return <Container>Loading...</Container>;

  return (
    <Container>
      <Heading>{topic.heading}</Heading>
      <Meta>
        Created: {new Date(topic.createdAt).toLocaleString()} | Updated: {new Date(topic.updatedAt).toLocaleString()}
      </Meta>
      <Content dangerouslySetInnerHTML={{ __html: topic.content }} />
      <EditButton to={`/topics/${topic.subjectId}/edit/${topic._id}`}>
        Edit Topic
      </EditButton>
    </Container>
  );
}
