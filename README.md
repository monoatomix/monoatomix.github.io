# Aniket Yadav's Personal Website

A monospace-style personal website with a dynamic blog system.

## Blog System

The website includes a dynamic blog system that automatically discovers and lists blog posts from the `/blog` directory.

### How it works

1. **Blog Posts**: Individual HTML files in the `/blog` directory with metadata in meta tags
2. **Manifest Generation**: A Node.js script scans the blog directory and generates a JSON manifest
3. **Dynamic Loading**: The blog page loads and displays posts from the manifest

### Adding a New Blog Post

1. Create a new HTML file in the `/blog` directory (e.g., `my-new-post.html`)
2. Include the required metadata in the HTML head:

```html
<meta name="blog-title" content="Your Post Title" />
<meta name="blog-date" content="2024-12-30" />
<meta name="blog-tags" content="tag1,tag2,tag3" />
<meta name="blog-excerpt" content="A brief description of your post." />
<meta name="blog-read-time" content="5 min read" />
```

3. Regenerate the manifest:
```bash
node generate-blog-manifest.js
```

4. The new post will automatically appear on the blog page

### Blog Post Template

Use this template for new blog posts:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="../index.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <meta name="author" content="Aniket Yadav" />
  <meta name="blog-title" content="Your Post Title" />
  <meta name="blog-date" content="YYYY-MM-DD" />
  <meta name="blog-tags" content="tag1,tag2,tag3" />
  <meta name="blog-excerpt" content="Brief description" />
  <meta name="blog-read-time" content="X min read" />
  <title>Your Post Title - Aniket Yadav</title>
</head>
<body>
<table class="header">
  <tr>
    <td colspan="2" rowspan="2" class="width-auto">
      <h1 class="title"><a href="../index.html" style="text-decoration:none">Aniket Yadav</a></h1>
      <span class="subtitle">Blog Post</span>
    </td>
    <th>Blog</th>
    <td class="width-min"><a href="../blog.html">← Back to Blog</a></td>
  </tr>
  <tr>
    <th>Date</th>
    <td class="width-min"><time>Your Date</time></td>
  </tr>
</table>

<h1>Your Post Title</h1>

<!-- Your content here -->

<footer>
<hr>
<p>← <a href="../blog.html">Back to Blog</a> | <a href="../index.html">Home</a></p>
</footer>
</body>
</html>
```

### Features

- **Dynamic Discovery**: Automatically finds HTML files in `/blog` directory
- **Metadata Parsing**: Extracts title, date, tags, excerpt, and read time from meta tags
- **Filtering**: Filter posts by tags (Data Engineering, AI & ML, Python, etc.)
- **Archives**: Organize posts by year and tag
- **Responsive Design**: Follows the monospace design of the main site
- **Error Handling**: Graceful fallback if manifest file is missing

### Files

- `blog.html` - Main blog listing page
- `blog/` - Directory containing individual blog posts
- `generate-blog-manifest.js` - Script to scan blog directory and generate manifest
- `blog-manifest.json` - Generated manifest file (auto-created)

### Development

The blog system uses:
- Vanilla JavaScript (no dependencies)
- Node.js for manifest generation (fallback regex parser if jsdom unavailable)
- JSON manifest for static hosting compatibility
- CSS Grid and modern web standards

### Deployment

For static hosting (GitHub Pages, Netlify, etc.):
1. Add blog posts to `/blog` directory
2. Run `node generate-blog-manifest.js` locally
3. Commit both the new posts and updated `blog-manifest.json`
4. Deploy as usual

The system is designed to work on any static hosting platform without server-side processing. 