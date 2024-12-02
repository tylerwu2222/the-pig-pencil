import * as d3 from "d3";
import { createContext, useEffect, useState } from "react";
import SVG1 from "./visuals/svg1";
export const SurvivingAnNBADraftContext = createContext({});
const SurvivingAnNBADraft = () => {
    return (
        <SurvivingAnNBADraftContext.Provider
            value={{
            }}>
            <div className='container-narrow'>
            </div>
        </SurvivingAnNBADraftContext.Provider>
    )
}
export default SurvivingAnNBADraft;