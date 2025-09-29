import React, { useState } from "react";
import styled from "styled-components";
import { loginUser } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful!");
      window.location.href = "/quiz";
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Welcome Back 👋</Title>
        <Subtitle>Please log in to continue</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email Address"
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
          <Button type="submit">Login</Button>
        </Form>
        {message && <Message>{message}</Message>}
      </LoginCard>
    </Container>
  );
}

//
// Styled Components
//
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-align: center;

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: #333;
`;

const Subtitle = styled.p`
  color: #777;
  margin-bottom: 24px;
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: 0.3s;
  outline: none;

  &:focus {
    border-color: #6a11cb;
    box-shadow: 0 0 5px rgba(106, 17, 203, 0.4);
  }
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: linear-gradient(135deg, #5a0db8 0%, #1f64e0 100%);
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: #ff4b5c;
  font-size: 0.9rem;
  font-weight: 500;
`;

