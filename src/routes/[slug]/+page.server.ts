import { linearClient } from '$lib/linear.js';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
  try {
    const slug = params.slug;
    const regex = new RegExp(
      '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$'
    );

    // old base64 code
    if (slug && regex.test(slug)) {
      const id = Buffer.from(slug, 'base64').toString('utf-8');
      const { nodes } = await linearClient.teams({
        filter: {
          id: {
            eq: id
          }
        }
      });

      if (nodes.length === 0) return null;

      const teams = {
        id: nodes[0].id,
        name: nodes[0].name,
        key: nodes[0].key
      };

      return teams;
    }
    // key from linear
    else {
      const { nodes } = await linearClient.teams({
        filter: {
          key: {
            eq: slug
          }
        }
      });

      if (nodes.length === 0) return null;

      const teams = {
        id: nodes[0].id,
        name: nodes[0].name,
        key: nodes[0].key
      };

      return teams;
    }
  } catch (error) {
    return null;
  }
};
