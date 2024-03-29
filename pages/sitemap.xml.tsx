import axios from 'axios';
import { GetServerSideProps } from 'next';
import { categories } from '@contexts/categories';
import { SitemapFile } from '@contexts/types';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

function generateSiteMap(categories: string[], posts: SitemapFile[], snippets: SitemapFile[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
    <loc>${DOMAIN}</loc>
   </url>
   <url>
    <loc>${DOMAIN}/posts</loc>
   </url>
   <url>
     <loc>${DOMAIN}/snippets</loc>
   </url>
   ${categories
       .map((path) => {
           return `
    <url>
        <loc>${`${DOMAIN}/posts/category/${path}`}</loc>
    </url>
    `;
       })
       .join('')}
   ${posts
       .map((file) => {
           return `
    <url>
        <loc>${`${DOMAIN}/posts/${file.name}`}</loc>
        <lastmod>${file.lastMod}</lastmod>
    </url>
    `;
       })
       .join('')}
       ${snippets
           .map((file) => {
               return `
  <url>
      <loc>${`${DOMAIN}/snippets/${file.name}`}</loc>
      <lastmod>${file.lastMod}</lastmod>
  </url>
 `;
           })
           .join('')}
   </urlset>
 `;
}

function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const { data } = await axios.get('files/paths', { params: { lastMod: true } });

    const categoriesPaths = Object.keys(categories).map((cat) => cat.toLowerCase());

    const posts = data.data.posts;
    const snippets = data.data.snippets;

    const sitemap = generateSiteMap(categoriesPaths, posts, snippets);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;
