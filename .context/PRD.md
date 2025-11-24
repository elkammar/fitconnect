# Product Requirements Document: FitConnect

## Executive Summary

**Product Name:** FitConnect  
**Vision:** Become the go-to booking platform for independent fitness studios and local fitness enthusiasts  
**Mission:** Simplify fitness class discovery and booking while empowering small studios to compete with large chains  
**Target Launch:** Q1 2025  
**Market Opportunity:** $12B fitness class market with 40,000+ independent studios in the US  

---

## Market Research

### Industry Landscape

**Market Size & Growth:**
- Total Addressable Market (TAM): $12B US fitness class market
- Serviceable Addressable Market (SAM): $3B independent studio market
- Serviceable Obtainable Market (SOM): $150M (5% of SAM in 3 years)
- Growth Rate: 8.2% CAGR through 2028

**Key Trends:**
1. **Boutique Fitness Boom:** Independent studios growing 5x faster than traditional gyms
2. **Class Pass Fatigue:** Users want direct relationships with studios
3. **Local Discovery:** 73% of users prefer local studios over chains
4. **Digital-First Booking:** 82% of millennials book fitness classes online
5. **Community Focus:** Studios emphasize community over anonymous gym experience

### Competitive Analysis

**Direct Competitors:**

| Competitor | Strength | Weakness | Price |
|-----------|----------|----------|-------|
| **Mindbody** | Established, full-featured | Complex, expensive ($129-299/mo) | $$$ |
| **ClassPass** | Large network, consumer brand | Takes 20-30% revenue, erodes studio margins | Free to users |
| **Vagaro** | Affordable, simple | Limited features, poor UX | $$ |
| **Glofox** | Good mobile app | European-focused, limited US presence | $$ |

**Indirect Competitors:**
- Square Appointments (general scheduling, not fitness-specific)
- Social media booking (Instagram DMs, Facebook)
- Legacy software (Pike13, Zen Planner)

**Our Differentiation:**
1. **Pricing:** $29-79/mo (vs. $129+ for competitors)
2. **Simplicity:** 5-minute setup (vs. days/weeks)
3. **No Commission:** Studios keep 100% revenue (vs. ClassPass 70-80%)
4. **Local Focus:** Discovery emphasizes proximity and community
5. **Dual-Sided Value:** Equal focus on studio and user experience

### Customer Pain Points

**Studio Owner Pain Points:**
1. **Booking Chaos** (Critical)
   - Double bookings from text/paper/phone systems
   - Manual tracking errors
   - Time wasted managing schedules
   - "I spend 5 hours per week just managing bookings"

2. **No-Show Problem** (High)
   - 15-20% no-show rate costs $3-8K/year
   - No automated reminders
   - Difficult to enforce cancellation policies
   - "Empty spots I could have filled if I knew sooner"

3. **Discovery Challenge** (High)
   - Hard for new students to find them
   - Reliant on word-of-mouth and Instagram
   - Can't afford ClassPass commission
   - "I'm invisible compared to chains"

4. **Software Complexity** (Medium)
   - Enterprise software too complex for small teams
   - Require training and ongoing support
   - Multiple disconnected tools
   - "I just want something simple that works"

5. **Payment Hassles** (Medium)
   - Cash/Venmo is unprofessional
   - Payment processing fees add up
   - Tracking payments manually
   - Refund management is painful

**Class Attendee Pain Points:**
1. **Discovery Friction** (Critical)
   - Don't know what studios exist nearby
   - Have to check multiple websites/Instagram accounts
   - Can't compare easily
   - "I gave up trying to find a boxing class"

2. **Booking Inconvenience** (High)
   - Have to call during business hours
   - Different process for each studio
   - Can't see availability in real-time
   - "I want to book at midnight when I'm planning my week"

3. **Multiple Accounts** (Medium)
   - Create account for each studio
   - Remember multiple passwords
   - Different apps to download
   - "I have 6 different fitness apps"

4. **Limited Information** (Medium)
   - Class descriptions are vague
   - Don't know instructor experience
   - Can't see reviews
   - Difficulty level unclear

5. **Commitment Anxiety** (Low)
   - Afraid to try new studios
   - Don't want to buy class packs
   - Want to try once first
   - "What if I hate it?"

---

## User Personas

