/**
 * Improved Canadian Honours Eligibility Quiz Logic
 * Based on the React version with scoring, conditional questions, and better result classification
 */

// Quiz state
let quizState = {
    flags: {
        subject: null,
        alive: null,
        status: null,
        caf: null,
        volunteer: null,
        danger: null,
        singleVsSustained: null,
        domain: [],
        scope: null,
        duration: null,
        model: null,
        may6_2023: null,
        student_top: null,
        beyond_duties: null,
        recent_incident: null,
        polar_related: null,
        innovation_specific: null
    },
    answers: {},
    currentStep: 0,
    visibleQuestions: []
};

// Question definitions with conditional logic
const QUESTION_DEFINITIONS = [
    {
        id: 'q_subject',
        dataQuestion: '0',
        title: 'Who are you answering this quiz for?',
        helper: 'Some honours are nomination-based. This helps tailor wording in results.',
        type: 'single',
        options: [
            { value: 'self', label: 'Myself' },
            { value: 'other', label: 'Someone else (I\'m considering nominating them)' }
        ],
        when: () => true
    },
    {
        id: 'q_alive',
        dataQuestion: '1',
        title: 'Is the person currently alive?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ],
        when: () => true
    },
    {
        id: 'q_status',
        dataQuestion: '2',
        title: 'What is the person\'s status?',
        type: 'single',
        options: [
            { value: 'canadian', label: 'Canadian citizen' },
            { value: 'permanent-resident', label: 'Permanent resident of Canada' },
            { value: 'non-canadian', label: 'Not Canadian' }
        ],
        when: () => true
    },
    {
        id: 'q_caf',
        dataQuestion: '3',
        title: 'Is or was the person a member of the Canadian Armed Forces (CAF)?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ],
        when: () => true
    },
    {
        id: 'q_volunteer',
        dataQuestion: '4',
        title: 'Was the contribution primarily unpaid volunteer work?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes — entirely or mostly unpaid' },
            { value: 'no', label: 'No — paid or professional role' },
            { value: 'mix', label: 'A mix of paid and unpaid work' }
        ],
        when: () => true
    },
    {
        id: 'q_danger',
        dataQuestion: '5',
        title: 'Did it involve personal danger or risk to life?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes — immediate danger / peril' },
            { value: 'some', label: 'Some risk, but not life-threatening' },
            { value: 'no', label: 'No' }
        ],
        when: () => true
    },
    {
        id: 'q_recent_incident',
        dataQuestion: '5b',
        title: 'Was the bravery/peril incident within roughly the last 2 years?',
        helper: 'Bravery nominations are typically expected close to the incident timeframe.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' }
        ],
        when: (ctx) => ctx.flags.danger === 'yes'
    },
    {
        id: 'q_single_vs_sustained',
        dataQuestion: '6',
        title: 'Was it a single act/project, or sustained contribution over time?',
        type: 'single',
        options: [
            { value: 'single', label: 'A single act or defined activity' },
            { value: 'sustained', label: 'Many years of sustained contribution' },
            { value: 'both', label: 'Both' }
        ],
        when: () => true
    },
    {
        id: 'q_domain',
        dataQuestion: '7',
        title: 'What best describes the primary area of contribution?',
        helper: 'Select up to 2 (or 3) that fit best.',
        type: 'multi',
        options: [
            { value: 'community', label: 'Community service / volunteering' },
            { value: 'innovation', label: 'Innovation / entrepreneurship' },
            { value: 'academia', label: 'Academia / education' },
            { value: 'arts', label: 'Arts & culture' },
            { value: 'public', label: 'Public service / governance' },
            { value: 'science', label: 'Science / research' },
            { value: 'northern', label: 'Northern / polar / Arctic work' },
            { value: 'military', label: 'Military service' },
            { value: 'emergency', label: 'Emergency response / public safety' }
        ],
        when: () => true
    },
    {
        id: 'q_polar',
        dataQuestion: '7b',
        title: 'Was the contribution related to the Arctic/Antarctic, Canada\'s North, polar research/exploration, or northern heritage/sovereignty?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ],
        when: (ctx) => (ctx.flags.domain || []).includes('northern')
    },
    {
        id: 'q_innovation_specific',
        dataQuestion: '7c',
        title: 'Is there a specific innovation with demonstrated real-world impact (not just an idea)?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ],
        when: (ctx) => (ctx.flags.domain || []).includes('innovation')
    },
    {
        id: 'q_scope',
        dataQuestion: '8',
        title: 'Where was the primary impact felt?',
        type: 'single',
        options: [
            { value: 'local', label: 'Local community' },
            { value: 'regional', label: 'Regional / provincial' },
            { value: 'national', label: 'National (Canada-wide)' },
            { value: 'international', label: 'International' }
        ],
        when: () => true
    },
    {
        id: 'q_duration',
        dataQuestion: '9',
        title: 'Approximately how long did the contribution take place?',
        type: 'single',
        options: [
            { value: 'less-1', label: 'Less than 1 year' },
            { value: '1-5', label: '1–5 years' },
            { value: '5-10', label: '5–10 years' },
            { value: '10-plus', label: '10+ years' }
        ],
        when: () => true
    },
    {
        id: 'q_model',
        dataQuestion: '10',
        title: 'Did this create a model others now follow, or was it unique to the situation?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Created a model / example others follow' },
            { value: 'unique', label: 'Unique or situational' },
            { value: 'unsure', label: 'Not sure' }
        ],
        when: () => true
    },
    {
        id: 'q_may6_2023',
        dataQuestion: '11',
        title: 'Was the person alive on May 6, 2023?',
        helper: 'This is a key gate for the King Charles III Coronation Medal.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' }
        ],
        when: () => true
    },
    {
        id: 'q_student_top',
        dataQuestion: '12',
        title: 'Is the person a student graduating with the highest academic average in their program?',
        type: 'single',
        options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ],
        when: () => true
    },
    {
        id: 'q_beyond_duties',
        dataQuestion: '13',
        title: 'Was the contribution beyond normal duties/expectations for the role?',
        type: 'single',
        options: [
            { value: 'beyond', label: 'Beyond normal duties' },
            { value: 'within', label: 'Within expected duties' },
            { value: 'unsure', label: 'Not sure' }
        ],
        when: () => true
    }
];

