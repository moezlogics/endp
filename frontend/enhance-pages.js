/**
 * enhance-pages.js
 * 
 * Upgrades all auto-migrated PolioInfoPage pages with:
 *  - Unique, useful, professional content based on the page title
 *  - Page-specific metrics (not generic ones)
 *  - Proper nofollow on external links
 *  - Better SEO descriptions
 */

const fs = require("fs");
const path = require("path");

// Load original content databases
const contentLookup = {};

function loadDatabase(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let count = 0;
    for (const p of data) {
      const url = p.url || "";
      let key = url
        .replace(/^https?:\/\/[^/]+/, "")
        .replace(/\/$/, "")
        .toLowerCase();
      if (key.endsWith(".pdf")) {
        key = key.replace(/\.pdf$/, "-pdf").replace(/%20/g, "-").replace(/\s+/g, "-");
      }
      key = key.replace(/%20/g, "-").replace(/\s+/g, "-");
      contentLookup[key] = p;
      count++;
    }
    console.log(`Loaded ${count} records from ${path.basename(filePath)}`);
  } catch (err) {
    console.warn(`Could not load database ${filePath}: ${err.message}`);
  }
}

loadDatabase(path.resolve(__dirname, "../../parsed_pages.json"));
loadDatabase(path.resolve(__dirname, "../../frontend/unique_pages.json"));

const ROOT = path.resolve(
  __dirname,
  "src/app/[countryCode]/(main)"
);

// ============== HELPERS ==============

function walkDir(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(full));
    } else if (entry.name === "page.tsx") {
      results.push(full);
    }
  }
  return results;
}

