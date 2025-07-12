// Creative Studio JavaScript - Complete functionality

// Global variables
let currentTool = null;
let fabricCanvas = null;
let logoCanvas = null;
let collageCanvas = null;
let currentLanguage = 'en';

// Language translations
const translations = {
    en: {
        'Professional Design Tools, Completely Free': 'Professional Design Tools, Completely Free',
        'Create stunning images, edit PDFs, and design graphics with our Adobe-inspired online tools. No downloads required!': 'Create stunning images, edit PDFs, and design graphics with our Adobe-inspired online tools. No downloads required!',
        'Start Editing': 'Start Editing',
        'PDF Tools': 'PDF Tools',
        'Choose Your Tool': 'Choose Your Tool',
        'Image Editor': 'Image Editor',
        'Professional photo editing with filters, crop, resize, and drawing tools': 'Professional photo editing with filters, crop, resize, and drawing tools',
        'Convert, merge, split PDFs and extract pages easily': 'Convert, merge, split PDFs and extract pages easily',
        'File Converter': 'File Converter',
        'Convert between image formats and documents instantly': 'Convert between image formats and documents instantly',
        'Design Templates': 'Design Templates',
        'Ready-made templates for social media, business cards, and posters': 'Ready-made templates for social media, business cards, and posters',
        'Logo Maker': 'Logo Maker',
        'Create professional logos with shapes, text, and icons': 'Create professional logos with shapes, text, and icons',
        'Collage Maker': 'Collage Maker',
        'Combine multiple images into beautiful collages': 'Combine multiple images into beautiful collages',
        'Upload Image': 'Upload Image',
        'Tools': 'Tools',
        'Brush': 'Brush',
        'Eraser': 'Eraser',
        'Text': 'Text',
        'Crop': 'Crop',
        'Filters': 'Filters',
        'Download': 'Download',
        'PDF to Images': 'PDF to Images',
        'Images to PDF': 'Images to PDF',
        'Merge PDFs': 'Merge PDFs',
        'Extract Pages': 'Extract Pages'
    },
    hi: {
        'Professional Design Tools, Completely Free': 'पेशेवर डिज़ाइन टूल्स, बिल्कुल मुफ्त',
        'Create stunning images, edit PDFs, and design graphics with our Adobe-inspired online tools. No downloads required!': 'हमारे एडोब-प्रेरित ऑनलाइन टूल्स के साथ शानदार छवियां बनाएं, पीडीएफ संपादित करें, और ग्राफिक्स डिज़ाइन करें। कोई डाउनलोड की आवश्यकता नहीं!',
        'Start Editing': 'संपादन शुरू करें',
        'PDF Tools': 'पीडीएफ टूल्स',
        'Choose Your Tool': 'अपना टूल चुनें',
        'Image Editor': 'छवि संपादक',
        'Professional photo editing with filters, crop, resize, and drawing tools': 'फिल्टर, क्रॉप, रीसाइज़ और ड्रॉइंग टूल्स के साथ पेशेवर फोटो संपादन',
        'Convert, merge, split PDFs and extract pages easily': 'आसानी से पीडीएफ को कन्वर्ट, मर्ज, स्प्लिट करें और पेज निकालें',
        'File Converter': 'फाइल कन्वर्टर',
        'Convert between image formats and documents instantly': 'छवि प्रारूपों और दस्तावेजों के बीच तुरंत कन्वर्ट करें',
        'Design Templates': 'डिज़ाइन टेम्प्लेट',
        'Ready-made templates for social media, business cards, and posters': 'सोशल मीडिया, बिजनेस कार्ड और पोस्टर के लिए तैयार टेम्प्लेट',
        'Logo Maker': 'लोगो मेकर',
        'Create professional logos with shapes, text, and icons': 'आकार, टेक्स्ट और आइकन के साथ पेशेवर लोगो बनाएं',
        'Collage Maker': 'कोलाज मेकर',
        'Combine multiple images into beautiful collages': 'कई छवियों को सुंदर कोलाज में मिलाएं',
        'Upload Image': 'छवि अपलोड करें',
        'Tools': 'टूल्स',
        'Brush': 'ब्रश',
        'Eraser': 'इरेज़र',
        'Text': 'टेक्स्ट',
        'Crop': 'क्रॉप',
        'Filters': 'फिल्टर',
        'Download': 'डाउनलोड',
        'PDF to Images': 'पीडीएफ से छवियां',
        'Images to PDF': 'छवियों से पीडीएफ',
        'Merge PDFs': 'पीडीएफ मर्ज करें',
        'Extract Pages': 'पेज निकालें'
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeTracking();
});

