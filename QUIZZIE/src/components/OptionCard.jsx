import React from "react";

const style = {
  parentDiv: {
    display: "grid",
  },
};

function OptionCard(
  {
    text,
    imgUrl,
    optionDivClass = "",
    textClass = "",
    imgClass = "",
    imgDivClass = "",
  },
  key = ""
) {
  return (
    <div key={key && key} style={style.parentDiv} className={optionDivClass}>
      {text && <div className={textClass}>{text}</div>}
      {imgUrl && (
        <div className={imgDivClass}>
          {<img src={imgUrl} className={imgClass} />}
        </div>
      )}
    </div>
  );
}

export default OptionCard;
