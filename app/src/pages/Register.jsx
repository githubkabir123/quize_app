import React, { useState } from "react";
import styled from "styled-components";
import { registerUser } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ username, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Registration successful!");
      window.location.href = "/quiz";
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Create an Account</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Register</SubmitButton>
        </StyledForm>
        {message && <Message>{message}</Message>}
        <LoginLink>
          Already have an account? <a href="/login">Login here</a>
        </LoginLink>
      </FormWrapper>
    </Container>
  );
}

//
// Styled Components
//
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #fff;
  width: 100%;
  max-width: 400px;
  padding: 30px 25px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #2575fc;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background: #2575fc;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #1b5edb;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
  color: ${(props) => (props.error ? "#e63946" : "#28a745")};
`;

const LoginLink = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #2575fc;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
