import {NavLink} from "react-router-dom";
import React from "react";

type navItem = {
    linkTo: string;
    title: string;
}

const NavigationItem: React.FC<navItem> = ({linkTo, title}) => {
    return (<NavLink
        to={linkTo}
        className={({isActive}) =>
            isActive
                ? "w-full flex justify-center bg-gray-200 rounded-sm p-3 text-gray-900 transition-all duration-300"
                : "w-full flex justify-center text-gray-400 rounded-sm p-3 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
        }
    >
        {title}
    </NavLink>);
}

export default NavigationItem;