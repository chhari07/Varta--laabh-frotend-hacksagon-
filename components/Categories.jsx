// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: #ffffff;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 20px;

  /* Hide scrollbar for WebKit-based browsers (Chrome, Safari, Opera) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for Internet Explorer and Edge */
  -ms-overflow-style: none;
`;

const Card = styled.div`
  scroll-snap-align: start;
  position: relative;
  min-width: 580px;
  height: 320px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #eee;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    min-width: 300px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CardContent = styled.div`
  position: absolute;
  padding: 16px;
  z-index: 10;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const CategoryTag = styled.a`
  background: #0c1b33;
  color: white;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
  align-self: flex-start;
  text-decoration: none;

  &:hover {
    background: #0c1b33;
    color: white;
  }
`;

const NewsTitle = styled.a`
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.3;

  &:hover {
    text-decoration: underline;
  }
`;

const accordionData = [
  {
    image: "https://i.pinimg.com/736x/3c/0e/04/3c0e04ae8fda1cbfc758fc755e6c5932.jpg",
    title: "Simple Blog",
    description: "   लोक विमर्श  साहित्य – Write, reflect, provoke civic thought "
  },
  {
    image: "https://i.pinimg.com/736x/40/37/87/4037879abe8061f4e9a73098121a66f7.jpg",
    title: "Wall of the Protest",
    description: " जन आंदोलन – Protest logs and civic storytelling "
  },
  {
    image: "https://sreenivasaraos.com/wp-content/uploads/2016/04/discussions.jpg",
    title: "Debate",
    description: " शास्त्रार्थ संस्कृति – Structured Pro/Con civic debates "
  },
  {
    image: "https://i.pinimg.com/736x/3f/f2/b1/3ff2b1669752b32066ab90d32d68b672.jpg",
    title: "Just Ask",
    description: " सभ्यता और संवाद – Ask questions, seek social clarity "
  },
  {
    image: "https://i.pinimg.com/736x/68/e8/7f/68e87fd6b18cc92bcaa347e7c60ab72c.jpg",
    title: "Mythbusters",
    description: " ज्ञान परंपरा – Bust myths with evidence & logic )"
  },
{
  image: "https://i.pinimg.com/736x/ef/19/ba/ef19bae81bd2178fe530b4a9ca65c3b4.jpg",
  title: "Cultural Trail",
  description: "An immersive journey through India’s vibrant cultural heritage and diverse traditions."
}
,
  {
    image: "https://i.pinimg.com/736x/98/ea/58/98ea58ff5ca8495f75c76e9028ea0aae.jpg",
    title: "Lok Manthan",
    description: " लोक मंथन – Risk-taking civic dialogue "
  },

  {
    image: "https://i.pinimg.com/736x/4d/5b/08/4d5b083670a237b27e254cccd4133fa2.jpg",
    title: "People's Draft",
    description: " धर्म, नीति, न्याय – Citizen-drafted laws & ideas "
  },
  {
    image: "https://i.pinimg.com/736x/55/b1/02/55b102159c1c96ad2d5bf7c5836916ef.jpg",
    title: "Project Management Tool",
    description: " कर्म योग / कार्य संकल्प – Manage civic initiatives "
  },

];


const Category = () => {
  return (
    <GridContainer>
      {accordionData.map((item, index) => (
        <Card key={index} style={{ backgroundImage: `url(${item.image})` }}>
          <Overlay />
          <CardContent>
            <CategoryTag href="#">{item.title}</CategoryTag>
            <NewsTitle href="#">{item.description}</NewsTitle>
          </CardContent>
        </Card>
      ))}
    </GridContainer>
  );
};

export default Category;