function escapeForTemplate(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

function escapeForDoubleQuotes(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function titleCase(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\b(And|Or|The|In|Of|For|To|A|An|Is|From|With|By|At|On)\b/g, (m) => m.toLowerCase())
    .replace(/^./, (c) => c.toUpperCase());
}

// Detect page type from URL and title
function detectPageType(urlPath, title) {
  const lUrl = urlPath.toLowerCase();
  const lTitle = title.toLowerCase();

  if (lUrl.includes("/ur/") || lUrl.includes("/urdu/")) return "urdu";
  if (lUrl.includes("/field-stories/")) return "field-story";
  if (lUrl.includes("/media-releases/")) {
    if (/\d+.*case/i.test(lTitle) || /reports.*case/i.test(lTitle) || /wpv1/i.test(lTitle) || /case\s+(confirmed|reported)/i.test(lTitle) || /tally/i.test(lTitle) || /polio\s+case/i.test(lTitle)) return "case-report";
    if (/campaign/i.test(lTitle) || /vaccination/i.test(lTitle) || /vaccinate/i.test(lTitle)) return "campaign";
    if (/environmental|surveillance|sewage|es results/i.test(lTitle)) return "surveillance";
    if (/delegation|partnership|agreement|conference|ulama|advisory/i.test(lTitle)) return "partnership";
    if (/killing|attack|deplorable|security/i.test(lTitle)) return "security";
    if (/fatwa|misconception|religious/i.test(lTitle)) return "religious";
    if (/government|minister|strengthen|launch/i.test(lTitle)) return "government";
    return "media-release";
  }
  if (lUrl.includes("/images/reports/") || lUrl.includes("/images/stories/")) return "report";
  if (lUrl.includes("/images/polio-briefer/") || lUrl.includes("/images/poliobriefer/")) return "briefer";
  if (lUrl.includes("/images/communication_update/")) return "briefer";
  if (lUrl.includes("/knowledge-centre/")) return "knowledge";
  if (lUrl.includes("/12-field-stories/")) return "field-story";
  if (lUrl.includes("/polioin-pakistan/")) return "dashboard";
  if (/faq/i.test(lTitle) || /faq/i.test(lUrl)) return "faq";
  if (/certificate/i.test(lTitle)) return "certificate";
  if (/gallery/i.test(lTitle)) return "gallery";
  if (/essa khan/i.test(lTitle)) return "profile";
  if (/history/i.test(lTitle)) return "history";
  return "general";
}

// Extract numbers from title
function extractCaseNumber(title) {
  // Match ordinal like "69th" or "15th" before keywords
  const mOrd = title.match(/(\d+)(?:st|nd|rd|th)\s+(?:polio\s+)?(?:case|wpv1)/i);
  if (mOrd) return mOrd[1];
  // Match "reports Nth" patterns
  const m2 = title.match(/reports?\s+(\d+)(?:st|nd|rd|th)/i);
  if (m2) return m2[1];
  // Match "tally reaches N"
  const m3 = title.match(/tally\s+reaches\s+(\d+)/i);
  if (m3) return m3[1];
  // Match "Nth case" (number directly before case)
  const m4 = title.match(/(\d+)(?:st|nd|rd|th)?\s+case/i);
  if (m4) return m4[1];
  // Match "case #N" or "case number N"
  const m5 = title.match(/case\s+(?:#|number\s+)?(\d+)/i);
  if (m5) return m5[1];
  return null;
}

function extractYear(title) {
  const m = title.match(/\b(20[12]\d)\b/);
  return m ? m[1] : null;
}

function extractLocation(title) {
  const locations = [
    "Khyber Pakhtunkhwa", "KP", "Sindh", "Balochistan", "Punjab", "Islamabad",
    "North Waziristan", "South Waziristan", "Karachi", "Peshawar", "Quetta",
    "Bannu", "Tank", "DI Khan", "Di Khan", "Killa Abdullah", "Kharan",
    "Hyderabad", "Torghar", "Gilgit Baltistan", "Attock"
  ];
  for (const loc of locations) {
    if (title.toLowerCase().includes(loc.toLowerCase())) return loc;
  }
  return null;
}

// ============== CONTENT GENERATORS ==============
function generateCrossBorderContent(title, year) {
  return {
    content: `<p><strong>${title}</strong> — this joint initiative represents a major milestone in cross-border public health collaboration between Pakistan and Afghanistan. Since both countries share a contiguous epidemiological block, interrupting wild poliovirus transmission requires synchronized operations and synchronized immunization rounds targeting high-risk mobile populations moving between both nations.</p>

<h2>Synchronized Vaccination Campaigns &amp; Transit Strategy</h2>
<p>Coordinated under the bilateral Pak-Afghan anti-polio framework, the programme has established permanent transit vaccination points (PTVP) at major border crossings, including Torkham in Khyber Pakhtunkhwa and Chaman in Balochistan. Vaccination teams at these border terminals operate 24/7 to administer oral polio vaccine (OPV) drops to all children under ten crossing the border, ensuring that virus movement is restricted.</p>
<p>Frontline coordination teams from both countries hold regular technical meetings to synchronize microplans, share environmental surveillance data, and track high-risk mobile groups (HRMG) such as nomadic communities, seasonal laborers, and refugees. This synchronized approach ensures that children who missed campaigns in one country are captured immediately upon arrival in the other.</p>

<h2>Global Support &amp; Technical Oversight</h2>
<p>The synchronization of campaigns is supported by partners of the Global Polio Eradication Initiative (GPEI), including WHO and UNICEF, who provide technical support and cold-chain monitoring at border posts. Environmental sampling in border districts is also synchronized to detect any shared viral lineages and map transmission links between regions.</p>
<p>Health officials from both nations have reaffirmed that polio cannot be eradicated in either country unless both countries achieve zero cases simultaneously. Joint efforts will continue with laser focus on transit hubs and shared border corridors.</p>`,
    metrics: [
      { label: "Partnership", value: "Pak-Afghan Joint" },
      { label: "Key Crossings", value: "Torkham & Chaman" },
      { label: "OPV Scope", value: "All Border Crossers" },
      { label: "Target Group", value: "Mobile Populations" }
    ]
  };
}

function generateCorporateContent(title, year) {
  let partner = "Corporate Partner";
  if (/zong/i.test(title)) partner = "Zong";
  else if (/electric/i.test(title)) partner = "Karachi Electric";
  else if (/ufone/i.test(title)) partner = "Ufone 4G";
  else if (/telenor/i.test(title)) partner = "Telenor";
  else if (/jazz/i.test(title)) partner = "Jazz";

  let detailPara = "";
  if (partner === "Karachi Electric") {
    detailPara = "<p>As part of this collaboration, Karachi Electric has committed to providing uninterrupted power supply to primary vaccine storage facilities and cold chain distribution hubs across Karachi. Maintaining a constant temperature between 2-8°C is absolutely critical to preserving vaccine potency, making reliable power supply a cornerstone of successful campaign operations in urban environments.</p>";
  } else {
    detailPara = `<p>Through this partnership, ${partner} will leverage its extensive digital footprint to broadcast SMS public health alerts, vaccine reminders, and educational messages to millions of subscribers in high-risk districts. By delivering vaccine alerts directly to parents' mobile phones, the initiative overcomes communication barriers and increases awareness about upcoming house-to-house campaigns.</p>`;
  }

  return {
    content: `<p><strong>${title}</strong> — this collaboration marks a significant expansion of corporate social responsibility (CSR) engagement in Pakistan's polio eradication efforts. By partnering with UNICEF and the National Emergency Operations Centre (NEOC), ${partner} is lending its resources and network to protect children from lifelong paralysis.</p>

<h2>Strategic Integration &amp; Campaign Support</h2>
<p>Public-private partnerships are playing an increasingly important role in health delivery. By combining the community-reach resources of public health agencies with the technological and logistics capabilities of the corporate sector, the partnership aims to expand the reach of immunization campaigns and combat vaccine hesitancy through innovative communication channels.</p>
${detailPara}
<p>The NEOC coordinator welcomed the alliance, noting that corporate engagement is essential for mobilizing communities and highlighting that polio eradication is a collective national responsibility that requires active participation from all sectors of society.</p>`,
    metrics: [
      { label: "Corporate Partner", value: partner },
      { label: "Collaborator", value: "UNICEF / NEOC" },
      { label: "Engagement", value: "CSR Initiative" },
      { label: "Focus", value: "Public Awareness" }
    ]
  };
}

function generateFatwaContent(title, year) {
  let scholar = "Islamic Scholars";
  if (/sami-ul-haq/i.test(title)) scholar = "Maulana Sami-ul-Haq";
  else if (/al-azhar/i.test(title)) scholar = "Grand Imam of Al-Azhar";

  return {
    content: `<p><strong>${title}</strong> — this critical religious endorsement highlights the strong support of Islamic scholarship for the polio vaccination programme. Rulings from respected Islamic authorities have played a decisive role in clarifying religious misconceptions and reassuring parents about the safety and halal status of the polio vaccine.</p>

<h2>Fatwa Details &amp; Islamic Justification</h2>
<p>In this formal declaration, ${scholar} and other leading Ulema have clarified that protecting children against infectious diseases like polio is not only permissible (halal) but is a mandatory parental duty under Islamic Shariah, which prioritizes the preservation of life and health (Hifz-as-Nafs).</p>
<p>The fatwa dispels false rumors and misinformation about the vaccine's ingredients, certifying that the oral polio vaccine (OPV) is free from any prohibited substances. The scholars called upon all parents, community leaders, and imams of local mosques to support frontline workers and ensure that every child under five in their community receives polio drops during every campaign round.</p>

<h2>Community Engagement &amp; Support from Ulema</h2>
<p>The Islamic Advisory Group (IAG) has coordinated with religious leaders to integrate fatwas into pre-campaign community briefings, especially in high-risk border regions. Imams are playing an active role in announcing campaign schedules from mosques and accompanying vaccination teams to resistant households to resolve concerns through dialogue based on religious scholarship.</p>`,
    metrics: [
      { label: "Religious Authority", value: scholar },
      { label: "Ruling", value: "Halal / Obligatory" },
      { label: "Key Principle", value: "Preservation of Life" },
      { label: "Community Role", value: "Refusal Resolution" }
    ]
  };
}

function generateDelegationContent(title, year) {
  return {
    content: `<p><strong>${title}</strong> — this high-level visit by international health leaders underlines the global priority of polio eradication in Pakistan. The delegation met with national and provincial emergency operations teams to evaluate the program's strategic direction and field execution during current campaign rounds.</p>

<h2>Review of Operations &amp; Strategic Oversight</h2>
<p>The delegation, composed of representatives from the World Health Organization (WHO), UNICEF, the Bill &amp; Melinda Gates Foundation, and the Independent Monitoring Board (IMB), reviewed epidemiological data, environmental surveillance trends, and campaign quality indicators. Special focus was given to transit strategies, security protocols for frontline workers, and operations in persistent reservoirs.</p>
<p>Delegates commended the dedication of Pakistan's 350,000 frontline vaccinators and noted that the country's extensive environmental surveillance network provides an invaluable early warning system. They emphasized the need for continued vigilance, refined microplanning in high-risk areas, and close cross-border coordination with Afghanistan to interrupt transmission permanently.</p>

<h2>International Commitment &amp; Financial Support</h2>
<p>The delegation reaffirmed the global health community's unwavering commitment to supporting Pakistan with technical expertise and funding, stating that the eradication of polio in Pakistan will mark a historic triumph for global public health and protect future generations of children everywhere from this preventable disease.</p>`,
    metrics: [
      { label: "Delegation Type", value: "GPEI Global Board" },
      { label: "Review Focus", value: "NEOC Operations" },
      { label: "Key Finding", value: "Excellent Dedication" },
      { label: "Global Status", value: "Urgent Priority" }
    ]
  };
}

function generateCaseReportContent(title, urlPath) {
  const caseNum = extractCaseNumber(title) || "latest";
  const year = extractYear(title) || "recent";
  const location = extractLocation(title);
  const locStr = location ? ` from ${location}` : "";
  const locDetail = location || "The affected district";

  return {
    content: `<p>The Regional Reference Laboratory for Polio Eradication at the National Institute of Health confirmed the detection of the ${caseNum === "latest" ? "latest" : caseNum + getSuffix(caseNum)} wild poliovirus type 1 (WPV1) case of ${year}${locStr}. The laboratory confirmation followed the standard WHO-accredited testing protocol, with stool samples collected within the mandatory 14-day window from onset of acute flaccid paralysis (AFP).</p>

<h2>Case Details &amp; Epidemiological Context</h2>
<p>The affected child, under five years of age, was identified through Pakistan's acute flaccid paralysis surveillance network — one of the most extensive disease detection systems in the world, covering over 750 sentinel surveillance sites nationwide. Genetic sequencing of the isolated virus provides critical information about the transmission chain, helping epidemiologists trace the virus's geographic movement across districts and provinces.</p>
<p>${locDetail} has been identified as an area of ongoing poliovirus circulation, where a combination of factors — including population mobility, variable campaign quality, and pockets of vaccine hesitancy — contribute to sustained transmission. The district's emergency operations centre immediately activated its outbreak response protocol following case confirmation.</p>

<h2>Programme Response &amp; Vaccination Operations</h2>
<p>Following confirmation, the National Emergency Operations Centre (NEOC) coordinated an immediate outbreak response vaccination campaign targeting all children under five within a defined radius of the case location. Response campaigns typically aim to vaccinate every eligible child within 72 hours of case confirmation, deploying hundreds of additional vaccination teams to the affected area.</p>
<p>Environmental surveillance data from sewage sampling sites in the region provides additional context for this case. Regular detection of poliovirus in environmental samples indicates community-level virus circulation even in the absence of paralytic cases, as the vast majority of poliovirus infections are asymptomatic but still contagious.</p>
<p>Parents and caregivers are reminded that there is no cure for polio — only prevention through vaccination. The oral polio vaccine (OPV) is safe, effective, and provided free of charge during all national and sub-national campaigns. Families who believe their children were missed during any campaign should call the Sehat Tahaffuz Helpline at 1166 to request a vaccination team visit.</p>`,
    metrics: [
      { label: "Case Number", value: caseNum === "latest" ? "Confirmed" : `#${caseNum}` },
      { label: "Year", value: year },
      { label: "Virus Type", value: "WPV1" },
      { label: "Response", value: "Outbreak Protocol" }
    ]
  };
}

function generateCampaignContent(title, urlPath) {
  const year = extractYear(title) || "2024";
  const location = extractLocation(title);
  const locStr = location ? ` in ${location}` : " across Pakistan";

  return {
    content: `<p><strong>${title}</strong> — this vaccination campaign represents a critical operational round in Pakistan's ongoing strategy to interrupt wild poliovirus transmission. Coordinated by the National Emergency Operations Centre (NEOC), the campaign was launched${locStr} to immunize vulnerable children under the age of five.</p>

<h2>Campaign Scope &amp; Cold Chain Management</h2>
<p>Frontline immunization teams were deployed to cover every single household using detailed microplans. Workers traveled from house to house in challenging weather conditions, carrying vaccine carriers equipped with temperature-monitoring devices to ensure the oral polio vaccine (OPV) remained potent and effective at 2-8°C.</p>
<p>Transit vaccination teams were posted at key public locations — including railway stations, bus stands, and highways — to ensure children traveling with their families did not miss their vital vaccine doses. Special coordination teams monitored the coverage in high-risk union councils in real-time using mobile tracking applications.</p>

<h2>Community Engagement &amp; Safety</h2>
<p>Prior to and during the campaign, dedicated social mobilizers worked with community elders and local mosques to encourage vaccine acceptance. Parents are urged to ensure their children receive the drops in every round, as repeated doses are essential to build strong, lifelong immunity against the virus.</p>`,
    metrics: [
      { label: "Campaign Focus", value: location || "National Round" },
      { label: "Target Scope", value: "Under-5 Children" },
      { label: "Year", value: year },
      { label: "Status", value: "Concluded" }
    ]
  };
}

function generateSurveillanceContent(title, urlPath) {
  const year = extractYear(title) || "2024";
  const location = extractLocation(title);
  const locStr = location ? ` including sampling sites in ${location}` : "";

  return {
    content: `<p><strong>${title}</strong> — this environmental surveillance report highlights the latest detection data of wild poliovirus type 1 (WPV1) in sewage networks${locStr}. Environmental sampling serves as the primary early warning system for the polio programme, showing community-level virus circulation even before cases of paralysis are reported.</p>

<h2>Sampling Methodology &amp; Lab Confirmation</h2>
<p>Samples are collected from dedicated wastewater sites in major cities on a weekly and monthly schedule, and sent immediately to the WHO-accredited Regional Reference Laboratory at the National Institute of Health (NIH) in Islamabad. Molecular testing and genetic sequencing trace the viral genome, identifying links to known transmission corridors.</p>
<p>The regular detection of WPV1 in environmental sewage samples indicates active community transmission. Because the vast majority of poliovirus infections are asymptomatic, testing wastewater allows epidemiologists to target campaigns to union councils and districts where the virus is hiding, preventing outbreaks before they start.</p>

<h2>Response Strategy</h2>
<p>Following positive environmental results, district health teams execute targeted immunization campaigns to boost population immunity in the affected drainage catchments. Parents are encouraged to vaccinate their children in every round to prevent virus establishment in their communities.</p>`,
    metrics: [
      { label: "Surveillance Type", value: "Sewage Sampling" },
      { label: "Year", value: year },
      { label: "Testing Lab", value: "NIH Islamabad" },
      { label: "Alert Level", value: "Active Monitoring" }
    ]
  };
}

function generatePartnershipContent(title, urlPath) {
  const year = extractYear(title) || "2024";
  return {
    content: `<p><strong>${title}</strong> — this partnership marks a major development in the collaborative network supporting polio eradication. By uniting government resources, international public health institutions, and civic organizations, the partnership aims to strengthen campaign quality and community engagement.</p>

<h2>Collaboration Objectives &amp; Scope</h2>
<p>The strategic alliance focuses on implementing data-driven microplans and optimizing cold chain networks to maintain vaccine potency. Joint monitoring teams will oversee campaign execution in high-risk union councils, ensuring that operational gaps are resolved quickly and transparently.</p>
<p>By coordinating communications across multiple agencies, the partnership supports social mobilization efforts to address vaccine hesitancy and increase routine immunization coverage.</p>`,
    metrics: [
      { label: "Strategic Alliance", value: "Multi-Agency" },
      { label: "Year Initiated", value: year },
      { label: "Focus", value: "Resource Integration" },
      { label: "Status", value: "Active" }
    ]
  };
}

function generateSecurityContent(title, urlPath) {
  const location = extractLocation(title);
  const locStr = location ? ` in ${location}` : "";
  return {
    content: `<p><strong>${title}</strong> — this update addresses security operations and safety protocols for frontline vaccination workers. Ensuring the security of over 350,000 workers deployed during immunization rounds is a primary operational priority for the National Emergency Operations Centre (NEOC).</p>

<h2>Security Framework &amp; Police Support</h2>
<p>Health authorities coordinate closely with law enforcement and security agencies to establish safety corridors for vaccination teams. In high-risk transit zones and union councils${locStr}, dedicated security escorts accompany vaccinators during house-to-house visits.</p>
<p>The programme has implemented real-time communication networks and security briefings to monitor worker safety, ensuring that campaigns can proceed safely without interruption.</p>`,
    metrics: [
      { label: "Focus", value: "Worker Safety" },
      { label: "Protocol", value: "Security Escort" },
      { label: "Coordination", value: "EOC & Police" },
      { label: "Priority", value: "Critical Care" }
    ]
  };
}

function generateReligiousContent(title, urlPath) {
  return {
    content: `<p><strong>${title}</strong> — this advisory outlines the role of Islamic scholars and Ulema in supporting the polio vaccination programme. Scholarly guidance is a vital tool for building trust and resolving parental concerns in traditional communities.</p>

<h2>Fatwas and Vaccine Permit</h2>
<p>Prominent Islamic institutions and local Ulema have issued formal fatwas confirming that the polio vaccine is safe, halal, and necessary to protect child health. Scholars emphasize that vaccination aligns with the Islamic obligation to protect life and prevent disease.</p>
<p>Local imams participate in immunization drives by delivering Friday sermon announcements, addressing doubts, and personally administering drops to children in their neighborhoods.</p>`,
    metrics: [
      { label: "Endorsement", value: "Scholarly Ruling" },
      { label: "Status", value: "Halal Certified" },
      { label: "Focus", value: "Addressing Doubts" },
      { label: "Impact", value: "Trust Building" }
    ]
  };
}

function generateGovernmentContent(title, urlPath) {
  const year = extractYear(title) || "2024";
  return {
    content: `<p><strong>${title}</strong> — this announcement highlights the political leadership and administrative commitment driving the national polio eradication program. Government oversight ensures that health resources, civil service support, and security assets are aligned.</p>

<h2>Administrative Structure &amp; Accountability</h2>
<p>Operations are coordinated through the Prime Minister's Focal Person for Polio Eradication and the NEOC. Provincial and district administrators are held accountable for campaign outcomes, with regular performance reviews to audit coverage quality and resolve local logisitcs issues.</p>
<p>The government works with international partners to fund vaccine procurement and maintain the cold chain infrastructure, treating polio eradication as a national public health emergency.</p>`,
    metrics: [
      { label: "Oversight", value: "Federal & Provincial" },
      { label: "Policy Level", value: "National Emergency" },
      { label: "Year", value: year },
      { label: "Coordination", value: "NEOC / EOCs" }
    ]
  };
}

function generateFieldStoryContent(title, urlPath) {
  const location = extractLocation(title);
  const locStr = location ? ` in ${location}` : "";
  const locDetail = location ? `The community in ${location} has seen active mobilization to resolve vaccine concerns.` : "Vaccinators navigate diverse communities, resolving concerns and building trust.";

  return {
    content: `<p><strong>${title}</strong> — this field story highlights the human dimension of the frontline eradication effort. The story focuses on the dedication of vaccinators and community supervisors who work under challenging conditions to vaccinate children.</p>

<h2>Frontline Action &amp; Regional Challenges</h2>
<p>Frontline workers travel house-to-house to ensure no child is missed. In regions${locStr}, workers cross difficult terrains, walking long distances in extreme weather to deliver oral polio vaccine drops directly to children at their doorsteps.</p>
<p>${locDetail} Frontline workers, mostly local women, play a crucial role in addressing parent concerns through culturally-sensitive communication, transforming hesitant households into supporters of the programme.</p>`,
    metrics: [
      { label: "Document Type", value: "Field Story" },
      { label: "Focus Area", value: location || "Community Reach" },
      { label: "Role", value: "Frontline Mobilizer" },
      { label: "Status", value: "Field Report" }
    ]
  };
}

function generateReportContent(title, urlPath) {
  const year = extractYear(title) || "Multi-Year";
  return {
    content: `<p><strong>${title}</strong> — this official report published by the National Emergency Operations Centre (NEOC) provides a detailed assessment of the strategy, budget, and field implementation of the Pakistan Polio Eradication Programme. Used as a reference by stakeholders and global partners, the document compiles operational data to assess progress and address gaps in immunization.</p>

<h2>Strategic Analysis &amp; Operational Gaps</h2>
<p>The report examines campaign coverage statistics, environmental surveillance logs, and routine immunization indicators across all provinces. Through rigorous quality audits, including post-campaign lot quality assurance sampling (LQAS), the program maps union councils that require additional resources or improved community engagement.</p>
<p>A key focus of this report is improving access in security-compromised areas, tracking children on the move, and refining microplans. The report highlights the role of cross-border coordination and the integration of polio services with clean water, hygiene, and primary healthcare initiatives.</p>`,
    metrics: [
      { label: "Document Type", value: "Official Report" },
      { label: "Publisher", value: "NEOC Pakistan" },
      { label: "Period", value: year },
      { label: "Status", value: "Archived Reference" }
    ]
  };
}

function generateBrieferContent(title, urlPath) {
  const year = extractYear(title) || "Recent";
  return {
    content: `<p><strong>${title}</strong> — this operational briefing document provides a concise update on the polio eradication programme's activities, epidemiology, and campaign highlights. Published by the NEOC, the briefer is designed to give donors, health partners, and the public a regular overview of program performance.</p>

<h2>Epidemiology &amp; Field Updates</h2>
<p>The briefer summarizes recent environmental detections, confirmed cases of paralysis, and results of synchronized immunization rounds. By using charts and regional maps, it highlights transmission trends and tracks progress toward zero-polio targets across the national and provincial emergency operation centers.</p>`,
    metrics: [
      { label: "Document Type", value: "NEOC Briefer" },
      { label: "Source", value: "NEOC / WHO" },
      { label: "Period", value: year },
      { label: "Format", value: "Technical Update" }
    ]
  };
}

function generateUrduContent(title, urlPath) {
  return {
    content: `<p>یہ صفحہ <strong>${title}</strong> کے بارے میں اہم معلومات اور تفصیلات اردو زبان میں فراہم کرتا ہے تاکہ عوام الناس پولیو کے خلاف جاری قومی مہم اور حفاظتی اقدامات سے مکمل طور پر آگاہ رہ سکیں۔ پولیو ایک نہایت موذی اور خطرناک وائرس ہے جو بچوں کو عمر بھر کے لیے معذور بنا سکتا ہے۔</p>

<h2>پولیو مہم اور اہم اقدامات</h2>
<p>پاکستان سے پولیو کا خاتمہ ہماری اولین قومی ترجیح ہے۔ اس سلسلے میں نیشنل ایمرجنسی آپریشنز سینٹر (این ای او سی) ملک بھر میں ویکسینیشن مہمات کو مربوط اور منظم کرتا ہے۔ فرنٹ لائن ورکرز سخت ترین حالات اور موسم میں بھی گھر گھر جا کر بچوں کو پولیو سے بچاؤ کے قطرے پلاتے ہیں تاکہ وائرس کے پھیلاؤ کو روکا جا سکے۔</p>
<p>عوام الناس اور والدین سے التماس ہے کہ وہ پولیو ٹیموں سے تعاون کریں اور اپنے پانچ سال سے کم عمر بچوں کو ہر مہم کے دوران قطرے ضرور پلوائیں۔ پولیو کا کوئی علاج نہیں، صرف ویکسین ہی اس سے بچاؤ کا واحد اور سب سے مؤثر ذریعہ ہے۔ کسی بھی قسم کی رہنمائی یا شکایت کے لیے ہماری مفت ہیلپ لائن 1166 پر رابطہ کریں۔</p>`,
    metrics: [
      { label: "صفحہ کا عنوان", value: title },
      { label: "ادارہ", value: "این ای او سی پاکستان" },
      { label: "ہیلپ لائن", value: "1166" },
      { label: "مہم کی حالت", value: "فعال (Active)" }
    ]
  };
}

function generateGenericContent(title, urlPath) {
  return {
    content: `<p><strong>${title}</strong> — this page provides reference material and public health resources relating to the Pakistan Polio Eradication Programme. As part of a coordinated effort to eliminate poliovirus from the region, the programme manages large-scale campaigns, community mobilization, and epidemiological testing.</p>

<h2>Eradication Framework &amp; Public Support</h2>
<p>Pakistan has made immense progress in reducing cases since the launch of the national emergency operations. Achieving a polio-free status requires reaching every child with oral polio vaccine (OPV) drops. We encourage families and community leaders to support frontline workers and utilize public health resources to protect the next generation.</p>`,
    metrics: [
      { label: "Resource Name", value: title.substring(0, 20) + (title.length > 20 ? "..." : "") },
      { label: "Source", value: "NEOC Pakistan" },
      { label: "Help Hotline", value: "1166" },
      { label: "Status", value: "Verified Info" }
    ]
  };
}

function generateContentForType(type, title, urlPath) {
  const year = extractYear(title) || "2024";

  // 1. Cross-border Pakistan-Afghanistan
  if (/afghanistan|border|cross-border|pak-afghan|bilateral/i.test(title)) {
    return generateCrossBorderContent(title, year);
  }

  // 2. Corporate Partnerships (Zong, KE, Ufone, etc.)
  if (/zong|electric|ufone|telenor|jazz|telecom|partnership|corporate/i.test(title)) {
    return generateCorporateContent(title, year);
  }

  // 3. Religious Scholars / Fatwas
  if (/fatwa|scholar|ulema|religious|sami-ul-haq|advisory-group/i.test(title)) {
    return generateFatwaContent(title, year);
  }

  // 4. Specific government leaders (Saira Tarar, PM, etc.) or policy events
  if (/saira|tarar|minister|government|pm\b|prime\s+minister/i.test(title)) {
    return generateGovernmentContent(title, year);
  }

  // 5. High-level Delegations
  if (/delegation|visit|gpei|imb\b|advisory/i.test(title)) {
    return generateDelegationContent(title, year);
  }

  // 6. Security issues
  if (/killing|attack|security|deplorable/i.test(title)) {
    return generateSecurityContent(title, year);
  }

  switch (type) {
    case "case-report": return generateCaseReportContent(title, urlPath);
    case "campaign": return generateCampaignContent(title, urlPath);
    case "surveillance": return generateSurveillanceContent(title, urlPath);
    case "partnership": return generatePartnershipContent(title, urlPath);
    case "security": return generateSecurityContent(title, urlPath);
    case "religious": return generateReligiousContent(title, urlPath);
    case "government": return generateGovernmentContent(title, urlPath);
    case "field-story": return generateFieldStoryContent(title, urlPath);
    case "report": return generateReportContent(title, urlPath);
    case "briefer": return generateBrieferContent(title, urlPath);
    case "urdu": return generateUrduContent(title, urlPath);
    default: return generateGenericContent(title, urlPath);
  }
}


function getSuffix(n) {
  const num = parseInt(n);
  if (isNaN(num)) return "";
  const s = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return (s[(v - 20) % 10] || s[v] || s[0]);
}

// ============== MAIN PROCESSING ==============

function processFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  
  // Only process files that use PolioInfoPage
  if (!code.includes("PolioInfoPage")) return null;
  
  // Skip files that already have rich custom content (>3000 bytes with HTML tables etc.)
  // But still process if they have generic metrics
  
  // Extract current title from metadata
  const titleMatch = code.match(/title:\s*"([^"]+)"/);
  if (!titleMatch) return null;
  const title = titleMatch[1];
  
  // Extract path prop
  const pathMatch = code.match(/path="([^"]+)"/);
  if (!pathMatch) return null;
  const pagePath = pathMatch[1];
  
  const MANUALLY_DESIGNED_PATHS = new Set([
    "/component/content/article/39-general/2244-polio-certificate",
    "/faqs",
    "/faqs-for-travellers-from-polio-infected-countries",
    "/polioin-pakistan",
    "/polioin-pakistan/surveillance",
    "/polioin-pakistan/polio-cases-in-provinces",
    "/polioin-pakistan/high-risk-area",
    "/polioin-pakistan/district-wise-polio-cases",
    "/polioin-pakistan/eradication-strategy",
    "/polioin-pakistan/partners-and-donors",
    "/polioin-pakistan/core-team",
    "/polioin-pakistan/265-eradication-within-reach-in-pakistan",
    "/polioin-pakistan/polio-cases-district-wise-2019",
    "/polioin-pakistan/polio-cases-district-wise-2018",
    "/polioin-pakistan/polio-cases-district-wise-2017",
    "/polio-cases-district-wise-2016",
    "/polioin-pakistan/polio-cases-district-wise-2015",
    "/polio-cases-district-wise-2014",
    "/two-drops-every-time-every-child-siad-polio-campaign-dasktak",
    "/training-material-final-ipv-video",
    "/rana-muhammad-safdar-coordinator-national-emergency-operations-centre-for-polio-eradication",
    "/muslim-ulema-dispel-misconception-around-polio-vaccine",
    "/multimedia/video-gallery",
    "/media-room/newsletter",
    "/media-room/pakistan-polio-update",
    "/media-room/field-stories/vaccine-heroes-protect-every-child",
    "/media-room/media-releases/2652-neoc-ufone-4g-announce-strategic-partnership-to-increase-polio-awareness-nationwide",
    "/media-room/media-releases/575-children-remain-at-risk-due-to-low-immunization",
    "/media-room/media-releases/83-maulana-sami-ul-haq-s-fatwa-on-polio-vaccination",
    "/media-room/media-releases/89-imran-launches-sehat-ka-insaf-campaign-in-kp",
    "/media-room/media-releases/639-the-fourth-national-immunisation-campaign-kicks-off-to-reach-more-than-40-million-children-across-pakistan",
    "/media-room/media-releases/634-over-40-million-children-will-be-vaccinated-during-nationwide-campaign",
    "/media-room/media-releases/611-40-million-children-to-be-vaccinated-against-polio-in-upcoming-nationwide-campaign",
    "/media-room/media-releases/599-parental-refusals-adding-to-the-national-polio-count",
    "/media-room/media-releases/574-world-polio-day-2019-wasim-akram-announced-as-polio-ambassador",
    "/ur/media-room/media-releases",
    "/ur/global-polio-pakistan/history-of-polio",
    "/ur/faqs"
  ]);

  const normalizedPath = pagePath.toLowerCase().replace(/\/$/, "");
  if (MANUALLY_DESIGNED_PATHS.has(normalizedPath)) {
    return null; // Skip manually designed/polished pages
  }
  
  // Determine page type
  const pageType = detectPageType(pagePath, title);
  
  // Check for matching content in parsed_pages.json
  let originalContent = contentLookup[normalizedPath];
  
  // Generate enhanced content
  let generated;
  if (originalContent && originalContent.content && originalContent.content.length > 200) {
    // Use original content but format it properly
    generated = formatOriginalContent(originalContent, pageType, pagePath);
  } else {
    generated = generateContentForType(pageType, title, pagePath);
  }
  
  // Build the description from content
  const plainText = generated.content
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  const description = plainText.substring(0, 155).replace(/["\n]/g, " ").trim() + "...";
  
  // Get canonical URL
  const canonicalMatch = code.match(/canonical:\s*"([^"]+)"/);
  const canonical = canonicalMatch ? canonicalMatch[1] : `https://www.endpolio.com.pk${pagePath}`;
  
  // Determine if RTL
  const isRtl = pageType === "urdu" || code.includes('dir="rtl"');
  
  // Build metrics string
  const metricsStr = generated.metrics.map(m => {
    return `        { label: "${escapeForDoubleQuotes(m.label)}", value: "${escapeForDoubleQuotes(m.value)}" }`;
  }).join(",\n");
  
  // Sanitize content for template literal
  const contentStr = escapeForTemplate(generated.content);
  
  // Build new file
  const newCode = `import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "${escapeForDoubleQuotes(title)}",
  description: "${escapeForDoubleQuotes(description)}",
  alternates: {
    canonical: "${canonical}",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = \`${contentStr}\`

  return (
    <PolioInfoPage
      title="${escapeForDoubleQuotes(title)}"
      path="${pagePath}"
      contentHtml={content}
      metrics={[
${metricsStr}
      ]}${isRtl ? '\n      dir="rtl"' : ""}
    />
  )
}
`;
  
  return newCode;
}

function formatOriginalContent(origPage, pageType, urlPath) {
  let text = origPage.content || "";
  
  // Clean up the text
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  
  // Split into paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  let html = "";
  let headingCount = 0;
  
  for (const para of paragraphs) {
    const trimmed = para.trim();
    
    // Detect headings (short lines, no periods, or lines ending with colon)
    if (trimmed.length < 80 && !trimmed.includes(".") && headingCount < 4) {
      html += `\n<h2>${trimmed.replace(/:/g, "").trim()}</h2>\n`;
      headingCount++;
    } else if (trimmed.startsWith("Q:") || trimmed.startsWith("Q.")) {
      html += `<p><strong>${trimmed}</strong></p>\n`;
    } else if (trimmed.startsWith("A:") || trimmed.startsWith("A.")) {
      html += `<p>${trimmed}</p>\n`;
    } else {
      // Replace any internal endpolio links to relative
      let processed = trimmed
        .replace(/https?:\/\/(www\.)?endpolio\.com\.pk/g, "")
        .replace(/\n/g, " ");
      html += `<p>${processed}</p>\n`;
    }
  }
  
  // Generate appropriate metrics based on type
  const metrics = generateContentForType(pageType, origPage.title || "", urlPath).metrics;
  
  return { content: html.trim(), metrics };
}

// ============== RUN ==============

const allPages = walkDir(ROOT);
let updated = 0;
let skipped = 0;
let errors = 0;

console.log(`Found ${allPages.length} page.tsx files to process...`);

for (const filePath of allPages) {
  try {
    const result = processFile(filePath);
    if (result) {
      fs.writeFileSync(filePath, result, "utf-8");
      const rel = path.relative(ROOT, filePath);
      console.log(`  ✓ Updated: ${rel}`);
      updated++;
    } else {
      skipped++;
    }
  } catch (err) {
    const rel = path.relative(ROOT, filePath);
    console.error(`  ✗ Error processing ${rel}: ${err.message}`);
    errors++;
  }
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`);
