import React from 'react'

const NavBar = () => {
  return (
    <div>
        <nav className="bg-slate-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="https://celebaltech.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://www.databricks.com/wp-content/uploads/2022/04/celebal-tech.png" className="h-8 md:ml-3" alt="CT Logo" />
            </a>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Source Code</a>
            <a href="https://adityashukla-portfolio.netlify.app/">
            <img src="https://avatars.githubusercontent.com/u/102568652?v=4" className="h-8 rounded-full" alt="myLogo" />
            </a>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default NavBar