import React from "react";

function About() {
    return (
        <div>

            <div className="hero-section bg-gradient-to-r from-green-400 to-blue-500 text-white text-center py-16">
                <h1 className="text-5xl font-bold mb-4">About Our Platform</h1>
                <p className="text-xl mb-6 max-w-3xl mx-auto">
                    Empowering students through collaborative learning and expert guidance. We help you achieve academic excellence.
                </p>
            </div>


            <div className="platform-overview py-12 bg-white">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-8">Why We Built This Platform</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Our mission is to bridge the gap between students and educators, helping students get quick and accurate academic answers and creating a community of learners.
                    </p>
                    <p className="text-lg text-gray-700">
                        We aim to provide students with a seamless learning experience, where they can access academic solutions, collaborate with peers, and connect with experts, all in one platform.
                    </p>
                </div>
            </div>


            <div className="journey-section bg-gray-100 py-12">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
                    <div className="journey-timeline">
                        <div className="timeline-item">
                            <h3 className="font-semibold text-xl mb-2">2024 | Dec-4 - The Idea</h3>
                            <p className="text-lg text-gray-700">
                                The idea for our platform began as a simple goal: to provide a space where students could get answers to their doubts and interact with experts.
                            </p>
                        </div>
                        <div className="timeline-item">
                            <h3 className="font-semibold text-xl mb-2">2024 | Dec-10 -Development</h3>
                            <p className="text-lg text-gray-700">
                                We began developing the platform, designing an intuitive interface and incorporating powerful features to help students find solutions to previous year questions (PYQs) and academic doubts.
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            <div className="team-section py-16">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="team-member">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-40 h-40 mx-auto rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">John Doe</h3>
                            <p className="text-gray-600">Founder & CEO</p>
                        </div>
                        <div className="team-member">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-40 h-40 mx-auto rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">Jane Smith</h3>
                            <p className="text-gray-600">Chief Technology Officer</p>
                        </div>
                        <div className="team-member">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-40 h-40 mx-auto rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">Sarah Lee</h3>
                            <p className="text-gray-600">Head of Content & Community</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="testimonials-section bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
                    <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="testimonial bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg italic text-gray-800 mb-4">
                                "This platform has made my exam preparation so much easier. I can get answers to my doubts and find PYQs instantly."
                            </p>
                            <p className="text-xl font-semibold">Alex B.</p>
                            <p className="text-gray-600">Student</p>
                        </div>
                        <div className="testimonial bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg italic text-gray-800 mb-4">
                                "As an educator, I find this platform very useful to help students understand difficult concepts. It’s a great resource for everyone."
                            </p>
                            <p className="text-xl font-semibold">Dr. Emily R.</p>
                            <p className="text-gray-600">Educator</p>
                        </div>
                        <div className="testimonial bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg italic text-gray-800 mb-4">
                                "I love the community aspect of this platform. It’s great to discuss doubts with peers and experts."
                            </p>
                            <p className="text-xl font-semibold">Sam C.</p>
                            <p className="text-gray-600">Student</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="impact-section bg-gradient-to-r from-green-400 to-blue-500 text-white py-16">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
                    <p className="text-xl mb-6">
                        We’ve helped thousands of students find the resources they need, whether it’s getting quick answers to their questions, understanding complex topics, or collaborating with peers. Our platform continues to evolve, shaping the future of learning.
                    </p>
                    <p className="text-xl">
                        Join us and be a part of this transformative journey, making education accessible, efficient, and engaging for everyone!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
