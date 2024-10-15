import { Link } from "react-router-dom";
import homeBg from './home_bg.jpg'; // Adjust the path based on your actual file structure

export default function Welcome_banner() {
    return (
        <div className="bg-cover bg-center" style={{ backgroundImage: `url(${homeBg})` }}>
            {/* Content container */}
            <div className="relative flex flex-col items-center justify-center py-32 gap-3">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-black ring-1 ring-gray-400 hover:ring-blue-600">
                        Join CareNet for comprehensive health management{' '}
                        <Link to="/services" className="font-semibold text-blue-500">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Explore Services <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                <div className="text-6xl text-black font-medium mb-4">Welcome to CareNet</div>
                <p className="text-lg md:text-xl max-w-3xl text-black text-center mb-6">
                    Your trusted health companion, providing personalized care, seamless consultations, and easy access to your medical records, all in one place.
                </p>

                <div className="flex items-center justify-center gap-x-6">
                    <button className="ring-1 ring-blue-500 text-black px-8 py-1 rounded-full font-semibold text-lg transition duration-300 hover:bg-blue-500">
                        View Dashboard
                    </button>
                    <button className="bg-black text-white px-8 py-1 rounded-full font-semibold text-lg transition duration-300 hover:bg-blue-500">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
