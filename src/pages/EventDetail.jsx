import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, Heart } from 'lucide-react';
import { useState } from 'react';

export default function EventDetail({ setPage, eventData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Default event data jika tidak ada yang dikirim
  const event = eventData || {
    title: "Beach Party",
    date: "23 August 2024",
    time: "8:30 pm - 11:00 pm",
    location: "Pantai Parangtritis",
    distance: "1 km",
    image: "/event1.jpeg",
    description: "Join us for an amazing beach party experience! Enjoy live music, food, and drinks while watching the sunset. This event promises to be an unforgettable night filled with fun activities and great company.",
    capacity: "200 people",
    attendees: 145,
    organizer: "Event Organizers Team",
    category: "Party & Music"
  };

  const handleRegister = () => {
  setPage("ticket"); // pindah ke halaman Ticket.jsx
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setPage('home')}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Event Details
          </h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Event Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full backdrop-blur-md transition ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button className="p-3 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Event Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Title & Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-3">
              {event.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h2>
            <p className="text-gray-600">Organized by {event.organizer}</p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Date</p>
                <p className="text-sm font-semibold text-gray-800">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Time</p>
                <p className="text-sm font-semibold text-gray-800">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-pink-100 rounded-lg">
                <MapPin className="text-pink-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-gray-800">{event.location}</p>
                <p className="text-xs text-gray-500 mt-1">📍 {event.distance} away</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Attendance</p>
                <p className="text-sm font-semibold text-gray-800">
                  {event.attendees} / {event.capacity}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${(event.attendees / parseInt(event.capacity)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">About This Event</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex gap-4">
            <button
              onClick={handleRegister}
              className={`flex-1 py-4 rounded-xl font-semibold transition shadow-lg ${
                isRegistered
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              {isRegistered ? 'Cancel' : 'Buy Now'}
            </button>
            <button className="px-6 py-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-50 transition">
              Rp 100.000
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}