
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin','/private/'],
    },
    sitemap:`https://filmsexhd.com/sitemap.xml`,
    host:'https://filmsexhd.com/'
  }
}