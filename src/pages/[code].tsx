import { GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

import { getTeamNameFromCode } from 'lib/linear'
import { useStore } from 'lib/store'

type TeamCodePageProps = {
  code: string
  name: string
}

const TeamCodePage = ({ code, name }: TeamCodePageProps): null => {
  const { replace } = useRouter()
  const addTeam = useStore((state) => state.addTeam)

  useEffect(() => {
    addTeam({ code, label: name })
    replace('/')
  }, [code, name, addTeam, replace])

  return null
}

export default TeamCodePage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.query

  if (typeof code !== 'string') return { notFound: true }

  const name = await getTeamNameFromCode(code)

  if (!name) return { notFound: true }

  return {
    props: {
      code,
      name,
    },
  }
}