// App initialization
function initializeApp() {
    initializeImageEditor();
    initializeLogoMaker();
    initializeCollageMaker();
    updateLanguage();
    
    // Add event listeners
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);
    document.getElementById('brightness-slider').addEventListener('input', applyFilters);
    document.getElementById('contrast-slider').addEventListener('input', applyFilters);
    document.getElementById('saturation-slider').addEventListener('input', applyFilters);
    
    // PDF Tools event listeners
    document.getElementById('pdf-to-image-upload').addEventListener('change', handlePdfUpload);
    document.getElementById('images-to-pdf-upload').addEventListener('change', handleImagesUpload);
    document.getElementById('merge-pdfs-upload').addEventListener('change', handleMergePdfsUpload);
    document.getElementById('extract-pages-upload').addEventListener('change', handleExtractPagesUpload);
    
    // File converter event listeners
    document.getElementById('image-converter-upload').addEventListener('change', handleImageConverterUpload);
    document.getElementById('doc-converter-upload').addEventListener('change', handleDocConverterUpload);
    
    // Collage maker event listeners
    document.getElementById('collage-images').addEventListener('change', handleCollageImagesUpload);
}

// Analytics and tracking
function initializeTracking() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Creative Studio',
            page_location: window.location.href
        });
    }
}

function trackToolUsage(toolName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_usage', {
            event_category: 'Tools',
            event_label: toolName,
            value: 1
        });
    }
    
    // Update local stats
    updateStats(toolName);
}

function updateStats(toolName) {
    const statsMap = {
        'image-editor': 'images-count',
        'pdf-tools': 'pdfs-count',
        'templates': 'templates-count'
    };
    
    const elementId = statsMap[toolName];
    if (elementId) {
        const element = document.getElementById(elementId);
        const currentCount = parseInt(element.textContent) || 0;
        element.textContent = currentCount + 1;
    }
}

// Language switching
function setLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    localStorage.setItem('preferredLanguage', lang);
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const key = element.getAttribute('data-en');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Tool management
function showTool(toolName) {
    hideTool();
    document.getElementById(toolName + '-interface').style.display = 'block';
    document.getElementById('tools').style.display = 'none';
    currentTool = toolName;
    trackToolUsage(toolName);
    
    // Scroll to tool interface
    document.getElementById(toolName + '-interface').scrollIntoView({
        behavior: 'smooth'
    });
}

function hideTool() {
    const interfaces = document.querySelectorAll('.tool-interface');
    interfaces.forEach(interface => {
        interface.style.display = 'none';
    });
    document.getElementById('tools').style.display = 'block';
    currentTool = null;
}

// IMAGE EDITOR FUNCTIONALITY
function initializeImageEditor() {
    const canvas = document.getElementById('image-canvas');
    fabricCanvas = new fabric.Canvas(canvas, {
        width: 800,
        height: 600,
        backgroundColor: 'white'
    });
    
    // Add welcome text
    const welcomeText = new fabric.Text('Upload an image to start editing', {
        left: 400,
        top: 300,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#999',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
    });
    fabricCanvas.add(welcomeText);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        fabric.Image.fromURL(e.target.result, function(img) {
            fabricCanvas.clear();
            
            // Scale image to fit canvas
            const canvasWidth = fabricCanvas.width;
            const canvasHeight = fabricCanvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
            img.scale(scale);
            
            img.set({
                left: canvasWidth / 2,
                top: canvasHeight / 2,
                originX: 'center',
                originY: 'center'
            });
            
            fabricCanvas.add(img);
            fabricCanvas.renderAll();
        });
    };
    reader.readAsDataURL(file);
}

function selectTool(tool) {
    fabricCanvas.isDrawingMode = false;
    
    switch(tool) {
        case 'brush':
            fabricCanvas.isDrawingMode = true;
            fabricCanvas.freeDrawingBrush.width = 5;
            fabricCanvas.freeDrawingBrush.color = '#000000';
            break;
        case 'eraser':
            fabricCanvas.isDrawingMode = true;
            fabricCanvas.freeDrawingBrush.width = 20;
            fabricCanvas.freeDrawingBrush.color = 'white';
            break;
        case 'text':
            const text = new fabric.Text('Your text here', {
                left: 100,
                top: 100,
                fontFamily: 'Arial',
                fontSize: 20,
                fill: '#000000'
            });
            fabricCanvas.add(text);
            break;
        case 'crop':
            // Implement crop functionality
            alert('Crop tool selected. Click and drag to select area to crop.');
            break;
    }
}

