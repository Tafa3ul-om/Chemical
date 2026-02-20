// 1. البيانات الأساسية (المواد والتفاعلات)
const chemicalsData = {
    elements: [
        { id: 'Zn', label: 'خارصين' }, { id: 'Fe', label: 'حديد' },
        { id: 'Cu', label: 'نحاس' }, { id: 'Al', label: 'ألمنيوم' },
        { id: 'Na', label: 'صوديوم' }, { id: 'O2', label: 'أكسجين' },
        { id: 'Mg', label: 'ماغنيسيوم' }, { id: 'Cl2', label: 'كلور' } 
    ],
    compounds: [
        { id: 'HCl', label: 'حمض الهيدروكلوريك' }, { id: 'H2SO4', label: 'حمض الكبريتيك' },
        { id: 'HNO3', label: 'حمض النيرتيك' }, { id: 'NaOH', label: 'هيدروكسيد الصوديوم' },
        { id: 'CaCO3', label: 'كربونات الكالسيوم' }, { id: 'NH3', label: 'أمونيا' },
        { id: 'H2O', label: 'ماء' }, { id: 'CO2', label: 'ثاني أكسيد الكربون' }
    ]
};

// تعريفات أنواع التفاعلات للتبويب الثاني
const typeDefinitions = {
    'تفاعل تعادل': 'تفاعل بين حمض وقاعدة لإنتاج ملح وماء، حيث تلغي خصائص كل منهما الآخر.',
    'تفاعل إحلال بسيط': 'عنصر نشط يحل محل عنصر آخر أقل نشاطاً منه في مركباته (سلسلة النشاط).',
    'تفاعل إزاحة عنيف': 'تفاعلات نشطة جداً تطلق كمية كبيرة من الطاقة والحرارة فور حدوثها.',
    'تفاعل إحلال مزدوج': 'تبادل الأيونات بين مركبين لتكوين مركبات جديدة (مثل تفاعل الكربونات).',
    'تفاعل اتحاد مباشر': 'اتحاد مادتين أو أكثر لتكوين مركب واحد جديد تماماً.',
    'أكسدة واختزال': 'تفاعلات تتضمن انتقال الإلكترونات وتغير في حالة التأكسد للمواد.',
'تفاعل ذوبان': 'تفاعلات تنفصل فيها جزيئات أو أيونات المذاب وتحيط بها جزيئات الماء.',
    'تأكسد': 'ارتباط المادة بالأكسجين لتكوين الأكاسيد مثل صدأ الحديد.'
};

