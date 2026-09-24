import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X, AlertTriangle, Shield } from 'lucide-react';

export default function SOSAlert() {
  const [active, setActive] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (active && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (active && countdown === 0 && !coords) {
      // Simulate GPS coordinates
      setCoords({ lat: 12.9716, lng: 77.5946 });
    }
  }, [active, countdown, coords]);

  const handleSOS = () => {
    setActive(true);
    setCountdown(3);
    setCoords(null);
  };

  const handleClose = () => {
    setActive(false);
    setCoords(null);
    setCountdown(3);
  };

  const contacts = [
    { name: 'Emergency Services', number: '911', icon: Shield, color: 'from-red-500 to-rose-600' },
    { name: 'Priya (Daughter)', number: '+91 98765 43210', icon: Phone, color: 'from-teal-500 to-cyan-600' },
    { name: 'Dr. Sharma (Family Doctor)', number: '+91 99887 76655', icon: Phone, color: 'from-cyan-500 to-teal-600' },
  ];

  return (
    <>
      {/* SOS Button - always visible at top of elderly mode */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={handleSOS}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-full max-w-md h-20 rounded-3xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-200 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-red-400/30 rounded-3xl animate-pulse-ring" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <AlertTriangle className="w-10 h-10 text-white" fill="white" />
            <div className="text-left">
              <p className="text-2xl font-bold text-white tracking-wide">SOS EMERGENCY</p>
              <p className="text-sm text-red-50">Press for immediate help</p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Emergency Alert</h3>
                    <p className="text-red-50">Help is on the way</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {countdown > 0 ? (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <p className="text-xl text-teal-700 font-medium">Sending alert in...</p>
                    <motion.div
                      key={countdown}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-7xl font-bold text-red-500"
                    >
                      {countdown}
                    </motion.div>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    {/* GPS Location */}
                    <div className="bg-teal-50 rounded-2xl p-5 border-2 border-teal-100">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-6 h-6 text-teal-600" />
                        <p className="font-bold text-lg text-teal-800">Your Location</p>
                      </div>
                      {coords ? (
                        <div className="space-y-1">
                          <p className="text-base text-teal-700 font-medium">
                            Latitude: {coords.lat}°N
                          </p>
                          <p className="text-base text-teal-700 font-medium">
                            Longitude: {coords.lng}°E
                          </p>
                          <p className="text-sm text-teal-500 mt-2">
                            Location shared with emergency contacts
                          </p>
                        </div>
                      ) : (
                        <p className="text-base text-teal-500">Getting your location...</p>
                      )}
                    </div>

                    {/* Alert sent confirmation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border-2 border-green-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-base text-green-700 font-medium">
                        Emergency alert sent to 3 contacts
                      </p>
                    </motion.div>

                    {/* Call contacts */}
                    <div>
                      <p className="font-bold text-lg text-teal-800 mb-3">Call now:</p>
                      <div className="space-y-3">
                        {contacts.map((contact) => {
                          const Icon = contact.icon;
                          return (
                            <button
                              key={contact.name}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-teal-300 hover:bg-teal-50 transition-all"
                            >
                              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-md`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-bold text-teal-800 text-lg">{contact.name}</p>
                                <p className="text-base text-teal-500">{contact.number}</p>
                              </div>
                              <Phone className="w-6 h-6 text-teal-400" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
