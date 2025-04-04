import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
function formatDate(dateString) {
	// Create a Date object from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the Date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Return the formatted date string
	return `${month} ${day}, ${year}`;
}
const HistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState([])
    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const res = await axios.get(`/api/v1/search/history`);
                setSearchHistory(res.data.content);
            } catch (error) {
                console.error("Error fetching search history:", error);
                setSearchHistory([]);
            }
        };
        getSearchHistory();
    }, []);
    const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
			setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
		} catch (error) {
            console.log(error);
            
			toast.error("Failed to delete search item");
		}
	};

    if (searchHistory?.length === 0) {
        return (
            <div className='bg-black min-h-screen text-white'>
                <Navbar />
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <h1 className='text-3xl font-bold mb-8'>Search History</h1>
                    <div className='flex justify-center items-center h-96'>
                        <p className='text-xl'>No search history found</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="bg-black min-h-screen text-white">
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Search History</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-4">
                        {searchHistory.map((item) => (
                            <div className="bg-gray-800 p-4 rounded flex items-start" key={item.id}>
                                <img src={SMALL_IMG_BASE_URL + item?.image} alt="History img"  className='size-16 rounded-full object-cover mr-4'/>
                                <div className='flex flex-col'>
								<span className='text-white text-lg'>{item?.title}</span>
								<span className='text-gray-400 text-sm'>{formatDate(item?.createdAt)}</span>
							</div>
                            <span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									item?.searchType === "movie"
										? "bg-red-600"
										: item?.searchType === "tv"
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							>
								{item?.searchType[0].toUpperCase() + item?.searchType.slice(1)}
							</span>
							<Trash size={24}
								className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
								onClick={() => handleDelete(item)}
							/>
                            </div>
                        ))}
                        </div>
                </div>
            </div>

        </>
    )
}

export default HistoryPage