// مصفوفة التفاعلات الشاملة والموثوقة
const reactions = [
    { reactants: ['Zn', 'HCl'], equation: 'Zn + 2HCl → ZnCl₂ + H₂↑', type: 'تفاعل إحلال بسيط', desc: 'يحل الخارصين محل الهيدروجين ويتصاعد غاز الهيدروجين (يحدث اشتعال بفرقعة).' },
    { reactants: ['Zn', 'H2SO4'], equation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑', type: 'تفاعل إحلال بسيط', desc: 'يتفاعل الخارصين مع حمض الكبريتيك المخفف منتجاً كبريتات الخارصين.' },
    { reactants: ['Zn', 'HNO3'], equation: 'Zn + 4HNO₃(conc) → Zn(NO₃)₂ + 2NO₂ + 2H₂O', type: 'أكسدة واختزال', desc: 'تفاعل مع حمض النيتريك المركز ينتج أبخرة بنية محمرة من ثاني أكسيد النيتروجين.' },
{ reactants: ['Fe', 'HCl'], equation: 'Fe + 2HCl → FeCl₂ + H₂↑', type: 'تفاعل إحلال بسيط', desc: 'يتفاعل الحديد ببطء مع الحمض المخفف مكوناً كلوريد الحديد II.' },
    { reactants: ['Fe', 'H2SO4'], equation: 'Fe + H₂SO₄ → FeSO₄ + H₂↑', type: 'تفاعل إحلال بسيط', desc: 'ينتج كبريتات الحديد II وغاز الهيدروجين.' },
{ reactants: ['Al', 'HCl'], equation: '2Al + 6HCl → 2AlCl₃ + 3H₂↑', type: 'تفاعل إحلال بسيط', desc: 'تفاعل سريع جداً بعد ثوانٍ من وضع الألمنيوم (بسبب طبقة الأكسيد الحامية).' },
{ reactants: ['Na', 'H2O'], equation: '2Na + 2H₂O → 2NaOH + H₂↑', type: 'تفاعل إزاحة عنيف', desc: 'يتفاعل الصوديوم مع الماء بشدة وقد يشتعل الغاز الناتج تلقائياً.' },
{ reactants: ['Na', 'HCl'], equation: '2Na + 2HCl → 2NaCl + H₂↑', type: 'تفاعل إزاحة عنيف', desc: 'تفاعل عنيف جداُ، حيث يزيح الصوديوم الهيدروجين الموجود في حمض الهيدروكلوريك مشكلا ملح كلوريد الصوديوم ويتصاعد غاز الهيدروجين.' },
{ reactants: ['Na', 'H2SO4'], equation: '2Na + H₂SO₄ → Na₂SO₄ + H₂↑', type: 'تفاعل إزاحة عنيف', desc: 'تفاعل عنيف جداُ، حيث يزيح الصوديوم الهيدروجين الموجود في حمض الكبريتيك مشكلا ملح كبريتات الصوديوم ويتصاعد غاز الهيدروجين ويعطي التفاعل لهبًا أصفر مميزاً.' },
{ reactants: ['Na', 'HNO3'], equation: '2Na + 2HNO₃ → 2NaNO₃ + H₂↑', type: 'تفاعل إزاحة عنيف', desc: 'تفاعل عنيف جداُ، حيث يزيح الصوديوم الهيدروجين الموجود في حمض النيتريك مشكلا ملح نترات الصوديوم ويتصاعد غاز الهيدروجين.' },
{ reactants: ['Cu', 'HNO3'], equation: 'Cu + 4HNO₃(conc) → Cu(NO₃)₂ + 2NO₂ + 2H₂O', type: 'أكسدة واختزال', desc: 'النحاس لا يزيح الهيدروجين، لكنه يتفاعل مع حمض النيتريك المركز كعامل مؤكسد وينتج غازاً بنياً.' },
{ reactants: ['CaCO3', 'HCl'], equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑', type: 'تفاعل إحلال مزدوج', desc: 'يحدث فوران شديد نتيجة تصاعد غاز ثاني أكسيد الكربون.' },
{ reactants: ['CaCO3', 'H2SO4'], equation: 'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑', type: 'تفاعل إحلال مزدوج', desc: 'يتكون كبريتات الكالسيوم (الجبس) وثاني أكسيد الكربون.' },
{ reactants: ['HCl', 'NaOH'], equation: 'HCl + NaOH → NaCl + H₂O', type: 'تفاعل تعادل', desc: 'تفاعل حمض قوي وقاعدة قوية لينتج ملح الطعام المتعادل.' },
{ reactants: ['H2SO4', 'NaOH'], equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O', type: 'تفاعل تعادل', desc: 'تفاعل إنتاج كبريتات الصوديوم.' },
{ reactants: ['HNO3', 'NaOH'], equation: 'HNO₃ + NaOH → NaNO₃ + H₂O', type: 'تفاعل تعادل', desc: 'تفاعل إنتاج نترات الصوديوم.' },
{ reactants: ['NH3', 'HCl'], equation: 'NH₃ + HCl → NH₄Cl', type: 'تفاعل اتحاد مباشر', desc: 'تتكون سحب بيضاء كثيفة من ملح كلوريد الأمونيوم.' },
{ reactants: ['NH3', 'H2O'], equation: 'NH₃ + H₂O ⇌ NH₄OH', type: 'تفاعل ذوبان', desc: 'ذوبان الأمونيا في الماء لإنتاج هيدروكسيد الأمونيوم.' },
{ reactants: ['CH4', 'O2'], equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O', type: 'أكسدة واختزال', desc: 'تفاعل طارد للحرارة ينتج عنه ثاني أكسيد الكربون وبخار ماء.' },
{ reactants: ['Fe', 'O2'], equation: '4Fe + 3O₂ → 2Fe₂O₃', type: 'تأكسد', desc: 'تفاعل الحديد مع الأكسجين في وجود الرطوبة يكوّن الصدأ.' },
{ reactants: ['Mg', 'O2'], equation: '2Mg  +  O2 ​ →  2MgO', type: 'تأكسد', desc: 'تفاعل قوي وسريع يطلق حرارة وضوء ويكون مسحوق أبيض  .' },
{ reactants: ['Mg', 'HCl'], equation: 'Mg  +  2HCl  →  MgCl₂  +  H₂​', type: 'تفاعل إحلال بسيط', desc: 'يحدث تفاعل شديد طارد للحرارة .' },
{ reactants: ['Mg', 'H2SO4'], equation: 'Mg  +  H₂SO₄​  →  MgSO₄  ​+  H2​', type: 'تفاعل إحلال بسيط', desc: 'تفاعل شديد طارد للحرارة .' },
{ reactants: ['Mg', 'H2O'], equation: 'Mg  +  2H₂​​O  →  Mg(OH)₂​  +  H₂​', type: 'تفاعل اتحاد مباشر', desc: 'يتفاعل الماغنيسيوم ببطء مع الماء الدافئ لكنه يتفاعل بعنف مع الماء الساخن مشكلاً هيدروكسيد الماغنيسيوم  .' },
{ reactants: ['Mg', 'CO2'], equation: '2Mg  +  CO₂​  →  2MgO  +  C', type: 'أكسدة واختزال', desc: 'يؤدي تفاعل الماغنسيوم المشتعل مع ثاني أكسيد الكربون إلى اختزال الغاز وإنتاج أكسيد الماغنسيوم (مسحوق أبيض) وترسيب الكربون (مسحوق أسود).' },
{ reactants: ['Na', 'Cl2'], equation: '2Na + Cl₂ → 2NaCl', type: 'تفاعل اتحاد مباشر', desc: 'تفاعل عنيف ينتج عنه ملح الطعام (كلوريد الصوديوم).' },
{ reactants: ['Fe', 'Cl2'], equation: '2Fe + 3Cl₂ → 2FeCl₃', type: 'تفاعل اتحاد مباشر', desc: 'تفاعل الحديد المسخن مع الكلور لتكوين كلوريد الحديد III ذو اللون البني.' },
{ reactants: ['Zn', 'Cl2'], equation: 'Zn + Cl₂ → ZnCl₂', type: 'تفاعل اتحاد مباشر', desc: 'اتحاد مباشر بين الخارصين والكلور لإنتاج ملح كلوريد الخارصين.' },
{ reactants: ['Al', 'Cl2'], equation: '2Al + 3Cl₂ → 2AlCl₃', type: 'تفاعل اتحاد مباشر', desc: 'تفاعل الألومنيوم مع الكلور لإنتاج كلوريد الألومنيوم.' },
{ reactants: ['Cu', 'Cl2'], equation: 'Cu + Cl₂ → CuCl₂', type: 'تفاعل اتحاد مباشر', desc: 'تفاعل النحاس مع الكلور لإنتاج كلوريد النحاس II.' },
{ reactants: ['Mg', 'Cl2'], equation: 'Mg + Cl₂ → MgCl₂', type: 'تفاعل اتحاد مباشر', desc: 'يحترق المغنيسيوم في جو من غاز الكلور منتجاً ملح كلوريد المغنيسيوم.' },
{ reactants: ['H2', 'Cl2'], equation: 'H₂ + Cl₂ → 2HCl', type: 'تفاعل اتحاد مباشر', desc: 'يتحد الغازان لتكوين غاز كلوريد الهيدروجين الذي يذوب في الماء مكوناً حمض الهيدروكلوريك.' },
{ reactants: ['NaOH', 'Cl2'], equation: '2NaOH + Cl₂ → NaCl + NaClO + H₂O', type: 'أكسدة واختزال', desc: 'يتفاعل الكلور مع هيدروكسيد الصوديوم البارد لتكوين ملح الطعام وهيبوكلوريت الصوديوم (المبيض).' },
{ reactants: ['H2O', 'Cl2'], equation: 'Cl₂ + H₂O ⇌ HCl + HClO', type: 'تفاعل إحلال بسيط', desc: 'يذوب الكلور في الماء مكوناً حمض الهيدروكلوريك وحمض الهيبوكلوروز (يستخدم في تعقيم المياه).' },
{ reactants: ['NH3', 'Cl2'], equation: '8NH₃ + 3Cl₂ → 6NH₄Cl + N₂', type: 'أكسدة واختزال', desc: 'تفاعل الأمونيا مع غاز الكلور ينتج عنه سحب بيضاء من كلوريد الأمونيوم وانطلاق غاز النيتروجين.' },
{ reactants: ['CaCO3', 'Cl2'], equation: 'CaCO₃ + Cl₂ + H₂O → CaCl₂ + CO₂ + HOCl', type: 'تفاعل إحلال مزدوج', desc: 'يتفاعل الكلور مع الكربونات في وسط مائي لإنتاج كلوريد الكالسيوم وغاز ثاني أكسيد الكربون.' },
{ reactants: ['Al', 'H2O'], equation: '2Al + 6H₂O → 2Al(OH)₃ + 3H₂↑', type: 'تفاعل إحلال بسيط', desc: 'يتفاعل الألومنيوم مع الماء منتجاً هيدروكسيد الألومنيوم وغاز الهيدروجين.' },
{ reactants: ['Fe', 'H2O'], equation: '3Fe + 4H₂O → Fe₃O₄ + 4H₂↑', type: 'تفاعل إحلال بسيط', desc: 'تفاعل الحديد مع بخار الماء الساخن لتكوين أكسيد الحديد المغناطيسي.' },
{ reactants: ['Al', 'H2SO4'], equation: '2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂↑', type: 'تفاعل إحلال بسيط', desc: 'يحل الألومنيوم محل هيدروجين حمض الكبريتيك مكوناً كبريتات الألومنيوم.' },
{ reactants: ['Fe', 'HNO3'], equation: 'Fe + 4HNO₃ → Fe(NO₃)₃ + NO + 2H₂O', type: 'أكسدة واختزال', desc: 'تفاعل الحديد مع حمض النيتريك المخفف لإنتاج نترات الحديد III وغاز أكسيد النيتريك.' },
{ reactants: ['Mg', 'HNO3'], equation: 'Mg + 4HNO₃ → Mg(NO₃)₂ + 2NO₂ + 2H₂O', type: 'أكسدة واختزال', desc: 'تفاعل المغنيسيوم مع حمض النيتريك المركز لإنتاج أبخرة بنيّة من ثاني أكسيد النيتروجين.' },
{ reactants: ['Cu', 'O2'], equation: '2Cu + O₂ → 2CuO', type: 'تأكسد', desc: 'تأكسد النحاس عند تسخينه في الهواء لتكوين أكسيد النحاس الأسود.' },
{ reactants: ['Al', 'O2'], equation: '4Al + 3O₂ → 2Al₂O₃', type: 'تأكسد', desc: 'يتفاعل الألومنيوم مع الأكسجين لتكوين طبقة واقية من أكسيد الألومنيوم.' },
{ reactants: ['Zn', 'O2'], equation: '2Zn + O₂ → 2ZnO', type: 'تأكسد', desc: 'احتراق الخارصين في الأكسجين لإنتاج أكسيد الخارصين الأبيض.' },
{ reactants: ['Mg', 'CO2'], equation: '2Mg + CO₂ → 2MgO + C', type: 'أكسدة واختزال', desc: 'يستمر المغنيسيوم في الاحتراق داخل ثاني أكسيد الكربون منتجاً أكسيد المغنيسيوم وفحم أسود.' },
{ reactants: ['NH3', 'H2SO4'], equation: '2NH₃ + H₂SO₄ → (NH₄)₂SO₄', type: 'تفاعل تعادل', desc: 'تفاعل غاز الأمونيا مع حمض الكبريتيك لإنتاج سماد كبريتات الأمونيوم.' },
{ reactants: ['NH3', 'HNO3'], equation: 'NH₃ + HNO₃ → NH₄NO₃', type: 'تفاعل تعادل', desc: 'تفاعل الأمونيا مع حمض النيتريك لإنتاج نترات الأمونيوم.' },
{ reactants: ['CaCO3', 'CO2', 'H2O'], equation: 'CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂', type: 'تفاعل اتحاد مباشر', desc: 'تحول كربونات الكالسيوم إلى بيكربونات كالسيوم ذائبة عند مرور ثاني أكسيد الكربون في الماء.' },
{ reactants: ['Al', 'NaOH', 'H2O'], equation: '2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂↑', type: 'تفاعل إحلال بسيط', desc: 'تفاعل الألومنيوم مع هيدروكسيد الصوديوم لإنتاج ألومينات الصوديوم وغاز الهيدروجين.' },
{ reactants: ['Zn', 'NaOH', 'H2O'], equation: 'Zn + 2NaOH + 2H₂O → Na₂[Zn(OH)₄] + H₂↑', type: 'تفاعل إحلال بسيط', desc: 'تفاعل الخارصين مع القواعد القوية لإنتاج زنكات الصوديوم.' },
{ reactants: ['NH3', 'O2'], equation: '4NH₃ + 5O₂ → 4NO + 6H₂O', type: 'أكسدة واختزال', desc: 'احتراق الأمونيا في وجود الأكسجين لإنتاج أكسيد النيتريك وبخار الماء.' },
{ reactants: ['H2O', 'CO2'], equation: 'CO₂ + H₂O ⇌ H₂CO₃', type: 'تفاعل ذوبان', desc: 'ذوبان ثاني أكسيد الكربون في الماء يكوّن حمض الكربونيك الضعيف.' }

];
let selectedChemicals = [];

// --- وظيفة شاشة التحميل المطورة ---
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // تحديد وقت البداية
    const startTime = Date.now();
    const minimumDisplayTime = 2000; // ثانيتين بالملي ثانية

    function fadeOut() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= minimumDisplayTime) {
            // إذا مرت الثانيتين فعلاً، اختفِ الآن
            preloader.classList.add('preloader-hidden');
        } else {
            // إذا كانت الصفحة سريعة جداً، انتظر حتى تكمل الثانيتين
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, minimumDisplayTime - elapsedTime);
        }
    }

    // انتظر تحميل الصفحة بالكامل أولاً
    if (document.readyState === 'complete') {
        fadeOut();
    } else {
        window.addEventListener('load', fadeOut);
    }

    // أمان إضافي: لو تعطل التحميل لأي سبب، اختفِ بعد 4 ثوانٍ كحد أقصى
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
    }, 4000);
}

