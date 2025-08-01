import { Icon, ICONS } from "./Icons";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const MobileSidebar = ({ isOpen, onClose }) => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.reload();
    };

    const handleSettingsClick = () => {
        router.push('/settings');
        onClose(); // Close the sidebar after navigation
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            
            {/* Sidebar */}
            <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-xl p-6 transform transition-transform duration-300 ease-in-out">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800">
                    <Icon path={ICONS.close} className="w-6 h-6" />
                </button>
                <nav className="mt-10 flex flex-col space-y-6 text-lg">
                    <button 
                        onClick={handleSettingsClick}
                        className="p-5 flex items-center hover:text-gray-900"
                    >
                        <Icon path={ICONS.settings} className="w-5 h-5 mr-2" />
                        <span>Settings</span>
                    </button>
                    <button 
                        className="p-5 flex items-center cursor-grab" 
                        onClick={handleLogout}
                    >
                        <Icon path={ICONS.user} className=" relative w-5 h-5 mr-1 py-1 px-3.5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default MobileSidebar;