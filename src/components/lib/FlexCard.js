import SpriteImg from "./SpriteImg";
import React from "react";

export default props =>
    <div className={"flex flex-wrap rounded-3xl shadow-inner-lg mb-2 " + (props.className ?? "bg-gray-800")}>
        {props.children}
    </div>