// تشغيل الوظيفة فوراً
handlePreloader();

// 3. إدارة التبويبات
document.getElementById('btn-creation').onclick = function() { switchTab('creation-tab', this); };
document.getElementById('btn-ready').onclick = function() { 
    switchTab('ready-tab', this); 
    renderReadyReactions(); 
};

function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// 4. بناء القائمة الجانبية ودعم السحب المعاكس
function init() {
    const elList = document.getElementById('elements-list');
    const compList = document.getElementById('compounds-list');
    const sidebar = document.querySelector('.sidebar');

    chemicalsData.elements.forEach(c => elList.appendChild(createChemHTML(c)));
    chemicalsData.compounds.forEach(c => compList.appendChild(createChemHTML(c)));

    // دعم إرجاع العناصر بالسحب فوق السايدبار
    sidebar.ondragover = (e) => e.preventDefault();
    sidebar.ondrop = (e) => {
        const id = e.dataTransfer.getData('text');
        removeChemical(id);
    };
}

function createChemHTML(c) {
    const div = document.createElement('div');
    div.className = 'chemical';
    div.innerText = `${c.label} (${c.id})`;
    div.draggable = true;
    div.onclick = () => addChemical(c.id);
    div.ondragstart = (e) => e.dataTransfer.setData('text', c.id);
    return div;
}

