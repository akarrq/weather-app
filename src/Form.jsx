import "./Form.css";

const Form = (props) => {
  return props.isInputVisible ? (
    <input
      type="text"
      placeholder="Wpisz miasto"
      value={props.value}
      onChange={props.onChange}
    />
  ) : null;
};

export default Form;
