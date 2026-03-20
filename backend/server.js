const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

function analyzePlan(input) {
  const text = input.toLowerCase();

  // ─── DETECT TOPIC ───────────────────────────────────────────
  const topics = {
    youtube:     ["youtube", "channel", "video", "vlog", "content creator"],
    business:    ["business", "startup", "company", "shop", "store", "sell", "product"],
    freelance:   ["freelance", "freelancing", "fiverr", "upwork", "client", "graphic", "design", "logo"],
    food:        ["food", "restaurant", "tiffin", "cook", "catering", "bakery", "café", "cafe"],
    app:         ["app", "mobile app", "software", "website", "develop", "flutter", "react native"],
    fitness:     ["fitness", "gym", "workout", "weight loss", "diet", "health", "exercise"],
    study:       ["study", "exam", "college", "university", "degree", "course", "learn", "skill"],
    ecommerce:   ["ecommerce", "amazon", "dropship", "online store", "shopify", "resell"],
    blog:        ["blog", "write", "article", "content", "seo", "newsletter", "medium"],
    social:      ["instagram", "twitter", "social media", "followers", "influencer", "tiktok"],
  };

  let detectedTopic = "general";
  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some((kw) => text.includes(kw))) {
      detectedTopic = topic;
      break;
    }
  }

  // ─── DETECT TIMELINE ────────────────────────────────────────
  const timelineKeywords = ["month", "week", "day", "year", "quickly", "fast", "soon", "asap"];
  const hasTimeline = timelineKeywords.some((kw) => text.includes(kw));

  // ─── DETECT MONEY GOAL ──────────────────────────────────────
  const moneyKeywords = ["earn", "money", "income", "profit", "revenue", "salary", "rich"];
  const hasMoney = moneyKeywords.some((kw) => text.includes(kw));

  // ─── TOPIC DATA ─────────────────────────────────────────────
  const topicData = {
    youtube: {
      goal: "Build a YouTube channel with consistent content and earn money through ads and sponsorships",
      method: "Create niche-focused video content, grow an audience organically, and monetize via multiple streams",
      steps: [
        "Choose a specific niche based on your passion and audience demand",
        "Set up your channel with proper branding, banner, and bio",
        "Create a content calendar and publish at least 2 videos per week",
        "Optimize every video with SEO titles, descriptions, and tags",
        "Engage with viewers through comments and community posts",
        "Apply for YouTube Partner Program after 1000 subscribers and 4000 watch hours",
      ],
      timeline_default: "6 months to monetization, 12 months for stable income",
      missing: {
        "Goal Clarity": "No specific subscriber count or income target mentioned",
        "Execution Steps": "No content format or video style strategy defined",
        "Resources": "Camera, microphone, lighting, and editing software not mentioned",
        "Timeline": "No milestone checkpoints for 100, 500, and 1000 subscribers",
      },
      simplified: "Start a focused YouTube channel, post consistently twice a week, and earn through ads and brand deals within 6–12 months.",
      actions: [
        "Pick one niche you are confident and knowledgeable about",
        "Create and brand your YouTube channel this week",
        "Script and record your first 3 videos in the next 7 days",
        "Research keywords using TubeBuddy or VidIQ before each upload",
        "Set a goal of 100 subscribers in your first 30 days",
        "Analyze your analytics every week and improve based on data",
      ],
      score: { goal: 18, steps: 20, timeline: 12, completeness: 16 },
    },

    business: {
      goal: "Launch a sustainable business that generates consistent profit and grows over time",
      method: "Identify a market gap, develop a product or service, and sell it through online and offline channels",
      steps: [
        "Research your target market and identify the core problem you solve",
        "Develop a minimum viable product or service offering",
        "Register your business and handle legal requirements",
        "Build an online presence with a website and social media profiles",
        "Launch with an initial batch of customers and collect feedback",
        "Reinvest profits and scale operations gradually",
      ],
      timeline_default: "3 months to first sale, 6 months to break even",
      missing: {
        "Goal Clarity": "No specific revenue target or number of customers defined",
        "Execution Steps": "No pricing strategy or sales funnel outlined",
        "Resources": "Startup capital, tools, and team structure not mentioned",
        "Timeline": "No monthly milestones or break-even point defined",
      },
      simplified: "Start a business by identifying a real market need, building a simple solution, and growing it step by step.",
      actions: [
        "Write down the one problem your business will solve this week",
        "Talk to 10 potential customers to validate your idea",
        "Create a basic business plan with costs and revenue projections",
        "Register your business name and open a business bank account",
        "Launch a simple landing page to collect early interest",
        "Set a target of your first 5 paying customers within 30 days",
      ],
      score: { goal: 16, steps: 20, timeline: 14, completeness: 15 },
    },

    freelance: {
      goal: "Build a stable freelancing career and earn a consistent monthly income from remote clients",
      method: "Create a strong portfolio, register on freelancing platforms, and attract clients through social media and referrals",
      steps: [
        "Choose 2 core services to specialize in such as logo design or social media posts",
        "Build a portfolio with 5 to 8 strong sample projects",
        "Create optimized profiles on Fiverr and Upwork",
        "Post your work daily on Instagram and LinkedIn",
        "Apply to 10 job proposals per day on freelancing platforms",
        "Deliver excellent work and collect 5-star reviews from early clients",
      ],
      timeline_default: "First client in 30 days, stable income in 3 to 4 months",
      missing: {
        "Goal Clarity": "No monthly income target or number of clients per month defined",
        "Execution Steps": "No client communication or revision policy planned",
        "Resources": "Design software, hardware, and internet setup not mentioned",
        "Timeline": "No plan for transitioning from part-time to full-time freelancing",
      },
      simplified: "Offer specialized freelance services on Fiverr and Upwork, build a strong portfolio, and land your first client within 30 days.",
      actions: [
        "Install required software and practice your skill for 1 hour daily",
        "Create 5 sample projects to showcase your portfolio",
        "Publish your first Fiverr gig or Upwork profile today",
        "Post one piece of work with a process breakdown on Instagram daily",
        "Apply to 10 proposals on Upwork every single day",
        "Ask friends and family for referrals in return for discounted work",
      ],
      score: { goal: 15, steps: 20, timeline: 12, completeness: 14 },
    },

    food: {
      goal: "Start a profitable food business serving quality meals to a local or online customer base",
      method: "Prepare meals at home or in a rented kitchen, take orders via WhatsApp or Swiggy, and deliver locally",
      steps: [
        "Finalize your menu with 3 to 5 signature dishes",
        "Get FSSAI food license and basic business registration",
        "Set up packaging, containers, and delivery logistics",
        "Create a WhatsApp Business account and share daily menu",
        "Onboard first 10 customers through free tasting samples",
        "List your business on Swiggy or Zomato for wider reach",
      ],
      timeline_default: "Launch in 2 to 3 weeks, break even in 2 months",
      missing: {
        "Goal Clarity": "No daily order target or monthly revenue goal mentioned",
        "Execution Steps": "No pricing or discount strategy outlined",
        "Resources": "Kitchen equipment, packaging costs, and starting capital not mentioned",
        "Timeline": "No plan for scaling from 10 to 50 to 100 customers",
      },
      simplified: "Launch a home food business with a set menu, take WhatsApp orders, and grow to 50 regular customers in 2 months.",
      actions: [
        "Finalize your menu and calculate the cost per meal this week",
        "Apply for FSSAI basic registration online today",
        "Create a WhatsApp Business profile with food photos",
        "Offer free sample meals to 10 neighbors and collect feedback",
        "Post food photos on Instagram and local Facebook groups daily",
        "Set a target of 20 regular paying customers in the first month",
      ],
      score: { goal: 19, steps: 21, timeline: 17, completeness: 18 },
    },

    app: {
      goal: "Design, build, and launch a mobile or web application that solves a real user problem",
      method: "Follow an agile development process — build an MVP, test with users, iterate, and then scale",
      steps: [
        "Research existing competitors and identify a gap in the market",
        "Design wireframes and user flows in Figma",
        "Build the MVP with only the core features needed to solve the problem",
        "Launch a beta version to 20 to 50 test users",
        "Collect feedback and fix bugs before the public launch",
        "Submit to the Play Store or App Store and market to target users",
      ],
      timeline_default: "MVP in 60 days, public launch in 90 days",
      missing: {
        "Goal Clarity": "No target user count or revenue model defined",
        "Execution Steps": "No tech stack, backend, or database architecture planned",
        "Resources": "Development tools, hosting costs, and team roles not mentioned",
        "Timeline": "No post-launch roadmap for updates and new features",
      },
      simplified: "Build a focused app MVP in 60 days, test it with real users, and launch publicly within 90 days.",
      actions: [
        "Write down the single core problem your app will solve",
        "Create wireframes for the 3 main screens in Figma this week",
        "Choose your tech stack and set up your development environment",
        "Build the first working prototype with just 2 core features",
        "Share the beta with 20 friends or target users for honest feedback",
        "Set up a landing page to collect email signups before launch",
      ],
      score: { goal: 20, steps: 22, timeline: 18, completeness: 19 },
    },

    fitness: {
      goal: "Achieve a specific fitness goal such as weight loss, muscle gain, or improved stamina through a structured plan",
      method: "Follow a consistent workout routine combined with a controlled diet and track progress weekly",
      steps: [
        "Set a specific and measurable fitness goal such as losing 10kg in 3 months",
        "Design a weekly workout schedule with 4 to 5 training days",
        "Plan daily meals with correct calorie and protein targets",
        "Track weight, measurements, and progress photos every week",
        "Hire a trainer or join a gym for structured guidance",
        "Adjust diet and workouts based on weekly results",
      ],
      timeline_default: "Visible results in 4 to 6 weeks, major goal in 3 to 6 months",
      missing: {
        "Goal Clarity": "No specific target weight, body fat percentage, or fitness metric defined",
        "Execution Steps": "No rest days, recovery plan, or injury prevention strategy mentioned",
        "Resources": "Gym membership, equipment, or supplements not planned",
        "Timeline": "No weekly check-in milestones defined",
      },
      simplified: "Follow a structured workout and diet plan 5 days a week and track progress every week to hit your fitness goal in 3 months.",
      actions: [
        "Set one specific fitness goal with a number and a deadline",
        "Create a weekly workout schedule starting from tomorrow",
        "Download a calorie tracking app like MyFitnessPal today",
        "Take starting photos and measurements as your baseline",
        "Prepare your meals in advance every Sunday to stay consistent",
        "Review your progress every 2 weeks and adjust your plan",
      ],
      score: { goal: 17, steps: 21, timeline: 15, completeness: 16 },
    },

    study: {
      goal: "Master a subject or skill through consistent structured study and achieve a certification or exam goal",
      method: "Follow a daily study schedule, use active recall and practice tests, and track learning milestones",
      steps: [
        "Define the exact exam, certification, or skill you want to achieve",
        "Break the syllabus into weekly topics and create a study plan",
        "Study for 2 to 3 focused hours per day using the Pomodoro technique",
        "Solve past papers and practice tests every weekend",
        "Review weak topics every Friday and revise notes regularly",
        "Take the final exam or assessment on the planned date",
      ],
      timeline_default: "Exam ready in 60 to 90 days with daily study",
      missing: {
        "Goal Clarity": "No specific exam date or target score mentioned",
        "Execution Steps": "No study material list or resource plan defined",
        "Resources": "Books, online courses, and study tools not mentioned",
        "Timeline": "No weekly topic completion milestones set",
      },
      simplified: "Study 2 to 3 hours daily using a structured plan, practice with past papers weekly, and be exam-ready in 60 to 90 days.",
      actions: [
        "Write down your exact exam name, syllabus, and target date today",
        "Download or buy all required study materials this week",
        "Create a daily study timetable and block time on your calendar",
        "Start with the most difficult topic first while your energy is high",
        "Solve one past paper every weekend and analyze your mistakes",
        "Join a study group or online community for accountability",
      ],
      score: { goal: 18, steps: 22, timeline: 16, completeness: 17 },
    },

    ecommerce: {
      goal: "Build a profitable online store and generate consistent sales through digital marketing",
      method: "Source or create products, list them on Amazon or Shopify, and drive traffic through ads and SEO",
      steps: [
        "Research high-demand low-competition products using tools like Jungle Scout",
        "Source products from local suppliers or AliExpress for dropshipping",
        "Set up a Shopify store or Amazon Seller account",
        "Write compelling product listings with professional photos",
        "Run Facebook or Instagram ads with a small test budget",
        "Optimize based on conversion data and scale winning products",
      ],
      timeline_default: "Store live in 2 weeks, first sale in 30 days, profitable in 3 months",
      missing: {
        "Goal Clarity": "No monthly sales target or profit margin defined",
        "Execution Steps": "No return policy, customer service, or logistics plan",
        "Resources": "Starting ad budget, inventory costs, and tools not mentioned",
        "Timeline": "No plan for scaling from first sale to 100 orders per month",
      },
      simplified: "Launch an online store with researched products, run targeted ads, and achieve your first profitable month within 90 days.",
      actions: [
        "Research 5 product ideas using Google Trends or Jungle Scout this week",
        "Order product samples from 3 suppliers and compare quality",
        "Create your Shopify store with a clean theme and product listings",
        "Take or source high quality product photos for all listings",
        "Start a Facebook ad campaign with a 500 rupee daily test budget",
        "Track cost per click and conversion rate daily and optimize",
      ],
      score: { goal: 18, steps: 20, timeline: 16, completeness: 17 },
    },

    blog: {
      goal: "Build a successful blog with consistent traffic and earn through ads, affiliate marketing, or sponsorships",
      method: "Write SEO-optimized content consistently, grow organic traffic, and monetize through multiple channels",
      steps: [
        "Choose a specific blog niche with strong search demand",
        "Set up a WordPress blog with a clean and fast theme",
        "Research and target low-competition keywords using Ubersuggest",
        "Publish 2 high-quality SEO articles per week consistently",
        "Build backlinks through guest posting and collaborations",
        "Apply for Google AdSense or join an affiliate program after 50 posts",
      ],
      timeline_default: "First traffic in 2 to 3 months, monetizable in 6 months",
      missing: {
        "Goal Clarity": "No monthly traffic target or income goal defined",
        "Execution Steps": "No internal linking or content cluster strategy planned",
        "Resources": "Domain, hosting, SEO tools, and writing time not accounted for",
        "Timeline": "No milestone for first 1000 monthly visitors",
      },
      simplified: "Start an SEO-focused blog in a specific niche, publish 2 articles per week, and earn through ads and affiliate links within 6 months.",
      actions: [
        "Choose your blog niche and register a domain name today",
        "Set up WordPress hosting on Hostinger or Bluehost this week",
        "Research 20 low-competition keywords to target first",
        "Write and publish your first article with proper on-page SEO",
        "Set a goal of publishing 8 articles in your first month",
        "Share each article in relevant Facebook groups and Reddit communities",
      ],
      score: { goal: 17, steps: 20, timeline: 14, completeness: 16 },
    },

    social: {
      goal: "Grow a strong social media presence and become a recognized influencer or brand in a specific niche",
      method: "Post high-quality content consistently, engage with the community, and grow followers organically and through collaborations",
      steps: [
        "Choose one primary platform to focus on such as Instagram or YouTube",
        "Define your niche and target audience clearly",
        "Create a content calendar with 5 to 7 posts per week",
        "Use trending hashtags, Reels, and collaborations for reach",
        "Engage with your audience through stories, polls, and DMs daily",
        "Partner with brands for sponsored content after 10,000 followers",
      ],
      timeline_default: "1000 followers in 60 days, 10,000 in 6 months",
      missing: {
        "Goal Clarity": "No specific follower count or engagement rate target defined",
        "Execution Steps": "No content format or posting time strategy outlined",
        "Resources": "Camera, editing apps, and content creation tools not mentioned",
        "Timeline": "No weekly follower growth milestone set",
      },
      simplified: "Pick one platform, post niche content 5 to 7 times a week, engage with your audience daily, and grow to 10,000 followers in 6 months.",
      actions: [
        "Pick one platform and create or optimize your profile today",
        "Define your niche and write a clear bio that explains your value",
        "Plan and schedule your first 7 posts using a content calendar",
        "Follow and engage with 20 accounts in your niche every day",
        "Post one Reel or short video per day for the next 30 days",
        "Track your top-performing posts weekly and make more of them",
      ],
      score: { goal: 16, steps: 20, timeline: 13, completeness: 15 },
    },

    general: {
      goal: "Achieve the stated objective through a structured and well-executed plan",
      method: "Break the goal into clear phases, allocate resources, and track progress regularly",
      steps: [
        "Define the exact outcome you want to achieve with a deadline",
        "Break the goal into smaller weekly milestones",
        "Identify the resources, tools, and skills you will need",
        "Execute the plan and review progress every week",
        "Adjust your strategy based on results and feedback",
        "Complete the goal by the set deadline and evaluate lessons learned",
      ],
      timeline_default: "Not mentioned — a clear timeline needs to be defined",
      missing: {
        "Goal Clarity": "The goal is too vague and lacks a specific measurable outcome",
        "Execution Steps": "No concrete steps or action items are defined",
        "Resources": "No mention of tools, budget, or skills required",
        "Timeline": "No deadline or milestone dates are set",
      },
      simplified: "Define a clear specific goal, break it into weekly steps, and execute it consistently with regular progress reviews.",
      actions: [
        "Write your goal in one specific sentence with a measurable outcome",
        "List the 3 most important tasks to complete this week",
        "Identify what resources or skills you need and how to get them",
        "Create a weekly schedule with dedicated time blocks for your goal",
        "Find an accountability partner to check in with every week",
        "Review your progress every Sunday and plan the next week",
      ],
      score: { goal: 10, steps: 12, timeline: 5, completeness: 10 },
    },
  };

  // ─── GET TOPIC DATA ──────────────────────────────────────────
  const data = topicData[detectedTopic];

  // ─── BOOST SCORE IF TIMELINE IN INPUT ───────────────────────
  let scoreBreakdown = { ...data.score };
  if (hasTimeline) scoreBreakdown.timeline = Math.min(25, scoreBreakdown.timeline + 8);
  if (hasMoney) scoreBreakdown.goal = Math.min(25, scoreBreakdown.goal + 3);

  const clarityScore =
    scoreBreakdown.goal +
    scoreBreakdown.steps +
    scoreBreakdown.timeline +
    scoreBreakdown.completeness;

  const scoreLabel =
    clarityScore >= 80 ? "Excellent" :
    clarityScore >= 65 ? "Good" :
    clarityScore >= 45 ? "Needs Work" : "Very Vague";

  return {
    goal: data.goal,
    method: data.method,
    steps: data.steps,
    timeline: hasTimeline ? "Mentioned in plan — add specific dates for better clarity" : data.timeline_default,
    missing_elements: data.missing,
    simplified_version: data.simplified,
    action_steps: data.actions,
    clarity_score: clarityScore,
    score_breakdown: scoreBreakdown,
    score_explanation: `${scoreLabel} plan — score based on goal clarity (${scoreBreakdown.goal}/25), defined steps (${scoreBreakdown.steps}/25), timeline presence (${scoreBreakdown.timeline}/25), and overall completeness (${scoreBreakdown.completeness}/25).`,
  };
}

app.post("/analyze", (req, res) => {
  const userInput = req.body.input;
  if (!userInput || userInput.trim() === "") {
    return res.status(400).json({ error: "No input provided" });
  }
  const result = analyzePlan(userInput);
  res.json(result);
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});