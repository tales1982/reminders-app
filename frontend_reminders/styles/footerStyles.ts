import styled from "styled-components";

export const Containe = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;

  color:rgb(95, 94, 94);
  h1{
    font-size: 18px;
    text-align: center;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  a {
    font-size: 24px;
    color:  #333;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
      color: black;
    }
  }
`;