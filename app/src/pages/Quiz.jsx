import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getQuestionsByDate, getAllQuestions, submitQuiz } from "../api";
import { FiCalendar, FiCheckCircle, FiList, FiArrowLeft } from "react-icons/fi";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [viewAll, setViewAll] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = viewAll
        ? await getAllQuestions()
        : await getQuestionsByDate(selectedDate);

      setQuestions(res.data);
      setAnswers({});
      setSubmitted(false);
      setTotalScore(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedDate, viewAll]);

  const handleOptionChange = (qid, index) => {
    setAnswers((prev) => ({ ...prev, [qid]: index }));
  };

  const handleSubmit = async () => {
    const payload = {
      date: selectedDate,
      answers: questions.map((q) => ({
        questionId: q.questionId,
        selectedIndex: answers[q.questionId] ?? null,
        correct: answers[q.questionId] === q.answerIndex,
        marks: q.marks,
        negativeMark: q.negativeMark,
      })),
    };
    try {
      const res = await submitQuiz(payload);
      setTotalScore(res.data.totalScore);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>{viewAll ? "All Questions" : `Quiz for ${selectedDate}`}</Title>
      </Header>

      <Controls>
        {!viewAll && (
          <DateSelector>
            <FiCalendar />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </DateSelector>
        )}
        <ToggleButton onClick={() => setViewAll((prev) => !prev)}>
          {viewAll ? (
            <>
              <FiArrowLeft /> View Quiz by Date
            </>
          ) : (
            <>
              <FiList /> View All Questions
            </>
          )}
        </ToggleButton>
      </Controls>

      {questions.length === 0 ? (
        <NoQuestions>No questions available.</NoQuestions>
      ) : (
        <QuestionsContainer>
          {questions.map((q, idx) => (
            <QuestionCard key={q.questionId}>
              <QuestionText>
                {idx + 1}. {q.text} <span>({q.marks} points)</span>
              </QuestionText>
              <Options>
                {q.options.map((opt, i) => (
                  <OptionLabel
                    key={i}
                    selected={answers[q.questionId] === i}
                    disabled={submitted || viewAll}
                  >
                    <input
                      type="radio"
                      name={q.questionId}
                      disabled={submitted || viewAll}
                      checked={answers[q.questionId] === i}
                      onChange={() => handleOptionChange(q.questionId, i)}
                    />
                    <span>{opt}</span>
                  </OptionLabel>
                ))}
              </Options>
            </QuestionCard>
          ))}
        </QuestionsContainer>
      )}

      {!viewAll && questions.length > 0 && !submitted && (
        <SubmitButton onClick={handleSubmit}>
          <FiCheckCircle /> Submit Quiz
        </SubmitButton>
      )}

      {submitted && (
        <ScoreCard>
          🎉 <strong>Total Score:</strong> {totalScore}
        </ScoreCard>
      )}
    </Wrapper>
  );
}

//
// ------------------ Styled Components ------------------
//
const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
  color: #1f2937;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 25px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af; /* stronger blue for title */
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #374151; /* darker border for contrast */
  padding: 8px 12px;
  border-radius: 8px;
  background: #f3f4f6; /* slightly darker bg for contrast */

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 1rem;
    color: #111827; /* dark text */
  }

  svg {
    color: #1e40af; /* stronger blue */
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1e40af; /* darker blue */
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #1d4ed8;
  }
`;

const NoQuestions = styled.p`
  text-align: center;
  padding: 30px;
  color: #374151; /* darker gray for better readability */
  font-size: 1.1rem;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuestionCard = styled.div`
  background: #f9fafb; /* slightly darker than white */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #111827;

  span {
    font-size: 0.9rem;
    color: #374151; /* darker secondary text */
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? "#dbeafe" : "#e5e7eb")}; /* more contrast */
  border: 1px solid ${({ selected }) => (selected ? "#1e40af" : "#cbd5e1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s, border 0.2s;

  input {
    accent-color: #1e40af;
  }

  span {
    flex: 1;
    font-size: 1rem;
    color: #111827;
  }

  &:hover {
    background: ${({ disabled }) => (disabled ? "#e5e7eb" : "#bfdbfe")}; /* stronger hover contrast */
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #16a34a; /* green */
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    background: #15803d; /* darker green for contrast */
  }
`;

const ScoreCard = styled.div`
  margin-top: 20px;
  text-align: center;
  background: #d1fae5; /* stronger contrast */
  padding: 15px;
  border: 1px solid #10b981;
  color: #065f46; /* dark green for text */
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
`;

