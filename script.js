const canvas = document.getElementById('particles-canvas'),
    ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
}
resize();
window.addEventListener('resize', resize);

class P {
    constructor() {
        this.reset()
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 2 + .4;
        this.vx = (Math.random() - .5) * .22;
        this.vy = (Math.random() - .5) * .22;
        this.alpha = Math.random() * .35 + .1;
        const c = ['#59C749', '#45b036', '#a8e89e', '#FFFDF1', '#d4f0cf'];
        this.color = c[Math.floor(Math.random() * c.length)]
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1
    }
}
const getPC = () => window.innerWidth < 768 ? 35 : 85;
let ps = [];
function initPs() {
    ps = [];
    const count = getPC();
    for (let i = 0; i < count; i++) ps.push(new P());
}
initPs();
window.addEventListener('resize', () => {
    resize();
    if (ps.length !== getPC()) initPs();
});

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ps.forEach(p => {
        p.update();
        p.draw()
    });
    requestAnimationFrame(anim)
}
anim();

window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50));
const ham = document.getElementById('hamburger'),
    mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open')
});

function closeMobile() {
    ham.classList.remove('open');
    mob.classList.remove('open')
}

const ro = new IntersectionObserver(entries => entries.forEach((e, i) => {
    if (e.isIntersecting) {
        e.target.style.transitionDelay = (i % 4) * .08 + 's';
        e.target.classList.add('visible')
    }
}), {
    threshold: .05,
    rootMargin: '0px 0px -50px 0px'
});
document.querySelectorAll('.reveal').forEach(r => ro.observe(r));

function animCounter(el) {
    const t = parseInt(el.dataset.target),
        s = el.dataset.suffix || '+';
    let c = 0;
    const step = Math.ceil(t / 55);
    const tm = setInterval(() => {
        c = Math.min(c + step, t);
        el.textContent = c.toLocaleString() + s;
        if (c >= t) clearInterval(tm)
    }, 28)
}
const co = new IntersectionObserver(e => {
    e.forEach(x => {
        if (x.isIntersecting) {
            x.target.querySelectorAll('[data-target]').forEach(animCounter);
            co.unobserve(x.target)
        }
    })
}, {
    threshold: .3
});
co.observe(document.getElementById('stats'));

const courses = [{
        icon: '📐',
        name: 'IIT JEE Main & Advanced',
        desc: 'Complete preparation for Mains & Advanced. Physics, Chemistry, Mathematics by IIT alumni faculty.',
        tags: ['Engineering', 'Offline', 'Online'],
        filter: 'engineering'
    },
    {
        icon: '🩺',
        name: 'NEET / Medical Entrance',
        desc: 'Targeted coaching for NEET-UG, AIIMS & JIPMER. Biology, Physics & Chemistry by top medical educators.',
        tags: ['Medical', 'Offline', 'Online'],
        filter: 'medical'
    },
    {
        icon: '📚',
        name: 'Class XI – XII (Science)',
        desc: 'Board + entrance prep for PCM and PCB students. CBSE & State boards covered comprehensively.',
        tags: ['School', 'Offline'],
        filter: 'school'
    },
    {
        icon: '📝',
        name: 'Class IX – X (All Subjects)',
        desc: 'Strong foundation for Class 9 & 10 — all subjects including Math, Science, English & SST.',
        tags: ['School', 'Offline'],
        filter: 'school'
    },
    {
        icon: '🏛️',
        name: 'SSC CGL / CHSL / MTS',
        desc: 'Complete SSC coaching — Quant, English, Reasoning & GK. Regular mock tests & current affairs.',
        tags: ['Govt Jobs', 'Offline', 'Online'],
        filter: 'govt'
    },
    {
        icon: '🏦',
        name: 'Bank PO & Clerk (IBPS/SBI)',
        desc: 'Comprehensive banking exam prep — IBPS PO, SBI PO, Clerk. Expert faculty for all sections.',
        tags: ['Banking', 'Offline', 'Online'],
        filter: 'banking'
    },
    {
        icon: '⚖️',
        name: 'CLAT / Law Entrance',
        desc: 'Top law college entrance — CLAT, AILET, SLAT. Legal reasoning, GK, English by law experts.',
        tags: ['Law', 'Offline'],
        filter: 'law'
    },
    {
        icon: '📈',
        name: 'CAT / MBA Entrance',
        desc: 'CAT, XAT, NMAT, SNAP — full coverage of Quant, VARC and DILR with strategy sessions.',
        tags: ['Management', 'Offline', 'Online'],
        filter: 'management'
    },
    {
        icon: '🎖️',
        name: 'NDA / CDS / Defence Exams',
        desc: 'Armed Forces entrance — NDA, CDS, AFCAT. Maths, GAT and SSB interview preparation.',
        tags: ['Defence', 'Offline'],
        filter: 'defence'
    },
    {
        icon: '📋',
        name: 'CTET / TET / Teacher Exams',
        desc: 'Teaching eligibility exams — CTET, DSSSB, HTET. Child Development & Pedagogy coverage.',
        tags: ['Govt Jobs', 'Offline'],
        filter: 'govt'
    },
    {
        icon: '🚂',
        name: 'Railway RRB NTPC / JE',
        desc: 'Railway exams — RRB NTPC, Group D, JE. All subjects, technical & non-technical streams.',
        tags: ['Govt Jobs', 'Online'],
        filter: 'govt'
    },
    {
        icon: '🧮',
        name: 'Vedic Maths & Olympiad',
        desc: 'Speed mathematics, mental arithmetic, and competitive Maths Olympiad training for all ages.',
        tags: ['School', 'Offline'],
        filter: 'school'
    },
];

