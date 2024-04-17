import style from "./AboutPage.module.css";

import mirko from "../assets/Mirko.png";
import kivanc from "../assets/Kivanc.png";
const TeamMember = ({ name, role, github, linkedin, imageUrl }) => (
  <div className="team-member">
    <div className="member-info">
      <h3>{name}</h3>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>
        <a href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        |{" "}
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </p>
    </div>
    <div className="member-image">
      <img src={imageUrl} alt="Team member photo" />
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        We are a team of developers who love to code. Ironhack is our bootcamp.
        We are based in Germany. We hope to see you in other projects.
      </p>

      <h2>Our Team</h2>
      <div className="team-members">
        <TeamMember
          name="Mirko Schaefer"
          role="Developer"
          github="https://github.com/codewithmirko"
          linkedin="https://www.linkedin.com/in/mirkoschaefer"
          imageUrl={mirko} // Add image URL for Mirko
        />
        <TeamMember
          name="Kivanc Keskinbora"
          role="Developer"
          github="https://github.com/kingblocks"
          linkedin="https://linkedin.com/in/kivanckeskinbora"
          imageUrl={kivanc} // Add image URL for Kivanc
        />
      </div>
    </div>
  );
};

export default AboutPage;