// Honour definitions with scoring and classification
const HONOURS = [
    {
        id: 'order_of_canada',
        name: 'Order of Canada (C.C., O.C., C.M.)',
        category: 'Orders',
        description: 'Recognizes sustained, outstanding achievement, dedication to community, and service to the nation.',
        hardGates: (ctx) => {
            if (ctx.flags.alive === 'no') return { pass: false, reason: 'Not awarded posthumously.' };
            return { pass: true };
        },
        guidance: { likelyMin: 8, possibleMin: 5 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.singleVsSustained === 'sustained' || ctx.flags.singleVsSustained === 'both') {
                reasons.push('You indicated sustained contribution over time.');
            }
            if (['national', 'international'].includes(ctx.flags.scope)) {
                reasons.push('You selected national/international impact scope.');
            }
            if (ctx.flags.volunteer === 'yes' || ctx.flags.volunteer === 'mix') {
                reasons.push('You indicated significant community/volunteer contribution.');
            }
            return reasons;
        },
        nextSteps: [
            'Prepare a concise nomination summary: impact, timeframe, and evidence.',
            'Collect 2–3 reference contacts who can speak to the impact.',
            'Use language focused on service/achievement rather than politics or opinions.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/order-canada'
    },
    {
        id: 'bravery_decorations',
        name: 'Decorations for Bravery (C.V., S.C., M.B.)',
        category: 'Decorations',
        description: 'Recognizes acts of bravery in hazardous circumstances; level depends on degree of peril and courage.',
        hardGates: (ctx) => {
            if (ctx.flags.danger !== 'yes') return { pass: false, reason: 'Requires hazardous/perilous circumstances.' };
            if (ctx.flags.recent_incident === 'no') {
                return { pass: false, reason: 'Nominations are typically expected close to the incident timeframe.' };
            }
            return { pass: true };
        },
        guidance: { likelyMin: 7, possibleMin: 4 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.danger === 'yes') reasons.push('You indicated immediate, life-threatening danger/peril.');
            if (ctx.flags.recent_incident === 'yes') reasons.push('You indicated the incident was recent enough for nomination.');
            return reasons;
        },
        nextSteps: [
            'Document the incident clearly: date, location, circumstances, and witness statements.',
            'Collect any official reports (police, EMS, employer) if applicable.',
            'Submit nomination with a factual account (avoid exaggeration).'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/decorations-bravery'
    },
    {
        id: 'military_valour',
        name: 'Military Valour Decorations (V.C., S.M.V., M.M.V.)',
        category: 'Decorations',
        description: 'Recognizes military valour; awarded for acts of valour in military operations (including allied forces serving with CAF).',
        hardGates: (ctx) => {
            if (ctx.flags.caf !== 'yes') return { pass: false, reason: 'Requires military service context.' };
            if (ctx.flags.danger !== 'yes') return { pass: false, reason: 'Requires conspicuous valour in dangerous circumstances.' };
            return { pass: true };
        },
        guidance: { likelyMin: 7, possibleMin: 4 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.caf === 'yes') reasons.push('You indicated Canadian Armed Forces service context.');
            if (ctx.flags.danger === 'yes') reasons.push('You indicated extreme peril consistent with valour criteria.');
            return reasons;
        },
        nextSteps: [
            'Valour nominations are typically initiated within the military system.',
            'Gather operational context and corroboration through chain of command.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/military-valour-decorations'
    },
    {
        id: 'meritorious_service_civil',
        name: 'Meritorious Service Decorations (Civil) — M.S.C. / M.S.M.',
        category: 'Decorations',
        description: 'Recognizes a specific exceptional deed/activity that brings honour or benefit to Canada or a community.',
        hardGates: () => ({ pass: true }),
        guidance: { likelyMin: 7, possibleMin: 4 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.singleVsSustained === 'single' || ctx.flags.singleVsSustained === 'both') {
                reasons.push('You indicated a specific deed/project/activity.');
            }
            if (ctx.flags.model === 'yes') reasons.push('You indicated it created a model others follow.');
            if (['regional', 'national', 'international'].includes(ctx.flags.scope)) {
                reasons.push('You selected broader impact scope.');
            }
            return reasons;
        },
        nextSteps: [
            'Define the deed/activity precisely (scope, timeframe, measurable results).',
            'Collect evidence the work benefited others or brought credit/honour to Canada/community.',
            'Obtain references who can verify impact beyond normal expectations.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/meritorious-service-decorations-civil-division'
    },
    {
        id: 'sovereigns_medal_volunteers',
        name: 'Sovereign\'s Medal for Volunteers',
        category: 'Medals',
        description: 'Recognizes unpaid, sustained, and significant volunteer contributions; non-Canadians may qualify if benefiting Canada/Canadians.',
        hardGates: (ctx) => {
            if (ctx.flags.volunteer !== 'yes') return { pass: false, reason: 'Focused on unpaid volunteer service.' };
            return { pass: true };
        },
        guidance: { likelyMin: 7, possibleMin: 4 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.volunteer === 'yes') reasons.push('You indicated the contribution is primarily unpaid volunteer service.');
            if (ctx.flags.duration === '10-plus' || ctx.flags.duration === '5-10') {
                reasons.push('You indicated long-term volunteer commitment.');
            }
            return reasons;
        },
        nextSteps: [
            'List volunteer roles, dates, hours/impact, and communities served.',
            'Gather references from organizations you served with.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/sovereigns-medal-volunteers'
    },
    {
        id: 'polar_medal',
        name: 'Polar Medal',
        category: 'Medals',
        description: 'Recognizes outstanding service in Canada\'s North or polar research/exploration, including contributions to knowledge, heritage, or sovereignty.',
        hardGates: (ctx) => {
            if (ctx.flags.polar_related !== 'yes') return { pass: false, reason: 'Requires polar/North-related service or contribution.' };
            return { pass: true };
        },
        guidance: { likelyMin: 7, possibleMin: 4 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.polar_related === 'yes') reasons.push('You indicated polar/North-related contribution.');
            if (ctx.flags.scope) reasons.push(`You indicated scope: ${ctx.flags.scope}.`);
            return reasons;
        },
        nextSteps: [
            'Document the polar/North work: role, location, time period, and outcomes.',
            'Provide evidence of recognized expedition, research impact, or northern community benefit (as applicable).'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/polar-medal'
    },
    {
        id: 'coronation_medal',
        name: 'King Charles III Coronation Medal (Commemorative)',
        category: 'Medals',
        description: 'Commemorative medal recognizing significant contribution to Canada or a community; includes a key date eligibility gate.',
        hardGates: (ctx) => {
            if (ctx.flags.may6_2023 === 'no') return { pass: false, reason: 'Must have been alive on May 6, 2023.' };
            return { pass: true };
        },
        guidance: { likelyMin: 6, possibleMin: 3 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.may6_2023 === 'yes') reasons.push('You indicated the person was alive on May 6, 2023.');
            if (['local', 'regional', 'national'].includes(ctx.flags.scope)) {
                reasons.push('You indicated meaningful contribution at a community or broader level.');
            }
            return reasons;
        },
        nextSteps: [
            'Identify nominating channels (organizations/provinces/territories/institutions that allocate nominations).',
            'Summarize contributions with clear community benefit evidence.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/king-charles-iii-coronation-medal'
    },
    {
        id: 'gg_academic_medal',
        name: 'Governor General\'s Academic Medal',
        category: 'Awards',
        description: 'Recognizes graduating students with the highest academic average (level depends on program).',
        hardGates: (ctx) => {
            if (ctx.flags.student_top !== 'yes') return { pass: false, reason: 'Awarded based on top academic average in an eligible program.' };
            return { pass: true };
        },
        guidance: { likelyMin: 6, possibleMin: 3 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.student_top === 'yes') reasons.push('You indicated highest academic average in an eligible program.');
            return reasons;
        },
        nextSteps: [
            'Confirm your school/program participates and what averaging rules apply.',
            'This is typically handled by the institution rather than public nomination.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/governor-generals-academic-medal'
    },
    {
        id: 'gg_innovation_awards',
        name: 'Governor General\'s Innovation Awards',
        category: 'Awards',
        description: 'Recognizes living Canadian citizens or permanent residents for a specific innovation with demonstrated impact.',
        hardGates: (ctx) => {
            if (ctx.flags.alive === 'no') return { pass: false, reason: 'No posthumous nominations.' };
            if (!['canadian', 'permanent-resident'].includes(ctx.flags.status)) {
                return { pass: false, reason: 'Requires Canadian citizenship or permanent residency.' };
            }
            if (ctx.flags.innovation_specific !== 'yes') {
                return { pass: false, reason: 'Requires a specific innovation with demonstrated impact.' };
            }
            return { pass: true };
        },
        guidance: { likelyMin: 7, possibleMin: 4 },
        whyItMatched: (ctx) => {
            const reasons = [];
            if (ctx.flags.innovation_specific === 'yes') reasons.push('You indicated a specific innovation with demonstrated impact.');
            if (['canadian', 'permanent-resident'].includes(ctx.flags.status)) {
                reasons.push('You indicated Canadian citizenship or permanent residency.');
            }
            return reasons;
        },
        nextSteps: [
            'Prepare a short innovation case: what changed, who benefited, proof of impact.',
            'Identify the nomination pathway (often via nominating partners).'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/governor-generals-innovation-awards'
    },
    {
        id: 'gg_arts_awards',
        name: 'Governor General\'s Arts Awards (Literary / Visual & Media / Performing Arts)',
        category: 'Awards',
        description: 'Major national arts recognitions administered through partner organizations; eligibility varies by program.',
        hardGates: () => ({ pass: true }),
        guidance: { likelyMin: 7, possibleMin: 3 },
        whyItMatched: (ctx) => {
            const reasons = [];
            const domain = ctx.flags.domain || [];
            if (domain.includes('arts')) reasons.push('You selected Arts & culture as a primary area of contribution.');
            if (['national', 'international'].includes(ctx.flags.scope)) {
                reasons.push('You indicated broad public impact.');
            }
            return reasons;
        },
        nextSteps: [
            'Check the specific award program\'s eligibility rules and nomination processes.',
            'Collect portfolio/publication/production evidence and third-party recognition as applicable.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/governor-generals-awards-arts'
    },
    {
        id: 'gg_history_awards',
        name: 'Governor General\'s History Awards',
        category: 'Awards',
        description: 'Recognizes excellence in Canadian history education and public programming; specific categories vary by program.',
        hardGates: () => ({ pass: true }),
        guidance: { likelyMin: 7, possibleMin: 3 },
        whyItMatched: (ctx) => {
            const reasons = [];
            const domain = ctx.flags.domain || [];
            if (domain.includes('academia') || domain.includes('public') || domain.includes('science')) {
                reasons.push('You selected education/public programming/research-related domains.');
            }
            return reasons;
        },
        nextSteps: [
            'Identify which History Awards stream matches (teaching, programming, community history, etc.).',
            'Prepare evidence: curriculum/program reach, outcomes, audience impact, and references.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/governor-generals-history-awards'
    },
    {
        id: 'persons_case_awards',
        name: 'Governor General\'s Awards in Commemoration of the Persons Case',
        category: 'Awards',
        description: 'Recognizes contributions to advancing gender equality; categories can include youth and adult recognitions.',
        hardGates: () => ({ pass: true }),
        guidance: { likelyMin: 7, possibleMin: 3 },
        whyItMatched: (ctx) => {
            const reasons = [];
            const domain = ctx.flags.domain || [];
            if (domain.includes('community') || domain.includes('public')) {
                reasons.push('You indicated community/public-service oriented impact.');
            }
            return reasons;
        },
        nextSteps: [
            'Confirm the current award streams and eligibility for the relevant year.',
            'Gather evidence of sustained, measurable equality-advancing impact (programs, outcomes, endorsements).'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/governor-generals-awards-commemoration-persons-case'
    },
    {
        id: 'order_military_merit',
        name: 'Order of Military Merit',
        category: 'Orders',
        description: 'Recognizes exceptional service and merit in the Canadian Armed Forces (3 levels).',
        hardGates: (ctx) => {
            if (ctx.flags.caf !== 'yes') return { pass: false, reason: 'Requires service in the Canadian Armed Forces.' };
            return { pass: true };
        },
        guidance: { likelyMin: 6, possibleMin: 3 },
        whyItMatched: (ctx) => {
            return ctx.flags.caf === 'yes' ? ['You indicated CAF service context.'] : [];
        },
        nextSteps: [
            'These nominations usually flow through the CAF system.',
            'Document sustained excellence and leadership, with performance evidence.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/order-military-merit'
    },
    {
        id: 'sacrifice_medal',
        name: 'Sacrifice Medal',
        category: 'Medals',
        description: 'Recognizes CAF members who died or were injured under honourable circumstances related to military service (rules are specific).',
        hardGates: (ctx) => {
            if (ctx.flags.caf !== 'yes') return { pass: false, reason: 'Requires CAF service context.' };
            return { pass: true };
        },
        guidance: { likelyMin: 5, possibleMin: 2 },
        whyItMatched: (ctx) => {
            return ctx.flags.caf === 'yes' ? ['You indicated CAF service context.'] : [];
        },
        nextSteps: [
            'This is usually determined through CAF records and official criteria.',
            'Confirm service-related injury/disease conditions and dates.'
        ],
        url: 'https://www.gg.ca/en/honours/canadian-honours/sacrifice-medal'
    }
];

// Scoring function
function scoreHonours(ctx) {
    const scores = {};
    HONOURS.forEach(h => scores[h.id] = 0);
    
    const flags = ctx.flags;
    
    // Order of Canada
    if (flags.alive === 'yes') scores.order_of_canada += 2;
    if (flags.status === 'canadian') scores.order_of_canada += 2;
    if (flags.singleVsSustained === 'sustained') scores.order_of_canada += 4;
    if (flags.singleVsSustained === 'both') scores.order_of_canada += 3;
    if (['national', 'international'].includes(flags.scope)) scores.order_of_canada += 3;
    if (flags.scope === 'regional') scores.order_of_canada += 1;
    if (flags.duration === '10-plus') scores.order_of_canada += 2;
    if (flags.duration === '5-10') scores.order_of_canada += 1;
    const domain = flags.domain || [];
    if (domain.includes('community') || domain.includes('public') || domain.includes('science') || domain.includes('academia')) {
        scores.order_of_canada += 2;
    }
    
    // Bravery decorations
    if (flags.danger === 'yes') scores.bravery_decorations += 6;
    if (flags.recent_incident === 'yes') scores.bravery_decorations += 2;
    if (flags.recent_incident === 'unsure') scores.bravery_decorations += 1;
    
    // Military valour
    if (flags.caf === 'yes') scores.military_valour += 4;
    if (flags.danger === 'yes') scores.military_valour += 4;
    
    // Meritorious Service (Civil)
    if (flags.singleVsSustained === 'single') scores.meritorious_service_civil += 4;
    if (flags.singleVsSustained === 'both') scores.meritorious_service_civil += 3;
    if (flags.model === 'yes') scores.meritorious_service_civil += 2;
    if (flags.beyond_duties === 'beyond') scores.meritorious_service_civil += 2;
    if (['regional', 'national', 'international'].includes(flags.scope)) scores.meritorious_service_civil += 2;
    if (domain.includes('innovation') || domain.includes('public') || domain.includes('emergency') || domain.includes('science')) {
        scores.meritorious_service_civil += 1;
    }
    
    // Sovereign's Medal for Volunteers
    if (flags.volunteer === 'yes') scores.sovereigns_medal_volunteers += 5;
    if (flags.duration === '10-plus') scores.sovereigns_medal_volunteers += 3;
    if (flags.duration === '5-10') scores.sovereigns_medal_volunteers += 2;
    if (domain.includes('community')) scores.sovereigns_medal_volunteers += 2;
    
    // Polar Medal
    if (flags.polar_related === 'yes') scores.polar_medal += 6;
    if (['regional', 'national', 'international'].includes(flags.scope)) scores.polar_medal += 2;
    
    // Coronation Medal
    if (flags.may6_2023 === 'yes') scores.coronation_medal += 4;
    if (flags.may6_2023 === 'unsure') scores.coronation_medal += 1;
    if (['local', 'regional', 'national'].includes(flags.scope)) scores.coronation_medal += 2;
    if (domain.includes('community') || domain.includes('public') || domain.includes('emergency')) {
        scores.coronation_medal += 1;
    }
    
    // GG Academic
    if (flags.student_top === 'yes') scores.gg_academic_medal += 10;
    
    // GG Innovation
    if (flags.alive === 'yes') scores.gg_innovation_awards += 2;
    if (['canadian', 'permanent-resident'].includes(flags.status)) scores.gg_innovation_awards += 3;
    if (flags.innovation_specific === 'yes') scores.gg_innovation_awards += 5;
    if (domain.includes('innovation')) scores.gg_innovation_awards += 2;
    if (flags.model === 'yes') scores.gg_innovation_awards += 1;
    
    // Arts / History / Persons Case
    if (domain.includes('arts')) scores.gg_arts_awards += 4;
    if (['national', 'international'].includes(flags.scope)) scores.gg_arts_awards += 2;
    
    if (domain.includes('academia') || domain.includes('science')) scores.gg_history_awards += 3;
    if (domain.includes('community') || domain.includes('public')) scores.gg_history_awards += 1;
    
    if (domain.includes('community') || domain.includes('public')) scores.persons_case_awards += 2;
    
    // Order of Military Merit
    if (flags.caf === 'yes') scores.order_military_merit += 4;
    if (flags.singleVsSustained === 'sustained' || flags.singleVsSustained === 'both') {
        scores.order_military_merit += 2;
    }
    
    // Sacrifice Medal
    if (flags.caf === 'yes') scores.sacrifice_medal += 2;
    if (flags.danger === 'yes') scores.sacrifice_medal += 1;
    
    // Clamp all scores
    Object.keys(scores).forEach(k => {
        scores[k] = Math.max(0, Math.min(12, scores[k]));
    });
    
    return scores;
}

// Classify honour results
function classifyHonour(honour, score, ctx) {
    if (honour.hardGates) {
        const gate = honour.hardGates(ctx);
        if (!gate.pass) return { bucket: 'Not likely', gateReason: gate.reason || 'Fails a key eligibility gate.' };
    }
    if (score >= honour.guidance.likelyMin) return { bucket: 'Likely' };
    if (score >= honour.guidance.possibleMin) return { bucket: 'Possible' };
    return { bucket: 'Not likely' };
}

// Build visible questions based on current context
function buildVisibleQuestions(ctx) {
    return QUESTION_DEFINITIONS.filter(q => q.when ? q.when(ctx) : true);
}

// Apply answer effects to context
function applyAnswerEffects(ctx, questionId, answer) {
    const next = {
        flags: { ...ctx.flags },
        answers: { ...ctx.answers, [questionId]: answer }
    };
    
    // Map answers to flags
    const question = QUESTION_DEFINITIONS.find(q => q.id === questionId);
    if (!question) return next;
    
    // Handle different question types
    if (questionId === 'q_subject') {
        next.flags.subject = answer;
    } else if (questionId === 'q_alive') {
        next.flags.alive = answer;
    } else if (questionId === 'q_status') {
        next.flags.status = answer;
    } else if (questionId === 'q_caf') {
        next.flags.caf = answer;
    } else if (questionId === 'q_volunteer') {
        next.flags.volunteer = answer;
    } else if (questionId === 'q_danger') {
        next.flags.danger = answer;
    } else if (questionId === 'q_recent_incident') {
        next.flags.recent_incident = answer;
    } else if (questionId === 'q_single_vs_sustained') {
        next.flags.singleVsSustained = answer;
    } else if (questionId === 'q_domain') {
        next.flags.domain = Array.isArray(answer) ? answer : [answer];
    } else if (questionId === 'q_polar') {
        next.flags.polar_related = answer;
    } else if (questionId === 'q_innovation_specific') {
        next.flags.innovation_specific = answer;
    } else if (questionId === 'q_scope') {
        next.flags.scope = answer;
    } else if (questionId === 'q_duration') {
        next.flags.duration = answer;
    } else if (questionId === 'q_model') {
        next.flags.model = answer;
    } else if (questionId === 'q_may6_2023') {
        next.flags.may6_2023 = answer;
    } else if (questionId === 'q_student_top') {
        next.flags.student_top = answer;
    } else if (questionId === 'q_beyond_duties') {
        next.flags.beyond_duties = answer;
    }
    
    return next;
}

