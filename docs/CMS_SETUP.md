# SOC Alliance CMS & Admin Dashboard

The site has a built-in admin dashboard at **`/admin`**, modeled on the e-cleanpro admin: Neon Postgres for content, Vercel Blob for images, password logins with Owner/Admin roles, and an activity log.

## What the client can edit

| Admin section | Where it shows on the site |
|---|---|
| **Inbox** | Every Contact, Volunteer, Mentoring & Life Coaching, and Newsletter form submission. Includes status, internal notes, reply-by-email, and CSV export. |
| **Events & News** | Homepage carousels, the announcement bar, News & Events, and the Mardi Gras page. Upcoming/Past is worked out from each date automatically. |
| **Community Stories** | The homepage's "Stories From Our Community" section. |
| **Leadership & Board** | The roster on Our Story, including photos, titles, Officer/Director grouping, order, and optional bios. |
| **Partners** | The homepage's Our Partners band. |
| **Careers** | Role list on Get Involved → Careers. |
| **Social Media** | Add, edit, reorder, hide, or delete profiles (Facebook, Instagram, LinkedIn, X, YouTube, TikTok, Threads, or any other link). These appear in the footer, the homepage banner, and search-engine data. |
| **Site Settings** | Contact details and EIN (header, footer, contact page, search data); homepage impact figure and About text; mission, vision, and values; the Donorbox embed link. |
| **Media Library** | All uploaded images. An image that a page is still using can't be deleted. |
| **Team & Access** (Owners) | Add, deactivate, or remove admins; reset passwords. |
| **Activity Log** (Owners) | Who changed what, and when. |

Long-form page copy, such as the program pages and the privacy policy, still lives in code.

## Going live on Vercel

1. **Database.** Go to Vercel → Project → Storage → Create → **Neon** (Postgres) and connect it to the project. This adds `DATABASE_URL`. The tables are created automatically on first use. The current site content (events, board, partners, stories, careers) is copied in once as the starting data.
2. **Image storage.** Go to Storage → Create → **Blob** and connect it to the project, including the Production environment. This adds `BLOB_READ_WRITE_TOKEN` or, on newer stores, `BLOB_STORE_ID`. The site accepts either.
3. **Environment variables.** Set these under Settings → Environment Variables (see `.env.example`):
   - `SESSION_SECRET`: 32+ random characters. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
   - `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD_HASH`: the first Owner account. Generate the hash with `npm run admin:hash`, then paste it into Vercel exactly as printed.
   - *Optional:* `RESEND_API_KEY` and `EMAIL_FROM`. These turn on email notifications for new submissions and "Forgot password?" links.
4. **Redeploy**, then sign in at `https://<domain>/admin`. Add the rest of the team under Team & Access.

## Behavior notes

- **Fallback content.** If the database is ever unreachable, the public site serves the built-in default content instead of breaking.
- **Publishing.** Saving in the admin updates the live site immediately. Public pages also refresh at least hourly, so date-based statuses never go stale.
- **Local development.** With no `DATABASE_URL`, `npm run dev` uses an embedded Postgres stored in `.data/`, and uploads go to `public/uploads/`. Both are git-ignored. Delete `.data/` to start over from the defaults.