// 5. منطق منطقة التفاعل (الإضافة والحذف)
const dropZone = document.getElementById('dropZone');
dropZone.ondragover = (e) => e.preventDefault();
dropZone.ondrop = (e) => { addChemical(e.dataTransfer.getData('text')); };

function addChemical(id) {
    if (selectedChemicals.length < 2 && !selectedChemicals.includes(id)) {
        selectedChemicals.push(id);
        updateDropZoneUI();
        if (selectedChemicals.length === 2) checkReaction();
    }
}

// وظيفة حذف المادة وإرجاعها
function removeChemical(id) {
    selectedChemicals = selectedChemicals.filter(item => item !== id);
    updateDropZoneUI();
    if (selectedChemicals.length < 2) {
        document.getElementById('resultPanel').style.display = 'none';
        dropZone.style.borderColor = 'rgba(224, 179, 255, 0.4)';
    }
}

// تحديث واجهة منطقة الإفلات
function updateDropZoneUI() {
    if (selectedChemicals.length === 0) {
        dropZone.innerHTML = 'اسحب المواد هنا أو انقر عليها';
        dropZone.style.borderColor = 'rgba(224, 179, 255, 0.4)';
        return;
    }

    dropZone.innerHTML = selectedChemicals.map(id => 
        `<span class="chemical-tag clickable-tag" onclick="removeChemical('${id}')" title="انقر للإزالة">${id}</span>`
    ).join(' + ');
}

