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
      Photo by: {author} / Unsplash
    </a>
  </picture>
);

export default Picture;