### Persona 1: Sarah - Studio Owner

**Demographics:**
- Age: 34
- Location: Urban/suburban area
- Education: Yoga teacher training, bachelor's degree
- Income: $60K personal, studio revenue $150K/year
- Tech Comfort: Moderate (uses Instagram, Square, email)

**Background:**
Sarah opened ZenFlow Yoga Studio 3 years ago after teaching at corporate gyms. She has 3 instructors teaching 25 classes/week. The studio is profitable but margins are tight.

**Current Process:**
- Students text or DM to book
- Manually checks capacity in Google Sheets
- Confirms via text
- Tracks payments in QuadSquare
- Sends reminders manually

**Goals:**
- Grow to 40 classes/week without hiring admin staff
- Reduce time spent on admin from 15 hrs/week to 2 hrs/week
- Decrease 20% no-show rate
- Attract new students without expensive marketing

**Frustrations:**
- "I became a yoga teacher to teach, not to manage spreadsheets"
- "I've had students show up to full classes because I made a booking error"
- "ClassPass takes 30% - I can't afford that"
- "I can't afford Mindbody's $200/month"

**Decision Criteria:**
- Must be under $100/month
- Setup in one day maximum
- Easy enough that instructors can use it
- Mobile-friendly (manages on phone)
- No long-term contract

**Success Metrics:**
- Spends <2 hours/week on scheduling
- No-show rate under 10%
- Books 20+ new students/month
- 95%+ class capacity rate

### Persona 2: Marcus - Fitness Enthusiast

**Demographics:**
- Age: 28
- Location: Urban (Chicago, Lincoln Park)
- Occupation: Marketing manager
- Income: $75K
- Tech Comfort: High (early adopter)

**Fitness Behavior:**
- Works out 5x/week
- Variety seeker (boxing, cycling, yoga)
- Willing to travel 15 minutes for good class
- Prefers boutique studios over gyms
- Spends $200-300/month on fitness

**Current Process:**
- Follows studios on Instagram
- Checks stories for class times
- DMs to book or calls
- Sometimes just shows up and hopes there's space
- Uses ClassPass for some studios

**Goals:**
- Try 2-3 new studios per month
- Book all classes for the week on Sunday
- Find classes that fit his schedule (6 AM or 7 PM)
- Build routine at 2-3 favorite studios

**Frustrations:**
- "I don't know what studios even exist near me"
- "Calling to book is so 2010"
- "I showed up to a full cycling class after getting off work early"
- "I can't plan my week without knowing what's available"
- "ClassPass doesn't include my favorite studios"

**Decision Criteria:**
- Real-time availability
- Detailed class descriptions
- Instructor information and reviews
- Mobile-first (books on phone)
- Can book last-minute

**Success Metrics:**
- Books 15+ classes/month
- Discovers 2 new studios/month
- Never shows up to full class
- Has routine at 3 favorite studios

### Persona 3: Emily - Casual Fitness User (Secondary)

**Demographics:**
- Age: 42
- Occupation: Parent, part-time consultant
- Fitness Level: Beginner to intermediate
- Budget: $100-150/month

**Goals:**
- Exercise 2-3x/week
- Find beginner-friendly classes
- Flexible scheduling (last-minute cancellations okay)

**Frustrations:**
- Intimidated by intense fitness culture
- Needs childcare information
- Wants to try before committing

---

## Features & Requirements

### MVP Features (Phase 1 - Current Prototype)

**For Class Attendees:**

1. **Class Discovery** (P0)
   - Browse all classes in area
   - Filter by: type, time, difficulty, price, date, location
   - Search by class name, studio, instructor
   - Sort by: time, distance, price, popularity
   - Real-time availability display
   - Features: ✅ Implemented

2. **Studio Profiles** (P0)
   - View studio information, amenities, photos
   - See all upcoming classes
   - Read reviews and ratings
   - Get directions
   - Features: ✅ Implemented

3. **Booking Flow** (P0)
   - Select class and see details
   - Login/signup or guest checkout
   - Confirm booking
   - Receive confirmation
   - Features: ✅ Implemented

4. **User Profile** (P0)
   - View upcoming bookings
   - Cancel bookings
   - Manage payment methods
   - Save favorite studios
   - Features: ✅ Implemented

