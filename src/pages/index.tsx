import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { Layout } from 'components/Layout'
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
      <Head>
        <title>Significa Bug Reporter</title>
      </Head>
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

export default IndexPage
