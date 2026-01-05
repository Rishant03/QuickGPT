import React, { useState, useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const ctx = useAppContext() || {}
  const {
    chats = [],
    setSelectedChat = () => {},
    theme = 'light',
    setTheme = () => {},
    user,
  } = ctx

  const [search, setSearch] = useState('')
  const searchLower = search.toLowerCase()
  const navigate = useNavigate()

  const filteredChats = useMemo(() => {
    const list = Array.isArray(chats) ? chats : []
    return list.filter(chat => {
      const messages = Array.isArray(chat.messages) ? chat.messages : []
      const firstContent = messages[0]?.content ?? ''
      const name = chat.name ?? ''
      return (
        (typeof firstContent === 'string' &&
          firstContent.toLowerCase().includes(searchLower)) ||
        name.toLowerCase().includes(searchLower)
      )
    })
  }, [chats, searchLower])

  const handleDelete = (e, chat) => {
    e.stopPropagation()
    console.log('delete requested for chat:', chat)
  }

  return (
    <div
      className={`flex flex-col h-screen min-w-[18rem] p-5 
      dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
      border-r border-[#80609F]/30 backdrop-blur-3xl 
      transition-transform duration-500 relative left-0 z-10
      ${!isMenuOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}
    >
      {/* Logo */}
      <img
        src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
        alt="logo"
        className="w-full max-w-[12rem]"
      />

      {/* New Chat */}
      <button
        onClick={() => console.log('new chat')}
        className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        {assets.search_icon && (
          <img src={assets.search_icon} className="w-4" alt="search" />
        )}
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
          className="text-xs placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      {/* Recent Chats */}
      {filteredChats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}

      <div className="flex-1 overflow-y-auto mt-3 text-sm space-y-3">
        {filteredChats.map((chat, idx) => {
          const messages = Array.isArray(chat.messages) ? chat.messages : []
          const firstMsg = messages[0]?.content ?? ''
          return (
            <div
              onClick={() => {
                navigate('/')
                setSelectedChat(chat)
                setIsMenuOpen(false) // closes only on mobile
              }}
              key={chat._id ?? chat.id ?? idx}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
            >
              <div>
                <p className="truncate w-full">
                  {firstMsg && typeof firstMsg === 'string'
                    ? firstMsg.slice(0, 32)
                    : chat.name ?? 'Unnamed chat'}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              {assets.bin_icon && (
                <img
                  src={assets.bin_icon}
                  onClick={(e) => handleDelete(e, chat)}
                  className="hidden group-hover:block w-4 cursor-pointer invert"
                  alt="delete"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Community images */}
      <div
        onClick={() => {
          navigate('/community')
          setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.gallery_icon} className="w-5 not-dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purchases Option */}
      <div
        onClick={() => {
          navigate('/credits')
          setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.diamond_icon} className="w-5 dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits ?? 0}</p>
          <p className="text-xs text-gray-400">
            Purchase credits to use quickgpt
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-4 not-dark:invert" alt="" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
        <p className="flex-1 text-sm dark:text-primary truncate">
          {user ? user.name : 'Login your account'}
        </p>
        {user && (
          <img
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
            alt="logout"
          />
        )}
      </div>

      {/* Close button (mobile only) */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        alt="close"
      />
    </div>
  )
}

export default SideBar