5. **Location Services** (P1)
   - Use current location
   - Manual location entry
   - Distance calculation and display
   - Sort by distance
   - Features: ✅ Implemented

**For Studio Owners:**

1. **Dashboard** (P0)
   - Overview of today's classes
   - Key metrics (bookings, revenue, attendance)
   - Recent bookings list
   - Quick actions
   - Features: ✅ Implemented

2. **Class Management** (P0)
   - Create new classes
   - Edit existing classes
   - Cancel classes
   - Set capacity and pricing
   - Features: ✅ Implemented

3. **Booking Management** (P0)
   - View all bookings
   - Confirm/cancel bookings
   - Mark attendance
   - Manage waitlist
   - Features: ✅ Implemented

4. **Studio Profile Setup** (P0)
   - Add studio info, photos
   - Set amenities
   - Configure policies
   - Features: ✅ Implemented

### Phase 2 Features (3-6 Months)

**Payment Processing:**
- Stripe integration
- Class packs and memberships
- Automatic billing
- Refund management

**Notifications:**
- Email confirmations
- SMS reminders (24hr, 1hr before)
- Cancellation notifications
- Waitlist notifications

**Advanced Scheduling:**
- Recurring classes
- Instructor scheduling
- Resource management (room booking)
- Bulk actions

**Reviews & Social:**
- Class reviews and ratings
- Instructor profiles
- Social sharing
- Friend invitations

**Analytics:**
- Revenue reporting
- Attendance trends
- Customer acquisition sources
- Instructor performance

### Phase 3 Features (6-12 Months)

**Mobile App:**
- Native iOS and Android apps
- Push notifications
- Apple/Google Pay integration
- Offline mode

**AI Recommendations:**
- Personalized class suggestions
- Optimal scheduling
- Price optimization
- Churn prediction

**Marketplace Features:**
- Multi-studio passes
- Gift cards
- Corporate partnerships
- Challenge and events

**Integration:**
- Wearable device sync (Apple Health, Fitbit)
- Calendar integration (Google, Apple, Outlook)
- Email marketing (Mailchimp)
- Accounting software (QuickBooks)

---

## Edge Cases & Failure States

### Booking Edge Cases

**Case 1: Class Becomes Full During Booking**
- Scenario: User starts booking when 1 spot available, another user books while they're filling out form
- Solution: Check availability again at confirmation step, offer waitlist
- UI: Show error message, waitlist option, suggest similar classes

**Case 2: Class Cancelled After Booking**
- Scenario: Studio cancels class due to instructor illness
- Solution: Automatically refund, notify user immediately, suggest alternatives
- UI: Prominent notification, list of similar upcoming classes

**Case 3: Double Booking Prevention**
- Scenario: Studio owner manually adds student who also books online
- Solution: Real-time capacity checks, lock spots during booking process
- UI: Show "booking in progress" indicator

**Case 4: Last-Minute Cancellation**
- Scenario: User cancels 30 minutes before class
- Solution: Enforce cancellation policy, late cancel fee or mark as no-show
- UI: Warning before cancellation, explain policy, confirm action

**Case 5: Waitlist Management**
- Scenario: Waitlisted user gets spot but doesn't respond in time
- Solution: 2-hour window to confirm, auto-offer to next person
- UI: Push notification, email, in-app alert

### Authentication Edge Cases

**Case 6: Forgot Password**
- Solution: Email reset link, expires in 1 hour
- UI: Clear instructions, check spam folder reminder

**Case 7: Duplicate Account Detection**
- Scenario: User tries to create account with existing email
- Solution: Offer to resend password reset
- UI: Friendly error, don't reveal if email exists (security)

**Case 8: Social Login Failure**
- Scenario: Google/Facebook auth fails
- Solution: Fallback to email/password, save progress
- UI: Clear error message, alternative options

### Payment Edge Cases

**Case 9: Payment Failure**
- Scenario: Credit card declined during booking
- Solution: Hold spot for 10 minutes, request alternative payment
- UI: Clear error, easy to update payment method

**Case 10: Refund Processing**
- Scenario: User cancels within policy window
- Solution: Automatic refund, 5-7 business days
- UI: Confirmation with timeline, refund status tracking

### Data Edge Cases

