"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "../assets/logo";

export const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoading) {
    return null;
  }

  const handleMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
    setShowSearch(false); // Close search when menu closes
  };

  return (
    <>
      <nav className="bg-[#121212] text-[#E0E0E0] px-4 md:px-12 py-4 fixed top-0 left-0 right-0 z-50 h-16 flex justify-center">
        <div className="w-full max-w-screen-xl flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search"
                    className="bg-[#1E1E1E] text-[#E0E0E0] h-10 p-2 pl-2 rounded border border-[#424242] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4CAF50] focus:ring-opacity-50"
                  />
                )}
              </AnimatePresence>
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 hover:scale-110 active:scale-90 focus:outline-none"
                onClick={() => setShowSearch((prev) => !prev)}
                size="lg"
                aria-label="Search"
              />
            </div>
            <div className="relative hidden md:flex items-center space-x-2 font-bold">
              {user ? (
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-400 cursor-pointer hover:text-gray-300 transition-transform duration-200 transform hover:scale-110"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    size="lg"
                  />
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 mt-2 w-48 bg-[#1E1E1E] text-[#E0E0E0] rounded-md shadow-lg py-2 z-50"
                      >
                        <Link
                          href="/myreview"
                          className="block px-4 py-2 text-sm hover:bg-[#121212]"
                        >
                          My Reviews
                        </Link>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-[#121212]"
                        >
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[#4CAF50] transition-transform transform hover:scale-110 active:scale-90"
                  >
                    LOG IN
                  </Link>
                  <div>/</div>
                  <Link
                    href="/signup"
                    className="text-[#4CAF50] transition-transform transform hover:scale-110 active:scale-90"
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
            <FontAwesomeIcon
              icon={faBars}
              className="text-gray-400 cursor-pointer md:hidden"
              onClick={handleMenuToggle}
              size="lg"
              aria-label="Menu"
            />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-60 z-40"
              onClick={handleCloseMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-64 bg-[#121212] text-[#E0E0E0] h-full z-50 p-4"
            >
              <div className="flex flex-col space-y-6">
                {user ? (
                  <>
                    <div className="text-[#E0E0E0] mt-6 text-xl font-semibold">
                      {user.email}
                    </div>
                    <Link
                      href="/"
                      onClick={handleCloseMenu}
                      className="text-[#4CAF50] text-xl font-semibold"
                    >
                      HOME
                    </Link>
                    <Link
                      href="/myreview"
                      onClick={handleCloseMenu}
                      className="text-[#E0E0E0] text-xl font-semibold"
                    >
                      MY REVIEWS
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        handleCloseMenu();
                      }}
                      className="text-[#E0E0E0] flex text-xl font-semibold"
                    >
                      LOG OUT
                    </button>
                  </>
                ) : (
                  <div className="flex mt-6">
                    <Link
                      href="/login"
                      className="text-[#4CAF50] text-xl font-semibold transition-transform transform hover:scale-110 active:scale-90"
                    >
                      LOG IN
                    </Link>
                    <div className="mx-2">/</div>
                    <Link
                      href="/signup"
                      className="text-[#4CAF50] text-xl font-semibold transition-transform transform hover:scale-110 active:scale-90"
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
