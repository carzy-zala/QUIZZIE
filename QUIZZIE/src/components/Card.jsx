import React from "react";



function Card(
  {
    leftText,
    rightText = "",
    bottomText = "",
    parentClassName = "",
    leftTextClassName = "",
    rightTextClassName = "",
    bottomTextClassName = "",
    firstRowGrid = "",
    eyeIcon = "",
    firstRowSet = true,
    parentDivSet = true,
  },
  key = ""
) {
  return (
    <div
      key={key && key}
      style={{
        display: "grid",
        gridTemplateRows: parentDivSet && "auto auto",
      }}
      className={parentClassName}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: firstRowSet && "auto auto",
        }}
        className={firstRowGrid}
      >
        <div  className={leftTextClassName}>
          {leftText}
        </div>
        {rightText !== "" && (
          <div  className={rightTextClassName}>
            {rightText}
            {eyeIcon && eyeIcon}
          </div>
        )}
      </div>
      {bottomText && (
        <div  className={bottomTextClassName}>
          {bottomText}
        </div>
      )}
    </div>
  );
}

export default Card;