**Case 11: Location Permission Denied**
- Solution: Fallback to manual entry, ZIP code lookup
- UI: Explain benefits, don't block functionality

**Case 12: No Classes Found**
- Scenario: Filters too restrictive or studio has no upcoming classes
- Solution: Suggest loosening filters, show nearby alternatives
- UI: Helpful empty state, clear suggestions

**Case 13: Studio Goes Out of Business**
- Scenario: Studio closes, has future bookings
- Solution: Notify all users, automatic refunds
- UI: Sympathetic message, help finding alternatives

### Technical Failure States

**Case 14: Network Error During Booking**
- Solution: Save form data, retry automatically, clear status messaging
- UI: "Retrying..." indicator, manual retry button

**Case 15: Session Timeout**
- Scenario: User leaves booking form open for 30 minutes
- Solution: Save progress, prompt to continue
- UI: Modal: "Still there? Continue booking?"

**Case 16: Database Sync Issues**
- Scenario: Offline mode, data conflicts
- Solution: Queue operations, sync when online, show sync status
- UI: Indicator showing sync status, last updated time

---

## Success Metrics

### North Star Metric
**Monthly Active Studios with >20 bookings** - This indicates both studio adoption and active usage

### Studio Owner Metrics

**Acquisition:**
- Studios signed up
- Onboarding completion rate (>80% target)
- Time to first class posted (<24 hours target)

**Activation:**
- Studios with >5 classes listed (90% target)
- First booking received (<7 days target)
- Payment method connected (85% target)

**Engagement:**
- Average bookings per studio per month (>50 target)
- Active studios (posted class in last 30 days) (90% target)
- Daily active studios (30% target)

**Retention:**
- 30-day retention (85% target)
- 90-day retention (70% target)
- 180-day retention (60% target)
- Churn rate (<5% monthly target)

**Revenue:**
- Monthly recurring revenue (MRR)
- Average revenue per studio (ARPU) ($79 target)
- Lifetime value (LTV) ($1,896 target)
- LTV/CAC ratio (>3:1 target)

**Satisfaction:**
- Net Promoter Score (>50 target)
- Time saved per week (>10 hours target)
- No-show rate reduction (from 20% to <10%)

### Class Attendee Metrics

**Acquisition:**
- New user signups
- Signup source tracking
- Referral rate (30% target)

**Activation:**
- First booking within 7 days (60% target)
- Complete profile setup (70% target)
- Add payment method (50% target)

**Engagement:**
- Average bookings per user per month (4 target)
- Monthly active users
- Studios tried per user (3 target)
- Repeat booking rate (70% target)

**Retention:**
- 30-day retention (60% target)
- 90-day retention (45% target)
- 180-day retention (35% target)

**Discovery:**
- Classes viewed per session (8 target)
- Search-to-booking conversion (15% target)
- Average session duration (5 minutes target)

### Business Metrics

**Growth:**
- Month-over-month growth rate (20% target)
- Geographic expansion (2 new cities per quarter)
- Platform GMV (gross merchandise value)

**Efficiency:**
- Customer acquisition cost (CAC) (<$150 for studios, <$20 for users)
- Payback period (<6 months)
- Burn rate and runway

**Product:**
- Feature adoption rates
- Error rates (<1% of transactions)
- Page load time (<2 seconds)
- Mobile vs. desktop usage split

---

## Business Model

### Revenue Streams

**Primary: SaaS Subscription (Studio Owners)**

**Tiered Pricing:**

| Tier | Price | Bookings | Features |
|------|-------|----------|----------|
| **Starter** | $29/mo | Up to 50/mo | Basic booking, 2 instructors, email support |
| **Growth** | $79/mo | Unlimited | Everything + analytics, 10 instructors, SMS notifications |
| **Studio** | $149/mo | Unlimited | Everything + multi-location, API access, priority support |

**Annual Discount:** 2 months free (17% discount)

**Secondary: Transaction Fees (Optional)**
- Alternative to subscription: 2% per booking
- For studios preferring variable costs
- Minimum $29/month

**Future Revenue Streams:**
- Premium placement in discovery ($50-200/mo)
- Advanced analytics package ($29/mo add-on)
- White-label solution for chains ($500+/mo)
- Marketplace commission on class packs (5%)

### Cost Structure

