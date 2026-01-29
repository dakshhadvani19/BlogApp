import React from 'react'
// i remove imported "act" from line no 1
import { Container , Logo , LogoutButton } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    } ,

    {
      name: "Login" , 
      slug: "/login" , 
      active: !authStatus , 
    } ,

    {
      name: "Signup" , 
      slug: "/signup" , 
      active: !authStatus,
    } ,

    {
      name: "All posts" , 
      slug: "/all-posts" , 
      active: authStatus ,  
    } ,

    {
      name: "Add post" , 
      slug: "/add-post" , 
      active: authStatus ,  
    } , 
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex sticky'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button 
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200
                   hover:bg-blue-100 rounded-full'>{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              // this condition is like if "authStatus" is true then it will run things after it
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header