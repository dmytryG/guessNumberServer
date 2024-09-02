import * as Yup from "yup";

const guess = Yup.object().shape({
  number: Yup.number().required().min(0).max(50)
});


export const guessNumberSchema = {
  guess,
};
