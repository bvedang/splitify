import {NavLink} from "react-router-dom";
import React from "react";

type navItem={
    linkTo:string;
    title:string;
}

const NavigationItem:React.FC<navItem> = ({linkTo, title})=>{
    return (<NavLink
        to={linkTo}
        className={({ isActive }) =>
            isActive
                ? "bg-gray-200 rounded px-2 py-1 text-gray-900 transition-all duration-300"
                : "text-gray-400 rounded px-2 py-1 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
        }
    >
        {title}
    </NavLink>);
}

export default NavigationItem;