import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Picture = ({ photoAlt, photoUrl, photoLink, author }) => (
  <picture>
    <source src={photoUrl} media="(min-width: 600px)" />
    <img className="background" src={photoUrl} alt={photoAlt} />
    <a
      className="background__credits"
      href={photoLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faCamera} /> {author} / Unsplash
    </a>
  </picture>
);

export default Picture;
