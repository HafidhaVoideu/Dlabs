import React from "react";

import { useGlobalContextUser } from "../../../../context/context";

import Synergies from "../synergies/Synergies";

import ValidatedSynergies from "../synergies/validatedUserSyn/validatedSynergies/ValidatedSynergies";

const SynergyToRender = () => {
  const { user } = useGlobalContextUser();
  return (
    <>{user.role === "validUser" ? <ValidatedSynergies /> : <Synergies />}</>
  );
};

export default SynergyToRender;
