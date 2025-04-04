import React, { useEffect, useRef, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);
    const sliderRef = useRef(null);

    const formattedCategory = category.replaceAll("_", " ").replace(/^./, (char) => char.toUpperCase());
    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    useEffect(() => {
        const getContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${category}`);
                setContent(res.data.content);
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };
        getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    return (
        <div
            className="bg-black text-white relative px-5 md:px-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2 className="text-2xl font-bold mb-4">
                {formattedCategory} {formattedContentType}
            </h2>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
                {content.map((item) => (
                    <Link to={`/watch/${item?.id}`} className="min-w-[250px] relative group" key={item?.id}>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={SMALL_IMG_BASE_URL + item?.backdrop_path}
                                alt="Movie Image"
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                            />
                        </div>
                        <p className="mt-2 text-center">{item?.title || item?.name}</p>
                    </Link>
                ))}
            </div>
            {showArrows && (
                <>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer z-10"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer z-10"
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;
