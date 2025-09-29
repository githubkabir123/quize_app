import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicsBySubject } from '../api';
import styled from 'styled-components';

// Container for the whole page
const Container = styled.div`
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  background: #1e1e2f; /* dark background for contrast */
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
  color: #f5f5f5; /* light text for overall readability */
`;

// Page title
const Title = styled.h2`
  color: #ffd700; /* golden heading for contrast */
  margin-bottom: 20px;
  text-align: center;
`;

// Add Topic button
const AddButton = styled(Link)`
  display: inline-block;
  background-color: #4a90e2;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

// Topics list
const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 25px;
`;

// Individual topic card
const TopicItem = styled.li`
  background: #2c2c3c; /* darker card for contrast with container */
  padding: 18px 22px;
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 5px solid ${props => (props.important ? '#e74c3c' : '#4a90e2')};
  transition: 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  color: #f5f5f5; /* light text on dark card */

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  }
`;

// Topic heading link
const TopicHeading = styled(Link)`
  font-size: 18px;
  color: #ffd700; /* golden heading for contrast */
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: #4a90e2;
    text-decoration: underline;
  }
`;

// Info row (tags, date)
const TopicInfo = styled.div`
  font-size: 13px;
  color: #ccc; /* lighter gray for readability on dark card */
  margin-top: 6px;
`;

// Important badge
const ImportantBadge = styled.span`
  color: #e74c3c;
  font-weight: bold;
  margin-left: 12px;
`;


export default function Topics() {
  const { subjectId } = useParams();
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const res = await getTopicsBySubject(subjectId);
    setTopics(res.data);
  };

  useEffect(() => {
    fetchTopics();
  }, [subjectId]);

  return (
    <Container>
      <Title>Topics</Title>
      <AddButton to={`/topics/${subjectId}/create`}>+ Add Topic</AddButton>

      <TopicList>
        {topics.map(topic => (
          <TopicItem key={topic._id} important={topic.important}>
            <TopicHeading to={`/topic/${topic._id}`}>{topic.heading}</TopicHeading>
            {topic.important && <ImportantBadge>[Important]</ImportantBadge>}
            <TopicInfo>
              Tags: {topic.tags.join(', ')} | Created: {new Date(topic.createdAt).toLocaleString()}
            </TopicInfo>
          </TopicItem>
        ))}
      </TopicList>
    </Container>
  );
}
