import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

const testimonials = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique doloribus quidem earum. Pariatur aut dolores facilis sed autem sint quisquam eius quod quo rerum et architecto quaerat, necessitatibus earum possimus?",
        name: "Emmett Torphy",
        role: "Direct Operations Producer",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
        id: 2,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique doloribus quidem earum. Pariatur aut dolores facilis sed autem sint quisquam eius quod quo rerum et architecto quaerat, necessitatibus earum possimus?",
        name: "John Doe",
        role: "Project Manager",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
        id: 3,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique doloribus quidem earum. Pariatur aut dolores facilis sed autem sint quisquam eius quod quo rerum et architecto quaerat, necessitatibus earum possimus?",
        name: "Jane Smith",
        role: "Marketing Specialist",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
        id: 4,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique doloribus quidem earum. Pariatur aut dolores facilis sed autem sint quisquam eius quod quo rerum et architecto quaerat, necessitatibus earum possimus?",
        name: "Alex Brown",
        role: "Software Engineer",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
        id: 5,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique doloribus quidem earum. Pariatur aut dolores facilis sed autem sint quisquam eius quod quo rerum et architecto quaerat, necessitatibus earum possimus?",
        name: "Alex Brown",
        role: "Software Engineer",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
        id: 6,
        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique doloribus quidem earum. Pariatur aut dolores facilis sed autem sint quisquam eius quod quo rerum et architecto quaerat, necessitatibus earum possimus?",
        name: "Alex Brown",
        role: "Software Engineer",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
];

export default function OfferProductReview() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex < testimonials.length - 2 ? prevIndex + 1 : testimonials.length - 2));
    };

    return (
        <div className="p-8 mt-5 w-[1880px] ml-64 overflow-hidden ">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Hear from Our Satisfied Clients</h2>
                <p className="text-gray-500">Here is what some of our Clients have to say about their Experience of working with us.</p>

                {/* Carousel */}
                <div className="flex items-center gap-4 transition-transform duration-300" style={{ transform: `translateX(-${activeIndex * 33}%)` }}>
                    {testimonials.map((testimonial, i) => (
                        <Card
                            key={testimonial.id}
                            className={`p-6 transition-all duration-300 ${i === activeIndex ? "scale-100" : "scale-95 opacity-75"} w-[622px] h-[336px]`}
                            style={{
                                background: "linear-gradient(135deg, #F1FBFF, #F1EDEB, #F8DAB0)",
                                minWidth: "33%",
                                maxWidth: "33%",
                            }}
                        >
                            <div className="w-[542px] h-[215px]  flex items-center justify-start mt-6 ">
                                <CardContent className=''>
                                    <div className=" flex items-center gap-2 text-yellow-500 text-xl">★★★★★</div>
                                    <p className="mt-2 text-gray-600">{testimonial.text}</p>
                                    <div className="flex items-center mt-4 gap-2">
                                        <img src={testimonial.img} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>

                        </Card>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-2 mt-6 mr-52">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        className={`${activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "bg-white text-black"}`}
                        disabled={activeIndex === 0}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleNext}
                        className={`${activeIndex >= testimonials.length - 2 ? "opacity-50 cursor-not-allowed" : "bg-white text-black"}`}
                        disabled={activeIndex >= testimonials.length - 2}
                    >
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

/* Dynamic Page Done  */
/*

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function OfferProductReview() {
    const [testimonials, setTestimonials] = useState([]);
    const [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/comments")

            .then((response) => {
                setTestimonials(response.data);

            })
            .catch((error) => {
                console.error("Error fetching testimonials:", error);
            });
    }, []);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex < testimonials.length - 2 ? prevIndex + 1 : testimonials.length - 2));
    };

    return (
        <div className="p-8 mt-5 w-[1880px] ml-64 overflow-hidden ">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Hear from Our Satisfied Clients</h2>
                <p className="text-gray-500">Here is what some of our Clients have to say about their Experience of working with us.</p>


                <div className="flex items-center gap-4 transition-transform duration-300" style={{ transform: `translateX(-${activeIndex * 33}%)` }}>
                    {testimonials.map((testimonial, i) => (
                        <Card
                            key={testimonial.id}
                            className={`p-6 transition-all duration-300 ${i === activeIndex ? "scale-100" : "scale-95 opacity-75"} w-[622px] h-[336px]`}
                            style={{
                                background: "linear-gradient(135deg, #F1FBFF, #F1EDEB, #F8DAB0)",
                                minWidth: "33%",
                                maxWidth: "33%",
                            }}
                        >
                            <div className="w-[542px] h-[215px]  flex items-center justify-start mt-6 ">
                                <CardContent className=''>
                                    <div className=" flex items-center gap-2 text-yellow-500 text-xl">★★★★★</div>
                                    <p className="mt-2 text-gray-600">{testimonial.text}</p>
                                    <div className="flex items-center mt-4 gap-2">
                                        <img src={testimonial.img} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>


                <div className="flex justify-end gap-2 mt-6 mr-52">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        className={`${activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "bg-white text-black"}`}
                        disabled={activeIndex === 0}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleNext}
                        className={`${activeIndex >= testimonials.length - 2 ? "opacity-50 cursor-not-allowed" : "bg-white text-black"}`}
                        disabled={activeIndex >= testimonials.length - 2}
                    >
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

 */