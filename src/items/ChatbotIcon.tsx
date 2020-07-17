import * as React from 'react';
import { Link } from 'react-router-dom';

type ChatbotIconProps = {
  Image: string;
  Alt: string;
}

function ChatbotIcon({ Image, Alt }: ChatbotIconProps) {
  return (
    <Link to="/" className="nav-link">
      <img src={Image} alt={Alt} />
    </Link>
  );
}

ChatbotIcon.defaultProps = {
  Image: "https://res.cloudinary.com/hoki0713/image/upload/v1591799549/team-mobeom/question_answer-24px_ca4ypd.svg",
  Alt: "챗봇 아이콘"
}

export default ChatbotIcon;