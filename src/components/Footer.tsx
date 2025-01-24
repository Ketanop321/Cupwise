import React from 'react';
import { Coffee } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="h-6 w-6" />
              <span className="font-bold text-xl">CupWise</span>
            </div>
            <p className="text-gray-400">
              Making sustainable choices easier, one cup at a time.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</a></li>
              <li><a href="/challenges" className="text-gray-400 hover:text-white">Challenges</a></li>
              <li><a href="/community" className="text-gray-400 hover:text-white">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CupWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;