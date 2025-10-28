import React from 'react';
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";


const Footer = () => {
 
    return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 w-full rounded-t-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
     
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      
          <div>
            <h3 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Consumer Health Data Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Intellectual Property</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>
          
     
          <div>
            <h3 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">Careers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Careers Portal</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tech Blog</a></li>
            </ul>
          </div>
          
       
          <div>
            <h3 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">Social</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full p-1 bg-gray-100 dark:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full p-1 bg-gray-100 dark:bg-gray-800">
         
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full p-1 bg-gray-100 dark:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full p-1 bg-gray-100 dark:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full p-1 bg-gray-100 dark:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
        
          <div>
            <h3 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">FAQ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Destinations</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Press Room</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Promo Code</a></li>
            </ul>
          </div>
        </div>
        
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          
       
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Get the app!</h4>
            <div className="flex gap-4">
              <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
          
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Single people, listen up: If you're looking for love, want to start dating, or just keep it casual, you need to be on Luvsi. With over 55 billion matches made, it's the place to be to meet your next best match. Let's be real, the dating landscape looks very different today, as most people are meeting online. With Lusi, the world's most popular free dating app, you have millions of other single people at your fingertips and they're all ready to meet someone like you. Whether you're straight or in the LGBTQIA community, Luvsi's here to bring you all the sparks.
          </p>
          
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            There really is something for everyone on Luvsi. Want to get into a relationship? You got it. Trying to find some new friends? Say no more. New kid on campus and looking to make the most of your college experience? Luvsi U's got you covered. Luvsi isn't your average dating site — it's the most diverse dating app, where adults of all backgrounds and experiences are invited to make connections, memories, and everything in between.
          </p>
          
         
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Safety Tips</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Settings</a>
      
            <span className="md:ml-auto block w-full md:w-auto mt-2 md:mt-0">© 2025 Luvsi LLC, All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;