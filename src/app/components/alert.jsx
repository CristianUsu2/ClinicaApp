import sweetalert from "sweetalert2";

export const AlertSuccess = (textProps ) => {
   sweetalert.fire({
    title: "Operacion exitosa",
    icon: "success",
    text: textProps,
  });
};

export const AlertError = ( textProps ) => {
    sweetalert.fire({
      title: "...Ops",
      icon: "error",
      text: textProps,
    });
  };

