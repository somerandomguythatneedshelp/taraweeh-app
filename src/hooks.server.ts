import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';

function getTheme() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const month = now.getMonth();

  let theme = 'night';
  let color = '#12122b';

  const config = [
    { sun: 465, set: 960 },
    { sun: 430, set: 1005 },
    { sun: 370, set: 1060 }
  ][month] ?? { sun: 360, set: 1080 };

  if (mins >= config.sun && mins < config.sun + 75) {
    theme = 'sunrise';
    color = '#697b9c';
  } else if (mins >= config.sun + 75 && mins < config.set - 60) {
    theme = 'sunlight';
    color = '#8c92ac';
  } else if (mins >= config.set - 60 && mins < config.set) {
    theme = 'golden_hour';
    color = '#ff9a42';
  } else if (mins >= config.set && mins < config.set + 45) {
    theme = 'sunset';
    color = '#0d0d1f';
  }

  return { theme, color };
}

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace('%paraglide.lang%', locale)
    });
  });

const handleBackground: Handle = async ({ event, resolve }) => {
  const { theme, color } = getTheme();

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace(
        '<html',
        `<html class="${theme}" style="background-color:${color};"`
      );
    }
  });
};

export const handle = sequence(handleParaglide, handleBackground);