**Fixed Costs (Monthly):**
- Infrastructure (Vercel, Supabase): $200
- Domain, SSL, CDN: $50
- Tools (monitoring, analytics): $100
- Total: $350/mo

**Variable Costs (Per Studio):**
- SMS notifications: $5-15/mo
- Email sending: $2-5/mo
- Support time: $10-20/mo
- Total: ~$30/mo per studio

**Marketing Costs:**
- Customer acquisition cost (CAC): $150 per studio
- Channels: Google Ads, content marketing, partnerships

**Unit Economics:**
- ARPU: $79/mo
- Variable costs: $30/mo
- Gross margin: $49/mo (62%)
- CAC: $150
- Payback period: 3 months
- LTV: $1,896 (24-month retention)
- LTV/CAC: 12.6x

### Go-to-Market Strategy

**Phase 1: Local Launch (Months 1-3)**
- Target: Chicago (50 studios)
- Strategy: Direct outreach, local partnerships
- Goal: Prove concept, gather feedback

**Phase 2: City Expansion (Months 4-9)**
- Target: Add Denver, Austin, Portland (150 studios total)
- Strategy: Studio referrals, local ads, content marketing
- Goal: Establish playbook for new cities

**Phase 3: Scale (Months 10-18)**
- Target: Top 20 US cities (1,000 studios)
- Strategy: Paid acquisition, partnerships, PR
- Goal: Become recognized brand

**Marketing Channels:**
1. **Direct Sales** (Primary in Phase 1)
   - Target studio owners directly
   - Studio visits and demos
   - High-touch onboarding

2. **Content Marketing** (Scalable)
   - Blog: "Ultimate Guide to Running a Fitness Studio"
   - SEO for "fitness class booking software"
   - Free tools (calculator, templates)

3. **Partnerships**
   - POS systems (Square, Clover)
   - Studio management consultants
   - Fitness instructor associations

4. **User Growth Loops**
   - Studio invites students to book via platform
   - Students discover other studios
   - Students share with friends

---

## Competitive Advantages

### 1. Pricing
**Us:** $29-79/mo | **Competitors:** $129-299/mo
- 3-5x cheaper than enterprise solutions
- No commission on bookings (ClassPass takes 20-30%)

### 2. Simplicity
**Setup time:** <1 hour | **Competitors:** Days to weeks
- No training required
- Mobile-first interface
- Intuitive design

### 3. Local Focus
- Emphasize community and proximity
- Discovery algorithm prioritizes nearby classes
- Not trying to be everything to everyone

### 4. Studio-First Philosophy
- Built for independent studios, not chains
- No commission model that erodes margins
- Transparent, fair pricing

### 5. Modern Tech Stack
- Fast, responsive interface
- Real-time updates
- Mobile-optimized
- Scalable infrastructure

---

## Risks & Mitigation

**Risk 1: Chicken-and-Egg Problem**
- Challenge: Need studios to attract users, need users to attract studios
- Mitigation: Studio-first approach, studios invite their existing students

**Risk 2: Mindbody Competition**
- Challenge: Established player with large market share
- Mitigation: Target studios frustrated with Mindbody (price, complexity)

**Risk 3: Low Studio Margins**
- Challenge: Studios have tight margins, may resist any cost
- Mitigation: Show ROI (time saved, reduced no-shows, new students)

**Risk 4: ClassPass Integration Requests**
- Challenge: Studios may want ClassPass integration
- Mitigation: Educate on margin erosion, offer alternative discovery

**Risk 5: Seasonal Fitness Trends**
- Challenge: January spike, summer dip
- Mitigation: Annual contracts, value beyond booking (community, analytics)

---

## Conclusion

FitConnect addresses a clear market need with a focused solution. By starting with independent studios and building dual-sided value, we can establish a defensible position in the $12B fitness class market.

**Key Success Factors:**
1. Ruthless simplicity
2. Fair, transparent pricing
3. Studio-first approach
4. Fast, reliable technology
5. Excellent user experience for both sides

**Next Steps:**
1. Validate prototype with 10 pilot studios
2. Iterate based on feedback
3. Build payment processing
4. Launch in Chicago
5. Establish growth playbook

This PRD will evolve as we learn from users and market conditions. The current prototype demonstrates feasibility and forms the foundation for a production launch.
