import { useReducer } from "react";

const savedTalents =
  JSON.parse(localStorage.getItem("savedTalents") || "[]") || [];

const initialState = {
  talents: savedTalents,
};

const ACTIONS = {
  SAVE_JOB: "addToSaved",
  UN_SAVE_JOB: "removeFromSaved",
};

const Reduce = (state, action) => {
  switch (action.type) {
    case ACTIONS.SAVE_JOB:
      return {
        ...state,
        talents: [...state.talents, action.payload],
      };
    case ACTIONS.UN_SAVE_JOB:
      return {
        ...state,
        talents: state.talents.filter(
          (talent) => talent.email !== action.payload
        ),
      };

    default:
      return state;
  }
};

const useTalent = () => {
  const [state, dispatch] = useReducer(Reduce, initialState);

  const addToSaved = (talent) =>
    dispatch({ type: ACTIONS.SAVE_JOB, payload: talent });
  const removeFromSaved = (email) =>
    dispatch({ type: ACTIONS.UN_SAVE_JOB, payload: email });

  return {
    state,
    addToSaved,
    removeFromSaved,
  };
};

export default useTalent;
