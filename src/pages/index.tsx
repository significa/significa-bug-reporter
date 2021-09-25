import React, { useEffect, useState } from 'react'

import { Login } from 'components/Login'
import { Main } from 'components/Main'
import { UserCard } from 'components/UserCard'
import { useStore } from 'lib/store'

const IndexPage: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const user = useStore((state) => state.user)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Layout>
      {user ? (
        <>
          <UserCard />
          <Main />
        </>
      ) : (
        <Login />
      )}
    </Layout>
  )
}

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <h1>Bug Reporting</h1>
      {children}
    </div>
  )
}

export default IndexPage