const grid = document.getElementById('coursesGrid');

function renderCourses(filter) {
    const list = filter === 'all' ? courses : courses.filter(c => c.filter === filter);
    grid.innerHTML = list.map(c => `<div class="course-card reveal"><span class="cc-icon">${c.icon}</span><div class="cc-name">${c.name}</div><div class="cc-desc">${c.desc}</div><div class="cc-tags">${c.tags.map((t,i)=>`<span class="cc-tag ${i===0?'g':''}">${t}</span>`).join('')}</div><button class="cc-btn" onclick="document.getElementById('admission').scrollIntoView({behavior:'smooth'})">Enroll in This Course →</button></div>`).join('');
    grid.querySelectorAll('.reveal').forEach(r => setTimeout(() => r.classList.add('visible'), 50));
}
renderCourses('all');
document.getElementById('filterTabs').addEventListener('click', e => {
    if (e.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderCourses(e.target.dataset.filter)
    }
});

document.getElementById('facultyGrid').innerHTML = [{
        name: 'Dr. Arif Khan',
        subject: 'Physics',
        exp: '18',
        init: 'AK'
    },
    {
        name: 'Priya Sharma',
        subject: 'Mathematics',
        exp: '14',
        init: 'PS'
    },
    {
        name: 'Mohd. Asif',
        subject: 'Chemistry',
        exp: '12',
        init: 'MA'
    },
    {
        name: 'Sunita Gupta',
        subject: 'Biology / NEET',
        exp: '16',
        init: 'SG'
    },
    {
        name: 'Rajesh Verma',
        subject: 'SSC / Govt Exams',
        exp: '10',
        init: 'RV'
    },
    {
        name: 'Neha Siddiqui',
        subject: 'English & Reasoning',
        exp: '9',
        init: 'NS'
    },
    {
        name: 'Vikram Singh',
        subject: 'IIT JEE Advanced',
        exp: '15',
        init: 'VS'
    },
    {
        name: 'Saima Akhtar',
        subject: 'Commerce XI–XII',
        exp: '11',
        init: 'SA'
    },
].map(f => `<div class="faculty-card reveal"><div class="faculty-avatar">${f.init}</div><h4>${f.name}</h4><div class="subject">${f.subject}</div><div class="exp"><strong>${f.exp}+</strong> years experience</div></div>`).join('');

const testimonials = [{
        text: 'This is a magnificent coaching centre not just for science but for every subject. Proficient teachers with years of experience guide students in the best way. Career counseling is a great bonus. 95% success rate speaks for itself!',
        name: 'Aakash Mehta',
        exam: 'IIT JEE Advanced',
        init: 'AM'
    },
    {
        text: 'ZEC is the best institute in Jamia Nagar. The faculty is highly skilled, cooperative and they try their best to impart knowledge. I cleared SSC CGL in my very first attempt!',
        name: 'Pooja Rawat',
        exam: 'SSC CGL',
        init: 'PR'
    },
    {
        text: 'Amazing environment, cooperative faculty and responsible staff. The quality of education is top-notch. ZEC gave me the confidence and skills to crack NEET on the first try.',
        name: 'Faraz Ahmed',
        exam: 'NEET UG',
        init: 'FA'
    },
    {
        text: 'One-stop solution for all academic problems. The ambience is friendly yet vigilant. Regular mock tests and personalized guidance helped me secure a job in SBI.',
        name: 'Divya Sharma',
        exam: 'SBI PO',
        init: 'DS'
    },
    {
        text: 'IITians and doctors are nourishing students at ZEC. The teaching quality for JEE and NEET is unmatched in Jamia Nagar. Highly recommend to every serious aspirant!',
        name: 'Rohit Yadav',
        exam: 'IIT JEE Main',
        init: 'RY'
    },
    {
        text: 'ZEC helped me crack CLAT in the very first attempt. The law faculty is exceptional and the doubt-clearing sessions were incredibly helpful during the final months.',
        name: 'Sana Mirza',
        exam: 'CLAT',
        init: 'SM'
    },
    {
        text: 'The railway exam coaching at ZEC is phenomenal. Structured syllabus, daily practice sheets and motivating faculty. I cleared RRB NTPC with flying colors!',
        name: 'Karan Bisht',
        exam: 'RRB NTPC',
        init: 'KB'
    },
    {
        text: 'CTET cleared in first attempt — all thanks to ZEC. The pedagogy section was explained so well that I scored 95% in that paper. Forever grateful to my teachers here.',
        name: 'Meena Joshi',
        exam: 'CTET',
        init: 'MJ'
    },
];
const doubled = [...testimonials, ...testimonials];
document.getElementById('testiTrack').innerHTML = doubled.map(t => `<div class="testi-card"><div class="stars">★★★★★</div><div class="testi-text">"${t.text}"</div><div class="testi-author"><div class="testi-avatar">${t.init}</div><div class="testi-info"><div class="name">${t.name}</div><div class="exam">✅ ${t.exam}</div></div></div></div>`).join('');

function submitForm() {
    const n = document.getElementById('fname').value.trim(),
        p = document.getElementById('fphone').value.trim(),
        e = document.getElementById('fexam').value;
    if (!n || !p || !e) {
        alert('Please fill in your Name, Phone, and Target Exam.');
        return
    }
    document.getElementById('enrollForm').style.display = 'none';
    const s = document.getElementById('successMsg');
    s.style.display = 'block';
    s.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
