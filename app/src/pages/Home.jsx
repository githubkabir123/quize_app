import React from "react";
import styled from "styled-components";
import { FiBookOpen, FiPlayCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <HomeWrapper>
      <HeroSection>
        <HeroImage>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3079/3079785.png"
            alt="Quiz Illustration"
          />
        </HeroImage>
        <HeroContent>
          <HeroTitle>Welcome to Quiz App</HeroTitle>
          <HeroSubtitle>
            Prepare for your admission test with thousands of practice questions,  
            track your progress, and improve your performance every day.
          </HeroSubtitle>
          <ButtonGroup>
            <StyledLink to="/quiz">
              <FiPlayCircle size={20} /> Start Quiz
            </StyledLink>
            <SecondaryLink to="/register">
              <FiBookOpen size={20} /> Join Now
            </SecondaryLink>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>
      <FeaturesSection>
        <FeatureCard>
          <FiBookOpen size={36} />
          <h3>Practice Questions</h3>
          <p>Access a large collection of questions for practice.</p>
        </FeatureCard>
        <FeatureCard>
          <FiPlayCircle size={36} />
          <h3>Real-Time Quiz</h3>
          <p>Take quizzes and get instant feedback on your answers.</p>
        </FeatureCard>
        <FeatureCard>
          <FiBookOpen size={36} />
          <h3>Progress Tracking</h3>
          <p>Analyze your performance and identify areas of improvement.</p>
        </FeatureCard>
      </FeaturesSection>
    </HomeWrapper>
  );
};

export default Home;

//
// ------------------ Styled Components ------------------
//

const HomeWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  color: #1f2937; /* keep readable dark text */

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 50px 1rem;
  background: #1e40af; /* strong contrasting background */
  border-radius: 12px;
  color: #f3f4f6; /* light text for contrast */

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    padding: 30px 1rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #facc15; /* bright gold for attention */
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: #f3f4f6; /* light text on dark background */
  margin-bottom: 25px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fbbf24; /* bright gold button */
  color: #1f2937; /* dark text */
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background: #f59e0b;
    transform: translateY(-2px);
  }
`;

const SecondaryLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6; /* light gray background */
  color: #1f2937; /* dark text for contrast */
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background: #e5e7eb; /* slightly darker on hover */
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 350px;
    width: 100%;
    height: auto;
    animation: float 3s ease-in-out infinite;

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 50px;
`;

const FeatureCard = styled.div`
  background: #1f2937; /* dark card background for contrast */
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;

  h3 {
    margin: 10px 0;
    font-size: 1.2rem;
    color: #fbbf24; /* gold heading for contrast */
  }

  p {
    color: #f3f4f6; /* light gray text */
    font-size: 0.95rem;
    line-height: 1.4;
  }

  svg {
    color: #4f46e5; /* violet icon for differentiation */
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

