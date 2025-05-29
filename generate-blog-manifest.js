#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const blogDir = './blog';
const manifestFile = './blog-manifest.json';

// Check if jsdom is available
let useJSDOM = false;
try {
  require.resolve('jsdom');
  useJSDOM = true;
} catch (e) {
  console.log('jsdom not found. Using regex-based fallback parser.');
}

function extractMetadataWithJSDOM(htmlContent, filename) {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Extract metadata from meta tags
  const title = document.querySelector('meta[name="blog-title"]')?.getAttribute('content') || 
                document.querySelector('title')?.textContent || 
                filename.replace('.html', '');
  
  const date = document.querySelector('meta[name="blog-date"]')?.getAttribute('content') || 
               new Date().toISOString().split('T')[0];
  
  const tagsString = document.querySelector('meta[name="blog-tags"]')?.getAttribute('content') || '';
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];
  
  const excerpt = document.querySelector('meta[name="blog-excerpt"]')?.getAttribute('content') || 
                  'No excerpt available.';
  
  const readTime = document.querySelector('meta[name="blog-read-time"]')?.getAttribute('content') || 
                   '5 min read';
  
  return {
    title,
    slug: filename.replace('.html', ''),
    date,
    excerpt,
    tags,
    readTime,
    file: `blog/${filename}`
  };
}

function extractMetadataWithRegex(htmlContent, filename) {
  // Simple regex-based extraction
  const titleMatch = htmlContent.match(/name="blog-title"\s+content="([^"]+)"/);
  const dateMatch = htmlContent.match(/name="blog-date"\s+content="([^"]+)"/);
  const tagsMatch = htmlContent.match(/name="blog-tags"\s+content="([^"]+)"/);
  const excerptMatch = htmlContent.match(/name="blog-excerpt"\s+content="([^"]+)"/);
  const readTimeMatch = htmlContent.match(/name="blog-read-time"\s+content="([^"]+)"/);
  
  const title = titleMatch ? titleMatch[1] : filename.replace('.html', '');
  const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  const tagsString = tagsMatch ? tagsMatch[1] : '';
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];
  const excerpt = excerptMatch ? excerptMatch[1] : 'No excerpt available.';
  const readTime = readTimeMatch ? readTimeMatch[1] : '5 min read';
  
  return {
    title,
    slug: filename.replace('.html', ''),
    date,
    excerpt,
    tags,
    readTime,
    file: `blog/${filename}`
  };
}

function generateManifest() {
  try {
    // Read all files in the blog directory
    const files = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.html') && file !== 'index.html')
      .sort();
    
    const blogPosts = [];
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      
      const metadata = useJSDOM 
        ? extractMetadataWithJSDOM(htmlContent, file)
        : extractMetadataWithRegex(htmlContent, file);
      
      blogPosts.push(metadata);
    }
    
    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write manifest file
    fs.writeFileSync(manifestFile, JSON.stringify(blogPosts, null, 2));
    
    console.log(`Generated manifest with ${blogPosts.length} blog posts:`);
    blogPosts.forEach(post => {
      console.log(`  - ${post.title} (${post.date})`);
    });
    
  } catch (error) {
    console.error('Error generating manifest:', error.message);
    process.exit(1);
  }
}

generateManifest(); 