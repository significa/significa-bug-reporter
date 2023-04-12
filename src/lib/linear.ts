import { LinearClient } from '@linear/sdk'
import 'dotenv/config';

// Api key authentication
export const linearClient = new LinearClient({
  accessToken: process.env.LINEAR_OAUTH_ACCESS_TOKEN,
})

export const getTeams = async (): Promise<{
    name: string;
    id: string;
}[]| null> => {
  try {
    const { nodes } = await linearClient.teams()

    if (nodes.length === 0) return null
    const teams = nodes.map(node => {
        return {
            name: node.name,
            id: node.id
        }
    })
    return teams;
  } catch (error) {
    return null
  }
}

// const isImage = (url: string) => {
//   return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url)
// }

// const isVideo = (url: string) => {
//   return /\.(mov|avi|wmv|flv|3gp|mp4|mpg)$/i.test(url)
// }

// const getAttachments = (attachments: string[]): string => {
//   if (attachments.length === 0) return ''

//   return (
//     '## Attachments\n' +
//     '___ \n' +
//     attachments
//       .sort((a) => {
//         if (isImage(a)) return 2

//         if (isVideo(a)) return 1

//         return -1
//       })
//       .map((attach) => {
//         if (isImage(attach)) {
//           return `![${attach}](${encodeURI(attach)})  \n`
//         }

//         if (isVideo(attach)) {
//           return `- 🍿 Video: [${attach}](${encodeURI(attach)})  \n`
//         }

//         return `- 📎 File: [${attach}](${encodeURI(attach)})  \n`
//       })
//       .join('') +
//     '&nbsp;  \n' +
//     '&nbsp;  \n' +
//     '&nbsp;  \n'
//   )
// }

// type Args =
//   | {
//       type: 'bug'
//       author: string
//       team: string
//       title: string
//       description: string
//       steps: string
//       technical: string
//       priority: string
//       attachments: string[]
//     }
//   | {
//       type: 'request'
//       author: string
//       team: string
//       title: string
//       description: string
//       priority: string
//       attachments: string[]
//     }

// export const createIssue = async (args: Args): Promise<void> => {
//   const { type, author, team, title, description, priority, attachments } = args

//   const teamId = Buffer.from(team, 'base64').toString('utf-8')

//   const priorityLabel: Record<string, string> = {
//     low: '🟢  **Low**',
//     medium: '🟡  **Medium**',
//     high: '🟠  **High**',
//     critical: '🔴  **Critical**',
//   }

//   let payload = `## Description\n___ \n${description}`

//   if (type === 'bug') {
//     const { steps, technical } = args

//     payload +=
//       '&nbsp;  \n' +
//       '&nbsp;  \n' +
//       '## Steps to reproduce\n' +
//       '___ \n' +
//       steps +
//       '&nbsp;  \n' +
//       '&nbsp;  \n' +
//       '## Technical Information\n' +
//       '___ \n' +
//       technical
//   }

//   payload +=
//     '&nbsp;  \n' +
//     '&nbsp;  \n' +
//     getAttachments(attachments) +
//     `${priorityLabel[priority]} priority ${type} reported by ${author}`

//   const { success } = await linearClient.issueCreate({
//     teamId,
//     title: `[${type}] ${title}`,
//     description: payload,
//   })

//   if (!success) {
//     throw new Error("Couldn't create issue")
//   }
// }