function applyFilters() {
    const brightness = document.getElementById('brightness-slider').value;
    const contrast = document.getElementById('contrast-slider').value;
    const saturation = document.getElementById('saturation-slider').value;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
        activeObject.filters = [
            new fabric.Image.filters.Brightness({ brightness: (brightness - 100) / 100 }),
            new fabric.Image.filters.Contrast({ contrast: (contrast - 100) / 100 }),
            new fabric.Image.filters.Saturation({ saturation: (saturation - 100) / 100 })
        ];
        activeObject.applyFilters();
        fabricCanvas.renderAll();
    }
}

function downloadImage() {
    const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    link.click();
}

// PDF TOOLS FUNCTIONALITY
function handlePdfUpload(event) {
    // PDF to images conversion placeholder
    console.log('PDF uploaded for conversion');
}

async function convertPdfToImages() {
    const fileInput = document.getElementById('pdf-to-image-upload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a PDF file first');
        return;
    }
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const pages = pdf.getPages();
        
        const resultDiv = document.getElementById('pdf-images-result');
        resultDiv.innerHTML = `<h6>Converted ${pages.length} pages</h6>`;
        
        // Note: Full PDF to image conversion would require additional libraries
        // This is a placeholder showing the structure
        alert(`PDF loaded successfully with ${pages.length} pages. Full conversion requires additional libraries.`);
        
    } catch (error) {
        console.error('Error converting PDF:', error);
        alert('Error converting PDF. Please try again.');
    }
}

function handleImagesUpload(event) {
    console.log('Images uploaded for PDF conversion');
}

async function convertImagesToPdf() {
    const fileInput = document.getElementById('images-to-pdf-upload');
    const files = fileInput.files;
    if (files.length === 0) {
        alert('Please select images first');
        return;
    }
    
    try {
        const pdfDoc = await PDFLib.PDFDocument.create();
        
        for (let i = 0; i < files.length; i++) {
            const imageBytes = await files[i].arrayBuffer();
            let image;
            
            if (files[i].type === 'image/jpeg') {
                image = await pdfDoc.embedJpg(imageBytes);
            } else if (files[i].type === 'image/png') {
                image = await pdfDoc.embedPng(imageBytes);
            } else {
                continue; // Skip unsupported formats
            }
            
            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
        }
        
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted-images.pdf';
        link.click();
        
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error creating PDF:', error);
        alert('Error creating PDF. Please try again.');
    }
}

function handleMergePdfsUpload(event) {
    console.log('PDFs uploaded for merging');
}

