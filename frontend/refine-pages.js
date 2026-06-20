const fs = require('fs');
const path = require('path');

const MAIN_DIR = path.join(__dirname, 'src', 'app', '[countryCode]', '(main)');

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else if (file.isFile() && file.name === 'page.tsx') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function processHtmlLinks(html) {
  // Strip class names from <a> tags and clean them, adding nofollow if external
  let cleaned = html.replace(/<a([\s\S]*?)>([\s\S]*?)<\/a>/gi, (match, attrs, body) => {
    const hrefMatch = attrs.match(/href=(["'])(.*?)\1/i);
    if (!hrefMatch) return match;
    
    let href = hrefMatch[2].trim();
    const quote = hrefMatch[1];
    
    // Internal link conversion
    if (href.includes('endpolio.com.pk')) {
      let relativeHref = href.replace(/^https?:\/\/(www\.)?endpolio\.com\.pk/i, '');
      if (!relativeHref.startsWith('/')) {
        relativeHref = '/' + relativeHref;
      }
      return `<a href=${quote}${relativeHref}${quote} class="text-blue-600 hover:underline">${body}</a>`;
    }
    
    // External link conversion
    if (href.startsWith('http')) {
      return `<a href=${quote}${href}${quote} target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 hover:underline">${body}</a>`;
    }
    
    return `<a href=${quote}${href}${quote} class="text-blue-600 hover:underline">${body}</a>`;
  });
  
  return cleaned;
}

function refine() {
  console.log('Refining static pages structure and metrics...');
  const pageFiles = getFilesRecursively(MAIN_DIR);
  let refinedCount = 0;

  for (const file of pageFiles) {
    const relativePath = path.relative(MAIN_DIR, file).replace(/\\/g, '/');
    
    // Ignore pages that were not part of the static migration
    const fileContent = fs.readFileSync(file, 'utf8');
    if (!fileContent.includes('PolioInfoPage')) {
      continue;
    }
    // Skip the reusable component itself or custom template pages that have order/cart logic
    if (relativePath.includes('component/content/article/39-general/2244-polio-certificate')) {
      continue; // Skip the custom legacy certificate page
    }
    
    // Parse title, description, and canonical from the existing file
    const titleMatch = fileContent.match(/title:\s*"([\s\S]*?)"\s*,/) || fileContent.match(/title:\s*'([\s\S]*?)'\s*,/);
    const descMatch = fileContent.match(/description:\s*"([\s\S]*?)"\s*,/) || fileContent.match(/description:\s*'([\s\S]*?)'\s*,/);
    const canonicalMatch = fileContent.match(/canonical:\s*"([\s\S]*?)"/) || fileContent.match(/canonical:\s*'([\s\S]*?)'/);
    const h1Match = fileContent.match(/title="([\s\S]*?)"/) || fileContent.match(/title='([\s\S]*?)'/);
    
    const title = titleMatch ? titleMatch[1].trim() : '';
    const description = descMatch ? descMatch[1].trim() : '';
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
    const h1Title = h1Match ? h1Match[1].trim() : title;
    
    // Extract the content template literal
    const contentMatch = fileContent.match(/const content = `([\s\S]*?)`/);
    if (!contentMatch) {
      continue;
    }
    
    let rawHtml = contentMatch[1];
    
    // Strip inline styles and class attributes from paragraphs and other tags
    rawHtml = rawHtml.replace(/<p\s+class="[^"]*">/gi, '<p>');
    rawHtml = rawHtml.replace(/<p\s+class='[^']*'>/gi, '<p>');
    rawHtml = rawHtml.replace(/<div\s+class="[^"]*">/gi, '<div>');
    rawHtml = rawHtml.replace(/<div\s+class='[^']*'>/gi, '<div>');
    
    // Remove footer links/divs
    rawHtml = rawHtml.replace(/<div[^>]*border-t[^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Extract all paragraphs
    const pMatches = [...rawHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].trim());
    
    // Filter out empty or garbage paragraphs
    const filteredPs = pMatches.filter(p => {
      const pLower = p.toLowerCase();
      if (pLower.includes('www.endpolio.com.pk') || pLower.includes('endpolio.com.pk') && pLower.includes('href=')) {
        return false;
      }
      if (p.trim() === '' || p.trim() === '<br>' || p.trim() === '<br/>') {
        return false;
      }
      return true;
    });
    
    // Classify page type
    const isMediaRelease = relativePath.includes('media-releases');
    const isFieldStory = relativePath.includes('field-stories');
    const isReport = relativePath.includes('reports') || relativePath.includes('polio-briefer') || relativePath.includes('poliobriefer');
    const isUrdu = relativePath.includes('/ur/') || relativePath.includes('/urdu/') || /[\u0600-\u06FF]/.test(rawHtml);
    
    // Build structured HTML
    let structuredHtml = '';
    if (isUrdu) {
      // Urdu page structure
      if (filteredPs.length > 0) {
        structuredHtml += `<p>${filteredPs[0]}</p>\n`;
      }
      if (filteredPs.length > 1) {
        let heading1 = '<h2>اہم تفصیلات اور پس منظر</h2>';
        let heading2 = '<h2>مہم کے اثرات اور حکمت عملی</h2>';
        if (isMediaRelease) {
          heading1 = '<h2>پریس ریلیز کے اہم نکات</h2>';
          heading2 = '<h2>عوامی صحت پر اس کے اثرات</h2>';
        }
        structuredHtml += `\n${heading1}\n`;
        const mid = Math.min(3, filteredPs.length);
        for (let i = 1; i < mid; i++) {
          structuredHtml += `<p>${filteredPs[i]}</p>\n`;
        }
        if (filteredPs.length > mid) {
          structuredHtml += `\n${heading2}\n`;
          for (let i = mid; i < filteredPs.length; i++) {
            structuredHtml += `<p>${filteredPs[i]}</p>\n`;
          }
        }
      }
    } else {
      // English page structure
      if (filteredPs.length > 0) {
        structuredHtml += `<p>${filteredPs[0]}</p>\n`;
      }
      if (filteredPs.length > 1) {
        let heading1 = '<h2>Key Objectives & Focus</h2>';
        let heading2 = '<h2>Program Implementation & Next Steps</h2>';
        
        if (isMediaRelease) {
          heading1 = '<h2>Strategic Objectives & Announcement</h2>';
          heading2 = '<h2>Public Health Impact & Operations</h2>';
        } else if (isFieldStory) {
          heading1 = '<h2>Frontline Challenges & Community Action</h2>';
          heading2 = '<h2>Future Goals & Key Takeaways</h2>';
        } else if (isReport) {
          heading1 = '<h2>Core Findings & Analysis</h2>';
          heading2 = '<h2>Action Plan & Strategic Guidelines</h2>';
        }
        
        structuredHtml += `\n${heading1}\n`;
        const mid = Math.min(3, filteredPs.length);
        for (let i = 1; i < mid; i++) {
          structuredHtml += `<p>${filteredPs[i]}</p>\n`;
        }
        if (filteredPs.length > mid) {
          structuredHtml += `\n${heading2}\n`;
          for (let i = mid; i < filteredPs.length; i++) {
            structuredHtml += `<p>${filteredPs[i]}</p>\n`;
          }
        }
      }
    }
    
    // Process links inside HTML content
    const finalHtml = processHtmlLinks(structuredHtml || rawHtml);
    
    // Escape backticks and template interpolations
    const safeHtml = finalHtml
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
      
    // Generate dynamic professional metrics array
    let metricsCode = '';
    if (isUrdu) {
      metricsCode = `[
        { label: "زبان", value: "اردو (Urdu)" },
        { label: "ادارہ", value: "این ای او سی پاکستان" },
        { label: "درجہ بندی", value: "عوامی صحت" }
      ]`;
    } else if (isMediaRelease) {
      metricsCode = `[
        { label: "Document Type", value: "Press Release" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Access Level", value: "Public Access" },
        { label: "Verification", value: "Official Alert" }
      ]`;
    } else if (isFieldStory) {
      metricsCode = `[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus", value: "Community Health" },
        { label: "Staff Role", value: "Frontline Workers" },
        { label: "Scope", value: "District Level" }
      ]`;
    } else if (isReport) {
      metricsCode = `[
        { label: "Document Type", value: "NEOC Bulletin" },
        { label: "Source", value: "National EOC" },
        { label: "Format", value: "PDF Report" },
        { label: "Data Quality", value: "Verified Data" }
      ]`;
    } else {
      metricsCode = `[
        { label: "Topic", value: "Polio Eradication" },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Focus Area", value: "Health Education" }
      ]`;
    }
    
    const dirProp = isUrdu ? '\n      dir="rtl"' : '';
    const routePath = '/' + relativePath.replace(/\/page\.tsx$/, '');
    
    const newContent = `import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
  alternates: {
    canonical: "${canonical}",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = \`${safeHtml}\`

  return (
    <PolioInfoPage
      title="${h1Title.replace(/"/g, '\\"')}"
      path="${routePath}"
      contentHtml={content}
      metrics={${metricsCode}}${dirProp}
    />
  )
}
`;

    fs.writeFileSync(file, newContent, 'utf8');
    refinedCount++;
  }
  
  console.log(`Successfully refined ${refinedCount} storefront pages with professional layouts and metrics!`);
}

refine();
