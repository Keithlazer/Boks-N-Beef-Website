# BoksNBeef Website

## Deployment on IONOS

1. Upload all files (including `index.html`, `assets/`, `styles/`, `scripts/`, `CNAME`, `robots.txt`, and `.htaccess`) to your IONOS webspace, usually in the `htdocs` directory.
2. The `CNAME` file ensures your custom domain (boksnbeef.com) is recognized by static hosts (if used).
3. The `.htaccess` file redirects HTTP to HTTPS and sets up custom error pages.
4. `robots.txt` allows search engines to crawl your site.
5. For custom error pages, create `404.html` and `403.html` if desired.

## Notes
- Update your IONOS DNS settings to point your domain to the correct webspace.
- If using a CMS or dynamic backend, further configuration may be required. 