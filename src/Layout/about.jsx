import React from "react";


const About = () => {
    return(
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to our AI Lab! We are a team of passionate individuals dedicated to exploring the frontiers of artificial intelligence. Our mission is to innovate and create solutions that leverage AI to solve real-world problems.
                </p>
                <p className="text-gray-700 mb-4">
                    Our lab focuses on research and development in various areas of AI, including machine learning, natural language processing, computer vision, and robotics. We collaborate with academic institutions, industry partners, and the open-source community to push the boundaries of what AI can achieve.
                </p>
                <p className="text-gray-700">
                    Join us on this exciting journey as we explore the limitless possibilities of artificial intelligence!
                </p>
            </div>
        </div>
    )
}
export default About;