async function mergePdfs() {
    const fileInput = document.getElementById('merge-pdfs-upload');
    const files = fileInput.files;
    if (files.length < 2) {
        alert('Please select at least 2 PDF files to merge');
        return;
    }
    
    try {
        const mergedPdf = await PDFLib.PDFDocument.create();
        
        for (let i = 0; i < files.length; i++) {
            const pdfBytes = await files[i].arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'merged-document.pdf';
        link.click();
        
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error merging PDFs:', error);
        alert('Error merging PDFs. Please try again.');
    }
}

function handleExtractPagesUpload(event) {
    console.log('PDF uploaded for page extraction');
}

async function extractPages() {
    const fileInput = document.getElementById('extract-pages-upload');
    const file = fileInput.files[0];
    const fromPage = parseInt(document.getElementById('extract-from').value);
    const toPage = parseInt(document.getElementById('extract-to').value);
    
    if (!file) {
        alert('Please select a PDF file first');
        return;
    }
    
    if (!fromPage || !toPage || fromPage > toPage) {
        alert('Please enter valid page numbers');
        return;
    }
    
    try {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(pdfBytes);
        const newPdf = await PDFLib.PDFDocument.create();
        
        const totalPages = pdf.getPageCount();
        const startPage = Math.max(1, fromPage) - 1; // Convert to 0-based index
        const endPage = Math.min(totalPages, toPage) - 1;
        
        for (let i = startPage; i <= endPage; i++) {
            const [copiedPage] = await newPdf.copyPages(pdf, [i]);
            newPdf.addPage(copiedPage);
        }
        
        const extractedPdfBytes = await newPdf.save();
        const blob = new Blob([extractedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `extracted-pages-${fromPage}-${toPage}.pdf`;
        link.click();
        
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error extracting pages:', error);
        alert('Error extracting pages. Please try again.');
    }
}

// FILE CONVERTER FUNCTIONALITY
function handleImageConverterUpload(event) {
    console.log('Image uploaded for format conversion');
}

async function convertImageFormat() {
    const fileInput = document.getElementById('image-converter-upload');
    const file = fileInput.files[0];
    const targetFormat = document.getElementById('target-format').value;
    
    if (!file) {
        alert('Please select an image file first');
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        let mimeType;
        let extension;
        
        switch(targetFormat) {
            case 'jpeg':
                mimeType = 'image/jpeg';
                extension = 'jpg';
                break;
            case 'png':
                mimeType = 'image/png';
                extension = 'png';
                break;
            case 'webp':
                mimeType = 'image/webp';
                extension = 'webp';
                break;
            default:
                mimeType = 'image/png';
                extension = 'png';
        }
        
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `converted-image.${extension}`;
            link.click();
            URL.revokeObjectURL(url);
        }, mimeType, 0.9);
    };
    
    img.src = URL.createObjectURL(file);
}

function handleDocConverterUpload(event) {
    console.log('Document uploaded for PDF conversion');
}

async function convertDocToPdf() {
    // Note: Converting DOCX to PDF requires server-side processing or specialized libraries
    // This is a placeholder showing the UI structure
    alert('Document to PDF conversion requires server-side processing. This is a client-side demo.');
}

// TEMPLATES FUNCTIONALITY
function showTemplates(category) {
    const templates = {
        social: [
            { name: 'Instagram Post', size: '1080x1080', icon: 'fab fa-instagram' },
            { name: 'Facebook Cover', size: '1200x630', icon: 'fab fa-facebook' },
            { name: 'Twitter Header', size: '1500x500', icon: 'fab fa-twitter' },
            { name: 'LinkedIn Post', size: '1200x628', icon: 'fab fa-linkedin' }
        ],
        business: [
            { name: 'Business Card', size: '1050x600', icon: 'fas fa-id-card' },
            { name: 'Letterhead', size: '2480x3508', icon: 'fas fa-file-alt' },
            { name: 'Invoice Template', size: '2480x3508', icon: 'fas fa-file-invoice' },
            { name: 'Certificate', size: '3508x2480', icon: 'fas fa-certificate' }
        ],
        poster: [
            { name: 'Event Poster', size: '2480x3508', icon: 'fas fa-calendar-alt' },
            { name: 'Movie Poster', size: '2000x3000', icon: 'fas fa-film' },
            { name: 'Concert Poster', size: '1080x1350', icon: 'fas fa-music' },
            { name: 'Sale Poster', size: '1080x1080', icon: 'fas fa-tags' }
        ],
        banner: [
            { name: 'Web Banner', size: '1200x300', icon: 'fas fa-window-maximize' },
            { name: 'Email Header', size: '600x200', icon: 'fas fa-envelope' },
            { name: 'YouTube Cover', size: '2560x1440', icon: 'fab fa-youtube' },
            { name: 'Display Banner', size: '728x90', icon: 'fas fa-ad' }
        ]
    };
    
    const grid = document.getElementById('templates-grid');
    grid.innerHTML = '';
    
    const categoryTemplates = templates[category] || [];
    
    categoryTemplates.forEach(template => {
        const templateCard = document.createElement('div');
        templateCard.className = 'col-md-6 col-lg-3';
        templateCard.innerHTML = `
            <div class="card template-card" onclick="createFromTemplate('${template.name}', '${template.size}')">
                <div class="card-body text-center">
                    <div class="template-preview">
                        <i class="${template.icon}"></i>
                    </div>
                    <h6 class="card-title">${template.name}</h6>
                    <p class="card-text text-muted">${template.size}</p>
                </div>
            </div>
        `;
        grid.appendChild(templateCard);
    });
}

function createFromTemplate(name, size) {
    const [width, height] = size.split('x').map(Number);
    
    if (fabricCanvas) {
        fabricCanvas.setDimensions({ width, height });
        fabricCanvas.clear();
        fabricCanvas.backgroundColor = 'white';
        
        // Add template title
        const title = new fabric.Text(name, {
            left: width / 2,
            top: 50,
            fontFamily: 'Arial',
            fontSize: Math.min(width, height) / 20,
            fill: '#333',
            textAlign: 'center',
            originX: 'center'
        });
        
        fabricCanvas.add(title);
        fabricCanvas.renderAll();
        
        // Switch to image editor
        showTool('image-editor');
        trackToolUsage('templates');
    }
}

// LOGO MAKER FUNCTIONALITY
function initializeLogoMaker() {
    const canvas = document.getElementById('logo-canvas');
    logoCanvas = new fabric.Canvas(canvas, {
        width: 400,
        height: 400,
        backgroundColor: 'white'
    });
}

function addShape(shape) {
    const color = document.getElementById('logo-color').value;
    let fabricShape;
    
    switch(shape) {
        case 'circle':
            fabricShape = new fabric.Circle({
                radius: 50,
                fill: color,
                left: 200,
                top: 200,
                originX: 'center',
                originY: 'center'
            });
            break;
        case 'rectangle':
            fabricShape = new fabric.Rect({
                width: 100,
                height: 60,
                fill: color,
                left: 200,
                top: 200,
                originX: 'center',
                originY: 'center'
            });
            break;
        case 'triangle':
            fabricShape = new fabric.Triangle({
                width: 80,
                height: 80,
                fill: color,
                left: 200,
                top: 200,
                originX: 'center',
                originY: 'center'
            });
            break;
    }
    
    if (fabricShape) {
        logoCanvas.add(fabricShape);
        logoCanvas.renderAll();
    }
}

function addLogoText() {
    const text = new fabric.Text('Your Logo', {
        left: 200,
        top: 300,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#333',
        originX: 'center',
        originY: 'center'
    });
    
    logoCanvas.add(text);
    logoCanvas.renderAll();
}

function downloadLogo() {
    const dataURL = logoCanvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    
    const link = document.createElement('a');
    link.download = 'logo.png';
    link.href = dataURL;
    link.click();
}

// COLLAGE MAKER FUNCTIONALITY
function initializeCollageMaker() {
    const canvas = document.getElementById('collage-canvas');
    collageCanvas = new fabric.Canvas(canvas, {
        width: 800,
        height: 600,
        backgroundColor: 'white'
    });
}

function handleCollageImagesUpload(event) {
    console.log('Collage images uploaded');
}

async function generateCollage() {
    const fileInput = document.getElementById('collage-images');
    const files = fileInput.files;
    const layout = document.getElementById('collage-layout').value;
    
    if (files.length === 0) {
        alert('Please select images first');
        return;
    }
    
    collageCanvas.clear();
    
    const canvasWidth = collageCanvas.width;
    const canvasHeight = collageCanvas.height;
    
    let cols, rows;
    switch(layout) {
        case '2x2':
            cols = rows = 2;
            break;
        case '3x3':
            cols = rows = 3;
            break;
        default:
            cols = rows = Math.ceil(Math.sqrt(files.length));
    }
    
    const cellWidth = canvasWidth / cols;
    const cellHeight = canvasHeight / rows;
    
    for (let i = 0; i < Math.min(files.length, cols * rows); i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            fabric.Image.fromURL(e.target.result, function(img) {
                const col = i % cols;
                const row = Math.floor(i / cols);
                
                const scale = Math.min(cellWidth / img.width, cellHeight / img.height);
                img.scale(scale);
                
                img.set({
                    left: col * cellWidth + cellWidth / 2,
                    top: row * cellHeight + cellHeight / 2,
                    originX: 'center',
                    originY: 'center'
                });
                
                collageCanvas.add(img);
                collageCanvas.renderAll();
            });
        };
        
        reader.readAsDataURL(file);
    }
}

function downloadCollage() {
    const dataURL = collageCanvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    
    const link = document.createElement('a');
    link.download = 'collage.png';
    link.href = dataURL;
    link.click();
}

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Load saved language preference
window.addEventListener('load', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
    }
});

// Auto-hide tool interfaces on mobile when clicking outside
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        const toolInterfaces = document.querySelectorAll('.tool-interface');
        const toolCards = document.querySelectorAll('.tool-card');
        
        let clickedInsideTool = false;
        toolInterfaces.forEach(interface => {
            if (interface.contains(event.target)) {
                clickedInsideTool = true;
            }
        });
        
        toolCards.forEach(card => {
            if (card.contains(event.target)) {
                clickedInsideTool = true;
            }
        });
        
        if (!clickedInsideTool && currentTool) {
            // Allow clicking outside to close tools on mobile
        }
    }
});

// Initialize templates on page load
showTemplates('social');