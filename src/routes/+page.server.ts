import { createIssue, getTeams } from '$lib/linear';
import { fail, type Actions } from '@sveltejs/kit';
import { validateForm } from '../utils/validateForm';

export const load = async () => {
  try {
    const teams = await getTeams();
    return { teams };
  } catch (err) {
    console.log(err);
  }
};

export const actions: Actions = {
  submitReport: async ({ request }) => {
    const formData = await request.formData();
    const isValid = validateForm(formData);

    if (!isValid) {
      return fail(400, { message: 'Error' });
    }

    const data: any = {};
    for (const field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    try {
      await createIssue(data);
    } catch (err) {
      console.error('Something went wrong', err);
    }
  }
};
