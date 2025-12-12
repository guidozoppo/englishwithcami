import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full p-4 border-b border-gray-300 flex gap-4">
            <Link to="/">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/calendar">Calendar</Link>
        </nav>
    );
}
