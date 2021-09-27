import { LinearClient } from '@linear/sdk'

// Api key authentication
export const linearClient = new LinearClient({
  accessToken: process.env.LINEAR_OAUTH_ACCESS_TOKEN,
})

export const getTeamNameFromCode = async (
  base64id: string
): Promise<string | null> => {
  try {
    const id = Buffer.from(base64id, 'base64').toString('utf-8')
    const { nodes } = await linearClient.teams({
      filter: {
        id: {
          eq: id,
        },
      },
    })

    if (nodes.length === 0) return null

    return nodes[0].name
  } catch (error) {
    return null
  }
}

const isImage = (url: string) => {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url)
}

const isVideo = (url: string) => {
  return /\.(mov|avi|wmv|flv|3gp|mp4|mpg)$/i.test(url)
}

export const createIssue = async (args: {
  author: string
  team: string
  title: string
  description: string
  steps: string
  technical: string
  priority: string
  attachments: string[]
}): Promise<void> => {
  const {
    author,
    team,
    title,
    description,
    steps,
    technical,
    priority,
    attachments,
  } = args

  const teamId = Buffer.from(team, 'base64').toString('utf-8')

  const priorityLabel: Record<string, string> = {
    low: '🟢 **Low**',
    medium: '🟡 **Medium**',
    high: '🟠 **High**',
    critical: '🔴 **Critical**',
  }

  const getAttachments = (): string => {
    if (attachments.length === 0) return ''

    return (
      '## Attachments\n' +
      '___ \n' +
      attachments
        .sort((a) => {
          if (isImage(a)) return 2

          if (isVideo(a)) return 1

          return -1
        })
        .map((attach) => {
          if (isImage(attach)) {
            return `![${attach}](${encodeURI(attach)})  \n`
          }

          if (isVideo(attach)) {
            return `- 🍿 Video: [${attach}](${encodeURI(attach)})  \n`
          }

          return `- 📎 File: [${attach}](${encodeURI(attach)})  \n`
        })
        .join('') +
      '&nbsp;  \n' +
      '&nbsp;  \n' +
      '&nbsp;  \n'
    )
  }

  const payload =
    '## Description\n' +
    '___ \n' +
    description +
    '&nbsp;  \n' +
    '&nbsp;  \n' +
    '## Steps to reproduce\n' +
    '___ \n' +
    steps +
    '&nbsp;  \n' +
    '&nbsp;  \n' +
    '## Technical Information\n' +
    '___ \n' +
    technical +
    '&nbsp;  \n' +
    '&nbsp;  \n' +
    getAttachments() +
    `${priorityLabel[priority]} priority bug reported by ${author}`

  const { success } = await linearClient.issueCreate({
    teamId,
    title,
    description: payload,
  })

  if (!success) {
    throw new Error("Couldn't create issue")
  }
}