function checkReaction() {
    const [c1, c2] = selectedChemicals;
    const reaction = reactions.find(r => r.reactants.includes(c1) && r.reactants.includes(c2));
    const panel = document.getElementById('resultPanel');
    panel.style.display = 'block';

    if (reaction) {
        document.getElementById('eq-text').innerText = reaction.equation;
        document.getElementById('type-text').innerText = reaction.type;
        document.getElementById('desc-text').innerText = reaction.desc;
        dropZone.style.borderColor = "#2ecc71";
        dropZone.classList.add('success-flash');
        setTimeout(() => dropZone.classList.remove('success-flash'), 600);
    } else {
        document.getElementById('eq-text').innerText = "لا يوجد تفاعل";
        document.getElementById('desc-text').innerText = `لا يوجد تفاعل معروف بين هذه المواد في المختبر حالياً.`;
        dropZone.style.borderColor = "#e74c3c";
    }
}

function resetApp() {
    selectedChemicals = [];
    updateDropZoneUI();
    document.getElementById('resultPanel').style.display = 'none';
}

// 6. موسوعة التفاعلات (التبويب الثاني)
function renderReadyReactions() {
    const container = document.getElementById('readyReactions');
    container.innerHTML = ''; 
    const types = [...new Set(reactions.map(r => r.type))];

    types.forEach(type => {
        const section = document.createElement('div');
        section.className = 'reaction-category-section';
        const definition = typeDefinitions[type] || 'تفاعل كيميائي أساسي.';
        
        section.innerHTML = `
            <h3>${type}</h3>
            <p class="type-definition">${definition}</p>
        `;
        
        const grid = document.createElement('div');
        grid.className = 'reactions-grid';

        reactions.filter(r => r.type === type).forEach(r => {
            const card = document.createElement('div');
            card.className = 'mini-card';
            card.innerHTML = `<span>${r.reactants.join(' + ')}</span>`;
            card.onclick = () => showModal(r);
            grid.appendChild(card);
        });
        section.appendChild(grid);
        container.appendChild(section);
    });
}

// 7. النافذة المنبثقة (Modal)
function showModal(r) {
    let modal = document.getElementById('reactionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'reactionModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div class="modal-content">
            <h3>تفاصيل التفاعل</h3>
            <div class="detail-item"><strong>المواد:</strong> ${r.reactants.join(' و ')}</div>
            <div class="detail-item"><strong>المعادلة:</strong> <span style="direction:ltr; display:inline-block;">${r.equation}</span></div>
            <div class="detail-item"><strong>النوع:</strong> ${r.type}</div>
            <div class="detail-item"><strong>الشرح:</strong> ${r.desc}</div>
            <hr>
            <button class="close-modal" onclick="closeModal()">إغلاق النافذة</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('reactionModal').style.display = 'none';
}

// التشغيل
init();
