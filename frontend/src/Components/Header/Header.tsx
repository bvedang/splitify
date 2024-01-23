import NavigationItem from "../UI/NavigationItem/NavigationItem.tsx";

export default function Header() {
    return (
        <header
            className="w-full flex flex-col p-4 bg-gray-900 text-gray-100 justify-center items-center md:flex-row md:justify-between md:items-center">
            <div className="text-xl md:mb-0 p-2">Logo</div>
            <nav>
                <ul className="flex flex-col md:flex-row md:space-x-4 items-center w-full">
                    <li className="mb-2 md:mb-0">
                        <NavigationItem title="Home" linkTo="/"/>
                    </li>
                    <li className="mb-2 md:mb-0">
                        <NavigationItem title="User" linkTo="/user"/>
                    </li>
                    <li className="mb-2 md:mb-0">
                        <NavigationItem title="Bills" linkTo="/bills"/>
                    </li>
                    <li>
                        <NavigationItem title="About Us" linkTo="/aboutus"/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
