import { createContext, useContext } from "react";
import useTalent from "../hooks/useTalentReducer";

const talentContext = createContext(null);

export const useTalentContext = () => {
  return useContext(talentContext);
};

const TalentProvider = ({ children }) => {
  const talent = useTalent();
  return (
    <talentContext.Provider value={talent}>{children}</talentContext.Provider>
  );
};

export default TalentProvider;
