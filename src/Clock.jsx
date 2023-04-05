const Clock = (props) => {
  const days = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const months = [
    "Gru",
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
  ];

  return (
    <>
      <p className="hourDate__hour">
        {props.hour}:{props.minutes < 10 ? "0" + props.minutes : props.minutes}
      </p>
      <p className="hourDate__date">
        {days[props.day]} | {months[props.month]} {props.dayDate}
      </p>
    </>
  );
};

export default Clock;
