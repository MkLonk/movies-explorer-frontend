import './Tooltip.css'

function Tooltip(props) {
  if (props.isVisible) {
    return (
      <div className="tooltip">
        <p className="tooltip__text">{props.message}</p>
      </div>
    )
  }

  return null;
};

export default Tooltip