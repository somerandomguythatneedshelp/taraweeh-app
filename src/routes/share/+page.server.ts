import { redirect } from '@sveltejs/kit';

export function load({ url }) {
  const type = url.searchParams.get('t');
  const category = url.searchParams.get('category');
  const id = url.searchParams.get('id');
  const recording = url.searchParams.get('recording');

  if (type && category && id) {
    throw redirect(302, `/dhikr?category=${category}&id=${id}`);
  }

  if (recording) {
    // handle recording case
  }

  return {};
}
