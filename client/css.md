

1. Dynamic Text (Changes with theme) - Black → White
These use CSS variables that change between light and dark mode:
jsx// Example: Main headings
<h1 className="text-5xl font-bold">
  Navigate Your Career with AI Intelligence
</h1>
How it works:

Uses default Tailwind text color OR text-foreground
Light mode: --foreground: 220 15% 20% (dark gray, almost black)
Dark mode: --foreground: 210 40% 98% (almost white)
Result: Text automatically switches from black to white ✨


2. Muted Text (Gray in both modes) - Stays Grayish
These use text-muted-foreground:
jsx// Example: Descriptions
<p className="text-muted-foreground">
  Discover your perfect career path with personalized AI...
</p>
How it works:

Uses --muted-foreground variable
Light mode: --muted-foreground: 220 10% 50% (medium gray)
Dark mode: --muted-foreground: 220 10% 60% (slightly lighter gray)
Result: Always stays gray, but adjusts slightly for readability in each mode 📝


3. Colorful Text (Gradient/Fixed colors) - Never Changes
These use gradients or specific color variables:
jsx// Example: Gradient text
<span className="bg-gradient-primary bg-clip-text text-transparent">
  AI Intelligence
</span>
```

**How it works:**
- Uses `bg-gradient-primary` which creates: `linear-gradient(135deg, blue, purple)`
- The gradient stays blue → purple in **both** light and dark mode
- `bg-clip-text` + `text-transparent` makes the gradient show through the text
- **Result:** Always colorful! 🌈

---

## Visual Breakdown:
```
LIGHT MODE:
├─ text-foreground        → Almost Black (#2d3748)
├─ text-muted-foreground  → Gray (#64748b)  
└─ bg-gradient-primary    → Blue to Purple gradient

DARK MODE:
├─ text-foreground        → Almost White (#f8fafc)
├─ text-muted-foreground  → Light Gray (#94a3b8)
└─ bg-gradient-primary    → Blue to Purple gradient (same!)

Why This Design Pattern?

Hierarchy: Important text is high contrast (black/white), descriptions are softer (gray)
Consistency: Brand colors (gradients) stay the same so users recognize your brand
Readability: Each mode optimizes text for its background
Attention: Gradient text draws focus to key phrases like "AI Intelligence"


Code Examples in Your Components:
jsx// Hero section shows all 3 types:
<h1 className="text-5xl font-bold">              {/* Type 1: Dynamic */}
  Navigate Your Career with{" "}
  <span className="bg-gradient-primary bg-clip-text text-transparent">  {/* Type 3: Colorful */}
    AI Intelligence
  </span>
</h1>

<p className="text-muted-foreground">            {/* Type 2: Muted Gray */}
  Discover your perfect career path...
</p>