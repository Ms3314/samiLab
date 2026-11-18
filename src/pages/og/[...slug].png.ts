import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts, isoDate, minutesRead } from '../../lib/posts';
import { renderOg, type OgInput } from '../../lib/og';
import { SITE } from '../../data/site';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const host = new URL(import.meta.env.SITE).host;
  return [
    { params: { slug: 'site' }, props: { eyebrow: 'Portfolio', title: 'Mohammed Samiuddin', description: 'Engineer, teacher, writer. Applied AI at Soapbox, Hyderabad.', footer: host } },
    { params: { slug: 'blog' }, props: { eyebrow: 'Writing', title: 'Notes from the lab', description: 'What I built, what I measured, and what held up.', footer: `${host}/blog` } },
    ...posts.map((p) => ({
      params: { slug: p.id },
      props: { eyebrow: 'Writing', title: p.data.title, description: p.data.description, footer: `${isoDate(p.data.date)} · ${minutesRead(p)} min read` },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as OgInput);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
