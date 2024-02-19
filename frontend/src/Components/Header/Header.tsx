import NavigationItem from "../UI/NavigationItem/NavigationItem.tsx";

export default function Header() {
    return (
        <header className="py-2">
            <nav className="flex flex-col px-2 space-y-1 items-center md:hidden">
                <div className="text-2xl text-gray-300 p-2">LOGO</div>
                <NavigationItem title="Home" linkTo="/"/>
                <NavigationItem title="User" linkTo="/user"/>
                <NavigationItem title="Bills" linkTo="/bills"/>
                <NavigationItem title="About Us" linkTo="/aboutus"/>
            </nav>
            <nav className="hidden md:w-full md:flex md:flex-row md:justify-between">
                <div className="text-xl text-gray-300 p-2">Logo</div>
                <ul className="flex space-x-1 justify-end">
                    <li className="flex">
                        <NavigationItem title="Home" linkTo="/"/>
                    </li>
                    <li className="flex">
                        <NavigationItem title="User" linkTo="/user"/>
                    </li>
                    <li className="flex">
                        <NavigationItem title="Bills" linkTo="/bills"/>
                    </li>
                    <li className="flex">
                        <NavigationItem title="About Us" linkTo="/aboutus"/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
