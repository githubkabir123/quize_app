import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDashboard } from "../api";

export default function Dashboard() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setAttempts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (attempts.length === 0) {
    return (
      <Container>
        <EmptyMessage>No attempts yet.</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>📊 My Quiz Dashboard</Header>
      <AttemptsGrid>
        {attempts.map((att, idx) => (
          <AttemptCard key={idx}>
            <CardHeader>
              <Date>{new Date(att.date).toLocaleDateString()}</Date>
            </CardHeader>
            <CardBody>
              <Stat>
                <strong>Total Score:</strong> {att.totalScore}
              </Stat>
              <Stat>
                <strong>Questions Attempted:</strong> {att.answers.length}
              </Stat>
              <Stat>
                <Correct>
                  <strong>Correct:</strong> {att.answers.filter((a) => a.correct).length}
                </Correct>
              </Stat>
              <Stat>
                <Wrong>
                  <strong>Wrong:</strong> {att.answers.filter((a) => !a.correct).length}
                </Wrong>
              </Stat>
            </CardBody>
          </AttemptCard>
        ))}
      </AttemptsGrid>
    </Container>
  );
}

//
// Styled Components
//
const Container = styled.div`
  min-height: 100vh;
  background: #f4f7fc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const AttemptsGrid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  padding: 0 10px;
`;

const AttemptCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out;
  padding: 20px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 12px;
`;

const Date = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #2575fc;
  margin: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stat = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #444;
`;

const Correct = styled.span`
  color: #28a745;
  font-weight: 600;
`;

const Wrong = styled.span`
  color: #e63946;
  font-weight: 600;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  background: #fff;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

