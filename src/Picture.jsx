const Picture = (props) => (
  <picture>
    <source
      src={props.photo.results[0].urls.regular}
      media="(min-width: 600px)"
    />
    <img className="background" src={props.photo.results[0].urls.regular} />
  </picture>
);

export default Picture;
