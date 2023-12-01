import React from "react";

import { useGlobalContextUser } from "../../../../context/context";

import Synergies from "../synergies/Synergies";

import ValidatedSynergies from "../synergies/validatedUserSyn/validatedSynergies/ValidatedSynergies";

const SynergyToRender = () => {
  const { user } = useGlobalContextUser();
  return (
    <>
      {user?.role === "validated user" ? <ValidatedSynergies /> : <Synergies />}
    </>
  );
};

export default SynergyToRender;
