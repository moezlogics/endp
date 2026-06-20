"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCdnMeta = getCdnMeta;
const utils_1 = require("@medusajs/framework/utils");
const META_KEY = "__cdnFileMetaCache__";
const g = globalThis;
if (!g[META_KEY])
    g[META_KEY] = new Map();
const metaCache = g[META_KEY];
function rememberMeta(url, meta) {
    metaCache.set(url, meta);
    if (metaCache.size > 500) {
        const firstKey = metaCache.keys().next().value;
        if (firstKey)
            metaCache.delete(firstKey);
    }
}
function getCdnMeta(url) {
    return metaCache.get(url);
}
/**
 * Sanitize filename into an SEO slug — same logic as the CDN server.
 * Used to generate the slug sent alongside the upload.
 */
function toSlug(raw) {
    return raw
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 80) || "upload";
}
/**
 * Fetch with retry — retries once on network/5xx errors.
 */
async function fetchWithRetry(url, init, label) {
    try {
        const res = await fetch(url, init);
        if (res.ok || res.status < 500)
            return res;
        // 5xx error — retry once
        console.warn(`[CDN Provider] ${label}: got ${res.status}, retrying...`);
    }
    catch (err) {
        console.warn(`[CDN Provider] ${label}: network error, retrying...`, err?.message);
    }
    // Wait a moment then retry
    await new Promise((r) => setTimeout(r, 1000));
    return fetch(url, init);
}
class CdnFileProviderService extends utils_1.AbstractFileProviderService {
    constructor(container, options) {
        super();
        this.options_ = options;
    }
    async upload(file) {
        const { filename, content, mimeType } = file;
        const buffer = Buffer.from(content, "base64");
        const blob = new Blob([buffer], { type: mimeType });
        const slug = toSlug(filename);
        const formData = new FormData();
        formData.append("files", blob, filename);
        // Pass both slug and original filename → CDN uses for WordPress-style naming
        formData.append("slug", slug);
        formData.append("originalFilename", filename);
        console.log(`[CDN Provider] Uploading: "${filename}" (${(buffer.length / 1024).toFixed(1)}KB) → ${this.options_.url}`);
        const response = await fetchWithRetry(`${this.options_.url}/api/media/upload`, {
            method: "POST",
            headers: {
                "x-cdn-key": this.options_.key || "",
            },
            body: formData,
        }, `upload "${filename}"`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[CDN Provider] ❌ Upload failed: ${response.status} ${response.statusText}`, errorText);
            throw new Error(`Failed to upload to CDN: ${response.statusText} - ${errorText}`);
        }
        const { data } = await response.json();
        console.log(`[CDN Provider] ✅ Uploaded: ${data.url} | alt: "${data.alt}" | title: "${data.title}"`);
        rememberMeta(data.url, {
            alt: data.alt ?? null,
            title: data.title ?? null,
            caption: data.caption ?? null,
            width: data.width ?? null,
            height: data.height ?? null,
            thumbUrl: data.thumbUrl ?? null,
            filename: data.filename,
            createdAt: Date.now(),
        });
        return {
            url: data.url,
            key: data.filename,
        };
    }
    async delete(fileData) {
        const fileArray = Array.isArray(fileData) ? fileData : [fileData];
        for (const file of fileArray) {
            if (!file.fileKey)
                continue;
            console.log(`[CDN Provider] Deleting: ${file.fileKey}`);
            try {
                const response = await fetchWithRetry(`${this.options_.url}/api/media/delete`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-cdn-key": this.options_.key || "",
                    },
                    body: JSON.stringify({ filename: file.fileKey }),
                }, `delete "${file.fileKey}"`);
                if (!response.ok) {
                    console.error(`[CDN Provider] ❌ Delete failed: ${response.statusText}`);
                }
                else {
                    console.log(`[CDN Provider] 🗑️ Deleted: ${file.fileKey}`);
                }
            }
            catch (err) {
                console.error(`[CDN Provider] ❌ Delete error:`, err?.message);
            }
        }
    }
    async getPresignedDownloadUrl(fileData) {
        return `${this.options_.url}/uploads/${fileData.fileKey}`;
    }
    async getDownloadStream(_fileData) {
        throw new Error("Method getDownloadStream not implemented.");
    }
    async getAsBuffer(_fileData) {
        throw new Error("Method getAsBuffer not implemented.");
    }
    async getUploadStream(_fileData) {
        throw new Error("Method getUploadStream not implemented.");
    }
}
CdnFileProviderService.identifier = "cdn";
exports.default = CdnFileProviderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Nkbi1maWxlL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQ0EsZ0NBRUM7QUF2Q0QscURBQXVFO0FBd0J2RSxNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQTtBQUN2QyxNQUFNLENBQUMsR0FBRyxVQUFpQixDQUFBO0FBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFBO0FBQzFELE1BQU0sU0FBUyxHQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7QUFFbkQsU0FBUyxZQUFZLENBQUMsR0FBVyxFQUFFLElBQWE7SUFDOUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDeEIsSUFBSSxTQUFTLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUE7UUFDOUMsSUFBSSxRQUFRO1lBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxHQUFXO0lBQ3BDLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMzQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxNQUFNLENBQUMsR0FBVztJQUN6QixPQUFPLEdBQUc7U0FDUCxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztTQUN2QixXQUFXLEVBQUU7U0FDYixTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ2pCLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7U0FDL0IsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUM7U0FDNUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7U0FDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7U0FDbkIsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7U0FDckIsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxRQUFRLENBQUE7QUFDakMsQ0FBQztBQUVEOztHQUVHO0FBQ0gsS0FBSyxVQUFVLGNBQWMsQ0FDM0IsR0FBVyxFQUNYLElBQWlCLEVBQ2pCLEtBQWE7SUFFYixJQUFJLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDbEMsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRztZQUFFLE9BQU8sR0FBRyxDQUFBO1FBQzFDLHlCQUF5QjtRQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsR0FBRyxDQUFDLE1BQU0sZUFBZSxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUFDLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyw4QkFBOEIsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDN0MsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFFRCxNQUFxQixzQkFBdUIsU0FBUSxtQ0FBMkI7SUFJN0UsWUFBWSxTQUFjLEVBQUUsT0FBZ0I7UUFDMUMsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUEyQjtRQUN0QyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFFNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDN0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUU3QixNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBQy9CLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN4Qyw2RUFBNkU7UUFDN0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDN0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUU3QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixRQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFFdEgsTUFBTSxRQUFRLEdBQUcsTUFBTSxjQUFjLENBQ25DLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLG1CQUFtQixFQUN2QztZQUNFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFO2FBQ3JDO1lBQ0QsSUFBSSxFQUFFLFFBQWU7U0FDdEIsRUFDRCxXQUFXLFFBQVEsR0FBRyxDQUN2QixDQUFBO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQixNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUNyRyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixRQUFRLENBQUMsVUFBVSxNQUFNLFNBQVMsRUFBRSxDQUFDLENBQUE7UUFDbkYsQ0FBQztRQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUV0QyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixJQUFJLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxHQUFHLGVBQWUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7UUFFbkcsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSTtZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUk7WUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSTtZQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBQ3RCLENBQUMsQ0FBQTtRQUVGLE9BQU87WUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDbkIsQ0FBQTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQXlEO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVqRSxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFBRSxTQUFRO1lBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBRXZELElBQUksQ0FBQztnQkFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FDbkMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsbUJBQW1CLEVBQ3ZDO29CQUNFLE1BQU0sRUFBRSxRQUFRO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjt3QkFDbEMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUU7cUJBQ3JDO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDakQsRUFDRCxXQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FDM0IsQ0FBQTtnQkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtnQkFDekUsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUM1RCxDQUFDO1lBQ0gsQ0FBQztZQUFDLE9BQU8sR0FBUSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQy9ELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxRQUE0QjtRQUN4RCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFlBQVksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzNELENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBNkI7UUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQTZCO1FBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFjO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQTtJQUM1RCxDQUFDOztBQTdHTSxpQ0FBVSxHQUFHLEtBQUssQ0FBQTtrQkFETixzQkFBc0IifQ==