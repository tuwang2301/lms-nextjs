import Logo from "./Logo";

const Footer = () => {
    return (
        <footer className="rounded-lg shadow bg-color-bg m-4 bottom-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Logo />
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">Home</a>
                        </li>
                        <li>
                            <a href="#trending_course" className="mr-4 hover:underline md:mr-6">Course</a>
                        </li>
                        <li>
                            <a href="#about" className="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/tuwang2301" class="hover:underline">Nguyen Quang Tu</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;