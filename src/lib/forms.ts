import { fail, type RequestEvent } from '@sveltejs/kit';
export type Args =
  | {
      type: 'bug';
      author: string;
      teamId: string;
      title: string;
      description: string;
      steps: string;
      technical: string;
      priority: string;
      attachments: string[];
    }

export const handleContactForm =
  (handleSaveToDatabase: (args: Args) => Promise<void>) =>
  async (event: RequestEvent) => {
    const data = await event.request.formData();

    const fields = Object.fromEntries(data.entries()) as unknown as Args;
    const { author, teamId, type, title, description, priority } = fields;

    if (type == 'bug') {
      const { steps, technical } = fields;
      if (
        !author ||
        !teamId ||
        !type ||
        !title ||
        !description ||
        !steps ||
        !technical ||
        !priority
      ) {
        return fail(400, {
          error: {
            type: 'fields',
            fields: {
              author: !author,
              teamId: !teamId,
              type: !type,
              title: !title,
              description: !description,
              steps: !steps,
              technical: !technical,
              priority: !priority
            }
          }
        });
      }
    }

    if (!author || !teamId || !type || !title || !description || !priority) {
      return fail(400, {
        error: {
          type: 'fields',
          fields: {
            author: !author,
            teamId: !teamId,
            type: !type,
            title: !title,
            description: !description,
            priority: !priority
          }
        }
      });
    }
    try {
      await handleSaveToDatabase(fields);
    } catch (error) {
      return fail(422, {
        error: {
          type: 'linear'
        }
      });
    }

    return {
      success: true
    };
  };
