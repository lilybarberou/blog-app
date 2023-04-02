import axios from 'axios';
import categories from '@contexts/categories.json';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

function generateSiteMap(categories, posts, snippets) {
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
       .map((path) => {
           return `
    <url>
        <loc>${`${DOMAIN}/posts/${path}`}</loc>
    </url>
    `;
       })
       .join('')}
       ${snippets
           .map((path) => {
               return `
  <url>
      <loc>${`${DOMAIN}/snippets/${path}`}</loc>
  </url>
 `;
           })
           .join('')}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
    const { data } = await axios.get('files/paths');
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
}

export default SiteMap;
