import React from "react";
import { ColorModeContext } from "../src/components/menu/componenets/ColorMode";

export default function Video() {
    const context = React.useContext(ColorModeContext);
    return (
        <div>
            Video!
            {context.mode}
            <button onClick={() => context.toggleMode()}>
                Trocar modo
            </button>
        </div>
    )
}