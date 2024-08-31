import React from "react";

function Input({ id = "", type = "text", className = "", ...props }, ref) {
  return (
    <input type={type} className={className} {...props} id={id} ref={ref && ref} />
  );
}

export default React.forwardRef(Input);
