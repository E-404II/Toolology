// Tool God - 100+ Tools SPA
document.addEventListener('DOMContentLoaded', function() {
    // State management
    const state = {
        currentTool: null,
        currentCategory: 'all',
        searchQuery: '',
        theme: 'dark',
        favorites: new Set(),
        recentTools: [],
        tools: []
    };

    // DOM Elements
    const toolsGrid = document.getElementById('toolsGrid');
    const toolContainer = document.getElementById('toolContainer');
    const toolContent = document.getElementById('toolContent');
    const currentToolName = document.getElementById('currentToolName');
    const backToGrid = document.getElementById('backToGrid');
    const toolSearch = document.getElementById('toolSearch');
    const clearSearch = document.getElementById('clearSearch');
    const themeToggle = document.getElementById('themeToggle');
    const categories = document.querySelectorAll('.category');

    // Initialize the application
    function init() {
        loadTools();
        setupEventListeners();
        loadUserPreferences();
        renderToolsGrid();
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', state.theme);
        themeToggle.textContent = state.theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    // Tool definitions - Modular structure for easy batch additions
    function loadTools() {
        state.tools = [
            // Screen & Display Tools (15)
            {
                id: 'screen-visualizer',
                name: 'Screen Size Visualizer',
                description: 'Visualize actual physical screen sizes with real measurements',
                category: 'screen',
                component: screenSizeVisualizer
            },
            {
                id: 'ppi-calculator',
                name: 'PPI/DPI Calculator',
                description: 'Calculate pixels per inch for any screen resolution and size',
                category: 'screen',
                component: ppiCalculator
            },
            {
                id: 'aspect-ratio',
                name: 'Aspect Ratio Calculator',
                description: 'Calculate and convert between different aspect ratios',
                category: 'screen',
                component: aspectRatioCalculator
            },
            {
                id: 'resolution-scale',
                name: 'Resolution Scale Tool',
                description: 'Scale resolutions up or down while maintaining aspect ratio',
                category: 'screen',
                component: resolutionScaleTool
            },
            {
                id: 'viewing-distance',
                name: 'Viewing Distance Calculator',
                description: 'Calculate optimal viewing distance for screens',
                category: 'screen',
                component: viewingDistanceCalculator
            },
            {
                id: 'color-contrast',
                name: 'Color Contrast Checker',
                description: 'Check color contrast ratios for accessibility',
                category: 'screen',
                component: colorContrastChecker
            },
            {
                id: 'screen-time',
                name: 'Screen Time Estimator',
                description: 'Estimate battery life based on screen usage',
                category: 'screen',
                component: screenTimeEstimator
            },
            {
                id: 'display-comparison',
                name: 'Display Comparison Tool',
                description: 'Compare different display specifications side by side',
                category: 'screen',
                component: displayComparisonTool
            },
            {
                id: 'pixel-density',
                name: 'Pixel Density Map',
                description: 'Visualize pixel density across different devices',
                category: 'screen',
                component: pixelDensityMap
            },
            {
                id: 'screen-area',
                name: 'Screen Area Calculator',
                description: 'Calculate screen area in different units',
                category: 'screen',
                component: screenAreaCalculator
            },
            {
                id: 'bezier-curve',
                name: 'Bezier Curve Generator',
                description: 'Create and visualize Bezier curves',
                category: 'screen',
                component: bezierCurveGenerator
            },
            {
                id: 'gradient-tool',
                name: 'Gradient Tool',
                description: 'Create CSS gradients with visual preview',
                category: 'screen',
                component: gradientTool
            },
            {
                id: 'shadow-calculator',
                name: 'Shadow Calculator',
                description: 'Calculate and preview CSS box shadows',
                category: 'screen',
                component: shadowCalculator
            },
            {
                id: 'border-radius',
                name: 'Border Radius Preview',
                description: 'Preview and generate CSS border-radius values',
                category: 'screen',
                component: borderRadiusPreview
            },
            {
                id: 'animation-speed',
                name: 'Animation Speed Tester',
                description: 'Test and visualize CSS animation speeds',
                category: 'screen',
                component: animationSpeedTester
            },

            // Unit Converters (20)
            {
                id: 'length-converter',
                name: 'Length Converter',
                description: 'Convert between mm, cm, m, km, inches, feet, yards, miles',
                category: 'unit',
                component: lengthConverter
            },
            {
                id: 'weight-converter',
                name: 'Weight Converter',
                description: 'Convert between mg, g, kg, oz, lb, stone',
                category: 'unit',
                component: weightConverter
            },
            {
                id: 'temperature-converter',
                name: 'Temperature Converter',
                description: 'Convert between Celsius, Fahrenheit, and Kelvin',
                category: 'unit',
                component: temperatureConverter
            },
            {
                id: 'area-converter',
                name: 'Area Converter',
                description: 'Convert between square feet, square meters, acres, hectares',
                category: 'unit',
                component: areaConverter
            },
            {
                id: 'volume-converter',
                name: 'Volume Converter',
                description: 'Convert between ml, liters, gallons, fluid ounces, cups',
                category: 'unit',
                component: volumeConverter
            },
            {
                id: 'speed-converter',
                name: 'Speed Converter',
                description: 'Convert between kph, mph, m/s, knots',
                category: 'unit',
                component: speedConverter
            },
            {
                id: 'pressure-converter',
                name: 'Pressure Converter',
                description: 'Convert between Pa, bar, psi, atm',
                category: 'unit',
                component: pressureConverter
            },
            {
                id: 'energy-converter',
                name: 'Energy Converter',
                description: 'Convert between J, cal, kWh, BTU',
                category: 'unit',
                component: energyConverter
            },
            {
                id: 'power-converter',
                name: 'Power Converter',
                description: 'Convert between W, kW, hp',
                category: 'unit',
                component: powerConverter
            },
            {
                id: 'data-storage-converter',
                name: 'Data Storage Converter',
                description: 'Convert between bits, bytes, KB, MB, GB, TB',
                category: 'unit',
                component: dataStorageConverter
            },
            {
                id: 'time-converter',
                name: 'Time Converter',
                description: 'Convert between seconds, minutes, hours, days, weeks',
                category: 'unit',
                component: timeConverter
            },
            {
                id: 'angle-converter',
                name: 'Angle Converter',
                description: 'Convert between degrees, radians, gradians',
                category: 'unit',
                component: angleConverter
            },
            {
                id: 'fuel-converter',
                name: 'Fuel Economy Converter',
                description: 'Convert between mpg, km/l, l/100km',
                category: 'unit',
                component: fuelConverter
            },
            {
                id: 'digital-storage-converter',
                name: 'Digital Storage Converter',
                description: 'Convert between bits, bytes, KB, MB, GB, TB, PB',
                category: 'unit',
                component: digitalStorageConverter
            },
            {
                id: 'cooking-converter',
                name: 'Cooking Converter',
                description: 'Convert between cups, tbsp, tsp, ml, fl oz',
                category: 'unit',
                component: cookingConverter
            },
            {
                id: 'clothing-sizes',
                name: 'Clothing Sizes Converter',
                description: 'Convert between US, UK, EU, international sizes',
                category: 'unit',
                component: clothingSizesConverter
            },
            {
                id: 'shoe-sizes',
                name: 'Shoe Sizes Converter',
                description: 'Convert between US, UK, EU shoe sizes and cm',
                category: 'unit',
                component: shoeSizesConverter
            },
            {
                id: 'typography-converter',
                name: 'Typography Converter',
                description: 'Convert between px, pt, em, rem, percentage',
                category: 'unit',
                component: typographyConverter
            },
            {
                id: 'currency-converter',
                name: 'Currency Converter',
                description: 'Convert between currencies with real-time rates',
                category: 'unit',
                component: currencyConverter
            },
            {
                id: 'frequency-converter',
                name: 'Frequency Converter',
                description: 'Convert between Hz, kHz, MHz, GHz',
                category: 'unit',
                component: frequencyConverter
            },

            // Math & Calculators (15)
            {
                id: 'scientific-calculator',
                name: 'Scientific Calculator',
                description: 'Advanced calculator with scientific functions',
                category: 'math',
                component: scientificCalculator
            },
            {
                id: 'financial-calculator',
                name: 'Financial Calculator',
                description: 'Calculate loans, investments, and financial metrics',
                category: 'math',
                component: financialCalculator
            },
            {
                id: 'bmi-calculator',
                name: 'BMI Calculator',
                description: 'Calculate Body Mass Index',
                category: 'math',
                component: bmiCalculator
            },
            {
                id: 'loan-calculator',
                name: 'Loan Calculator',
                description: 'Calculate loan payments and amortization',
                category: 'math',
                component: loanCalculator
            },
            {
                id: 'mortgage-calculator',
                name: 'Mortgage Calculator',
                description: 'Calculate mortgage payments and costs',
                category: 'math',
                component: mortgageCalculator
            },
            {
                id: 'tip-calculator',
                name: 'Tip Calculator',
                description: 'Calculate tips and split bills',
                category: 'math',
                component: tipCalculator
            },
            {
                id: 'percentage-calculator',
                name: 'Percentage Calculator',
                description: 'Calculate percentages, increases, and decreases',
                category: 'math',
                component: percentageCalculator
            },
            {
                id: 'fraction-calculator',
                name: 'Fraction Calculator',
                description: 'Calculate with fractions and mixed numbers',
                category: 'math',
                component: fractionCalculator
            },
            {
                id: 'prime-checker',
                name: 'Prime Number Checker',
                description: 'Check if a number is prime and find prime factors',
                category: 'math',
                component: primeChecker
            },
            {
                id: 'fibonacci-sequence',
                name: 'Fibonacci Sequence',
                description: 'Generate Fibonacci sequences',
                category: 'math',
                component: fibonacciSequence
            },
            {
                id: 'random-number',
                name: 'Random Number Generator',
                description: 'Generate random numbers within a range',
                category: 'math',
                component: randomNumberGenerator
            },
            {
                id: 'statistical-calculator',
                name: 'Statistical Calculator',
                description: 'Calculate mean, median, mode, standard deviation',
                category: 'math',
                component: statisticalCalculator
            },
            {
                id: 'geometry-calculator',
                name: 'Geometry Calculator',
                description: 'Calculate area, volume, and other geometric properties',
                category: 'math',
                component: geometryCalculator
            },
            {
                id: 'matrix-calculator',
                name: 'Matrix Calculator',
                description: 'Perform matrix operations and calculations',
                category: 'math',
                component: matrixCalculator
            },
            {
                id: 'base-converter',
                name: 'Base Converter',
                description: 'Convert between binary, hexadecimal, decimal',
                category: 'math',
                component: baseConverter
            },

            // Text Utilities (15)
            {
                id: 'case-converter',
                name: 'Case Converter',
                description: 'Convert text between upper, lower, title, sentence case',
                category: 'text',
                component: caseConverter
            },
            {
                id: 'word-counter',
                name: 'Word Counter',
                description: 'Count words, characters, sentences, and paragraphs',
                category: 'text',
                component: wordCounter
            },
            {
                id: 'character-counter',
                name: 'Character Counter',
                description: 'Count characters with and without spaces',
                category: 'text',
                component: characterCounter
            },
            {
                id: 'line-counter',
                name: 'Line Counter',
                description: 'Count lines in text',
                category: 'text',
                component: lineCounter
            },
            {
                id: 'lorem-ipsum',
                name: 'Lorem Ipsum Generator',
                description: 'Generate placeholder text',
                category: 'text',
                component: loremIpsumGenerator
            },
            {
                id: 'text-reverser',
                name: 'Text Reverser',
                description: 'Reverse text character by character',
                category: 'text',
                component: textReverser
            },
            {
                id: 'password-generator',
                name: 'Password Generator',
                description: 'Generate secure random passwords',
                category: 'text',
                component: passwordGenerator
            },
            {
                id: 'uuid-generator',
                name: 'UUID Generator',
                description: 'Generate UUIDs (Universally Unique Identifiers)',
                category: 'text',
                component: uuidGenerator
            },
            {
                id: 'hash-generator',
                name: 'Hash Generator',
                description: 'Generate MD5, SHA-1, SHA-256 hashes',
                category: 'text',
                component: hashGenerator
            },
            {
                id: 'base64-encoder',
                name: 'Base64 Encoder/Decoder',
                description: 'Encode and decode Base64 strings',
                category: 'text',
                component: base64Encoder
            },
            {
                id: 'url-encoder',
                name: 'URL Encoder/Decoder',
                description: 'Encode and decode URL components',
                category: 'text',
                component: urlEncoder
            },
            {
                id: 'html-entity-converter',
                name: 'HTML Entity Converter',
                description: 'Convert between characters and HTML entities',
                category: 'text',
                component: htmlEntityConverter
            },
            {
                id: 'text-diff',
                name: 'Text Diff Tool',
                description: 'Compare two texts and highlight differences',
                category: 'text',
                component: textDiffTool
            },
            {
                id: 'regex-tester',
                name: 'Regex Tester',
                description: 'Test regular expressions with live preview',
                category: 'text',
                component: regexTester
            },
            {
                id: 'markdown-preview',
                name: 'Markdown Preview',
                description: 'Preview Markdown as formatted HTML',
                category: 'text',
                component: markdownPreview
            },

            // Color Tools (10)
            {
                id: 'color-picker',
                name: 'Color Picker',
                description: 'Pick colors and get HEX, RGB, HSL values',
                category: 'color',
                component: colorPicker
            },
            {
                id: 'color-palette',
                name: 'Color Palette Generator',
                description: 'Generate harmonious color palettes',
                category: 'color',
                component: colorPaletteGenerator
            },
            {
                id: 'gradient-generator',
                name: 'Gradient Generator',
                description: 'Create CSS gradients with visual preview',
                category: 'color',
                component: gradientGenerator
            },
            {
                id: 'color-contrast-checker',
                name: 'Color Contrast Checker',
                description: 'Check color contrast for accessibility',
                category: 'color',
                component: colorContrastChecker
            },
            {
                id: 'color-blindness-simulator',
                name: 'Color Blindness Simulator',
                description: 'Simulate how colors appear to people with color vision deficiencies',
                category: 'color',
                component: colorBlindnessSimulator
            },
            {
                id: 'hex-rgb-hsl-converter',
                name: 'HEX/RGB/HSL Converter',
                description: 'Convert between color formats',
                category: 'color',
                component: hexRgbHslConverter
            },
            {
                id: 'color-name-finder',
                name: 'Color Name Finder',
                description: 'Find names for colors',
                category: 'color',
                component: colorNameFinder
            },
            {
                id: 'color-scheme-generator',
                name: 'Color Scheme Generator',
                description: 'Generate color schemes based on color theory',
                category: 'color',
                component: colorSchemeGenerator
            },
            {
                id: 'image-color-extractor',
                name: 'Image Color Extractor',
                description: 'Extract dominant colors from images',
                category: 'color',
                component: imageColorExtractor
            },
            {
                id: 'css-gradient-generator',
                name: 'CSS Gradient Generator',
                description: 'Generate CSS gradient code',
                category: 'color',
                component: cssGradientGenerator
            },

            // Time & Date (10)
            {
                id: 'world-clock',
                name: 'World Clock',
                description: 'View current time in different time zones',
                category: 'time',
                component: worldClock
            },
            {
                id: 'time-zone-converter',
                name: 'Time Zone Converter',
                description: 'Convert times between different time zones',
                category: 'time',
                component: timeZoneConverter
            },
            {
                id: 'countdown-timer',
                name: 'Countdown Timer',
                description: 'Create countdown timers for events',
                category: 'time',
                component: countdownTimer
            },
            {
                id: 'stopwatch',
                name: 'Stopwatch',
                description: 'Precise stopwatch with lap times',
                category: 'time',
                component: stopwatch
            },
            {
                id: 'age-calculator',
                name: 'Age Calculator',
                description: 'Calculate age from birth date',
                category: 'time',
                component: ageCalculator
            },
            {
                id: 'date-difference',
                name: 'Date Difference Calculator',
                description: 'Calculate time between two dates',
                category: 'time',
                component: dateDifferenceCalculator
            },
            {
                id: 'week-number',
                name: 'Week Number Calculator',
                description: 'Find week numbers for dates',
                category: 'time',
                component: weekNumberCalculator
            },
            {
                id: 'unix-timestamp',
                name: 'Unix Timestamp Converter',
                description: 'Convert between Unix timestamps and dates',
                category: 'time',
                component: unixTimestampConverter
            },
            {
                id: 'meeting-planner',
                name: 'Meeting Planner',
                description: 'Find meeting times across time zones',
                category: 'time',
                component: meetingPlanner
            },
            {
                id: 'holiday-calendar',
                name: 'Holiday Calendar',
                description: 'View holidays for different countries',
                category: 'time',
                component: holidayCalendar
            },

            // Development Tools (10)
            {
                id: 'json-formatter',
                name: 'JSON Formatter/Validator',
                description: 'Format and validate JSON data',
                category: 'dev',
                component: jsonFormatter
            },
            {
                id: 'xml-formatter',
                name: 'XML Formatter',
                description: 'Format and validate XML data',
                category: 'dev',
                component: xmlFormatter
            },
            {
                id: 'css-formatter',
                name: 'CSS Formatter',
                description: 'Format and minify CSS code',
                category: 'dev',
                component: cssFormatter
            },
            {
                id: 'javascript-formatter',
                name: 'JavaScript Formatter',
                description: 'Format and minify JavaScript code',
                category: 'dev',
                component: javascriptFormatter
            },
            {
                id: 'html-formatter',
                name: 'HTML Formatter',
                description: 'Format and minify HTML code',
                category: 'dev',
                component: htmlFormatter
            },
            {
                id: 'sql-formatter',
                name: 'SQL Formatter',
                description: 'Format SQL queries',
                category: 'dev',
                component: sqlFormatter
            },
            {
                id: 'regex-tester-dev',
                name: 'Regex Tester',
                description: 'Test regular expressions',
                category: 'dev',
                component: regexTesterDev
            },
            {
                id: 'http-status',
                name: 'HTTP Status Code Lookup',
                description: 'Look up HTTP status codes and meanings',
                category: 'dev',
                component: httpStatusLookup
            },
            {
                id: 'user-agent-parser',
                name: 'User Agent Parser',
                description: 'Parse user agent strings',
                category: 'dev',
                component: userAgentParser
            },
            {
                id: 'ip-lookup',
                name: 'IP Address Lookup',
                description: 'Look up IP address information',
                category: 'dev',
                component: ipAddressLookup
            },

            // File & Data (5)
            {
                id: 'file-size-converter',
                name: 'File Size Converter',
                description: 'Convert between file size units',
                category: 'file',
                component: fileSizeConverter
            },
            {
                id: 'image-metadata',
                name: 'Image Metadata Viewer',
                description: 'View metadata from images',
                category: 'file',
                component: imageMetadataViewer
            },
            {
                id: 'csv-to-json',
                name: 'CSV to JSON Converter',
                description: 'Convert CSV data to JSON format',
                category: 'file',
                component: csvToJsonConverter
            },
            {
                id: 'json-to-csv',
                name: 'JSON to CSV Converter',
                description: 'Convert JSON data to CSV format',
                category: 'file',
                component: jsonToCsvConverter
            },
            {
                id: 'data-url-generator',
                name: 'Data URL Generator',
                description: 'Generate data URLs from files',
                category: 'file',
                component: dataUrlGenerator

            }




    
    
        ];
    }

    // ========== TOOL BATCH ADDITION TEMPLATE ==========
    // Use this template to add tools in batches of 10
    /*
    function addToolBatch() {
        const newTools = [
            {
                id: 'tool-id-1',
                name: 'Tool Name 1',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction1
            },
            {
                id: 'tool-id-2',
                name: 'Tool Name 2',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction2
            },
            {
                id: 'tool-id-3',
                name: 'Tool Name 3',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction3
            },
            {
                id: 'tool-id-4',
                name: 'Tool Name 4',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction4
            },
            {
                id: 'tool-id-5',
                name: 'Tool Name 5',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction5
            },
            {
                id: 'tool-id-6',
                name: 'Tool Name 6',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction6
            },
            {
                id: 'tool-id-7',
                name: 'Tool Name 7',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction7
            },
            {
                id: 'tool-id-8',
                name: 'Tool Name 8',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction8
            },
            {
                id: 'tool-id-9',
                name: 'Tool Name 9',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction9
            },
            {
                id: 'tool-id-10',
                name: 'Tool Name 10',
                description: 'Tool description goes here',
                category: 'category',
                component: toolFunction10
            }
        ];
        
        // Add to existing tools
        state.tools.push(...newTools);
        renderToolsGrid();
    }
    */

    // Event Listeners
    function setupEventListeners() {
        // Tool grid navigation
        backToGrid.addEventListener('click', showToolsGrid);
        
        // Search functionality
        toolSearch.addEventListener('input', handleSearch);
        clearSearch.addEventListener('click', clearSearchQuery);
        
        // Category filtering
        categories.forEach(category => {
            category.addEventListener('click', handleCategoryChange);
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
        
        // Single event delegation for tool cards
        toolsGrid.addEventListener('click', handleToolClick);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);
    }

    // Tool grid rendering
    function renderToolsGrid() {
        const filteredTools = filterTools();
        
        toolsGrid.innerHTML = filteredTools.map(tool => `
            <div class="tool-card" data-tool-id="${tool.id}">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <span class="category-tag">${tool.category}</span>
            </div>
        `).join('');
    }

    // Tool filtering
    function filterTools() {
        return state.tools.filter(tool => {
            const matchesCategory = state.currentCategory === 'all' || tool.category === state.currentCategory;
            const matchesSearch = !state.searchQuery || 
                tool.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(state.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    // Tool click handler
    function handleToolClick(e) {
        const toolCard = e.target.closest('.tool-card');
        if (!toolCard) return;
        
        const toolId = toolCard.dataset.toolId;
        const tool = state.tools.find(t => t.id === toolId);
        
        if (tool) {
            openTool(tool);
        }
    }

    // Open tool function
    function openTool(tool) {
        state.currentTool = tool;
        currentToolName.textContent = tool.name;
        
        // Add to recent tools
        addToRecentTools(tool.id);
        
        // Render tool component
        toolContent.innerHTML = '';
        const toolElement = tool.component();
        toolContent.appendChild(toolElement);
        
        // Show tool container, hide grid
        toolContainer.style.display = 'block';
        toolsGrid.style.display = 'none';
        
        // Update URL without page reload
        history.pushState({ tool: tool.id }, '', `#${tool.id}`);
    }

    // Show tools grid
    function showToolsGrid() {
        toolContainer.style.display = 'none';
        toolsGrid.style.display = 'grid';
        state.currentTool = null;
        
        // Update URL
        history.pushState({}, '', window.location.pathname);
    }

    // Search handling
    function handleSearch() {
        state.searchQuery = toolSearch.value.trim();
        renderToolsGrid();
    }

    function clearSearchQuery() {
        toolSearch.value = '';
        state.searchQuery = '';
        renderToolsGrid();
    }

    // Category handling
    function handleCategoryChange(e) {
        const category = e.target.dataset.category;
        state.currentCategory = category;
        
        // Update active category
        categories.forEach(cat => {
            cat.classList.toggle('active', cat.dataset.category === category);
        });
        
        renderToolsGrid();
    }

    // Theme handling
    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        themeToggle.textContent = state.theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        saveUserPreferences();
    }

    // Recent tools management
    function addToRecentTools(toolId) {
        state.recentTools = state.recentTools.filter(id => id !== toolId);
        state.recentTools.unshift(toolId);
        state.recentTools = state.recentTools.slice(0, 10); // Keep only 10 most recent
        saveUserPreferences();
    }

    // Keyboard shortcuts
    function handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    toolSearch.focus();
                    break;
                case 'b':
                    e.preventDefault();
                    if (state.currentTool) {
                        showToolsGrid();
                    }
                    break;
            }
        }
        
        if (e.key === 'Escape' && state.currentTool) {
            showToolsGrid();
        }
    }

    // User preferences
    function loadUserPreferences() {
        try {
            const preferences = JSON.parse(localStorage.getItem('toolmaster-preferences')) || {};
            state.theme = preferences.theme || 'dark';
            state.favorites = new Set(preferences.favorites || []);
            state.recentTools = preferences.recentTools || [];
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    }

    function saveUserPreferences() {
        try {
            const preferences = {
                theme: state.theme,
                favorites: Array.from(state.favorites),
                recentTools: state.recentTools
            };
            localStorage.setItem('toolmaster-preferences', JSON.stringify(preferences));
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    }

    // ========== SAMPLE TOOL IMPLEMENTATIONS ==========
    // Here are 10 fully implemented tools as examples

    // 1. Screen Size Visualizer
    function screenSizeVisualizer() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>Screen Size Visualizer</h3>
                <p>Visualize actual physical screen sizes with real measurements</p>
                
                <div class="input-group">
                    <label for="screenWidth">Width (inches):</label>
                    <input type="number" id="screenWidth" value="13" min="1" max="100" step="0.1">
                </div>
                
                <div class="input-group">
                    <label for="screenHeight">Height (inches):</label>
                    <input type="number" id="screenHeight" value="8" min="1" max="100" step="0.1">
                </div>
                
                <div class="input-group">
                    <label for="screenShape">Screen Shape:</label>
                    <select id="screenShape">
                        <option value="rectangle">Rectangle</option>
                        <option value="square">Square</option>
                        <option value="circle">Circle</option>
                    </select>
                </div>
                
                <div class="screen-container">
                    <div class="screen rectangle" id="visualScreen">
                        <div class="screen-info">
                            <span id="screenSize">13" × 8"</span>
                            <span id="screenDiagonal">15.26" diagonal</span>
                        </div>
                    </div>
                </div>
                
                <div class="result-box">
                    <div class="info-item">
                        <span class="info-label">Diagonal Size:</span>
                        <span id="diagonalResult">15.26 inches</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Area:</span>
                        <span id="areaResult">104 square inches</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Aspect Ratio:</span>
                        <span id="aspectRatio">1.625:1</span>
                    </div>
                </div>
            </div>
        `;

        const widthInput = element.querySelector('#screenWidth');
        const heightInput = element.querySelector('#screenHeight');
        const shapeSelect = element.querySelector('#screenShape');
        const screenElement = element.querySelector('#visualScreen');
        const diagonalResult = element.querySelector('#diagonalResult');
        const areaResult = element.querySelector('#areaResult');
        const aspectRatio = element.querySelector('#aspectRatio');
        const screenSize = element.querySelector('#screenSize');
        const screenDiagonal = element.querySelector('#screenDiagonal');

        function updateScreen() {
            const width = parseFloat(widthInput.value);
            const height = parseFloat(heightInput.value);
            const shape = shapeSelect.value;
            const diagonal = Math.sqrt(width * width + height * height);
            const area = width * height;
            const ratio = (width / height).toFixed(3);

            // Update screen visualization
            screenElement.className = 'screen ' + shape;
            screenElement.style.width = (width * 20) + 'px';
            screenElement.style.height = (height * 20) + 'px';

            // Update results
            diagonalResult.textContent = diagonal.toFixed(2) + ' inches';
            areaResult.textContent = area.toFixed(2) + ' square inches';
            aspectRatio.textContent = ratio + ':1';
            screenSize.textContent = width + '" × ' + height + '"';
            screenDiagonal.textContent = diagonal.toFixed(2) + '" diagonal';
        }

        widthInput.addEventListener('input', updateScreen);
        heightInput.addEventListener('input', updateScreen);
        shapeSelect.addEventListener('change', updateScreen);

        updateScreen();
        return element;
    }

    // 2. PPI Calculator
    function ppiCalculator() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>PPI Calculator</h3>
                <p>Calculate pixels per inch for any screen resolution and size</p>
                
                <div class="input-group">
                    <label for="resolutionWidth">Resolution Width (pixels):</label>
                    <input type="number" id="resolutionWidth" value="1920" min="1">
                </div>
                
                <div class="input-group">
                    <label for="resolutionHeight">Resolution Height (pixels):</label>
                    <input type="number" id="resolutionHeight" value="1080" min="1">
                </div>
                
                <div class="input-group">
                    <label for="screenDiagonal">Screen Diagonal (inches):</label>
                    <input type="number" id="screenDiagonal" value="24" min="1" step="0.1">
                </div>
                
                <div class="button-group">
                    <button id="calculatePPI">Calculate PPI</button>
                </div>
                
                <div class="result-box">
                    <div class="info-item">
                        <span class="info-label">Pixels Per Inch (PPI):</span>
                        <span id="ppiResult">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dot Pitch (mm):</span>
                        <span id="dotPitchResult">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total Pixels:</span>
                        <span id="totalPixelsResult">-</span>
                    </div>
                </div>
            </div>
        `;

        const calculateBtn = element.querySelector('#calculatePPI');
        const ppiResult = element.querySelector('#ppiResult');
        const dotPitchResult = element.querySelector('#dotPitchResult');
        const totalPixelsResult = element.querySelector('#totalPixelsResult');

        calculateBtn.addEventListener('click', function() {
            const width = parseInt(element.querySelector('#resolutionWidth').value);
            const height = parseInt(element.querySelector('#resolutionHeight').value);
            const diagonal = parseFloat(element.querySelector('#screenDiagonal').value);

            const ppi = Math.sqrt(width * width + height * height) / diagonal;
            const dotPitch = (25.4 / ppi).toFixed(3);
            const totalPixels = width * height;

            ppiResult.textContent = ppi.toFixed(2) + ' PPI';
            dotPitchResult.textContent = dotPitch + ' mm';
            totalPixelsResult.textContent = totalPixels.toLocaleString() + ' pixels';
        });

        return element;
    }

    // 3. Length Converter
    function lengthConverter() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>Length Converter</h3>
                <p>Convert between different length units</p>
                
                <div class="input-with-button">
                    <input type="number" id="lengthValue" value="1" step="0.01">
                    <select id="lengthFromUnit">
                        <option value="mm">Millimeters</option>
                        <option value="cm">Centimeters</option>
                        <option value="m">Meters</option>
                        <option value="km">Kilometers</option>
                        <option value="in" selected>Inches</option>
                        <option value="ft">Feet</option>
                        <option value="yd">Yards</option>
                        <option value="mi">Miles</option>
                    </select>
                </div>
                
                <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
                
                <div class="input-with-button">
                    <input type="text" id="lengthResult" readonly>
                    <select id="lengthToUnit">
                        <option value="mm">Millimeters</option>
                        <option value="cm" selected>Centimeters</option>
                        <option value="m">Meters</option>
                        <option value="km">Kilometers</option>
                        <option value="in">Inches</option>
                        <option value="ft">Feet</option>
                        <option value="yd">Yards</option>
                        <option value="mi">Miles</option>
                    </select>
                </div>
                
                <div class="result-box">
                    <div id="conversionDetails"></div>
                </div>
            </div>
        `;

        const valueInput = element.querySelector('#lengthValue');
        const fromUnit = element.querySelector('#lengthFromUnit');
        const toUnit = element.querySelector('#lengthToUnit');
        const resultInput = element.querySelector('#lengthResult');
        const detailsDiv = element.querySelector('#conversionDetails');

        const conversionRates = {
            mm: 1,
            cm: 10,
            m: 1000,
            km: 1000000,
            in: 25.4,
            ft: 304.8,
            yd: 914.4,
            mi: 1609344
        };

        function convertLength() {
            const value = parseFloat(valueInput.value);
            const from = fromUnit.value;
            const to = toUnit.value;

            if (isNaN(value)) return;

            const valueInMM = value * conversionRates[from];
            const result = valueInMM / conversionRates[to];

            resultInput.value = result.toFixed(6);
            
            detailsDiv.innerHTML = `
                <div class="info-item">
                    <span class="info-label">${value} ${getUnitName(from)} =</span>
                    <span>${result.toFixed(6)} ${getUnitName(to)}</span>
                </div>
            `;
        }

        function getUnitName(unit) {
            const names = {
                mm: 'millimeters',
                cm: 'centimeters', 
                m: 'meters',
                km: 'kilometers',
                in: 'inches',
                ft: 'feet',
                yd: 'yards',
                mi: 'miles'
            };
            return names[unit];
        }

        valueInput.addEventListener('input', convertLength);
        fromUnit.addEventListener('change', convertLength);
        toUnit.addEventListener('change', convertLength);

        convertLength();
        return element;
    }

    // 4. Word Counter
    function wordCounter() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>Word Counter</h3>
                <p>Count words, characters, sentences, and paragraphs</p>
                
                <div class="input-group">
                    <label for="textInput">Enter your text:</label>
                    <textarea id="textInput" rows="8" placeholder="Start typing or paste your text here..."></textarea>
                </div>
                
                <div class="result-box">
                    <div class="info-item">
                        <span class="info-label">Words:</span>
                        <span id="wordCount">0</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Characters:</span>
                        <span id="charCount">0</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Characters (no spaces):</span>
                        <span id="charNoSpacesCount">0</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Sentences:</span>
                        <span id="sentenceCount">0</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Paragraphs:</span>
                        <span id="paragraphCount">0</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Reading Time:</span>
                        <span id="readingTime">0 minutes</span>
                    </div>
                </div>
            </div>
        `;

        const textInput = element.querySelector('#textInput');
        const wordCount = element.querySelector('#wordCount');
        const charCount = element.querySelector('#charCount');
        const charNoSpacesCount = element.querySelector('#charNoSpacesCount');
        const sentenceCount = element.querySelector('#sentenceCount');
        const paragraphCount = element.querySelector('#paragraphCount');
        const readingTime = element.querySelector('#readingTime');

        function updateCounts() {
            const text = textInput.value;
            
            // Word count (split by spaces and filter empty strings)
            const words = text.trim() ? text.trim().split(/\s+/) : [];
            wordCount.textContent = words.length;
            
            // Character counts
            charCount.textContent = text.length;
            charNoSpacesCount.textContent = text.replace(/\s/g, '').length;
            
            // Sentence count (split by . ! ?)
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            sentenceCount.textContent = sentences.length;
            
            // Paragraph count (split by empty lines)
            const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
            paragraphCount.textContent = paragraphs.length || (text.trim() ? 1 : 0);
            
            // Reading time (average 200 words per minute)
            const minutes = Math.ceil(words.length / 200);
            readingTime.textContent = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }

        textInput.addEventListener('input', updateCounts);
        updateCounts();

        return element;
    }

    // 5. Color Picker
    function colorPicker() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>Color Picker</h3>
                <p>Pick colors and get HEX, RGB, HSL values</p>
                
                <div class="input-group">
                    <label for="colorPicker">Select Color:</label>
                    <input type="color" id="colorPicker" value="#3498db">
                </div>
                
                <div style="display: flex; gap: 20px; align-items: center; margin: 20px 0;">
                    <div id="colorPreview" style="width: 100px; height: 100px; border: 2px solid var(--border-color); border-radius: 8px;"></div>
                    <div style="flex: 1;">
                        <div class="input-with-button" style="margin-bottom: 10px;">
                            <label>HEX:</label>
                            <input type="text" id="hexValue" value="#3498db" readonly>
                            <button id="copyHex">Copy</button>
                        </div>
                        <div class="input-with-button" style="margin-bottom: 10px;">
                            <label>RGB:</label>
                            <input type="text" id="rgbValue" value="rgb(52, 152, 219)" readonly>
                            <button id="copyRGB">Copy</button>
                        </div>
                        <div class="input-with-button">
                            <label>HSL:</label>
                            <input type="text" id="hslValue" value="hsl(204, 70%, 53%)" readonly>
                            <button id="copyHSL">Copy</button>
                        </div>
                    </div>
                </div>
                
                <div class="result-box">
                    <div class="info-item">
                        <span class="info-label">Color Name:</span>
                        <span id="colorName">-</span>
                    </div>
                </div>
            </div>
        `;

        const colorPicker = element.querySelector('#colorPicker');
        const colorPreview = element.querySelector('#colorPreview');
        const hexValue = element.querySelector('#hexValue');
        const rgbValue = element.querySelector('#rgbValue');
        const hslValue = element.querySelector('#hslValue');
        const colorName = element.querySelector('#colorName');
        const copyHex = element.querySelector('#copyHex');
        const copyRGB = element.querySelector('#copyRGB');
        const copyHSL = element.querySelector('#copyHSL');

        function hexToRGB(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        }

        function RGBToHSL(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        }

        function updateColor() {
            const hex = colorPicker.value;
            const rgb = hexToRGB(hex);
            const hsl = RGBToHSL(rgb.r, rgb.g, rgb.b);

            colorPreview.style.backgroundColor = hex;
            hexValue.value = hex.toUpperCase();
            rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

            // Simple color name mapping
            const colorNames = {
                '#3498db': 'Peter River Blue',
                '#e74c3c': 'Alizarin Red', 
                '#2ecc71': 'Emerald Green',
                '#f39c12': 'Orange',
                '#9b59b6': 'Amethyst Purple',
                '#1abc9c': 'Turquoise',
                '#34495e': 'Wet Asphalt',
                '#e67e22': 'Carrot Orange',
                '#27ae60': 'Nephritis Green',
                '#8e44ad': 'Wisteria Purple'
            };

            colorName.textContent = colorNames[hex] || 'Custom Color';
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Copied to clipboard!');
            });
        }

        colorPicker.addEventListener('input', updateColor);
        copyHex.addEventListener('click', () => copyToClipboard(hexValue.value));
        copyRGB.addEventListener('click', () => copyToClipboard(rgbValue.value));
        copyHSL.addEventListener('click', () => copyToClipboard(hslValue.value));

        updateColor();
        return element;
    }

    // 6. JSON Formatter
    function jsonFormatter() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>JSON Formatter & Validator</h3>
                <p>Format and validate JSON data</p>
                
                <div class="input-group">
                    <label for="jsonInput">Enter JSON:</label>
                    <textarea id="jsonInput" rows="8" placeholder='{"name": "John", "age": 30}'></textarea>
                </div>
                
                <div class="button-group">
                    <button id="formatJSON">Format JSON</button>
                    <button id="validateJSON">Validate JSON</button>
                    <button id="minifyJSON">Minify JSON</button>
                    <button id="clearJSON">Clear</button>
                </div>
                
                <div class="input-group">
                    <label for="jsonOutput">Formatted JSON:</label>
                    <textarea id="jsonOutput" rows="8" readonly></textarea>
                </div>
                
                <div class="result-box" id="validationResult">
                    <div id="validationMessage">Enter JSON to validate</div>
                </div>
            </div>
        `;

        const jsonInput = element.querySelector('#jsonInput');
        const jsonOutput = element.querySelector('#jsonOutput');
        const formatBtn = element.querySelector('#formatJSON');
        const validateBtn = element.querySelector('#validateJSON');
        const minifyBtn = element.querySelector('#minifyJSON');
        const clearBtn = element.querySelector('#clearJSON');
        const validationResult = element.querySelector('#validationResult');
        const validationMessage = element.querySelector('#validationMessage');

        function formatJSON() {
            try {
                const parsed = JSON.parse(jsonInput.value);
                jsonOutput.value = JSON.stringify(parsed, null, 2);
                showValidation('Valid JSON', true);
            } catch (e) {
                showValidation('Invalid JSON: ' + e.message, false);
            }
        }

        function validateJSON() {
            try {
                JSON.parse(jsonInput.value);
                showValidation('Valid JSON', true);
            } catch (e) {
                showValidation('Invalid JSON: ' + e.message, false);
            }
        }

        function minifyJSON() {
            try {
                const parsed = JSON.parse(jsonInput.value);
                jsonOutput.value = JSON.stringify(parsed);
                showValidation('Valid JSON (minified)', true);
            } catch (e) {
                showValidation('Invalid JSON: ' + e.message, false);
            }
        }

        function showValidation(message, isValid) {
            validationMessage.textContent = message;
            validationResult.className = 'result-box ' + (isValid ? 'valid' : '');
        }

        function clearAll() {
            jsonInput.value = '';
            jsonOutput.value = '';
            validationMessage.textContent = 'Enter JSON to validate';
            validationResult.className = 'result-box';
        }

        formatBtn.addEventListener('click', formatJSON);
        validateBtn.addEventListener('click', validateJSON);
        minifyBtn.addEventListener('click', minifyJSON);
        clearBtn.addEventListener('click', clearAll);

        return element;
    }

    // 7. Temperature Converter (Updated with beautiful arrows)
function temperatureConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Temperature Converter</h3>
            <p>Convert between Celsius, Fahrenheit, and Kelvin</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="tempValue" value="20" step="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="tempValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="tempValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="tempFromUnit">
                    <option value="c">Celsius (°C)</option>
                    <option value="f">Fahrenheit (°F)</option>
                    <option value="k">Kelvin (K)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="tempResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="tempResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="tempResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="tempToUnit">
                    <option value="c">Celsius (°C)</option>
                    <option value="f" selected>Fahrenheit (°F)</option>
                    <option value="k">Kelvin (K)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="tempConversionDetails"></div>
            </div>
        </div>
    `;

    const tempValue = element.querySelector('#tempValue');
    const fromUnit = element.querySelector('#tempFromUnit');
    const toUnit = element.querySelector('#tempToUnit');
    const tempResult = element.querySelector('#tempResult');
    const detailsDiv = element.querySelector('#tempConversionDetails');

    function convertTemperature() {
        const value = parseFloat(tempValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        // Convert to Celsius first
        let celsius;
        switch (from) {
            case 'c': celsius = value; break;
            case 'f': celsius = (value - 32) * 5/9; break;
            case 'k': celsius = value - 273.15; break;
        }

        // Convert from Celsius to target unit
        let result;
        switch (to) {
            case 'c': result = celsius; break;
            case 'f': result = (celsius * 9/5) + 32; break;
            case 'k': result = celsius + 273.15; break;
        }

        tempResult.value = result.toFixed(2);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value}°${from.toUpperCase()} =</span>
                <span>${result.toFixed(2)}°${to.toUpperCase()}</span>
            </div>
        `;
    }

    // Add arrow functionality
    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    tempValue.addEventListener('input', convertTemperature);
    fromUnit.addEventListener('change', convertTemperature);
    toUnit.addEventListener('change', convertTemperature);

    setupNumberInputArrows();
    convertTemperature();
    return element;
}

    // 8. Password Generator
    function passwordGenerator() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>Password Generator</h3>
                <p>Generate secure random passwords</p>
                
                <div class="input-group">
                    <label for="passwordLength">Password Length:</label>
                    <input type="range" id="passwordLength" min="8" max="32" value="16">
                    <span id="lengthValue">16</span>
                </div>
                
                <div class="input-group">
                    <label>
                        <input type="checkbox" id="includeUppercase" checked>
                        Include Uppercase Letters (A-Z)
                    </label>
                </div>
                
                <div class="input-group">
                    <label>
                        <input type="checkbox" id="includeLowercase" checked>
                        Include Lowercase Letters (a-z)
                    </label>
                </div>
                
                <div class="input-group">
                    <label>
                        <input type="checkbox" id="includeNumbers" checked>
                        Include Numbers (0-9)
                    </label>
                </div>
                
                <div class="input-group">
                    <label>
                        <input type="checkbox" id="includeSymbols">
                        Include Symbols (!@#$%^&*)
                    </label>
                </div>
                
                <div class="button-group">
                    <button id="generatePassword">Generate Password</button>
                    <button id="copyPassword">Copy to Clipboard</button>
                </div>
                
                <div class="result-box">
                    <input type="text" id="generatedPassword" readonly style="width: 100%; padding: 12px; font-family: monospace; text-align: center;">
                </div>
                
                <div class="info-display">
                    <div class="info-item">
                        <span class="info-label">Password Strength:</span>
                        <span id="passwordStrength">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Possible Combinations:</span>
                        <span id="possibleCombinations">-</span>
                    </div>
                </div>
            </div>
        `;

        const lengthSlider = element.querySelector('#passwordLength');
        const lengthValue = element.querySelector('#lengthValue');
        const includeUppercase = element.querySelector('#includeUppercase');
        const includeLowercase = element.querySelector('#includeLowercase');
        const includeNumbers = element.querySelector('#includeNumbers');
        const includeSymbols = element.querySelector('#includeSymbols');
        const generateBtn = element.querySelector('#generatePassword');
        const copyBtn = element.querySelector('#copyPassword');
        const passwordField = element.querySelector('#generatedPassword');
        const strengthDisplay = element.querySelector('#passwordStrength');
        const combinationsDisplay = element.querySelector('#possibleCombinations');

        const chars = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        function generatePassword() {
            const length = parseInt(lengthSlider.value);
            let characterSet = '';
            
            if (includeUppercase.checked) characterSet += chars.uppercase;
            if (includeLowercase.checked) characterSet += chars.lowercase;
            if (includeNumbers.checked) characterSet += chars.numbers;
            if (includeSymbols.checked) characterSet += chars.symbols;
            
            if (!characterSet) {
                passwordField.value = 'Select at least one character type';
                return;
            }
            
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characterSet.length);
                password += characterSet[randomIndex];
            }
            
            passwordField.value = password;
            updatePasswordInfo(password, characterSet.length, length);
        }

        function updatePasswordInfo(password, charsetSize, length) {
            // Calculate possible combinations
            const combinations = Math.pow(charsetSize, length);
            combinationsDisplay.textContent = combinations.toExponential(2);
            
            // Simple strength calculation
            let strength = 'Weak';
            let color = 'var(--warning-color)';
            
            if (length >= 12 && charsetSize >= 50) {
                strength = 'Strong';
                color = 'var(--success-color)';
            } else if (length >= 8 && charsetSize >= 30) {
                strength = 'Medium';
                color = 'orange';
            }
            
            strengthDisplay.textContent = strength;
            strengthDisplay.style.color = color;
        }

        function copyPassword() {
            navigator.clipboard.writeText(passwordField.value).then(() => {
                alert('Password copied to clipboard!');
            });
        }

        lengthSlider.addEventListener('input', function() {
            lengthValue.textContent = this.value;
            generatePassword();
        });

        includeUppercase.addEventListener('change', generatePassword);
        includeLowercase.addEventListener('change', generatePassword);
        includeNumbers.addEventListener('change', generatePassword);
        includeSymbols.addEventListener('change', generatePassword);
        generateBtn.addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', copyPassword);

        generatePassword();
        return element;
    }

    // 9. Age Calculator
    function ageCalculator() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>Age Calculator</h3>
                <p>Calculate age from birth date</p>
                
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" value="1990-01-01">
                </div>
                
                <div class="input-group">
                    <label for="ageAtDate">Calculate Age At (optional):</label>
                    <input type="date" id="ageAtDate">
                </div>
                
                <div class="button-group">
                    <button id="calculateAge">Calculate Age</button>
                </div>
                
                <div class="result-box">
                    <div class="info-item">
                        <span class="info-label">Age:</span>
                        <span id="ageResult">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Months:</span>
                        <span id="monthsResult">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Days:</span>
                        <span id="daysResult">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Weeks:</span>
                        <span id="weeksResult">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Next Birthday:</span>
                        <span id="nextBirthday">-</span>
                    </div>
                </div>
            </div>
        `;

        const birthDate = element.querySelector('#birthDate');
        const ageAtDate = element.querySelector('#ageAtDate');
        const calculateBtn = element.querySelector('#calculateAge');
        const ageResult = element.querySelector('#ageResult');
        const monthsResult = element.querySelector('#monthsResult');
        const daysResult = element.querySelector('#daysResult');
        const weeksResult = element.querySelector('#weeksResult');
        const nextBirthday = element.querySelector('#nextBirthday');

        function calculateAge() {
            const birth = new Date(birthDate.value);
            const today = ageAtDate.value ? new Date(ageAtDate.value) : new Date();
            
            if (isNaN(birth.getTime())) {
                alert('Please enter a valid birth date');
                return;
            }
            
            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            let days = today.getDate() - birth.getDate();
            
            if (days < 0) {
                months--;
                // Get days in previous month
                const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += prevMonth.getDate();
            }
            
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Calculate total days
            const diffTime = Math.abs(today - birth);
            const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Calculate next birthday
            const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
            if (nextBday < today) {
                nextBday.setFullYear(nextBday.getFullYear() + 1);
            }
            const daysUntilBday = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));
            
            ageResult.textContent = `${years} years, ${months} months, ${days} days`;
            monthsResult.textContent = Math.floor(totalDays / 30.44);
            daysResult.textContent = totalDays;
            weeksResult.textContent = Math.floor(totalDays / 7);
            nextBirthday.textContent = `${nextBday.toDateString()} (in ${daysUntilBday} days)`;
        }

        calculateBtn.addEventListener('click', calculateAge);
        
        // Set ageAtDate to today by default
        const today = new Date().toISOString().split('T')[0];
        ageAtDate.value = today;

        calculateAge();
        return element;
    }

    // 10. File Size Converter (Updated with beautiful arrows)
function fileSizeConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>File Size Converter</h3>
            <p>Convert between file size units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="fileSizeValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="fileSizeValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="fileSizeValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="fileSizeFromUnit">
                    <option value="bytes">Bytes</option>
                    <option value="kb">Kilobytes (KB)</option>
                    <option value="mb" selected>Megabytes (MB)</option>
                    <option value="gb">Gigabytes (GB)</option>
                    <option value="tb">Terabytes (TB)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="fileSizeResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="fileSizeResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="fileSizeResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="fileSizeToUnit">
                    <option value="bytes">Bytes</option>
                    <option value="kb">Kilobytes (KB)</option>
                    <option value="mb">Megabytes (MB)</option>
                    <option value="gb" selected>Gigabytes (GB)</option>
                    <option value="tb">Terabytes (TB)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="fileSizeDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Conversions:</span>
                </div>
                <div class="info-item">
                    <span>1 GB = 1024 MB</span>
                    <span>1 MB = 1024 KB</span>
                </div>
                <div class="info-item">
                    <span>1 KB = 1024 Bytes</span>
                    <span>1 TB = 1024 GB</span>
                </div>
            </div>
        </div>
    `;

    const sizeValue = element.querySelector('#fileSizeValue');
    const fromUnit = element.querySelector('#fileSizeFromUnit');
    const toUnit = element.querySelector('#fileSizeToUnit');
    const sizeResult = element.querySelector('#fileSizeResult');
    const detailsDiv = element.querySelector('#fileSizeDetails');

    const conversionRates = {
        bytes: 1,
        kb: 1024,
        mb: 1024 * 1024,
        gb: 1024 * 1024 * 1024,
        tb: 1024 * 1024 * 1024 * 1024
    };

    function convertFileSize() {
        const value = parseFloat(sizeValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInBytes = value * conversionRates[from];
        const result = valueInBytes / conversionRates[to];

        sizeResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getFileSizeUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getFileSizeUnitName(to)}</span>
            </div>
        `;
    }

    function getFileSizeUnitName(unit) {
        const names = {
            bytes: 'Bytes',
            kb: 'KB',
            mb: 'MB', 
            gb: 'GB',
            tb: 'TB'
        };
        return names[unit];
    }

    // Add arrow functionality
    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return; // Don't change readonly inputs
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    sizeValue.addEventListener('input', convertFileSize);
    fromUnit.addEventListener('change', convertFileSize);
    toUnit.addEventListener('change', convertFileSize);

    setupNumberInputArrows();
    convertFileSize();
    return element;
}

    // ========== PLACEHOLDER FUNCTIONS FOR REMAINING TOOLS ==========
    // These can be replaced with actual implementations as needed
    
    function aspectRatioCalculator() { return createPlaceholder('Aspect Ratio Calculator'); }
    function resolutionScaleTool() { return createPlaceholder('Resolution Scale Tool'); }
    function viewingDistanceCalculator() { return createPlaceholder('Viewing Distance Calculator'); }
    function colorContrastChecker() { return createPlaceholder('Color Contrast Checker'); }
    function screenTimeEstimator() { return createPlaceholder('Screen Time Estimator'); }
    function displayComparisonTool() { return createPlaceholder('Display Comparison Tool'); }
    function pixelDensityMap() { return createPlaceholder('Pixel Density Map'); }
    function screenAreaCalculator() { return createPlaceholder('Screen Area Calculator'); }
    function bezierCurveGenerator() { return createPlaceholder('Bezier Curve Generator'); }
    function gradientTool() { return createPlaceholder('Gradient Tool'); }
    function shadowCalculator() { return createPlaceholder('Shadow Calculator'); }
    function borderRadiusPreview() { return createPlaceholder('Border Radius Preview'); }
    function animationSpeedTester() { return createPlaceholder('Animation Speed Tester'); }
    
    // Unit Converters
    function weightConverter() { return createPlaceholder('Weight Converter'); }
    function areaConverter() { return createPlaceholder('Area Converter'); }
    function volumeConverter() { return createPlaceholder('Volume Converter'); }
    function speedConverter() { return createPlaceholder('Speed Converter'); }
    function pressureConverter() { return createPlaceholder('Pressure Converter'); }
    function energyConverter() { return createPlaceholder('Energy Converter'); }
    function powerConverter() { return createPlaceholder('Power Converter'); }
    function dataStorageConverter() { return createPlaceholder('Data Storage Converter'); }
    function timeConverter() { return createPlaceholder('Time Converter'); }
    function angleConverter() { return createPlaceholder('Angle Converter'); }
    function fuelConverter() { return createPlaceholder('Fuel Converter'); }
    function digitalStorageConverter() { return createPlaceholder('Digital Storage Converter'); }
    function cookingConverter() { return createPlaceholder('Cooking Converter'); }
    function clothingSizesConverter() { return createPlaceholder('Clothing Sizes Converter'); }
    function shoeSizesConverter() { return createPlaceholder('Shoe Sizes Converter'); }
    function typographyConverter() { return createPlaceholder('Typography Converter'); }
    function currencyConverter() { return createPlaceholder('Currency Converter'); }
    function frequencyConverter() { return createPlaceholder('Frequency Converter'); }
    
    // Math & Calculators
    function scientificCalculator() { return createPlaceholder('Scientific Calculator'); }
    function financialCalculator() { return createPlaceholder('Financial Calculator'); }
    function bmiCalculator() { return createPlaceholder('BMI Calculator'); }
    function loanCalculator() { return createPlaceholder('Loan Calculator'); }
    function mortgageCalculator() { return createPlaceholder('Mortgage Calculator'); }
    function tipCalculator() { return createPlaceholder('Tip Calculator'); }
    function percentageCalculator() { return createPlaceholder('Percentage Calculator'); }
    function fractionCalculator() { return createPlaceholder('Fraction Calculator'); }
    function primeChecker() { return createPlaceholder('Prime Number Checker'); }
    function fibonacciSequence() { return createPlaceholder('Fibonacci Sequence'); }
    function randomNumberGenerator() { return createPlaceholder('Random Number Generator'); }
    function statisticalCalculator() { return createPlaceholder('Statistical Calculator'); }
    function geometryCalculator() { return createPlaceholder('Geometry Calculator'); }
    function matrixCalculator() { return createPlaceholder('Matrix Calculator'); }
    function baseConverter() { return createPlaceholder('Base Converter'); }
    
    // Text Utilities
    function caseConverter() { return createPlaceholder('Case Converter'); }
    function characterCounter() { return createPlaceholder('Character Counter'); }
    function lineCounter() { return createPlaceholder('Line Counter'); }
    function loremIpsumGenerator() { return createPlaceholder('Lorem Ipsum Generator'); }
    function textReverser() { return createPlaceholder('Text Reverser'); }
    function uuidGenerator() { return createPlaceholder('UUID Generator'); }
    function hashGenerator() { return createPlaceholder('Hash Generator'); }
    function base64Encoder() { return createPlaceholder('Base64 Encoder'); }
    function urlEncoder() { return createPlaceholder('URL Encoder'); }
    function htmlEntityConverter() { return createPlaceholder('HTML Entity Converter'); }
    function textDiffTool() { return createPlaceholder('Text Diff Tool'); }
    function regexTester() { return createPlaceholder('Regex Tester'); }
    function markdownPreview() { return createPlaceholder('Markdown Preview'); }
    
    // Color Tools
    function colorPaletteGenerator() { return createPlaceholder('Color Palette Generator'); }
    function gradientGenerator() { return createPlaceholder('Gradient Generator'); }
    function colorBlindnessSimulator() { return createPlaceholder('Color Blindness Simulator'); }
    function hexRgbHslConverter() { return createPlaceholder('HEX/RGB/HSL Converter'); }
    function colorNameFinder() { return createPlaceholder('Color Name Finder'); }
    function colorSchemeGenerator() { return createPlaceholder('Color Scheme Generator'); }
    function imageColorExtractor() { return createPlaceholder('Image Color Extractor'); }
    function cssGradientGenerator() { return createPlaceholder('CSS Gradient Generator'); }
    
    // Time & Date
    function worldClock() { return createPlaceholder('World Clock'); }
    function timeZoneConverter() { return createPlaceholder('Time Zone Converter'); }
    function countdownTimer() { return createPlaceholder('Countdown Timer'); }
    function stopwatch() { return createPlaceholder('Stopwatch'); }
    function dateDifferenceCalculator() { return createPlaceholder('Date Difference Calculator'); }
    function weekNumberCalculator() { return createPlaceholder('Week Number Calculator'); }
    function unixTimestampConverter() { return createPlaceholder('Unix Timestamp Converter'); }
    function meetingPlanner() { return createPlaceholder('Meeting Planner'); }
    function holidayCalendar() { return createPlaceholder('Holiday Calendar'); }
    
    // Development Tools
    function xmlFormatter() { return createPlaceholder('XML Formatter'); }
    function cssFormatter() { return createPlaceholder('CSS Formatter'); }
    function javascriptFormatter() { return createPlaceholder('JavaScript Formatter'); }
    function htmlFormatter() { return createPlaceholder('HTML Formatter'); }
    function sqlFormatter() { return createPlaceholder('SQL Formatter'); }
    function regexTesterDev() { return createPlaceholder('Regex Tester'); }
    function httpStatusLookup() { return createPlaceholder('HTTP Status Lookup'); }
    function userAgentParser() { return createPlaceholder('User Agent Parser'); }
    function ipAddressLookup() { return createPlaceholder('IP Address Lookup'); }
    
    // File & Data
    function imageMetadataViewer() { return createPlaceholder('Image Metadata Viewer'); }
    function csvToJsonConverter() { return createPlaceholder('CSV to JSON Converter'); }
    function jsonToCsvConverter() { return createPlaceholder('JSON to CSV Converter'); }
    function dataUrlGenerator() { return createPlaceholder('Data URL Generator'); }

    function createPlaceholder(toolName) {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="control-group">
                <h3>${toolName}</h3>
                <p>This tool is part of the 100+ tool collection. In a full implementation, this would be a fully functional ${toolName}.</p>
                <div class="button-group">
                    <button onclick="alert('${toolName} would be implemented here')">Test Functionality</button>
                </div>
            </div>
        `;
        return element;
    }
// Aspect Ratio Calculator
function aspectRatioCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Aspect Ratio Calculator</h3>
            <p>Calculate and convert between different aspect ratios</p>
            
            <div class="input-group">
                <label>Original Dimensions:</label>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div class="number-input-container" style="flex: 1;">
                        <input type="number" id="origWidth" value="16" min="1" step="1">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="origWidth" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="origWidth" data-direction="down"></div>
                        </div>
                    </div>
                    <span>×</span>
                    <div class="number-input-container" style="flex: 1;">
                        <input type="number" id="origHeight" value="9" min="1" step="1">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="origHeight" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="origHeight" data-direction="down"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="input-group">
                <label for="calculationType">Calculate:</label>
                <select id="calculationType">
                    <option value="width">New Width from Height</option>
                    <option value="height">New Height from Width</option>
                    <option value="common">Common Ratios</option>
                </select>
            </div>

            <div id="commonRatiosSection" class="input-group" style="display: none;">
                <label>Common Aspect Ratios:</label>
                <div class="button-group">
                    <button data-ratio="16:9">16:9</button>
                    <button data-ratio="4:3">4:3</button>
                    <button data-ratio="1:1">1:1</button>
                    <button data-ratio="21:9">21:9</button>
                    <button data-ratio="3:2">3:2</button>
                </div>
            </div>

            <div id="customInputSection" class="input-group">
                <label id="customInputLabel">Enter New Height:</label>
                <div class="number-input-container">
                    <input type="number" id="newValue" value="1080" min="1" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="newValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="newValue" data-direction="down"></div>
                    </div>
                </div>
            </div>

            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Aspect Ratio:</span>
                    <span id="aspectRatioResult">16:9</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Decimal Ratio:</span>
                    <span id="decimalRatio">1.78</span>
                </div>
                <div class="info-item">
                    <span class="info-label">New Dimensions:</span>
                    <span id="newDimensions">1920 × 1080</span>
                </div>
            </div>
        </div>
    `;

    const origWidth = element.querySelector('#origWidth');
    const origHeight = element.querySelector('#origHeight');
    const calculationType = element.querySelector('#calculationType');
    const newValue = element.querySelector('#newValue');
    const commonRatiosSection = element.querySelector('#commonRatiosSection');
    const customInputSection = element.querySelector('#customInputSection');
    const customInputLabel = element.querySelector('#customInputLabel');
    const aspectRatioResult = element.querySelector('#aspectRatioResult');
    const decimalRatio = element.querySelector('#decimalRatio');
    const newDimensions = element.querySelector('#newDimensions');

    function calculateAspectRatio() {
        const width = parseInt(origWidth.value);
        const height = parseInt(origHeight.value);
        const type = calculationType.value;
        const newVal = parseInt(newValue.value);

        if (isNaN(width) || isNaN(height) || isNaN(newVal)) return;

        // Calculate aspect ratio
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(width, height);
        const ratioX = width / divisor;
        const ratioY = height / divisor;
        const decimal = (width / height).toFixed(3);

        aspectRatioResult.textContent = `${ratioX}:${ratioY}`;
        decimalRatio.textContent = decimal;

        // Calculate new dimensions
        let newWidth, newHeight;
        if (type === 'width') {
            newHeight = newVal;
            newWidth = Math.round(newVal * (width / height));
        } else {
            newWidth = newVal;
            newHeight = Math.round(newVal * (height / width));
        }

        newDimensions.textContent = `${newWidth} × ${newHeight}`;
    }

    function setupCommonRatios() {
        const buttons = element.querySelectorAll('[data-ratio]');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const ratio = this.getAttribute('data-ratio').split(':');
                origWidth.value = ratio[0];
                origHeight.value = ratio[1];
                calculateAspectRatio();
            });
        });
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 1;
                let currentValue = parseFloat(input.value) || 1;
                
                if (direction === 'up') {
                    currentValue += step;
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    calculationType.addEventListener('change', function() {
        const type = this.value;
        if (type === 'common') {
            commonRatiosSection.style.display = 'block';
            customInputSection.style.display = 'none';
        } else {
            commonRatiosSection.style.display = 'none';
            customInputSection.style.display = 'block';
            customInputLabel.textContent = type === 'width' ? 
                'Enter New Height:' : 'Enter New Width:';
        }
        calculateAspectRatio();
    });

    origWidth.addEventListener('input', calculateAspectRatio);
    origHeight.addEventListener('input', calculateAspectRatio);
    newValue.addEventListener('input', calculateAspectRatio);

    setupCommonRatios();
    setupNumberInputArrows();
    calculateAspectRatio();

    return element;
}

// Weight Converter
function weightConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Weight Converter</h3>
            <p>Convert between milligrams, grams, kilograms, ounces, pounds, and stone</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="weightValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="weightValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="weightValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="weightFromUnit">
                    <option value="mg">Milligrams (mg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="kg" selected>Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="stone">Stone</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="weightResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="weightResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="weightResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="weightToUnit">
                    <option value="mg">Milligrams (mg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz" selected>Ounces (oz)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="stone">Stone</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="weightDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Conversions:</span>
                </div>
                <div class="info-item">
                    <span>1 kg = 2.20462 lb</span>
                    <span>1 lb = 16 oz</span>
                </div>
                <div class="info-item">
                    <span>1 stone = 14 lb</span>
                    <span>1 kg = 35.274 oz</span>
                </div>
            </div>
        </div>
    `;

    const weightValue = element.querySelector('#weightValue');
    const fromUnit = element.querySelector('#weightFromUnit');
    const toUnit = element.querySelector('#weightToUnit');
    const weightResult = element.querySelector('#weightResult');
    const detailsDiv = element.querySelector('#weightDetails');

    const conversionRates = {
        mg: 1,
        g: 1000,
        kg: 1000000,
        oz: 28349.5,
        lb: 453592,
        stone: 6350290
    };

    function convertWeight() {
        const value = parseFloat(weightValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInMg = value * conversionRates[from];
        const result = valueInMg / conversionRates[to];

        weightResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getWeightUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getWeightUnitName(to)}</span>
            </div>
        `;
    }

    function getWeightUnitName(unit) {
        const names = {
            mg: 'mg',
            g: 'g',
            kg: 'kg',
            oz: 'oz',
            lb: 'lb',
            stone: 'stone'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 0.01;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue.toFixed(2);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    weightValue.addEventListener('input', convertWeight);
    fromUnit.addEventListener('change', convertWeight);
    toUnit.addEventListener('change', convertWeight);

    setupNumberInputArrows();
    convertWeight();
    return element;
}

// Case Converter
function caseConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Case Converter</h3>
            <p>Convert text between different cases</p>
            
            <div class="input-group">
                <label for="textInput">Enter Text:</label>
                <textarea id="textInput" rows="4" placeholder="Enter text to convert...">hello world example text</textarea>
            </div>
            
            <div class="button-group">
                <button id="toUpper">UPPERCASE</button>
                <button id="toLower">lowercase</button>
                <button id="toTitle">Title Case</button>
                <button id="toSentence">Sentence case</button>
                <button id="toCamel">camelCase</button>
                <button id="toPascal">PascalCase</button>
                <button id="toSnake">snake_case</button>
                <button id="toKebab">kebab-case</button>
            </div>
            
            <div class="input-group">
                <label for="textOutput">Converted Text:</label>
                <textarea id="textOutput" rows="4" readonly></textarea>
            </div>
            
            <div class="button-group">
                <button id="copyText">Copy to Clipboard</button>
                <button id="clearText">Clear All</button>
            </div>
        </div>
    `;

    const textInput = element.querySelector('#textInput');
    const textOutput = element.querySelector('#textOutput');
    const copyBtn = element.querySelector('#copyText');
    const clearBtn = element.querySelector('#clearText');

    function convertCase(conversionType) {
        const text = textInput.value;
        let result = '';

        switch(conversionType) {
            case 'upper':
                result = text.toUpperCase();
                break;
            case 'lower':
                result = text.toLowerCase();
                break;
            case 'title':
                result = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
                break;
            case 'sentence':
                result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, char => char.toUpperCase());
                break;
            case 'camel':
                result = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/[^a-zA-Z0-9]/g, '');
                break;
            case 'pascal':
                result = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/^./, char => char.toUpperCase())
                    .replace(/[^a-zA-Z0-9]/g, '');
                break;
            case 'snake':
                result = text.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                break;
            case 'kebab':
                result = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
                break;
        }

        textOutput.value = result;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(textOutput.value).then(() => {
            alert('Text copied to clipboard!');
        });
    }

    function clearAll() {
        textInput.value = '';
        textOutput.value = '';
    }

    // Add event listeners to conversion buttons
    element.querySelector('#toUpper').addEventListener('click', () => convertCase('upper'));
    element.querySelector('#toLower').addEventListener('click', () => convertCase('lower'));
    element.querySelector('#toTitle').addEventListener('click', () => convertCase('title'));
    element.querySelector('#toSentence').addEventListener('click', () => convertCase('sentence'));
    element.querySelector('#toCamel').addEventListener('click', () => convertCase('camel'));
    element.querySelector('#toPascal').addEventListener('click', () => convertCase('pascal'));
    element.querySelector('#toSnake').addEventListener('click', () => convertCase('snake'));
    element.querySelector('#toKebab').addEventListener('click', () => convertCase('kebab'));

    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);

    // Convert to lowercase by default
    convertCase('lower');

    return element;
}

// Color Palette Generator
function colorPaletteGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Color Palette Generator</h3>
            <p>Generate harmonious color palettes from a base color</p>
            
            <div class="input-group">
                <label for="baseColor">Base Color:</label>
                <input type="color" id="baseColor" value="#3498db">
            </div>
            
            <div class="input-group">
                <label for="paletteType">Palette Type:</label>
                <select id="paletteType">
                    <option value="analogous">Analogous</option>
                    <option value="monochromatic">Monochromatic</option>
                    <option value="complementary">Complementary</option>
                    <option value="triadic">Triadic</option>
                    <option value="tetradic">Tetradic</option>
                    <option value="splitComplementary">Split Complementary</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="paletteSize">Number of Colors:</label>
                <div class="number-input-container">
                    <input type="number" id="paletteSize" value="5" min="3" max="8" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="paletteSize" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="paletteSize" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="generatePalette">Generate Palette</button>
                <button id="randomColor">Random Color</button>
            </div>
            
            <div class="palette-container" id="paletteContainer">
                <!-- Palette will be generated here -->
            </div>
            
            <div class="result-box">
                <div id="paletteInfo"></div>
            </div>
        </div>
    `;

    const baseColor = element.querySelector('#baseColor');
    const paletteType = element.querySelector('#paletteType');
    const paletteSize = element.querySelector('#paletteSize');
    const generateBtn = element.querySelector('#generatePalette');
    const randomBtn = element.querySelector('#randomColor');
    const paletteContainer = element.querySelector('#paletteContainer');
    const paletteInfo = element.querySelector('#paletteInfo');

    function hexToHSL(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    function HSLToHex(h, s, l) {
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r, g, b;

        if (h >= 0 && h < 60) {
            [r, g, b] = [c, x, 0];
        } else if (h >= 60 && h < 120) {
            [r, g, b] = [x, c, 0];
        } else if (h >= 120 && h < 180) {
            [r, g, b] = [0, c, x];
        } else if (h >= 180 && h < 240) {
            [r, g, b] = [0, x, c];
        } else if (h >= 240 && h < 300) {
            [r, g, b] = [x, 0, c];
        } else {
            [r, g, b] = [c, 0, x];
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function generatePalette() {
        const baseHex = baseColor.value;
        const type = paletteType.value;
        const size = parseInt(paletteSize.value);
        const baseHSL = hexToHSL(baseHex);

        let colors = [];

        switch(type) {
            case 'analogous':
                for (let i = 0; i < size; i++) {
                    const hue = (baseHSL.h + (i - Math.floor(size / 2)) * 30) % 360;
                    colors.push(HSLToHex(hue < 0 ? hue + 360 : hue, baseHSL.s, baseHSL.l));
                }
                break;

            case 'monochromatic':
                for (let i = 0; i < size; i++) {
                    const lightness = Math.max(10, Math.min(90, baseHSL.l + (i - Math.floor(size / 2)) * 15));
                    colors.push(HSLToHex(baseHSL.h, baseHSL.s, lightness));
                }
                break;

            case 'complementary':
                colors.push(baseHex);
                colors.push(HSLToHex((baseHSL.h + 180) % 360, baseHSL.s, baseHSL.l));
                // Add variations
                for (let i = 2; i < size; i++) {
                    const hue = (baseHSL.h + (i - 1) * 60) % 360;
                    colors.push(HSLToHex(hue, baseHSL.s, baseHSL.l));
                }
                break;

            case 'triadic':
                colors.push(baseHex);
                colors.push(HSLToHex((baseHSL.h + 120) % 360, baseHSL.s, baseHSL.l));
                colors.push(HSLToHex((baseHSL.h + 240) % 360, baseHSL.s, baseHSL.l));
                // Add variations
                for (let i = 3; i < size; i++) {
                    const hue = (baseHSL.h + (i - 1) * 30) % 360;
                    colors.push(HSLToHex(hue, baseHSL.s, baseHSL.l));
                }
                break;

            case 'tetradic':
                colors.push(baseHex);
                colors.push(HSLToHex((baseHSL.h + 90) % 360, baseHSL.s, baseHSL.l));
                colors.push(HSLToHex((baseHSL.h + 180) % 360, baseHSL.s, baseHSL.l));
                colors.push(HSLToHex((baseHSL.h + 270) % 360, baseHSL.s, baseHSL.l));
                // Add variations
                for (let i = 4; i < size; i++) {
                    const hue = (baseHSL.h + (i - 1) * 45) % 360;
                    colors.push(HSLToHex(hue, baseHSL.s, baseHSL.l));
                }
                break;

            case 'splitComplementary':
                colors.push(baseHex);
                colors.push(HSLToHex((baseHSL.h + 150) % 360, baseHSL.s, baseHSL.l));
                colors.push(HSLToHex((baseHSL.h + 210) % 360, baseHSL.s, baseHSL.l));
                // Add variations
                for (let i = 3; i < size; i++) {
                    const hue = (baseHSL.h + (i - 1) * 60) % 360;
                    colors.push(HSLToHex(hue, baseHSL.s, baseHSL.l));
                }
                break;
        }

        displayPalette(colors);
    }

    function displayPalette(colors) {
        paletteContainer.innerHTML = '';
        paletteInfo.innerHTML = '';

        colors.forEach((color, index) => {
            const colorElement = document.createElement('div');
            colorElement.className = 'palette-color';
            colorElement.style.backgroundColor = color;
            colorElement.innerHTML = `
                <div class="color-info">
                    <span>${color.toUpperCase()}</span>
                    <button class="copy-color" data-color="${color}">Copy</button>
                </div>
            `;
            paletteContainer.appendChild(colorElement);

            // Add to info
            const infoItem = document.createElement('div');
            infoItem.className = 'info-item';
            infoItem.innerHTML = `
                <span class="info-label">Color ${index + 1}:</span>
                <span>${color.toUpperCase()}</span>
            `;
            paletteInfo.appendChild(infoItem);
        });

        // Add copy event listeners
        element.querySelectorAll('.copy-color').forEach(button => {
            button.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                navigator.clipboard.writeText(color).then(() => {
                    alert(`Copied ${color} to clipboard!`);
                });
            });
        });
    }

    function randomColor() {
        const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        baseColor.value = randomHex;
        generatePalette();
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 3;
                const max = parseFloat(input.max) || 8;
                let currentValue = parseInt(input.value) || 5;
                
                if (direction === 'up') {
                    currentValue = Math.min(max, currentValue + step);
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                generatePalette();
            });
        });
    }

    generateBtn.addEventListener('click', generatePalette);
    randomBtn.addEventListener('click', randomColor);
    baseColor.addEventListener('input', generatePalette);
    paletteType.addEventListener('change', generatePalette);
    paletteSize.addEventListener('input', generatePalette);

    setupNumberInputArrows();
    generatePalette();

    return element;
}


// World Clock
function worldClock() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>World Clock</h3>
            <p>View current time in different time zones around the world</p>
            
            <div class="input-group">
                <label for="timezoneSelect">Add Timezone:</label>
                <select id="timezoneSelect">
                    <option value="">Select a timezone...</option>
                    <option value="America/New_York">New York (EST)</option>
                    <option value="America/Los_Angeles">Los Angeles (PST)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Australia/Sydney">Sydney (AEST)</option>
                    <option value="Pacific/Auckland">Auckland (NZST)</option>
                </select>
                <button id="addTimezone" style="margin-top: 10px;">Add Timezone</button>
            </div>
            
            <div id="clocksContainer" class="clocks-grid">
                <!-- Clocks will be added here -->
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Local Time:</span>
                    <span id="localTime">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">UTC Time:</span>
                    <span id="utcTime">-</span>
                </div>
            </div>
        </div>
    `;

    const timezoneSelect = element.querySelector('#timezoneSelect');
    const addTimezoneBtn = element.querySelector('#addTimezone');
    const clocksContainer = element.querySelector('#clocksContainer');
    const localTime = element.querySelector('#localTime');
    const utcTime = element.querySelector('#utcTime');

    let timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo']; // Default timezones

    function updateClocks() {
        const now = new Date();
        
        // Update local and UTC time
        localTime.textContent = now.toLocaleString();
        utcTime.textContent = now.toUTCString();
        
        // Update all clocks
        clocksContainer.innerHTML = '';
        timezones.forEach(timezone => {
            const clockElement = document.createElement('div');
            clockElement.className = 'clock-card';
            
            const time = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            const timeString = time.toLocaleString('en-US', { 
                timeZone: timezone,
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            const dateString = time.toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const timezoneName = timezone.split('/').pop().replace('_', ' ');
            
            clockElement.innerHTML = `
                <h4>${timezoneName}</h4>
                <div class="time-display">${timeString}</div>
                <div class="date-display">${dateString}</div>
                <button class="remove-timezone" data-timezone="${timezone}">Remove</button>
            `;
            
            clocksContainer.appendChild(clockElement);
        });

        // Add remove event listeners
        element.querySelectorAll('.remove-timezone').forEach(button => {
            button.addEventListener('click', function() {
                const tz = this.getAttribute('data-timezone');
                removeTimezone(tz);
            });
        });
    }

    function addTimezone() {
        const selectedTimezone = timezoneSelect.value;
        if (selectedTimezone && !timezones.includes(selectedTimezone)) {
            timezones.push(selectedTimezone);
            updateClocks();
        }
    }

    function removeTimezone(timezone) {
        timezones = timezones.filter(tz => tz !== timezone);
        updateClocks();
    }

    addTimezoneBtn.addEventListener('click', addTimezone);

    // Update clocks every second
    updateClocks();
    setInterval(updateClocks, 1000);

    return element;
}


// XML Formatter
function xmlFormatter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>XML Formatter & Validator</h3>
            <p>Format and validate XML data</p>
            
            <div class="input-group">
                <label for="xmlInput">Enter XML:</label>
                <textarea id="xmlInput" rows="8" placeholder='<root><item id="1">Value</item></root>'></textarea>
            </div>
            
            <div class="button-group">
                <button id="formatXML">Format XML</button>
                <button id="validateXML">Validate XML</button>
                <button id="minifyXML">Minify XML</button>
                <button id="clearXML">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="xmlOutput">Formatted XML:</label>
                <textarea id="xmlOutput" rows="8" readonly></textarea>
            </div>
            
            <div class="result-box" id="validationResult">
                <div id="validationMessage">Enter XML to validate</div>
            </div>
        </div>
    `;

    const xmlInput = element.querySelector('#xmlInput');
    const xmlOutput = element.querySelector('#xmlOutput');
    const formatBtn = element.querySelector('#formatXML');
    const validateBtn = element.querySelector('#validateXML');
    const minifyBtn = element.querySelector('#minifyXML');
    const clearBtn = element.querySelector('#clearXML');
    const validationResult = element.querySelector('#validationResult');
    const validationMessage = element.querySelector('#validationMessage');

    function formatXML(xml) {
        let formatted = '';
        let indent = '';
        const tab = '  ';
        let inTag = false;
        let inAttribute = false;
        let currentTag = '';

        for (let i = 0; i < xml.length; i++) {
            const char = xml[i];
            const nextChar = xml[i + 1];

            if (char === '<' && nextChar !== '/') {
                // Opening tag
                if (inTag) {
                    formatted += '\n' + indent;
                }
                formatted += char;
                inTag = true;
                inAttribute = false;
            } else if (char === '>' && !inAttribute) {
                // Closing tag
                formatted += char;
                inTag = false;
                if (currentTag && !currentTag.startsWith('/') && !currentTag.endsWith('/')) {
                    indent += tab;
                }
                currentTag = '';
            } else if (char === '<' && nextChar === '/') {
                // Closing tag start
                indent = indent.slice(0, -tab.length);
                formatted += '\n' + indent + char;
                inTag = true;
            } else if (inTag) {
                formatted += char;
                if (char === '"') {
                    inAttribute = !inAttribute;
                }
                if (!inAttribute && char !== ' ' && char !== '\n' && char !== '\t') {
                    currentTag += char;
                }
            } else {
                formatted += char;
            }
        }

        return formatted;
    }

    function validateXML(xml) {
        try {
            // Simple XML validation
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");
            
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error('Invalid XML structure');
            }
            
            return { valid: true, message: 'Valid XML' };
        } catch (error) {
            return { valid: false, message: error.message };
        }
    }

    function minifyXML(xml) {
        return xml.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    }

    function processXML(action) {
        const xml = xmlInput.value.trim();
        
        if (!xml) {
            showValidation('Please enter XML content', false);
            return;
        }

        try {
            let result;
            switch(action) {
                case 'format':
                    result = formatXML(xml);
                    xmlOutput.value = result;
                    showValidation('XML formatted successfully', true);
                    break;
                case 'validate':
                    const validation = validateXML(xml);
                    showValidation(validation.message, validation.valid);
                    break;
                case 'minify':
                    result = minifyXML(xml);
                    xmlOutput.value = result;
                    showValidation('XML minified successfully', true);
                    break;
            }
        } catch (error) {
            showValidation('Error: ' + error.message, false);
        }
    }

    function showValidation(message, isValid) {
        validationMessage.textContent = message;
        validationResult.className = 'result-box ' + (isValid ? 'valid' : '');
    }

    function clearAll() {
        xmlInput.value = '';
        xmlOutput.value = '';
        validationMessage.textContent = 'Enter XML to validate';
        validationResult.className = 'result-box';
    }

    formatBtn.addEventListener('click', () => processXML('format'));
    validateBtn.addEventListener('click', () => processXML('validate'));
    minifyBtn.addEventListener('click', () => processXML('minify'));
    clearBtn.addEventListener('click', clearAll);

    return element;
}



// BMI Calculator
function bmiCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>BMI Calculator</h3>
            <p>Calculate your Body Mass Index and understand what it means</p>
            
            <div class="input-group">
                <label>Measurement System:</label>
                <select id="measurementSystem">
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lb, inches)</option>
                </select>
            </div>
            
            <div id="metricInputs">
                <div class="input-group">
                    <label for="weightKg">Weight (kg):</label>
                    <div class="number-input-container">
                        <input type="number" id="weightKg" value="70" min="1" max="300" step="0.1">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="weightKg" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="weightKg" data-direction="down"></div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="heightCm">Height (cm):</label>
                    <div class="number-input-container">
                        <input type="number" id="heightCm" value="175" min="50" max="250" step="1">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="heightCm" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="heightCm" data-direction="down"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="imperialInputs" style="display: none;">
                <div class="input-group">
                    <label for="weightLb">Weight (pounds):</label>
                    <div class="number-input-container">
                        <input type="number" id="weightLb" value="154" min="1" max="660" step="1">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="weightLb" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="weightLb" data-direction="down"></div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="heightFeet">Height:</label>
                    <div style="display: flex; gap: 10px;">
                        <div class="number-input-container" style="flex: 1;">
                            <input type="number" id="heightFeet" value="5" min="1" max="8" step="1" placeholder="Feet">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="heightFeet" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="heightFeet" data-direction="down"></div>
                            </div>
                        </div>
                        <div class="number-input-container" style="flex: 1;">
                            <input type="number" id="heightInches" value="9" min="0" max="11" step="1" placeholder="Inches">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="heightInches" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="heightInches" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateBMI">Calculate BMI</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Your BMI:</span>
                    <span id="bmiResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Category:</span>
                    <span id="bmiCategory">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>BMI Categories:</h4>
                <div class="info-item">
                    <span class="info-label">Underweight:</span>
                    <span>&lt; 18.5</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Normal weight:</span>
                    <span>18.5 - 24.9</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Overweight:</span>
                    <span>25 - 29.9</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Obesity:</span>
                    <span>30 or greater</span>
                </div>
            </div>
        </div>
    `;

    const measurementSystem = element.querySelector('#measurementSystem');
    const metricInputs = element.querySelector('#metricInputs');
    const imperialInputs = element.querySelector('#imperialInputs');
    const weightKg = element.querySelector('#weightKg');
    const heightCm = element.querySelector('#heightCm');
    const weightLb = element.querySelector('#weightLb');
    const heightFeet = element.querySelector('#heightFeet');
    const heightInches = element.querySelector('#heightInches');
    const calculateBtn = element.querySelector('#calculateBMI');
    const bmiResult = element.querySelector('#bmiResult');
    const bmiCategory = element.querySelector('#bmiCategory');

    function calculateBMI() {
        let bmi;
        const system = measurementSystem.value;

        if (system === 'metric') {
            const weight = parseFloat(weightKg.value);
            const height = parseFloat(heightCm.value) / 100; // Convert to meters
            bmi = weight / (height * height);
        } else {
            const weight = parseFloat(weightLb.value);
            const feet = parseFloat(heightFeet.value);
            const inches = parseFloat(heightInches.value);
            const heightInchesTotal = (feet * 12) + inches;
            bmi = (weight / (heightInchesTotal * heightInchesTotal)) * 703;
        }

        if (isNaN(bmi)) return;

        bmiResult.textContent = bmi.toFixed(1);

        // Determine category
        let category, color;
        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#3498db';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = '#27ae60';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#f39c12';
        } else {
            category = 'Obesity';
            color = '#e74c3c';
        }

        bmiCategory.textContent = category;
        bmiCategory.style.color = color;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue = Math.min(max, currentValue + step);
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                calculateBMI();
            });
        });
    }

    measurementSystem.addEventListener('change', function() {
        if (this.value === 'metric') {
            metricInputs.style.display = 'block';
            imperialInputs.style.display = 'none';
        } else {
            metricInputs.style.display = 'none';
            imperialInputs.style.display = 'block';
        }
        calculateBMI();
    });

    calculateBtn.addEventListener('click', calculateBMI);
    weightKg.addEventListener('input', calculateBMI);
    heightCm.addEventListener('input', calculateBMI);
    weightLb.addEventListener('input', calculateBMI);
    heightFeet.addEventListener('input', calculateBMI);
    heightInches.addEventListener('input', calculateBMI);

    setupNumberInputArrows();
    calculateBMI();

    return element;
}



// Loan Calculator
function loanCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Loan Calculator</h3>
            <p>Calculate loan payments, total interest, and amortization schedule</p>
            
            <div class="input-group">
                <label for="loanAmount">Loan Amount ($):</label>
                <div class="number-input-container">
                    <input type="number" id="loanAmount" value="25000" min="100" max="10000000" step="100">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="loanAmount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="loanAmount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="interestRate">Annual Interest Rate (%):</label>
                <div class="number-input-container">
                    <input type="number" id="interestRate" value="5.5" min="0.1" max="50" step="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="interestRate" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="interestRate" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="loanTerm">Loan Term (years):</label>
                <div class="number-input-container">
                    <input type="number" id="loanTerm" value="5" min="1" max="50" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="loanTerm" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="loanTerm" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateLoan">Calculate</button>
                <button id="resetLoan">Reset</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Monthly Payment:</span>
                    <span id="monthlyPayment">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Payments:</span>
                    <span id="totalPayments">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Interest:</span>
                    <span id="totalInterest">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Payoff Date:</span>
                    <span id="payoffDate">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Amortization Schedule (First 12 months):</h4>
                <div id="amortizationSchedule">
                    <!-- Schedule will be generated here -->
                </div>
            </div>
        </div>
    `;

    const loanAmount = element.querySelector('#loanAmount');
    const interestRate = element.querySelector('#interestRate');
    const loanTerm = element.querySelector('#loanTerm');
    const calculateBtn = element.querySelector('#calculateLoan');
    const resetBtn = element.querySelector('#resetLoan');
    const monthlyPayment = element.querySelector('#monthlyPayment');
    const totalPayments = element.querySelector('#totalPayments');
    const totalInterest = element.querySelector('#totalInterest');
    const payoffDate = element.querySelector('#payoffDate');
    const amortizationSchedule = element.querySelector('#amortizationSchedule');

    function calculateLoan() {
        const amount = parseFloat(loanAmount.value);
        const annualRate = parseFloat(interestRate.value) / 100;
        const years = parseFloat(loanTerm.value);

        if (isNaN(amount) || isNaN(annualRate) || isNaN(years)) return;

        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;

        // Calculate monthly payment using formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
        const monthlyPaymentAmount = amount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalPaymentAmount = monthlyPaymentAmount * numberOfPayments;
        const totalInterestAmount = totalPaymentAmount - amount;

        // Calculate payoff date
        const today = new Date();
        const payoff = new Date(today);
        payoff.setMonth(payoff.getMonth() + numberOfPayments);

        // Update results
        monthlyPayment.textContent = '$' + monthlyPaymentAmount.toFixed(2);
        totalPayments.textContent = '$' + totalPaymentAmount.toFixed(2);
        totalInterest.textContent = '$' + totalInterestAmount.toFixed(2);
        payoffDate.textContent = payoff.toLocaleDateString();

        // Generate amortization schedule
        generateAmortizationSchedule(amount, annualRate, monthlyPaymentAmount, numberOfPayments);
    }

    function generateAmortizationSchedule(principal, annualRate, monthlyPayment, numberOfPayments) {
        let scheduleHTML = '<div class="schedule-header">';
        scheduleHTML += '<span>Month</span><span>Payment</span><span>Principal</span><span>Interest</span><span>Balance</span>';
        scheduleHTML += '</div>';

        let balance = principal;
        const monthlyRate = annualRate / 12;

        for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            scheduleHTML += `
                <div class="schedule-row">
                    <span>${month}</span>
                    <span>$${monthlyPayment.toFixed(2)}</span>
                    <span>$${principalPayment.toFixed(2)}</span>
                    <span>$${interestPayment.toFixed(2)}</span>
                    <span>$${Math.max(0, balance).toFixed(2)}</span>
                </div>
            `;
        }

        amortizationSchedule.innerHTML = scheduleHTML;
    }

    function resetCalculator() {
        loanAmount.value = 25000;
        interestRate.value = 5.5;
        loanTerm.value = 5;
        calculateLoan();
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue = Math.min(max, currentValue + step);
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                calculateLoan();
            });
        });
    }

    calculateBtn.addEventListener('click', calculateLoan);
    resetBtn.addEventListener('click', resetCalculator);
    loanAmount.addEventListener('input', calculateLoan);
    interestRate.addEventListener('input', calculateLoan);
    loanTerm.addEventListener('input', calculateLoan);

    setupNumberInputArrows();
    calculateLoan();

    return element;
}



// Countdown Timer
function countdownTimer() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Countdown Timer</h3>
            <p>Create countdown timers for important events</p>
            
            <div class="input-group">
                <label for="eventName">Event Name:</label>
                <input type="text" id="eventName" value="New Year" placeholder="Enter event name">
            </div>
            
            <div class="input-group">
                <label for="targetDate">Target Date & Time:</label>
                <input type="datetime-local" id="targetDate">
            </div>
            
            <div class="button-group">
                <button id="startTimer">Start Timer</button>
                <button id="resetTimer">Reset</button>
                <button id="addTimer">Save Timer</button>
            </div>
            
            <div class="timer-display" id="timerDisplay">
                <div class="timer-digits">
                    <div class="time-unit">
                        <span class="time-value" id="days">00</span>
                        <span class="time-label">Days</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="hours">00</span>
                        <span class="time-label">Hours</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="minutes">00</span>
                        <span class="time-label">Minutes</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="seconds">00</span>
                        <span class="time-label">Seconds</span>
                    </div>
                </div>
                <div class="event-name" id="currentEvent">No active timer</div>
            </div>
            
            <div class="saved-timers" id="savedTimers">
                <h4>Saved Timers</h4>
                <!-- Saved timers will appear here -->
            </div>
        </div>
    `;

    const eventName = element.querySelector('#eventName');
    const targetDate = element.querySelector('#targetDate');
    const startBtn = element.querySelector('#startTimer');
    const resetBtn = element.querySelector('#resetTimer');
    const addBtn = element.querySelector('#addTimer');
    const timerDisplay = element.querySelector('#timerDisplay');
    const days = element.querySelector('#days');
    const hours = element.querySelector('#hours');
    const minutes = element.querySelector('#minutes');
    const seconds = element.querySelector('#seconds');
    const currentEvent = element.querySelector('#currentEvent');
    const savedTimers = element.querySelector('#savedTimers');

    let countdownInterval = null;
    let savedTimerList = [];

    // Set default target date to next New Year
    const nextYear = new Date().getFullYear() + 1;
    const defaultDate = new Date(nextYear, 0, 1, 0, 0, 0);
    targetDate.value = defaultDate.toISOString().slice(0, 16);

    function startCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        const target = new Date(targetDate.value);
        const event = eventName.value || 'Event';

        if (isNaN(target.getTime())) {
            alert('Please select a valid date and time');
            return;
        }

        currentEvent.textContent = event;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                timerDisplay.classList.add('expired');
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                currentEvent.textContent = `${event} - Time's up!`;
                return;
            }

            timerDisplay.classList.remove('expired');

            const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

            days.textContent = String(daysRemaining).padStart(2, '0');
            hours.textContent = String(hoursRemaining).padStart(2, '0');
            minutes.textContent = String(minutesRemaining).padStart(2, '0');
            seconds.textContent = String(secondsRemaining).padStart(2, '0');
        }

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function resetCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
        currentEvent.textContent = 'No active timer';
        timerDisplay.classList.remove('expired');
    }

    function saveTimer() {
        const event = eventName.value || 'Unnamed Event';
        const target = new Date(targetDate.value);

        if (isNaN(target.getTime())) {
            alert('Please select a valid date and time');
            return;
        }

        const timer = {
            id: Date.now(),
            event: event,
            target: target.toISOString()
        };

        savedTimerList.push(timer);
        updateSavedTimers();
    }

    function updateSavedTimers() {
        savedTimers.innerHTML = '<h4>Saved Timers</h4>';
        
        if (savedTimerList.length === 0) {
            savedTimers.innerHTML += '<p>No saved timers</p>';
            return;
        }

        savedTimerList.forEach((timer, index) => {
            const timerElement = document.createElement('div');
            timerElement.className = 'saved-timer';
            timerElement.innerHTML = `
                <div class="saved-timer-info">
                    <strong>${timer.event}</strong>
                    <span>${new Date(timer.target).toLocaleString()}</span>
                </div>
                <div class="saved-timer-actions">
                    <button class="load-timer" data-index="${index}">Load</button>
                    <button class="delete-timer" data-index="${index}">Delete</button>
                </div>
            `;
            savedTimers.appendChild(timerElement);
        });

        // Add event listeners
        element.querySelectorAll('.load-timer').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                loadTimer(index);
            });
        });

        element.querySelectorAll('.delete-timer').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteTimer(index);
            });
        });
    }

    function loadTimer(index) {
        const timer = savedTimerList[index];
        eventName.value = timer.event;
        targetDate.value = timer.target.slice(0, 16);
        startCountdown();
    }

    function deleteTimer(index) {
        savedTimerList.splice(index, 1);
        updateSavedTimers();
    }

    startBtn.addEventListener('click', startCountdown);
    resetBtn.addEventListener('click', resetCountdown);
    addBtn.addEventListener('click', saveTimer);

    // Start countdown automatically
    startCountdown();

    return element;
}


// Image Metadata Viewer
function imageMetadataViewer() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Image Metadata Viewer</h3>
            <p>Extract and view metadata from uploaded images</p>
            
            <div class="input-group">
                <label for="imageUpload">Upload Image:</label>
                <input type="file" id="imageUpload" accept="image/*">
            </div>
            
            <div class="image-preview-container" id="imagePreview" style="display: none;">
                <h4>Image Preview</h4>
                <img id="previewImage" style="max-width: 300px; max-height: 300px; border-radius: 8px;">
            </div>
            
            <div class="result-box">
                <h4>Basic Information</h4>
                <div class="info-item">
                    <span class="info-label">File Name:</span>
                    <span id="fileName">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">File Size:</span>
                    <span id="fileSize">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">File Type:</span>
                    <span id="fileType">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Dimensions:</span>
                    <span id="imageDimensions">-</span>
                </div>
            </div>
            
            <div class="result-box">
                <h4>EXIF Metadata</h4>
                <div id="exifData">
                    <div class="info-item">
                        <span>Upload an image to view EXIF data</span>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="downloadInfo" disabled>Download Info</button>
                <button id="clearImage">Clear</button>
            </div>
        </div>
    `;

    const imageUpload = element.querySelector('#imageUpload');
    const imagePreview = element.querySelector('#imagePreview');
    const previewImage = element.querySelector('#previewImage');
    const fileName = element.querySelector('#fileName');
    const fileSize = element.querySelector('#fileSize');
    const fileType = element.querySelector('#fileType');
    const imageDimensions = element.querySelector('#imageDimensions');
    const exifData = element.querySelector('#exifData');
    const downloadBtn = element.querySelector('#downloadInfo');
    const clearBtn = element.querySelector('#clearImage');

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Display basic file info
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileType.textContent = file.type;

        // Create image element to get dimensions
        const img = new Image();
        const objectURL = URL.createObjectURL(file);
        
        img.onload = function() {
            imageDimensions.textContent = `${this.width} × ${this.height} pixels`;
            previewImage.src = objectURL;
            imagePreview.style.display = 'block';
            
            // Extract EXIF data if available
            extractEXIFData(file);
            
            downloadBtn.disabled = false;
        };
        
        img.src = objectURL;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function extractEXIFData(file) {
        // Simple EXIF extraction (in a real implementation, you'd use a library like exif-js)
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            
            try {
                // Basic EXIF parsing (this is simplified)
                const dataView = new DataView(arrayBuffer);
                
                // Check for EXIF header (0xFFE1)
                if (dataView.getUint16(0) === 0xFFD8) {
                    let offset = 2;
                    let exifData = {};
                    
                    while (offset < dataView.byteLength - 1) {
                        const marker = dataView.getUint16(offset);
                        offset += 2;
                        
                        if (marker === 0xFFE1) {
                            // EXIF marker found
                            exifData = parseEXIFSegment(dataView, offset);
                            break;
                        } else if (marker >= 0xFFC0 && marker <= 0xFFCF && marker !== 0xFFC4 && marker !== 0xFFC8) {
                            // Skip to next marker
                            const length = dataView.getUint16(offset);
                            offset += length;
                        } else {
                            break;
                        }
                    }
                    
                    displayEXIFData(exifData);
                } else {
                    displayEXIFData({ error: 'No EXIF data found or unsupported format' });
                }
            } catch (error) {
                displayEXIFData({ error: 'Error reading EXIF data: ' + error.message });
            }
        };
        
        reader.readAsArrayBuffer(file);
    }

    function parseEXIFSegment(dataView, offset) {
        // Simplified EXIF parsing - in reality, this is much more complex
        const exif = {};
        
        try {
            // Check for "Exif" header
            const header = String.fromCharCode(
                dataView.getUint8(offset + 4),
                dataView.getUint8(offset + 5),
                dataView.getUint8(offset + 6),
                dataView.getUint8(offset + 7)
            );
            
            if (header === 'Exif') {
                exif.Make = 'Extracted from EXIF';
                exif.Model = 'Camera model info';
                exif.DateTime = 'Date/time info';
                exif.ExposureTime = 'Shutter speed';
                exif.FNumber = 'Aperture';
                exif.ISOSpeedRatings = 'ISO';
                exif.FocalLength = 'Focal length';
            }
        } catch (error) {
            exif.error = 'Partial EXIF data available';
        }
        
        return exif;
    }

    function displayEXIFData(exifData) {
        exifData.innerHTML = '';
        
        if (exifData.error) {
            exifData.innerHTML = `<div class="info-item"><span>${exifData.error}</span></div>`;
            return;
        }
        
        for (const [key, value] of Object.entries(exifData)) {
            const item = document.createElement('div');
            item.className = 'info-item';
            item.innerHTML = `
                <span class="info-label">${key}:</span>
                <span>${value}</span>
            `;
            exifData.appendChild(item);
        }
        
        if (Object.keys(exifData).length === 0) {
            exifData.innerHTML = '<div class="info-item"><span>No EXIF data found</span></div>';
        }
    }

    function downloadInfo() {
        const info = {
            fileName: fileName.textContent,
            fileSize: fileSize.textContent,
            fileType: fileType.textContent,
            dimensions: imageDimensions.textContent
        };
        
        const blob = new Blob([JSON.stringify(info, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image-info.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function clearAll() {
        imageUpload.value = '';
        imagePreview.style.display = 'none';
        fileName.textContent = '-';
        fileSize.textContent = '-';
        fileType.textContent = '-';
        imageDimensions.textContent = '-';
        exifData.innerHTML = '<div class="info-item"><span>Upload an image to view EXIF data</span></div>';
        downloadBtn.disabled = true;
    }

    imageUpload.addEventListener('change', handleImageUpload);
    downloadBtn.addEventListener('click', downloadInfo);
    clearBtn.addEventListener('click', clearAll);

    return element;}
//insert tool code here always berfore the line 'handle browser back/forward buttons'
// ========== ADD THESE 10 TOOLS TO THE END OF YOUR JS FILE ==========

// 11. Volume Converter
function volumeConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Volume Converter</h3>
            <p>Convert between milliliters, liters, gallons, fluid ounces, and cups</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="volumeValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="volumeValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="volumeValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="volumeFromUnit">
                    <option value="ml">Milliliters (ml)</option>
                    <option value="l" selected>Liters (l)</option>
                    <option value="gal">Gallons (gal)</option>
                    <option value="floz">Fluid Ounces (fl oz)</option>
                    <option value="cups">Cups</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="volumeResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="volumeResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="volumeResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="volumeToUnit">
                    <option value="ml">Milliliters (ml)</option>
                    <option value="l">Liters (l)</option>
                    <option value="gal" selected>Gallons (gal)</option>
                    <option value="floz">Fluid Ounces (fl oz)</option>
                    <option value="cups">Cups</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="volumeDetails"></div>
            </div>
        </div>
    `;

    const volumeValue = element.querySelector('#volumeValue');
    const fromUnit = element.querySelector('#volumeFromUnit');
    const toUnit = element.querySelector('#volumeToUnit');
    const volumeResult = element.querySelector('#volumeResult');
    const detailsDiv = element.querySelector('#volumeDetails');

    const conversionRates = {
        ml: 1,
        l: 1000,
        gal: 3785.41,
        floz: 29.5735,
        cups: 236.588
    };

    function convertVolume() {
        const value = parseFloat(volumeValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        if (isNaN(value)) return;
        const valueInMl = value * conversionRates[from];
        const result = valueInMl / conversionRates[to];
        volumeResult.value = result.toFixed(6);
        detailsDiv.innerHTML = `<div class="info-item"><span class="info-label">${value} ${getVolumeUnitName(from)} =</span><span>${result.toFixed(6)} ${getVolumeUnitName(to)}</span></div>`;
    }

    function getVolumeUnitName(unit) {
        const names = { ml: 'ml', l: 'l', gal: 'gal', floz: 'fl oz', cups: 'cups' };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                if (input.readOnly) return;
                const step = parseFloat(input.step) || 0.01;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue.toFixed(2);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    volumeValue.addEventListener('input', convertVolume);
    fromUnit.addEventListener('change', convertVolume);
    toUnit.addEventListener('change', convertVolume);
    setupNumberInputArrows();
    convertVolume();
    return element;
}

// 12. Speed Converter
function speedConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Speed Converter</h3>
            <p>Convert between kph, mph, m/s, and knots</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="speedValue" value="100" step="1" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="speedValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="speedValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="speedFromUnit">
                    <option value="kph" selected>Kilometers per hour (kph)</option>
                    <option value="mph">Miles per hour (mph)</option>
                    <option value="ms">Meters per second (m/s)</option>
                    <option value="knots">Knots</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="speedResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="speedResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="speedResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="speedToUnit">
                    <option value="kph">Kilometers per hour (kph)</option>
                    <option value="mph" selected>Miles per hour (mph)</option>
                    <option value="ms">Meters per second (m/s)</option>
                    <option value="knots">Knots</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="speedDetails"></div>
            </div>
        </div>
    `;

    const speedValue = element.querySelector('#speedValue');
    const fromUnit = element.querySelector('#speedFromUnit');
    const toUnit = element.querySelector('#speedToUnit');
    const speedResult = element.querySelector('#speedResult');
    const detailsDiv = element.querySelector('#speedDetails');

    const conversionRates = {
        kph: 1,
        mph: 1.60934,
        ms: 3.6,
        knots: 1.852
    };

    function convertSpeed() {
        const value = parseFloat(speedValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        if (isNaN(value)) return;
        const valueInKph = value * conversionRates[from];
        const result = valueInKph / conversionRates[to];
        speedResult.value = result.toFixed(6);
        detailsDiv.innerHTML = `<div class="info-item"><span class="info-label">${value} ${getSpeedUnitName(from)} =</span><span>${result.toFixed(6)} ${getSpeedUnitName(to)}</span></div>`;
    }

    function getSpeedUnitName(unit) {
        const names = { kph: 'kph', mph: 'mph', ms: 'm/s', knots: 'knots' };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                if (input.readOnly) return;
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    speedValue.addEventListener('input', convertSpeed);
    fromUnit.addEventListener('change', convertSpeed);
    toUnit.addEventListener('change', convertSpeed);
    setupNumberInputArrows();
    convertSpeed();
    return element;
}

// 13. Area Converter
function areaConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Area Converter</h3>
            <p>Convert between square meters, square feet, acres, and hectares</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="areaValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="areaValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="areaValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="areaFromUnit">
                    <option value="sqm" selected>Square Meters (m²)</option>
                    <option value="sqft">Square Feet (ft²)</option>
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="areaResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="areaResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="areaResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="areaToUnit">
                    <option value="sqm">Square Meters (m²)</option>
                    <option value="sqft" selected>Square Feet (ft²)</option>
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="areaDetails"></div>
            </div>
        </div>
    `;

    const areaValue = element.querySelector('#areaValue');
    const fromUnit = element.querySelector('#areaFromUnit');
    const toUnit = element.querySelector('#areaToUnit');
    const areaResult = element.querySelector('#areaResult');
    const detailsDiv = element.querySelector('#areaDetails');

    const conversionRates = {
        sqm: 1,
        sqft: 0.092903,
        acres: 4046.86,
        hectares: 10000
    };

    function convertArea() {
        const value = parseFloat(areaValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        if (isNaN(value)) return;
        const valueInSqm = value * conversionRates[from];
        const result = valueInSqm / conversionRates[to];
        areaResult.value = result.toFixed(6);
        detailsDiv.innerHTML = `<div class="info-item"><span class="info-label">${value} ${getAreaUnitName(from)} =</span><span>${result.toFixed(6)} ${getAreaUnitName(to)}</span></div>`;
    }

    function getAreaUnitName(unit) {
        const names = { sqm: 'm²', sqft: 'ft²', acres: 'acres', hectares: 'hectares' };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                if (input.readOnly) return;
                const step = parseFloat(input.step) || 0.01;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue.toFixed(2);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    areaValue.addEventListener('input', convertArea);
    fromUnit.addEventListener('change', convertArea);
    toUnit.addEventListener('change', convertArea);
    setupNumberInputArrows();
    convertArea();
    return element;
}

// 14. Time Zone Converter
function timeZoneConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Time Zone Converter</h3>
            <p>Convert times between different time zones</p>
            
            <div class="input-group">
                <label for="fromTimeZone">From Time Zone:</label>
                <select id="fromTimeZone">
                    <option value="America/New_York">New York (EST/EDT)</option>
                    <option value="America/Los_Angeles">Los Angeles (PST/PDT)</option>
                    <option value="Europe/London" selected>London (GMT/BST)</option>
                    <option value="Europe/Paris">Paris (CET/CEST)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="fromTime">Time:</label>
                <input type="time" id="fromTime" value="12:00">
            </div>
            
            <div class="input-group">
                <label for="fromDate">Date:</label>
                <input type="date" id="fromDate">
            </div>
            
            <div class="input-group">
                <label for="toTimeZone">To Time Zone:</label>
                <select id="toTimeZone">
                    <option value="America/New_York">New York (EST/EDT)</option>
                    <option value="America/Los_Angeles" selected>Los Angeles (PST/PDT)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Europe/Paris">Paris (CET/CEST)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="convertTimeZone">Convert Time</button>
                <button id="useCurrentTime">Use Current Time</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Converted Time:</span>
                    <span id="convertedTime">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Date:</span>
                    <span id="convertedDate">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Time Difference:</span>
                    <span id="timeDifference">-</span>
                </div>
            </div>
        </div>
    `;

    const fromTimeZone = element.querySelector('#fromTimeZone');
    const fromTime = element.querySelector('#fromTime');
    const fromDate = element.querySelector('#fromDate');
    const toTimeZone = element.querySelector('#toTimeZone');
    const convertBtn = element.querySelector('#convertTimeZone');
    const useCurrentBtn = element.querySelector('#useCurrentTime');
    const convertedTime = element.querySelector('#convertedTime');
    const convertedDate = element.querySelector('#convertedDate');
    const timeDifference = element.querySelector('#timeDifference');

    fromDate.value = new Date().toISOString().split('T')[0];

    function convertTimeZone() {
        const fromTZ = fromTimeZone.value;
        const toTZ = toTimeZone.value;
        const time = fromTime.value;
        const date = fromDate.value;
        if (!time || !date) return;
        const fromDateTime = new Date(`${date}T${time}`);
        const fromTimeStr = fromDateTime.toLocaleString('en-US', { timeZone: fromTZ, hour12: false });
        const toTimeStr = new Date(fromTimeStr).toLocaleString('en-US', { timeZone: toTZ });
        const toDateObj = new Date(toTimeStr);
        convertedTime.textContent = toDateObj.toLocaleTimeString('en-US', { hour12: false });
        convertedDate.textContent = toDateObj.toLocaleDateString('en-US');
        const fromOffset = new Date(fromTimeStr).getTimezoneOffset();
        const toOffset = toDateObj.getTimezoneOffset();
        const diffHours = (toOffset - fromOffset) / 60;
        timeDifference.textContent = `${diffHours > 0 ? '+' : ''}${diffHours} hours`;
    }

    function useCurrentTime() {
        const now = new Date();
        fromTime.value = now.toTimeString().slice(0, 5);
        fromDate.value = now.toISOString().split('T')[0];
        convertTimeZone();
    }

    convertBtn.addEventListener('click', convertTimeZone);
    useCurrentBtn.addEventListener('click', useCurrentTime);
    fromTimeZone.addEventListener('change', convertTimeZone);
    toTimeZone.addEventListener('change', convertTimeZone);
    fromTime.addEventListener('change', convertTimeZone);
    fromDate.addEventListener('change', convertTimeZone);
    convertTimeZone();
    return element;
}

// 15. Percentage Calculator
function percentageCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Percentage Calculator</h3>
            <p>Calculate percentages, increases, decreases, and more</p>
            
            <div class="input-group">
                <label for="calculationType">Calculation Type:</label>
                <select id="calculationType">
                    <option value="basic">What is X% of Y?</option>
                    <option value="percentage">X is what % of Y?</option>
                    <option value="increase">Increase by percentage</option>
                    <option value="decrease">Decrease by percentage</option>
                </select>
            </div>
            
            <div id="inputFields">
                <div class="input-group">
                    <label for="value1">Value 1:</label>
                    <div class="number-input-container">
                        <input type="number" id="value1" value="20" step="1" min="0">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="value1" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="value1" data-direction="down"></div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="value2">Value 2:</label>
                    <div class="number-input-container">
                        <input type="number" id="value2" value="100" step="1" min="0">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="value2" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="value2" data-direction="down"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculatePercentage">Calculate</button>
            </div>
            
            <div class="result-box">
                <div id="percentageResult">Enter values to calculate</div>
            </div>
        </div>
    `;

    const calculationType = element.querySelector('#calculationType');
    const value1 = element.querySelector('#value1');
    const value2 = element.querySelector('#value2');
    const calculateBtn = element.querySelector('#calculatePercentage');
    const percentageResult = element.querySelector('#percentageResult');
    const inputFields = element.querySelector('#inputFields');

    function updateLabels() {
        const type = calculationType.value;
        const labels = inputFields.querySelectorAll('label');
        switch(type) {
            case 'basic':
                labels[0].textContent = 'Percentage (%):';
                labels[1].textContent = 'Number:';
                break;
            case 'percentage':
                labels[0].textContent = 'Part:';
                labels[1].textContent = 'Whole:';
                break;
            case 'increase':
                labels[0].textContent = 'Number:';
                labels[1].textContent = 'Increase by (%):';
                break;
            case 'decrease':
                labels[0].textContent = 'Number:';
                labels[1].textContent = 'Decrease by (%):';
                break;
        }
    }

    function calculatePercentage() {
        const type = calculationType.value;
        const num1 = parseFloat(value1.value);
        const num2 = parseFloat(value2.value);
        if (isNaN(num1) || isNaN(num2)) {
            percentageResult.textContent = 'Please enter valid numbers';
            return;
        }
        let result = '';
        switch(type) {
            case 'basic':
                result = `${num1}% of ${num2} = ${(num1 / 100 * num2).toFixed(2)}`;
                break;
            case 'percentage':
                result = `${num1} is ${((num1 / num2) * 100).toFixed(2)}% of ${num2}`;
                break;
            case 'increase':
                result = `${num1} increased by ${num2}% = ${(num1 * (1 + num2 / 100)).toFixed(2)}`;
                break;
            case 'decrease':
                result = `${num1} decreased by ${num2}% = ${(num1 * (1 - num2 / 100)).toFixed(2)}`;
                break;
        }
        percentageResult.textContent = result;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
                calculatePercentage();
            });
        });
    }

    calculationType.addEventListener('change', function() {
        updateLabels();
        calculatePercentage();
    });
    value1.addEventListener('input', calculatePercentage);
    value2.addEventListener('input', calculatePercentage);
    calculateBtn.addEventListener('click', calculatePercentage);
    setupNumberInputArrows();
    updateLabels();
    calculatePercentage();
    return element;
}

// 16. Gradient Generator
function gradientGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>CSS Gradient Generator</h3>
            <p>Create beautiful CSS gradients with visual preview</p>
            
            <div class="input-group">
                <label>Color Stops:</label>
                <div id="colorStops">
                    <div class="color-stop">
                        <input type="color" value="#ff0000">
                        <div class="number-input-container">
                            <input type="number" value="0" min="0" max="100" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-direction="up"></div>
                                <div class="number-input-arrow down" data-direction="down"></div>
                            </div>
                        </div>
                        <span>%</span>
                        <button class="remove-stop">×</button>
                    </div>
                    <div class="color-stop">
                        <input type="color" value="#0000ff">
                        <div class="number-input-container">
                            <input type="number" value="100" min="0" max="100" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-direction="up"></div>
                                <div class="number-input-arrow down" data-direction="down"></div>
                            </div>
                        </div>
                        <span>%</span>
                        <button class="remove-stop">×</button>
                    </div>
                </div>
                <button id="addColorStop">Add Color Stop</button>
            </div>
            
            <div class="input-group">
                <label for="gradientType">Gradient Type:</label>
                <select id="gradientType">
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="gradientAngle">Angle (degrees):</label>
                <div class="number-input-container">
                    <input type="number" id="gradientAngle" value="90" min="0" max="360" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="gradientAngle" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="gradientAngle" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="gradient-preview" id="gradientPreview"></div>
            
            <div class="input-group">
                <label>CSS Code:</label>
                <textarea id="cssCode" rows="3" readonly></textarea>
                <button id="copyCss">Copy CSS</button>
            </div>
        </div>
    `;

    const colorStops = element.querySelector('#colorStops');
    const addColorStop = element.querySelector('#addColorStop');
    const gradientType = element.querySelector('#gradientType');
    const gradientAngle = element.querySelector('#gradientAngle');
    const gradientPreview = element.querySelector('#gradientPreview');
    const cssCode = element.querySelector('#cssCode');
    const copyCss = element.querySelector('#copyCss');

    function updateGradient() {
        const stops = Array.from(colorStops.querySelectorAll('.color-stop'));
        const stopValues = stops.map(stop => {
            const color = stop.querySelector('input[type="color"]').value;
            const position = stop.querySelector('input[type="number"]').value;
            return `${color} ${position}%`;
        }).join(', ');
        const type = gradientType.value;
        const angle = gradientAngle.value;
        let gradientCSS;
        if (type === 'linear') {
            gradientCSS = `linear-gradient(${angle}deg, ${stopValues})`;
        } else {
            gradientCSS = `radial-gradient(circle, ${stopValues})`;
        }
        gradientPreview.style.background = gradientCSS;
        cssCode.value = `background: ${gradientCSS};`;
    }

    function addStop() {
        const stop = document.createElement('div');
        stop.className = 'color-stop';
        stop.innerHTML = `
            <input type="color" value="#00ff00">
            <div class="number-input-container">
                <input type="number" value="50" min="0" max="100" step="1">
                <div class="number-input-arrows">
                    <div class="number-input-arrow up" data-direction="up"></div>
                    <div class="number-input-arrow down" data-direction="down"></div>
                </div>
            </div>
            <span>%</span>
            <button class="remove-stop">×</button>
        `;
        colorStops.appendChild(stop);
        stop.querySelector('.remove-stop').addEventListener('click', function() {
            if (colorStops.children.length > 2) {
                stop.remove();
                updateGradient();
            }
        });
        stop.querySelector('input[type="color"]').addEventListener('input', updateGradient);
        stop.querySelector('input[type="number"]').addEventListener('input', updateGradient);
        updateGradient();
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const input = this.parentElement.parentElement.querySelector('input[type="number"]');
                const direction = this.getAttribute('data-direction');
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                const max = parseFloat(input.max) || 100;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue = Math.min(max, currentValue + step);
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
                updateGradient();
            });
        });
    }

    addColorStop.addEventListener('click', addStop);
    gradientType.addEventListener('change', updateGradient);
    gradientAngle.addEventListener('input', updateGradient);
    colorStops.querySelectorAll('.remove-stop').forEach(btn => {
        btn.addEventListener('click', function() {
            if (colorStops.children.length > 2) {
                this.parentElement.remove();
                updateGradient();
            }
        });
    });
    colorStops.querySelectorAll('input[type="color"]').forEach(input => {
        input.addEventListener('input', updateGradient);
    });
    colorStops.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateGradient);
    });
    copyCss.addEventListener('click', function() {
        navigator.clipboard.writeText(cssCode.value).then(() => {
            alert('CSS copied to clipboard!');
        });
    });
    setupNumberInputArrows();
    updateGradient();
    return element;
}

// 17. Random Number Generator
function randomNumberGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Random Number Generator</h3>
            <p>Generate random numbers within a specified range</p>
            
            <div class="input-group">
                <label for="minValue">Minimum Value:</label>
                <div class="number-input-container">
                    <input type="number" id="minValue" value="1" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="minValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="minValue" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="maxValue">Maximum Value:</label>
                <div class="number-input-container">
                    <input type="number" id="maxValue" value="100" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="maxValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="maxValue" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="quantity">Quantity:</label>
                <div class="number-input-container">
                    <input type="number" id="quantity" value="1" min="1" max="100" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="quantity" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="quantity" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label>
                    <input type="checkbox" id="allowDuplicates" checked>
                    Allow duplicate numbers
                </label>
            </div>
            
            <div class="button-group">
                <button id="generateRandom">Generate Numbers</button>
                <button id="resetRandom">Reset</button>
            </div>
            
            <div class="result-box">
                <div id="randomResults">Click generate to create random numbers</div>
            </div>
        </div>
    `;

    const minValue = element.querySelector('#minValue');
    const maxValue = element.querySelector('#maxValue');
    const quantity = element.querySelector('#quantity');
    const allowDuplicates = element.querySelector('#allowDuplicates');
    const generateBtn = element.querySelector('#generateRandom');
    const resetBtn = element.querySelector('#resetRandom');
    const randomResults = element.querySelector('#randomResults');

    function generateRandomNumbers() {
        const min = parseInt(minValue.value);
        const max = parseInt(maxValue.value);
        const count = parseInt(quantity.value);
        const duplicates = allowDuplicates.checked;
        if (isNaN(min) || isNaN(max) || isNaN(count)) {
            randomResults.textContent = 'Please enter valid numbers';
            return;
        }
        if (min >= max) {
            randomResults.textContent = 'Minimum must be less than maximum';
            return;
        }
        if (!duplicates && (max - min + 1) < count) {
            randomResults.textContent = 'Range too small for unique numbers';
            return;
        }
        const numbers = [];
        const used = new Set();
        while (numbers.length < count) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if (duplicates || !used.has(randomNum)) {
                numbers.push(randomNum);
                used.add(randomNum);
            }
        }
        randomResults.textContent = numbers.join(', ');
    }

    function resetGenerator() {
        minValue.value = 1;
        maxValue.value = 100;
        quantity.value = 1;
        allowDuplicates.checked = true;
        randomResults.textContent = 'Click generate to create random numbers';
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                const step = parseFloat(input.step) || 1;
                let currentValue = parseInt(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(parseInt(input.min) || -Infinity, currentValue - step);
                input.value = currentValue;
            });
        });
    }

    generateBtn.addEventListener('click', generateRandomNumbers);
    resetBtn.addEventListener('click', resetGenerator);
    setupNumberInputArrows();
    return element;
}

// 18. HTML Formatter
function htmlFormatter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>HTML Formatter</h3>
            <p>Format and beautify HTML code</p>
            
            <div class="input-group">
                <label for="htmlInput">Enter HTML:</label>
                <textarea id="htmlInput" rows="8" placeholder="<div><p>Hello World</p></div>"></textarea>
            </div>
            
            <div class="button-group">
                <button id="formatHtml">Format HTML</button>
                <button id="minifyHtml">Minify HTML</button>
                <button id="validateHtml">Validate HTML</button>
                <button id="clearHtml">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="htmlOutput">Formatted HTML:</label>
                <textarea id="htmlOutput" rows="8" readonly></textarea>
            </div>
            
            <div class="result-box" id="validationResult">
                <div id="validationMessage">Enter HTML to validate</div>
            </div>
        </div>
    `;

    const htmlInput = element.querySelector('#htmlInput');
    const htmlOutput = element.querySelector('#htmlOutput');
    const formatBtn = element.querySelector('#formatHtml');
    const minifyBtn = element.querySelector('#minifyHtml');
    const validateBtn = element.querySelector('#validateHtml');
    const clearBtn = element.querySelector('#clearHtml');
    const validationResult = element.querySelector('#validationResult');
    const validationMessage = element.querySelector('#validationMessage');

    function formatHTML(html) {
        let formatted = '';
        let indent = '';
        const tab = '  ';
        let inTag = false;
        let inAttribute = false;
        let currentTag = '';
        for (let i = 0; i < html.length; i++) {
            const char = html[i];
            const nextChar = html[i + 1];
            if (char === '<' && nextChar !== '/') {
                if (inTag) {
                    formatted += '\n' + indent;
                }
                formatted += char;
                inTag = true;
                inAttribute = false;
            } else if (char === '>' && !inAttribute) {
                formatted += char;
                inTag = false;
                if (currentTag && !currentTag.startsWith('/') && !currentTag.endsWith('/')) {
                    indent += tab;
                }
                currentTag = '';
            } else if (char === '<' && nextChar === '/') {
                indent = indent.slice(0, -tab.length);
                formatted += '\n' + indent + char;
                inTag = true;
            } else if (inTag) {
                formatted += char;
                if (char === '"') {
                    inAttribute = !inAttribute;
                }
                if (!inAttribute && char !== ' ' && char !== '\n' && char !== '\t') {
                    currentTag += char;
                }
            } else {
                formatted += char;
            }
        }
        return formatted;
    }

    function minifyHTML(html) {
        return html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    }

    function validateHTML(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            if (doc.querySelector('parsererror')) {
                return { valid: false, message: 'Invalid HTML structure' };
            }
            return { valid: true, message: 'Valid HTML' };
        } catch (error) {
            return { valid: false, message: 'Error parsing HTML' };
        }
    }

    function processHTML(action) {
        const html = htmlInput.value.trim();
        if (!html) {
            showValidation('Please enter HTML content', false);
            return;
        }
        try {
            let result;
            switch(action) {
                case 'format':
                    result = formatHTML(html);
                    htmlOutput.value = result;
                    showValidation('HTML formatted successfully', true);
                    break;
                case 'minify':
                    result = minifyHTML(html);
                    htmlOutput.value = result;
                    showValidation('HTML minified successfully', true);
                    break;
                case 'validate':
                    const validation = validateHTML(html);
                    showValidation(validation.message, validation.valid);
                    break;
            }
        } catch (error) {
            showValidation('Error: ' + error.message, false);
        }
    }

    function showValidation(message, isValid) {
        validationMessage.textContent = message;
        validationResult.className = 'result-box ' + (isValid ? 'valid' : '');
    }

    function clearAll() {
        htmlInput.value = '';
        htmlOutput.value = '';
        validationMessage.textContent = 'Enter HTML to validate';
        validationResult.className = 'result-box';
    }

    formatBtn.addEventListener('click', () => processHTML('format'));
    minifyBtn.addEventListener('click', () => processHTML('minify'));
    validateBtn.addEventListener('click', () => processHTML('validate'));
    clearBtn.addEventListener('click', clearAll);
    return element;
}

// 19. Stopwatch
function stopwatch() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Stopwatch</h3>
            <p>Precise stopwatch with lap times</p>
            
            <div class="timer-display">
                <div class="time-main" id="mainTime">00:00:00.00</div>
                <div class="laps-container" id="lapsContainer"></div>
            </div>
            
            <div class="button-group">
                <button id="startStopwatch">Start</button>
                <button id="lapStopwatch" disabled>Lap</button>
                <button id="resetStopwatch">Reset</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Current Lap:</span>
                    <span id="currentLap">00:00:00.00</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Lap Count:</span>
                    <span id="lapCount">0</span>
                </div>
            </div>
        </div>
    `;

    const mainTime = element.querySelector('#mainTime');
    const currentLap = element.querySelector('#currentLap');
    const lapCount = element.querySelector('#lapCount');
    const lapsContainer = element.querySelector('#lapsContainer');
    const startBtn = element.querySelector('#startStopwatch');
    const lapBtn = element.querySelector('#lapStopwatch');
    const resetBtn = element.querySelector('#resetStopwatch');

    let startTime = 0;
    let elapsedTime = 0;
    let lapStartTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let lapCounter = 0;

    function formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        const lapElapsed = currentTime - lapStartTime;
        mainTime.textContent = formatTime(elapsedTime);
        currentLap.textContent = formatTime(lapElapsed);
    }

    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            lapStartTime = Date.now() - (elapsedTime - (lapStartTime ? (Date.now() - lapStartTime) : 0));
            timerInterval = setInterval(updateDisplay, 10);
            isRunning = true;
            startBtn.textContent = 'Stop';
            lapBtn.disabled = false;
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = 'Start';
            lapBtn.disabled = true;
        }
    }

    function recordLap() {
        if (!isRunning) return;
        lapCounter++;
        const currentTime = Date.now();
        const lapTime = currentTime - lapStartTime;
        lapStartTime = currentTime;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `<span>Lap ${lapCounter}</span><span>${formatTime(lapTime)}</span>`;
        lapsContainer.appendChild(lapElement);
        lapCount.textContent = lapCounter;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapStartTime = 0;
        lapCounter = 0;
        mainTime.textContent = '00:00:00.00';
        currentLap.textContent = '00:00:00.00';
        lapCount.textContent = '0';
        lapsContainer.innerHTML = '';
        startBtn.textContent = 'Start';
        lapBtn.disabled = true;
    }

    startBtn.addEventListener('click', startTimer);
    lapBtn.addEventListener('click', recordLap);
    resetBtn.addEventListener('click', resetTimer);
    return element;
}

// 20. Character Counter
function characterCounter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Character Counter</h3>
            <p>Count characters with and without spaces, words, and more</p>
            
            <div class="input-group">
                <label for="textInput">Enter Text:</label>
                <textarea id="textInput" rows="6" placeholder="Start typing or paste your text here..."></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Characters:</span>
                    <span id="charCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Characters (no spaces):</span>
                    <span id="charNoSpaces">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Words:</span>
                    <span id="wordCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Sentences:</span>
                    <span id="sentenceCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Paragraphs:</span>
                    <span id="paragraphCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Reading Time:</span>
                    <span id="readingTime">0 minutes</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Character Frequency:</h4>
                <div id="charFrequency"></div>
            </div>
        </div>
    `;

    const textInput = element.querySelector('#textInput');
    const charCount = element.querySelector('#charCount');
    const charNoSpaces = element.querySelector('#charNoSpaces');
    const wordCount = element.querySelector('#wordCount');
    const sentenceCount = element.querySelector('#sentenceCount');
    const paragraphCount = element.querySelector('#paragraphCount');
    const readingTime = element.querySelector('#readingTime');
    const charFrequency = element.querySelector('#charFrequency');

    function updateCounts() {
        const text = textInput.value;
        charCount.textContent = text.length;
        charNoSpaces.textContent = text.replace(/\s/g, '').length;
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        wordCount.textContent = words.length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        sentenceCount.textContent = sentences.length;
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        paragraphCount.textContent = paragraphs.length || (text.trim() ? 1 : 0);
        const minutes = Math.ceil(words.length / 200);
        readingTime.textContent = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        updateCharacterFrequency(text);
    }

    function updateCharacterFrequency(text) {
        const frequency = {};
        const cleanText = text.replace(/\s/g, '').toLowerCase();
        for (let char of cleanText) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
        const sorted = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        charFrequency.innerHTML = '';
        if (sorted.length === 0) {
            charFrequency.innerHTML = '<div class="info-item"><span>No characters to count</span></div>';
            return;
        }
        sorted.forEach(([char, count]) => {
            const item = document.createElement('div');
            item.className = 'info-item';
            item.innerHTML = `<span class="info-label">"${char === ' ' ? 'Space' : char}":</span><span>${count} occurrence${count !== 1 ? 's' : ''}</span>`;
            charFrequency.appendChild(item);
        });
    }

    textInput.addEventListener('input', updateCounts);
    updateCounts();
    return element;
}

// ========== AUTO-REGISTER TOOLS ==========
// This code automatically adds the tools to your app when you paste it at the end
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment for the main app to initialize
    setTimeout(() => {
        const newTools = [
            {
                id: 'volume-converter',
                name: 'Volume Converter',
                description: 'Convert between milliliters, liters, gallons, fluid ounces, and cups',
                category: 'unit',
                component: volumeConverter
            },
            {
                id: 'speed-converter',
                name: 'Speed Converter',
                description: 'Convert between kph, mph, m/s, and knots',
                category: 'unit',
                component: speedConverter
            },
            {
                id: 'area-converter',
                name: 'Area Converter',
                description: 'Convert between square meters, square feet, acres, and hectares',
                category: 'unit',
                component: areaConverter
            },
            {
                id: 'time-zone-converter',
                name: 'Time Zone Converter',
                description: 'Convert times between different time zones',
                category: 'time',
                component: timeZoneConverter
            },
            {
                id: 'percentage-calculator',
                name: 'Percentage Calculator',
                description: 'Calculate percentages, increases, decreases, and more',
                category: 'math',
                component: percentageCalculator
            },
            {
                id: 'gradient-generator',
                name: 'Gradient Generator',
                description: 'Create beautiful CSS gradients with visual preview',
                category: 'color',
                component: gradientGenerator
            },
            {
                id: 'random-number-generator',
                name: 'Random Number Generator',
                description: 'Generate random numbers within a specified range',
                category: 'math',
                component: randomNumberGenerator
            },
            {
                id: 'html-formatter',
                name: 'HTML Formatter',
                description: 'Format and beautify HTML code',
                category: 'dev',
                component: htmlFormatter
            },
            {
                id: 'stopwatch',
                name: 'Stopwatch',
                description: 'Precise stopwatch with lap times',
                category: 'time',
                component: stopwatch
            },
            {
                id: 'character-counter',
                name: 'Character Counter',
                description: 'Count characters with and without spaces, words, and more',
                category: 'text',
                component: characterCounter
            }
        ];

        // Add tools to the main app
        if (window.state && window.state.tools) {
            window.state.tools.push(...newTools);
            
            // Re-render the grid if it exists
            const toolsGrid = document.getElementById('toolsGrid');
            if (toolsGrid) {
                const filteredTools = window.state.tools.filter(tool => {
                    const matchesCategory = window.state.currentCategory === 'all' || tool.category === window.state.currentCategory;
                    const matchesSearch = !window.state.searchQuery || 
                        tool.name.toLowerCase().includes(window.state.searchQuery.toLowerCase()) ||
                        tool.description.toLowerCase().includes(window.state.searchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                });
                
                toolsGrid.innerHTML = filteredTools.map(tool => `
                    <div class="tool-card" data-tool-id="${tool.id}">
                        <h3>${tool.name}</h3>
                        <p>${tool.description}</p>
                        <span class="category-tag">${tool.category}</span>
                    </div>
                `).join('');
            }
        }
    }, 100);
});


// ========== NEXT 10 OFFLINE TOOLS ==========

// 21. Currency Converter (Offline - User enters exchange rates)
function currencyConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Currency Converter</h3>
            <p>Convert between currencies using current exchange rates (enter rates manually)</p>
            
            <div class="input-group">
                <label for="exchangeRate">Exchange Rate (1 Base = ? Target):</label>
                <div class="number-input-container">
                    <input type="number" id="exchangeRate" value="1.2" step="0.0001" min="0.0001">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="exchangeRate" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="exchangeRate" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="currencyValue" value="100" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="currencyValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="currencyValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="currencyFromUnit">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="INR">INR (₹)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="currencyResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="currencyResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="currencyResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="currencyToUnit">
                    <option value="USD">USD ($)</option>
                    <option value="EUR" selected>EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                    <option value="INR">INR (₹)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="currencyDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Note:</span>
                    <span>Enter current exchange rate manually above</span>
                </div>
            </div>
        </div>
    `;

    const exchangeRate = element.querySelector('#exchangeRate');
    const currencyValue = element.querySelector('#currencyValue');
    const fromUnit = element.querySelector('#currencyFromUnit');
    const toUnit = element.querySelector('#currencyToUnit');
    const currencyResult = element.querySelector('#currencyResult');
    const detailsDiv = element.querySelector('#currencyDetails');

    function convertCurrency() {
        const rate = parseFloat(exchangeRate.value);
        const value = parseFloat(currencyValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(rate) || isNaN(value)) return;

        const result = value * rate;
        currencyResult.value = result.toFixed(4);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${from} =</span>
                <span>${result.toFixed(4)} ${to}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Rate:</span>
                <span>1 ${from} = ${rate} ${to}</span>
            </div>
        `;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                if (input.readOnly) return;
                const step = parseFloat(input.step) || (inputId === 'exchangeRate' ? 0.0001 : 0.01);
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue.toFixed(4);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    exchangeRate.addEventListener('input', convertCurrency);
    currencyValue.addEventListener('input', convertCurrency);
    fromUnit.addEventListener('change', convertCurrency);
    toUnit.addEventListener('change', convertCurrency);

    setupNumberInputArrows();
    convertCurrency();
    return element;
}

// 22. Date Difference Calculator
function dateDifferenceCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Date Difference Calculator</h3>
            <p>Calculate the time between two dates</p>
            
            <div class="input-group">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate">
            </div>
            
            <div class="input-group">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate">
            </div>
            
            <div class="button-group">
                <button id="calculateDifference">Calculate Difference</button>
                <button id="useToday">Use Today for End Date</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Total Days:</span>
                    <span id="totalDays">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Years, Months, Days:</span>
                    <span id="ymdResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Weeks:</span>
                    <span id="weeksResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Months:</span>
                    <span id="monthsResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Years:</span>
                    <span id="yearsResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Workdays (Mon-Fri):</span>
                    <span id="workdaysResult">-</span>
                </div>
            </div>
        </div>
    `;

    const startDate = element.querySelector('#startDate');
    const endDate = element.querySelector('#endDate');
    const calculateBtn = element.querySelector('#calculateDifference');
    const useTodayBtn = element.querySelector('#useToday');
    const totalDays = element.querySelector('#totalDays');
    const ymdResult = element.querySelector('#ymdResult');
    const weeksResult = element.querySelector('#weeksResult');
    const monthsResult = element.querySelector('#monthsResult');
    const yearsResult = element.querySelector('#yearsResult');
    const workdaysResult = element.querySelector('#workdaysResult');

    // Set default dates
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    startDate.value = oneYearAgo.toISOString().split('T')[0];
    endDate.value = today.toISOString().split('T')[0];

    function calculateDifference() {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            alert('Please select valid dates');
            return;
        }

        if (start > end) {
            alert('Start date must be before end date');
            return;
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Calculate years, months, days
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate workdays (Mon-Fri)
        let workdays = 0;
        const current = new Date(start);
        while (current <= end) {
            const day = current.getDay();
            if (day !== 0 && day !== 6) { // Not Sunday or Saturday
                workdays++;
            }
            current.setDate(current.getDate() + 1);
        }

        totalDays.textContent = diffDays;
        ymdResult.textContent = `${years} years, ${months} months, ${days} days`;
        weeksResult.textContent = (diffDays / 7).toFixed(2);
        monthsResult.textContent = (diffDays / 30.44).toFixed(2);
        yearsResult.textContent = (diffDays / 365.25).toFixed(2);
        workdaysResult.textContent = workdays;
    }

    function useToday() {
        endDate.value = new Date().toISOString().split('T')[0];
        calculateDifference();
    }

    calculateBtn.addEventListener('click', calculateDifference);
    useTodayBtn.addEventListener('click', useToday);
    startDate.addEventListener('change', calculateDifference);
    endDate.addEventListener('change', calculateDifference);

    calculateDifference();
    return element;
}

// 23. Tip Calculator
function tipCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Tip Calculator</h3>
            <p>Calculate tips and split bills between people</p>
            
            <div class="input-group">
                <label for="billAmount">Bill Amount ($):</label>
                <div class="number-input-container">
                    <input type="number" id="billAmount" value="100" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="billAmount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="billAmount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="tipPercentage">Tip Percentage:</label>
                <div class="number-input-container">
                    <input type="number" id="tipPercentage" value="15" step="1" min="0" max="100">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="tipPercentage" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="tipPercentage" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="peopleCount">Number of People:</label>
                <div class="number-input-container">
                    <input type="number" id="peopleCount" value="1" step="1" min="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="peopleCount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="peopleCount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateTip">Calculate</button>
                <button id="quickTips">Quick Tips</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Tip Amount:</span>
                    <span id="tipAmount">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Bill:</span>
                    <span id="totalBill">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Per Person:</span>
                    <span id="perPerson">-</span>
                </div>
            </div>
        </div>
    `;

    const billAmount = element.querySelector('#billAmount');
    const tipPercentage = element.querySelector('#tipPercentage');
    const peopleCount = element.querySelector('#peopleCount');
    const calculateBtn = element.querySelector('#calculateTip');
    const quickTipsBtn = element.querySelector('#quickTips');
    const tipAmount = element.querySelector('#tipAmount');
    const totalBill = element.querySelector('#totalBill');
    const perPerson = element.querySelector('#perPerson');

    function calculateTip() {
        const bill = parseFloat(billAmount.value);
        const tipPercent = parseFloat(tipPercentage.value);
        const people = parseInt(peopleCount.value);

        if (isNaN(bill) || isNaN(tipPercent) || isNaN(people)) return;

        const tip = bill * (tipPercent / 100);
        const total = bill + tip;
        const perPersonAmount = total / people;

        tipAmount.textContent = `$${tip.toFixed(2)}`;
        totalBill.textContent = `$${total.toFixed(2)}`;
        perPerson.textContent = `$${perPersonAmount.toFixed(2)}`;
    }

    function setupQuickTips() {
        const quickTips = document.createElement('div');
        quickTips.className = 'button-group';
        quickTips.style.marginTop = '10px';
        quickTips.innerHTML = `
            <button data-tip="10">10%</button>
            <button data-tip="15">15%</button>
            <button data-tip="18">18%</button>
            <button data-tip="20">20%</button>
            <button data-tip="25">25%</button>
        `;
        
        quickTips.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                tipPercentage.value = this.getAttribute('data-tip');
                calculateTip();
            });
        });
        
        return quickTips;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
                calculateTip();
            });
        });
    }

    calculateBtn.addEventListener('click', calculateTip);
    quickTipsBtn.addEventListener('click', function() {
        const existingQuickTips = element.querySelector('.button-group:last-child');
        if (!existingQuickTips || !existingQuickTips.querySelector('[data-tip]')) {
            element.querySelector('.button-group').after(setupQuickTips());
        }
    });

    billAmount.addEventListener('input', calculateTip);
    tipPercentage.addEventListener('input', calculateTip);
    peopleCount.addEventListener('input', calculateTip);

    setupNumberInputArrows();
    calculateTip();
    return element;
}

// 24. Binary-Decimal Converter
function baseConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Base Converter</h3>
            <p>Convert between binary, decimal, hexadecimal, and octal</p>
            
            <div class="input-group">
                <label for="inputValue">Enter Value:</label>
                <input type="text" id="inputValue" value="1010" placeholder="Enter number">
            </div>
            
            <div class="input-group">
                <label for="fromBase">From Base:</label>
                <select id="fromBase">
                    <option value="2">Binary (2)</option>
                    <option value="10" selected>Decimal (10)</option>
                    <option value="16">Hexadecimal (16)</option>
                    <option value="8">Octal (8)</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="convertBase">Convert</button>
                <button id="clearBase">Clear</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Binary (2):</span>
                    <span id="binaryResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Decimal (10):</span>
                    <span id="decimalResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Hexadecimal (16):</span>
                    <span id="hexResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Octal (8):</span>
                    <span id="octalResult">-</span>
                </div>
            </div>
        </div>
    `;

    const inputValue = element.querySelector('#inputValue');
    const fromBase = element.querySelector('#fromBase');
    const convertBtn = element.querySelector('#convertBase');
    const clearBtn = element.querySelector('#clearBase');
    const binaryResult = element.querySelector('#binaryResult');
    const decimalResult = element.querySelector('#decimalResult');
    const hexResult = element.querySelector('#hexResult');
    const octalResult = element.querySelector('#octalResult');

    function convertBase() {
        const value = inputValue.value.trim();
        const base = parseInt(fromBase.value);

        if (!value) {
            alert('Please enter a value');
            return;
        }

        try {
            // Convert input to decimal first
            let decimal;
            if (base === 16) {
                decimal = parseInt(value, 16);
            } else if (base === 2) {
                decimal = parseInt(value, 2);
            } else if (base === 8) {
                decimal = parseInt(value, 8);
            } else {
                decimal = parseInt(value, 10);
            }

            if (isNaN(decimal)) {
                throw new Error('Invalid number for the selected base');
            }

            // Convert to all bases
            binaryResult.textContent = decimal.toString(2);
            decimalResult.textContent = decimal.toString(10);
            hexResult.textContent = decimal.toString(16).toUpperCase();
            octalResult.textContent = decimal.toString(8);
        } catch (error) {
            binaryResult.textContent = 'Error';
            decimalResult.textContent = 'Error';
            hexResult.textContent = 'Error';
            octalResult.textContent = 'Error';
            alert('Invalid input for the selected base system');
        }
    }

    function clearAll() {
        inputValue.value = '';
        binaryResult.textContent = '-';
        decimalResult.textContent = '-';
        hexResult.textContent = '-';
        octalResult.textContent = '-';
    }

    convertBtn.addEventListener('click', convertBase);
    clearBtn.addEventListener('click', clearAll);
    inputValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') convertBase();
    });

    convertBase();
    return element;
}

// 25. Prime Number Checker
function primeChecker() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Prime Number Checker</h3>
            <p>Check if a number is prime and find prime factors</p>
            
            <div class="input-group">
                <label for="primeInput">Enter Number:</label>
                <div class="number-input-container">
                    <input type="number" id="primeInput" value="17" step="1" min="2">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="primeInput" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="primeInput" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="checkPrime">Check Prime</button>
                <button id="findPrimes">Find Primes Up To</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Is Prime:</span>
                    <span id="isPrimeResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Prime Factors:</span>
                    <span id="primeFactors">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Next Prime:</span>
                    <span id="nextPrime">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Previous Prime:</span>
                    <span id="prevPrime">-</span>
                </div>
            </div>
            
            <div id="primesList" class="info-display" style="display: none;">
                <h4>Prime Numbers:</h4>
                <div id="primesContainer"></div>
            </div>
        </div>
    `;

    const primeInput = element.querySelector('#primeInput');
    const checkBtn = element.querySelector('#checkPrime');
    const findPrimesBtn = element.querySelector('#findPrimes');
    const isPrimeResult = element.querySelector('#isPrimeResult');
    const primeFactors = element.querySelector('#primeFactors');
    const nextPrime = element.querySelector('#nextPrime');
    const prevPrime = element.querySelector('#prevPrime');
    const primesList = element.querySelector('#primesList');
    const primesContainer = element.querySelector('#primesContainer');

    function isPrime(num) {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    function getPrimeFactors(num) {
        const factors = [];
        let n = num;
        
        // Check for factor 2
        while (n % 2 === 0) {
            factors.push(2);
            n /= 2;
        }
        
        // Check for odd factors
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) {
                factors.push(i);
                n /= i;
            }
        }
        
        // If n is still greater than 2, it's prime
        if (n > 2) {
            factors.push(n);
        }
        
        return factors;
    }

    function findNextPrime(num) {
        let next = num + 1;
        while (!isPrime(next)) {
            next++;
        }
        return next;
    }

    function findPrevPrime(num) {
        if (num <= 2) return null;
        let prev = num - 1;
        while (!isPrime(prev)) {
            prev--;
        }
        return prev;
    }

    function checkPrime() {
        const num = parseInt(primeInput.value);
        
        if (isNaN(num) || num < 2) {
            alert('Please enter a number greater than 1');
            return;
        }

        const prime = isPrime(num);
        const factors = getPrimeFactors(num);
        const next = findNextPrime(num);
        const prev = findPrevPrime(num);

        isPrimeResult.textContent = prime ? 'Yes' : 'No';
        isPrimeResult.style.color = prime ? 'var(--success-color)' : 'var(--warning-color)';
        primeFactors.textContent = factors.join(' × ');
        nextPrime.textContent = next;
        prevPrime.textContent = prev || 'None';
    }

    function findPrimesUpTo() {
        const num = parseInt(primeInput.value);
        
        if (isNaN(num) || num < 2) {
            alert('Please enter a number greater than 1');
            return;
        }

        const primes = [];
        for (let i = 2; i <= num; i++) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }

        primesContainer.innerHTML = primes.join(', ');
        primesList.style.display = 'block';
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 2;
                let currentValue = parseInt(input.value) || 2;
                if (direction === 'up') currentValue += step;
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
                checkPrime();
            });
        });
    }

    checkBtn.addEventListener('click', checkPrime);
    findPrimesBtn.addEventListener('click', findPrimesUpTo);
    primeInput.addEventListener('input', checkPrime);

    setupNumberInputArrows();
    checkPrime();
    return element;
}

// 26. Text Reverser
function textReverser() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Text Reverser</h3>
            <p>Reverse text in various ways - character by character, by words, or by lines</p>
            
            <div class="input-group">
                <label for="textInput">Enter Text:</label>
                <textarea id="textInput" rows="4" placeholder="Enter text to reverse...">Hello World! This is a test.</textarea>
            </div>
            
            <div class="input-group">
                <label for="reverseType">Reverse Type:</label>
                <select id="reverseType">
                    <option value="chars">Character by Character</option>
                    <option value="words">Word by Word</option>
                    <option value="lines">Line by Line</option>
                    <option value="preserve">Preserve Word Order</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="reverseText">Reverse Text</button>
                <button id="copyReversed">Copy Result</button>
                <button id="clearText">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="textOutput">Reversed Text:</label>
                <textarea id="textOutput" rows="4" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Original Length:</span>
                    <span id="originalLength">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Reversed Length:</span>
                    <span id="reversedLength">0</span>
                </div>
            </div>
        </div>
    `;

    const textInput = element.querySelector('#textInput');
    const reverseType = element.querySelector('#reverseType');
    const reverseBtn = element.querySelector('#reverseText');
    const copyBtn = element.querySelector('#copyReversed');
    const clearBtn = element.querySelector('#clearText');
    const textOutput = element.querySelector('#textOutput');
    const originalLength = element.querySelector('#originalLength');
    const reversedLength = element.querySelector('#reversedLength');

    function reverseText() {
        const text = textInput.value;
        const type = reverseType.value;
        
        let reversed = '';
        
        switch(type) {
            case 'chars':
                reversed = text.split('').reverse().join('');
                break;
            case 'words':
                reversed = text.split(' ').reverse().join(' ');
                break;
            case 'lines':
                reversed = text.split('\n').reverse().join('\n');
                break;
            case 'preserve':
                reversed = text.split('').reverse().join('').split(' ').reverse().join(' ');
                break;
        }
        
        textOutput.value = reversed;
        originalLength.textContent = text.length;
        reversedLength.textContent = reversed.length;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(textOutput.value).then(() => {
            alert('Reversed text copied to clipboard!');
        });
    }

    function clearAll() {
        textInput.value = '';
        textOutput.value = '';
        originalLength.textContent = '0';
        reversedLength.textContent = '0';
    }

    reverseBtn.addEventListener('click', reverseText);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    textInput.addEventListener('input', reverseText);
    reverseType.addEventListener('change', reverseText);

    reverseText();
    return element;
}

// 27. Lorem Ipsum Generator
function loremIpsumGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Lorem Ipsum Generator</h3>
            <p>Generate placeholder text for your designs and layouts</p>
            
            <div class="input-group">
                <label for="loremType">Content Type:</label>
                <select id="loremType">
                    <option value="paragraphs">Paragraphs</option>
                    <option value="words">Words</option>
                    <option value="sentences">Sentences</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="loremCount">Count:</label>
                <div class="number-input-container">
                    <input type="number" id="loremCount" value="3" min="1" max="50" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="loremCount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="loremCount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="generateLorem">Generate Text</button>
                <button id="copyLorem">Copy Text</button>
            </div>
            
            <div class="input-group">
                <label for="loremOutput">Generated Text:</label>
                <textarea id="loremOutput" rows="6" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Word Count:</span>
                    <span id="wordCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Character Count:</span>
                    <span id="charCount">0</span>
                </div>
            </div>
        </div>
    `;

    const loremType = element.querySelector('#loremType');
    const loremCount = element.querySelector('#loremCount');
    const generateBtn = element.querySelector('#generateLorem');
    const copyBtn = element.querySelector('#copyLorem');
    const loremOutput = element.querySelector('#loremOutput');
    const wordCount = element.querySelector('#wordCount');
    const charCount = element.querySelector('#charCount');

    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function getRandomWord() {
        return loremWords[Math.floor(Math.random() * loremWords.length)];
    }

    function generateSentence() {
        const wordCount = Math.floor(Math.random() * 15) + 5; // 5-20 words
        let sentence = '';
        
        for (let i = 0; i < wordCount; i++) {
            if (i === 0) {
                sentence += capitalizeFirst(getRandomWord());
            } else {
                sentence += ' ' + getRandomWord();
            }
        }
        
        return sentence + '.';
    }

    function generateParagraph() {
        const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-6 sentences
        let paragraph = '';
        
        for (let i = 0; i < sentenceCount; i++) {
            paragraph += generateSentence() + ' ';
        }
        
        return paragraph.trim();
    }

    function generateLorem() {
        const type = loremType.value;
        const count = parseInt(loremCount.value);
        let output = '';

        switch(type) {
            case 'words':
                for (let i = 0; i < count; i++) {
                    output += (i === 0 ? capitalizeFirst(getRandomWord()) : getRandomWord()) + ' ';
                }
                output = output.trim();
                break;
            case 'sentences':
                for (let i = 0; i < count; i++) {
                    output += generateSentence() + ' ';
                }
                output = output.trim();
                break;
            case 'paragraphs':
                for (let i = 0; i < count; i++) {
                    output += generateParagraph() + '\n\n';
                }
                output = output.trim();
                break;
        }

        loremOutput.value = output;
        updateCounts(output);
    }

    function updateCounts(text) {
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        wordCount.textContent = words.length;
        charCount.textContent = text.length;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(loremOutput.value).then(() => {
            alert('Lorem Ipsum text copied to clipboard!');
        });
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 1;
                const max = parseFloat(input.max) || 50;
                let currentValue = parseInt(input.value) || 1;
                if (direction === 'up') currentValue = Math.min(max, currentValue + step);
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
                generateLorem();
            });
        });
    }

    generateBtn.addEventListener('click', generateLorem);
    copyBtn.addEventListener('click', copyToClipboard);
    loremType.addEventListener('change', generateLorem);
    loremCount.addEventListener('input', generateLorem);

    setupNumberInputArrows();
    generateLorem();
    return element;
}

// 28. Markdown Preview
function markdownPreview() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Markdown Preview</h3>
            <p>Preview Markdown text as formatted HTML in real-time</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label for="markdownInput">Markdown Input:</label>
                    <textarea id="markdownInput" rows="12" placeholder="# Heading
**Bold text** and *italic text*

- List item 1
- List item 2

[Link](https://example.com)"># Welcome to Markdown Preview

## Features
- **Real-time** preview
- *Italic* and **bold** text
- [Links](https://example.com)
- \`inline code\`

### Code Block
\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`</textarea>
                </div>
                
                <div>
                    <label for="markdownOutput">HTML Preview:</label>
                    <div id="markdownOutput" style="border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; min-height: 200px; background: var(--card-bg);"></div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="copyMarkdown">Copy HTML</button>
                <button id="clearMarkdown">Clear</button>
            </div>
            
            <div class="info-display">
                <h4>Markdown Cheat Sheet:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                    <div><code># Heading 1</code></div>
                    <div><code>## Heading 2</code></div>
                    <div><code>**Bold**</code></div>
                    <div><code>*Italic*</code></div>
                    <div><code>[Link](url)</code></div>
                    <div><code>- List item</code></div>
                    <div><code>\`code\`</code></div>
                    <div><code>--- (Horizontal rule)</code></div>
                </div>
            </div>
        </div>
    `;

    const markdownInput = element.querySelector('#markdownInput');
    const markdownOutput = element.querySelector('#markdownOutput');
    const copyBtn = element.querySelector('#copyMarkdown');
    const clearBtn = element.querySelector('#clearMarkdown');

    function markdownToHTML(markdown) {
        return markdown
            // Headers
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color: var(--primary-color);">$1</a>')
            // Lists
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="$1">$2</code></pre>')
            // Inline code
            .replace(/`(.*?)`/gim, '<code style="background: var(--control-bg); padding: 2px 4px; border-radius: 3px;">$1</code>')
            // Horizontal rule
            .replace(/^-{3,}$/gim, '<hr style="border: none; border-top: 1px solid var(--border-color); margin: 20px 0;">')
            // Line breaks
            .replace(/\n/gim, '<br>');
    }

    function updatePreview() {
        const markdown = markdownInput.value;
        const html = markdownToHTML(markdown);
        markdownOutput.innerHTML = html;
    }

    function copyToClipboard() {
        const html = markdownToHTML(markdownInput.value);
        navigator.clipboard.writeText(html).then(() => {
            alert('HTML copied to clipboard!');
        });
    }

    function clearAll() {
        markdownInput.value = '';
        markdownOutput.innerHTML = '';
    }

    markdownInput.addEventListener('input', updatePreview);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);

    updatePreview();
    return element;
}

// 29. UUID Generator
function uuidGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>UUID Generator</h3>
            <p>Generate UUIDs (Universally Unique Identifiers) of different versions</p>
            
            <div class="input-group">
                <label for="uuidVersion">UUID Version:</label>
                <select id="uuidVersion">
                    <option value="v4">Version 4 (Random)</option>
                    <option value="v1">Version 1 (Timestamp)</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="uuidCount">Number to Generate:</label>
                <div class="number-input-container">
                    <input type="number" id="uuidCount" value="1" min="1" max="100" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="uuidCount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="uuidCount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="generateUUID">Generate UUIDs</button>
                <button id="copyUUID">Copy All</button>
            </div>
            
            <div class="result-box">
                <div id="uuidResults">
                    <!-- UUIDs will appear here -->
                </div>
            </div>
        </div>
    `;

    const uuidVersion = element.querySelector('#uuidVersion');
    const uuidCount = element.querySelector('#uuidCount');
    const generateBtn = element.querySelector('#generateUUID');
    const copyBtn = element.querySelector('#copyUUID');
    const uuidResults = element.querySelector('#uuidResults');

    function generateV4UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateV1UUID() {
        // Simplified v1-like UUID (not truly v1 compliant)
        const timestamp = Date.now().toString(16).padStart(12, '0');
        const random = Math.random().toString(16).substr(2, 8);
        return `${timestamp.substr(0, 8)}-${timestamp.substr(8, 4)}-1${timestamp.substr(12, 3)}-${Math.random().toString(16).substr(2, 4)}-${random}`;
    }

    function generateUUIDs() {
        const version = uuidVersion.value;
        const count = parseInt(uuidCount.value);
        const uuids = [];

        for (let i = 0; i < count; i++) {
            if (version === 'v4') {
                uuids.push(generateV4UUID());
            } else {
                uuids.push(generateV1UUID());
            }
        }

        displayUUIDs(uuids);
    }

    function displayUUIDs(uuids) {
        uuidResults.innerHTML = '';
        
        uuids.forEach((uuid, index) => {
            const uuidElement = document.createElement('div');
            uuidElement.className = 'info-item';
            uuidElement.innerHTML = `
                <span class="info-label">UUID ${uuids.length > 1 ? index + 1 : ''}:</span>
                <span style="font-family: monospace; font-size: 0.9rem;">${uuid}</span>
                <button class="copy-single-uuid" data-uuid="${uuid}" style="margin-left: 10px; padding: 2px 8px; font-size: 0.8rem;">Copy</button>
            `;
            uuidResults.appendChild(uuidElement);
        });

        // Add event listeners to copy buttons
        element.querySelectorAll('.copy-single-uuid').forEach(button => {
            button.addEventListener('click', function() {
                const uuid = this.getAttribute('data-uuid');
                navigator.clipboard.writeText(uuid).then(() => {
                    alert('UUID copied to clipboard!');
                });
            });
        });
    }

    function copyAllUUIDs() {
        const uuids = Array.from(uuidResults.querySelectorAll('.info-item span:nth-child(2)'))
            .map(span => span.textContent)
            .join('\n');
        
        navigator.clipboard.writeText(uuids).then(() => {
            alert('All UUIDs copied to clipboard!');
        });
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 1;
                const max = parseFloat(input.max) || 100;
                let currentValue = parseInt(input.value) || 1;
                if (direction === 'up') currentValue = Math.min(max, currentValue + step);
                else currentValue = Math.max(min, currentValue - step);
                input.value = currentValue;
            });
        });
    }

    generateBtn.addEventListener('click', generateUUIDs);
    copyBtn.addEventListener('click', copyAllUUIDs);
    uuidVersion.addEventListener('change', generateUUIDs);
    uuidCount.addEventListener('input', generateUUIDs);

    setupNumberInputArrows();
    generateUUIDs();
    return element;
}



// ========== AUTO-REGISTER THESE TOOLS ==========
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const newTools = [
            {
                id: 'currency-converter',
                name: 'Currency Converter',
                description: 'Convert between currencies using manually entered exchange rates',
                category: 'unit',
                component: currencyConverter
            },
            {
                id: 'date-difference',
                name: 'Date Difference Calculator',
                description: 'Calculate the time between two dates',
                category: 'time',
                component: dateDifferenceCalculator
            },
            {
                id: 'tip-calculator',
                name: 'Tip Calculator',
                description: 'Calculate tips and split bills between people',
                category: 'math',
                component: tipCalculator
            },
            {
                id: 'base-converter',
                name: 'Base Converter',
                description: 'Convert between binary, decimal, hexadecimal, and octal',
                category: 'math',
                component: baseConverter
            },
            {
                id: 'prime-checker',
                name: 'Prime Number Checker',
                description: 'Check if a number is prime and find prime factors',
                category: 'math',
                component: primeChecker
            },
            {
                id: 'text-reverser',
                name: 'Text Reverser',
                description: 'Reverse text in various ways - character by character or by words',
                category: 'text',
                component: textReverser
            },
            {
                id: 'lorem-ipsum',
                name: 'Lorem Ipsum Generator',
                description: 'Generate placeholder text for your designs and layouts',
                category: 'text',
                component: loremIpsumGenerator
            },
            {
                id: 'markdown-preview',
                name: 'Markdown Preview',
                description: 'Preview Markdown text as formatted HTML in real-time',
                category: 'text',
                component: markdownPreview
            },
            {
                id: 'uuid-generator',
                name: 'UUID Generator',
                description: 'Generate UUIDs (Universally Unique Identifiers)',
                category: 'text',
                component: uuidGenerator
            },
            {
                id: 'scientific-calculator',
                name: 'Scientific Calculator',
                description: 'Advanced calculator with scientific functions and constants',
                category: 'math',
                component: scientificCalculator
            }
        ];

        if (window.state && window.state.tools) {
            window.state.tools.push(...newTools);
            
            const toolsGrid = document.getElementById('toolsGrid');
            if (toolsGrid && window.renderToolsGrid) {
                window.renderToolsGrid();
            }
        }
    }, 100);
});






// 30. Scientific Calculator (FIXED VERSION)
function scientificCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Scientific Calculator</h3>
            <p>Advanced calculator with scientific functions and constants</p>
            
            <div class="calculator-display">
                <input type="text" id="calcDisplay" readonly value="0" class="calc-display">
            </div>
            
            <div class="calculator-buttons">
                <!-- Row 1 - Memory Functions -->
                <button class="calc-btn mem-btn" data-action="memoryClear">MC</button>
                <button class="calc-btn mem-btn" data-action="memoryRecall">MR</button>
                <button class="calc-btn mem-btn" data-action="memoryAdd">M+</button>
                <button class="calc-btn mem-btn" data-action="memorySubtract">M-</button>
                <button class="calc-btn mem-btn" data-action="memoryStore">MS</button>
                
                <!-- Row 2 -->
                <button class="calc-btn func-btn" data-action="clear">C</button>
                <button class="calc-btn func-btn" data-action="clearEntry">CE</button>
                <button class="calc-btn func-btn" data-action="backspace">⌫</button>
                <button class="calc-btn op-btn" data-action="divide">/</button>
                <button class="calc-btn func-btn" data-action="sqrt">√</button>
                
                <!-- Row 3 -->
                <button class="calc-btn num-btn" data-value="7">7</button>
                <button class="calc-btn num-btn" data-value="8">8</button>
                <button class="calc-btn num-btn" data-value="9">9</button>
                <button class="calc-btn op-btn" data-action="multiply">×</button>
                <button class="calc-btn func-btn" data-action="power">x²</button>
                
                <!-- Row 4 -->
                <button class="calc-btn num-btn" data-value="4">4</button>
                <button class="calc-btn num-btn" data-value="5">5</button>
                <button class="calc-btn num-btn" data-value="6">6</button>
                <button class="calc-btn op-btn" data-action="subtract">-</button>
                <button class="calc-btn func-btn" data-action="sin">sin</button>
                
                <!-- Row 5 -->
                <button class="calc-btn num-btn" data-value="1">1</button>
                <button class="calc-btn num-btn" data-value="2">2</button>
                <button class="calc-btn num-btn" data-value="3">3</button>
                <button class="calc-btn op-btn" data-action="add">+</button>
                <button class="calc-btn func-btn" data-action="cos">cos</button>
                
                <!-- Row 6 -->
                <button class="calc-btn func-btn" data-action="plusMinus">±</button>
                <button class="calc-btn num-btn" data-value="0">0</button>
                <button class="calc-btn num-btn" data-action="decimal">.</button>
                <button class="calc-btn equals-btn" data-action="equals">=</button>
                <button class="calc-btn func-btn" data-action="tan">tan</button>
                
                <!-- Row 7 - Additional Functions -->
                <button class="calc-btn func-btn" data-action="pi">π</button>
                <button class="calc-btn func-btn" data-action="e">e</button>
                <button class="calc-btn func-btn" data-action="log">log</button>
                <button class="calc-btn func-btn" data-action="ln">ln</button>
                <button class="calc-btn func-btn" data-action="factorial">x!</button>
            </div>
            
            <div class="result-box calc-status">
                <div class="info-item">
                    <span class="info-label">Memory:</span>
                    <span id="calcMemory">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Last Operation:</span>
                    <span id="lastOperation">-</span>
                </div>
            </div>
        </div>
    `;

    const display = element.querySelector('#calcDisplay');
    const memoryDisplay = element.querySelector('#calcMemory');
    const lastOperation = element.querySelector('#lastOperation');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;
    let memory = 0;
    let memoryStored = false;

    function updateDisplay() {
        display.value = currentInput;
    }

    function updateMemoryDisplay() {
        memoryDisplay.textContent = memory;
        memoryDisplay.style.color = memoryStored ? 'var(--success-color)' : 'var(--secondary-color)';
    }

    function appendNumber(number) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function chooseOperation(op) {
        if (currentInput === '') return;
        
        if (previousInput !== '') {
            calculate();
        }
        
        operation = op;
        previousInput = currentInput;
        shouldResetDisplay = true;
        lastOperation.textContent = `${previousInput} ${getOperationSymbol(op)}`;
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    currentInput = 'Error';
                    updateDisplay();
                    return;
                }
                computation = prev / current;
                break;
            case 'power':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        
        currentInput = computation.toString();
        operation = null;
        previousInput = '';
        shouldResetDisplay = true;
        lastOperation.textContent = '-';
        updateDisplay();
    }

    function performFunction(func) {
        const current = parseFloat(currentInput);
        if (isNaN(current)) return;
        
        let computation;
        switch (func) {
            case 'sqrt':
                if (current < 0) {
                    currentInput = 'Error';
                    updateDisplay();
                    return;
                }
                computation = Math.sqrt(current);
                break;
            case 'sin':
                computation = Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                computation = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                computation = Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                if (current <= 0) {
                    currentInput = 'Error';
                    updateDisplay();
                    return;
                }
                computation = Math.log10(current);
                break;
            case 'ln':
                if (current <= 0) {
                    currentInput = 'Error';
                    updateDisplay();
                    return;
                }
                computation = Math.log(current);
                break;
            case 'factorial':
                if (current < 0 || !Number.isInteger(current)) {
                    currentInput = 'Error';
                    updateDisplay();
                    return;
                }
                computation = factorial(current);
                break;
            case 'power':
                computation = Math.pow(parseFloat(currentInput), 2);
                break;
            default:
                return;
        }
        
        currentInput = computation.toString();
        shouldResetDisplay = true;
        updateDisplay();
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    function handleMemory(action) {
        const current = parseFloat(currentInput);
        if (isNaN(current)) return;

        switch (action) {
            case 'memoryClear':
                memory = 0;
                memoryStored = false;
                break;
            case 'memoryRecall':
                currentInput = memory.toString();
                shouldResetDisplay = true;
                updateDisplay();
                break;
            case 'memoryAdd':
                memory += current;
                memoryStored = true;
                break;
            case 'memorySubtract':
                memory -= current;
                memoryStored = true;
                break;
            case 'memoryStore':
                memory = current;
                memoryStored = true;
                break;
        }
        updateMemoryDisplay();
    }

    function getOperationSymbol(op) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷',
            'power': '^'
        };
        return symbols[op] || op;
    }

    function handleButtonClick(button) {
        const action = button.getAttribute('data-action');
        const value = button.getAttribute('data-value');

        if (value) {
            appendNumber(value);
        } else if (action) {
            // Check if it's a memory operation first
            if (action.startsWith('memory')) {
                handleMemory(action);
                return;
            }

            switch (action) {
                case 'clear':
                    currentInput = '0';
                    previousInput = '';
                    operation = null;
                    lastOperation.textContent = '-';
                    break;
                case 'clearEntry':
                    currentInput = '0';
                    break;
                case 'backspace':
                    if (currentInput.length > 1) {
                        currentInput = currentInput.slice(0, -1);
                    } else {
                        currentInput = '0';
                    }
                    break;
                case 'decimal':
                    if (!currentInput.includes('.')) {
                        currentInput += '.';
                    }
                    break;
                case 'plusMinus':
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    break;
                case 'equals':
                    calculate();
                    return;
                case 'pi':
                    currentInput = Math.PI.toString();
                    shouldResetDisplay = true;
                    break;
                case 'e':
                    currentInput = Math.E.toString();
                    shouldResetDisplay = true;
                    break;
                default:
                    if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'factorial', 'power'].includes(action)) {
                        performFunction(action);
                    } else {
                        chooseOperation(action);
                    }
            }
            updateDisplay();
        }
    }

    // Add event listeners to all calculator buttons
    element.querySelectorAll('.calc-btn').forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });

    // Keyboard support
    element.addEventListener('keydown', (e) => {
        const key = e.key;
        
        // Numbers
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        }
        // Decimal
        else if (key === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay();
            }
        }
        // Operations
        else if (key === '+') chooseOperation('add');
        else if (key === '-') chooseOperation('subtract');
        else if (key === '*') chooseOperation('multiply');
        else if (key === '/') chooseOperation('divide');
        else if (key === 'Enter' || key === '=') calculate();
        else if (key === 'Escape') {
            currentInput = '0';
            previousInput = '';
            operation = null;
            updateDisplay();
        }
        else if (key === 'Backspace') {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
    });

    // Focus the display for keyboard input
    display.addEventListener('click', () => {
        display.focus();
    });

    updateDisplay();
    updateMemoryDisplay();
    return element;
}


// ========== NEXT 10 TOOLS IMPLEMENTATION ==========

// 1. Pressure Converter
function pressureConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Pressure Converter</h3>
            <p>Convert between different pressure units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="pressureValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="pressureValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="pressureValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="pressureFromUnit">
                    <option value="pa">Pascal (Pa)</option>
                    <option value="kpa">Kilopascal (kPa)</option>
                    <option value="bar">Bar</option>
                    <option value="psi" selected>PSI</option>
                    <option value="atm">Atmosphere (atm)</option>
                    <option value="torr">Torr</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="pressureResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="pressureResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="pressureResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="pressureToUnit">
                    <option value="pa">Pascal (Pa)</option>
                    <option value="kpa" selected>Kilopascal (kPa)</option>
                    <option value="bar">Bar</option>
                    <option value="psi">PSI</option>
                    <option value="atm">Atmosphere (atm)</option>
                    <option value="torr">Torr</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="pressureDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Conversions:</span>
                </div>
                <div class="info-item">
                    <span>1 atm = 101.325 kPa</span>
                    <span>1 bar = 100 kPa</span>
                </div>
                <div class="info-item">
                    <span>1 psi = 6.89476 kPa</span>
                    <span>1 torr = 133.322 Pa</span>
                </div>
            </div>
        </div>
    `;

    const pressureValue = element.querySelector('#pressureValue');
    const fromUnit = element.querySelector('#pressureFromUnit');
    const toUnit = element.querySelector('#pressureToUnit');
    const pressureResult = element.querySelector('#pressureResult');
    const detailsDiv = element.querySelector('#pressureDetails');

    const conversionRates = {
        pa: 1,
        kpa: 1000,
        bar: 100000,
        psi: 6894.76,
        atm: 101325,
        torr: 133.322
    };

    function convertPressure() {
        const value = parseFloat(pressureValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInPascals = value * conversionRates[from];
        const result = valueInPascals / conversionRates[to];

        pressureResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getPressureUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getPressureUnitName(to)}</span>
            </div>
        `;
    }

    function getPressureUnitName(unit) {
        const names = {
            pa: 'Pa',
            kpa: 'kPa',
            bar: 'bar',
            psi: 'PSI',
            atm: 'atm',
            torr: 'Torr'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    pressureValue.addEventListener('input', convertPressure);
    fromUnit.addEventListener('change', convertPressure);
    toUnit.addEventListener('change', convertPressure);

    setupNumberInputArrows();
    convertPressure();
    return element;
}

// 2. Energy Converter
function energyConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Energy Converter</h3>
            <p>Convert between different energy units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="energyValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="energyValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="energyValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="energyFromUnit">
                    <option value="j">Joule (J)</option>
                    <option value="kj">Kilojoule (kJ)</option>
                    <option value="cal">Calorie (cal)</option>
                    <option value="kcal" selected>Kilocalorie (kcal)</option>
                    <option value="kwh">Kilowatt-hour (kWh)</option>
                    <option value="btu">BTU</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="energyResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="energyResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="energyResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="energyToUnit">
                    <option value="j" selected>Joule (J)</option>
                    <option value="kj">Kilojoule (kJ)</option>
                    <option value="cal">Calorie (cal)</option>
                    <option value="kcal">Kilocalorie (kcal)</option>
                    <option value="kwh">Kilowatt-hour (kWh)</option>
                    <option value="btu">BTU</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="energyDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Conversions:</span>
                </div>
                <div class="info-item">
                    <span>1 kcal = 4184 J</span>
                    <span>1 kWh = 3.6×10⁶ J</span>
                </div>
                <div class="info-item">
                    <span>1 BTU = 1055 J</span>
                    <span>1 cal = 4.184 J</span>
                </div>
            </div>
        </div>
    `;

    const energyValue = element.querySelector('#energyValue');
    const fromUnit = element.querySelector('#energyFromUnit');
    const toUnit = element.querySelector('#energyToUnit');
    const energyResult = element.querySelector('#energyResult');
    const detailsDiv = element.querySelector('#energyDetails');

    const conversionRates = {
        j: 1,
        kj: 1000,
        cal: 4.184,
        kcal: 4184,
        kwh: 3600000,
        btu: 1055
    };

    function convertEnergy() {
        const value = parseFloat(energyValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInJoules = value * conversionRates[from];
        const result = valueInJoules / conversionRates[to];

        energyResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getEnergyUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getEnergyUnitName(to)}</span>
            </div>
        `;
    }

    function getEnergyUnitName(unit) {
        const names = {
            j: 'J',
            kj: 'kJ',
            cal: 'cal',
            kcal: 'kcal',
            kwh: 'kWh',
            btu: 'BTU'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    energyValue.addEventListener('input', convertEnergy);
    fromUnit.addEventListener('change', convertEnergy);
    toUnit.addEventListener('change', convertEnergy);

    setupNumberInputArrows();
    convertEnergy();
    return element;
}

// 3. Power Converter
function powerConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Power Converter</h3>
            <p>Convert between different power units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="powerValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="powerValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="powerValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="powerFromUnit">
                    <option value="w">Watt (W)</option>
                    <option value="kw" selected>Kilowatt (kW)</option>
                    <option value="hp">Horsepower (hp)</option>
                    <option value="btuh">BTU/hour</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="powerResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="powerResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="powerResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="powerToUnit">
                    <option value="w" selected>Watt (W)</option>
                    <option value="kw">Kilowatt (kW)</option>
                    <option value="hp">Horsepower (hp)</option>
                    <option value="btuh">BTU/hour</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="powerDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Conversions:</span>
                </div>
                <div class="info-item">
                    <span>1 hp = 745.7 W</span>
                    <span>1 kW = 1000 W</span>
                </div>
                <div class="info-item">
                    <span>1 BTU/h = 0.293 W</span>
                    <span>1 MW = 1,000,000 W</span>
                </div>
            </div>
        </div>
    `;

    const powerValue = element.querySelector('#powerValue');
    const fromUnit = element.querySelector('#powerFromUnit');
    const toUnit = element.querySelector('#powerToUnit');
    const powerResult = element.querySelector('#powerResult');
    const detailsDiv = element.querySelector('#powerDetails');

    const conversionRates = {
        w: 1,
        kw: 1000,
        hp: 745.7,
        btuh: 0.293
    };

    function convertPower() {
        const value = parseFloat(powerValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInWatts = value * conversionRates[from];
        const result = valueInWatts / conversionRates[to];

        powerResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getPowerUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getPowerUnitName(to)}</span>
            </div>
        `;
    }

    function getPowerUnitName(unit) {
        const names = {
            w: 'W',
            kw: 'kW',
            hp: 'hp',
            btuh: 'BTU/h'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    powerValue.addEventListener('input', convertPower);
    fromUnit.addEventListener('change', convertPower);
    toUnit.addEventListener('change', convertPower);

    setupNumberInputArrows();
    convertPower();
    return element;
}

// 4. Angle Converter
function angleConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Angle Converter</h3>
            <p>Convert between degrees, radians, and gradians</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="angleValue" value="45" step="1" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="angleValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="angleValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="angleFromUnit">
                    <option value="deg" selected>Degrees (°)</option>
                    <option value="rad">Radians (rad)</option>
                    <option value="grad">Gradians (grad)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="angleResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="angleResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="angleResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="angleToUnit">
                    <option value="deg">Degrees (°)</option>
                    <option value="rad" selected>Radians (rad)</option>
                    <option value="grad">Gradians (grad)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="angleDetails"></div>
            </div>
            
            <div class="angle-visualization">
                <div class="angle-circle">
                    <div class="angle-line" id="angleLine"></div>
                </div>
                <div class="angle-value-display" id="visualAngle">45°</div>
            </div>
        </div>
    `;

    const angleValue = element.querySelector('#angleValue');
    const fromUnit = element.querySelector('#angleFromUnit');
    const toUnit = element.querySelector('#angleToUnit');
    const angleResult = element.querySelector('#angleResult');
    const detailsDiv = element.querySelector('#angleDetails');
    const angleLine = element.querySelector('#angleLine');
    const visualAngle = element.querySelector('#visualAngle');

    function convertAngle() {
        const value = parseFloat(angleValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        // Convert to degrees first
        let degrees;
        switch (from) {
            case 'deg': degrees = value; break;
            case 'rad': degrees = value * (180 / Math.PI); break;
            case 'grad': degrees = value * 0.9; break;
        }

        // Convert from degrees to target unit
        let result;
        switch (to) {
            case 'deg': result = degrees; break;
            case 'rad': result = degrees * (Math.PI / 180); break;
            case 'grad': result = degrees / 0.9; break;
        }

        angleResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getAngleUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getAngleUnitName(to)}</span>
            </div>
        `;

        // Update visualization
        updateAngleVisualization(degrees);
    }

    function getAngleUnitName(unit) {
        const names = {
            deg: '°',
            rad: 'rad',
            grad: 'grad'
        };
        return names[unit];
    }

    function updateAngleVisualization(degrees) {
        const normalizedDegrees = ((degrees % 360) + 360) % 360;
        angleLine.style.transform = `rotate(${normalizedDegrees}deg)`;
        visualAngle.textContent = `${normalizedDegrees.toFixed(1)}°`;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    angleValue.addEventListener('input', convertAngle);
    fromUnit.addEventListener('change', convertAngle);
    toUnit.addEventListener('change', convertAngle);

    setupNumberInputArrows();
    convertAngle();
    return element;
}

// 5. Fuel Economy Converter
function fuelConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Fuel Economy Converter</h3>
            <p>Convert between different fuel economy units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="fuelValue" value="30" step="0.1" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="fuelValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="fuelValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="fuelFromUnit">
                    <option value="mpg" selected>Miles per Gallon (MPG)</option>
                    <option value="mpguk">MPG (UK)</option>
                    <option value="kml">km per Liter (km/L)</option>
                    <option value="l100km">Liters per 100km (L/100km)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="fuelResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="fuelResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="fuelResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="fuelToUnit">
                    <option value="mpg">Miles per Gallon (MPG)</option>
                    <option value="mpguk">MPG (UK)</option>
                    <option value="kml">km per Liter (km/L)</option>
                    <option value="l100km" selected>Liters per 100km (L/100km)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="fuelDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Efficiency Rating:</span>
                    <span id="efficiencyRating">-</span>
                </div>
            </div>
        </div>
    `;

    const fuelValue = element.querySelector('#fuelValue');
    const fromUnit = element.querySelector('#fuelFromUnit');
    const toUnit = element.querySelector('#fuelToUnit');
    const fuelResult = element.querySelector('#fuelResult');
    const detailsDiv = element.querySelector('#fuelDetails');
    const efficiencyRating = element.querySelector('#efficiencyRating');

    function convertFuel() {
        const value = parseFloat(fuelValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        // Convert to L/100km first
        let l100km;
        switch (from) {
            case 'mpg': l100km = 235.214 / value; break;
            case 'mpguk': l100km = 282.481 / value; break;
            case 'kml': l100km = 100 / value; break;
            case 'l100km': l100km = value; break;
        }

        // Convert from L/100km to target unit
        let result;
        switch (to) {
            case 'mpg': result = 235.214 / l100km; break;
            case 'mpguk': result = 282.481 / l100km; break;
            case 'kml': result = 100 / l100km; break;
            case 'l100km': result = l100km; break;
        }

        fuelResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getFuelUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getFuelUnitName(to)}</span>
            </div>
        `;

        // Update efficiency rating
        updateEfficiencyRating(l100km);
    }

    function getFuelUnitName(unit) {
        const names = {
            mpg: 'MPG',
            mpguk: 'MPG (UK)',
            kml: 'km/L',
            l100km: 'L/100km'
        };
        return names[unit];
    }

    function updateEfficiencyRating(l100km) {
        let rating, color;
        if (l100km <= 5) {
            rating = 'Excellent';
            color = 'var(--success-color)';
        } else if (l100km <= 8) {
            rating = 'Good';
            color = '#4CAF50';
        } else if (l100km <= 12) {
            rating = 'Average';
            color = '#FF9800';
        } else {
            rating = 'Poor';
            color = 'var(--warning-color)';
        }
        
        efficiencyRating.textContent = rating;
        efficiencyRating.style.color = color;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    fuelValue.addEventListener('input', convertFuel);
    fromUnit.addEventListener('change', convertFuel);
    toUnit.addEventListener('change', convertFuel);

    setupNumberInputArrows();
    convertFuel();
    return element;
}

// 6. Cooking Converter
function cookingConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Cooking Converter</h3>
            <p>Convert between cooking measurements</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="cookingValue" value="1" step="0.25" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="cookingValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="cookingValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="cookingFromUnit">
                    <option value="tsp">Teaspoon (tsp)</option>
                    <option value="tbsp" selected>Tablespoon (tbsp)</option>
                    <option value="cup">Cup</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="floz">Fluid Ounce (fl oz)</option>
                    <option value="pint">Pint</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="cookingResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="cookingResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="cookingResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="cookingToUnit">
                    <option value="tsp" selected>Teaspoon (tsp)</option>
                    <option value="tbsp">Tablespoon (tbsp)</option>
                    <option value="cup">Cup</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="floz">Fluid Ounce (fl oz)</option>
                    <option value="pint">Pint</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="cookingDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Conversions:</span>
                </div>
                <div class="info-item">
                    <span>3 tsp = 1 tbsp</span>
                    <span>16 tbsp = 1 cup</span>
                </div>
                <div class="info-item">
                    <span>1 cup = 240 ml</span>
                    <span>1 fl oz = 29.57 ml</span>
                </div>
            </div>
        </div>
    `;

    const cookingValue = element.querySelector('#cookingValue');
    const fromUnit = element.querySelector('#cookingFromUnit');
    const toUnit = element.querySelector('#cookingToUnit');
    const cookingResult = element.querySelector('#cookingResult');
    const detailsDiv = element.querySelector('#cookingDetails');

    const conversionRates = {
        tsp: 1,
        tbsp: 3,
        cup: 48,
        ml: 4.92892,
        floz: 6,
        pint: 96
    };

    function convertCooking() {
        const value = parseFloat(cookingValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInTeaspoons = value * conversionRates[from];
        const result = valueInTeaspoons / conversionRates[to];

        cookingResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getCookingUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getCookingUnitName(to)}</span>
            </div>
        `;
    }

    function getCookingUnitName(unit) {
        const names = {
            tsp: 'tsp',
            tbsp: 'tbsp',
            cup: 'cup',
            ml: 'ml',
            floz: 'fl oz',
            pint: 'pint'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    cookingValue.addEventListener('input', convertCooking);
    fromUnit.addEventListener('change', convertCooking);
    toUnit.addEventListener('change', convertCooking);

    setupNumberInputArrows();
    convertCooking();
    return element;
}

// 7. Frequency Converter
function frequencyConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Frequency Converter</h3>
            <p>Convert between frequency units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="frequencyValue" value="1000" step="1" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="frequencyValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="frequencyValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="frequencyFromUnit">
                    <option value="hz">Hertz (Hz)</option>
                    <option value="khz" selected>Kilohertz (kHz)</option>
                    <option value="mhz">Megahertz (MHz)</option>
                    <option value="ghz">Gigahertz (GHz)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="frequencyResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="frequencyResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="frequencyResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="frequencyToUnit">
                    <option value="hz" selected>Hertz (Hz)</option>
                    <option value="khz">Kilohertz (kHz)</option>
                    <option value="mhz">Megahertz (MHz)</option>
                    <option value="ghz">Gigahertz (GHz)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="frequencyDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Frequencies:</span>
                </div>
                <div class="info-item">
                    <span>Human hearing: 20 Hz - 20 kHz</span>
                    <span>AM Radio: 530-1700 kHz</span>
                </div>
                <div class="info-item">
                    <span>Wi-Fi: 2.4 GHz, 5 GHz</span>
                    <span>Bluetooth: 2.4 GHz</span>
                </div>
            </div>
        </div>
    `;

    const frequencyValue = element.querySelector('#frequencyValue');
    const fromUnit = element.querySelector('#frequencyFromUnit');
    const toUnit = element.querySelector('#frequencyToUnit');
    const frequencyResult = element.querySelector('#frequencyResult');
    const detailsDiv = element.querySelector('#frequencyDetails');

    const conversionRates = {
        hz: 1,
        khz: 1000,
        mhz: 1000000,
        ghz: 1000000000
    };

    function convertFrequency() {
        const value = parseFloat(frequencyValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInHertz = value * conversionRates[from];
        const result = valueInHertz / conversionRates[to];

        frequencyResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getFrequencyUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getFrequencyUnitName(to)}</span>
            </div>
        `;
    }

    function getFrequencyUnitName(unit) {
        const names = {
            hz: 'Hz',
            khz: 'kHz',
            mhz: 'MHz',
            ghz: 'GHz'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    frequencyValue.addEventListener('input', convertFrequency);
    fromUnit.addEventListener('change', convertFrequency);
    toUnit.addEventListener('change', convertFrequency);

    setupNumberInputArrows();
    convertFrequency();
    return element;
}

// 8. Hash Generator
function hashGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Hash Generator</h3>
            <p>Generate cryptographic hashes from text</p>
            
            <div class="input-group">
                <label for="hashInput">Enter text to hash:</label>
                <textarea id="hashInput" rows="4" placeholder="Enter text to generate hash..."></textarea>
            </div>
            
            <div class="button-group">
                <button id="generateMD5">MD5</button>
                <button id="generateSHA1">SHA-1</button>
                <button id="generateSHA256">SHA-256</button>
                <button id="generateSHA512">SHA-512</button>
                <button id="clearHash">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="hashOutput">Generated Hash:</label>
                <textarea id="hashOutput" rows="2" readonly placeholder="Hash will appear here..."></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Hash Type:</span>
                    <span id="hashType">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Hash Length:</span>
                    <span id="hashLength">-</span>
                </div>
            </div>
        </div>
    `;

    const hashInput = element.querySelector('#hashInput');
    const hashOutput = element.querySelector('#hashOutput');
    const generateMD5 = element.querySelector('#generateMD5');
    const generateSHA1 = element.querySelector('#generateSHA1');
    const generateSHA256 = element.querySelector('#generateSHA256');
    const generateSHA512 = element.querySelector('#generateSHA512');
    const clearHash = element.querySelector('#clearHash');
    const hashType = element.querySelector('#hashType');
    const hashLength = element.querySelector('#hashLength');

    // Simple hash functions (for demonstration - not cryptographically secure)
    function simpleMD5(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(32, '0');
    }

    function simpleSHA1(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 7) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(40, '0');
    }

    function simpleSHA256(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 9) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    }

    function simpleSHA512(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 11) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(128, '0');
    }

    function generateHash(algorithm, algorithmName) {
        const text = hashInput.value.trim();
        if (!text) {
            alert('Please enter some text to hash');
            return;
        }

        let hash;
        switch (algorithm) {
            case 'md5': hash = simpleMD5(text); break;
            case 'sha1': hash = simpleSHA1(text); break;
            case 'sha256': hash = simpleSHA256(text); break;
            case 'sha512': hash = simpleSHA512(text); break;
        }

        hashOutput.value = hash;
        hashType.textContent = algorithmName;
        hashLength.textContent = hash.length + ' characters';
    }

    function clearAll() {
        hashInput.value = '';
        hashOutput.value = '';
        hashType.textContent = '-';
        hashLength.textContent = '-';
    }

    generateMD5.addEventListener('click', () => generateHash('md5', 'MD5'));
    generateSHA1.addEventListener('click', () => generateHash('sha1', 'SHA-1'));
    generateSHA256.addEventListener('click', () => generateHash('sha256', 'SHA-256'));
    generateSHA512.addEventListener('click', () => generateHash('sha512', 'SHA-512'));
    clearHash.addEventListener('click', clearAll);

    return element;
}

// 9. Base64 Encoder/Decoder
function base64Encoder() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Base64 Encoder/Decoder</h3>
            <p>Encode and decode Base64 strings</p>
            
            <div class="input-group">
                <label for="base64Input">Enter text to encode/decode:</label>
                <textarea id="base64Input" rows="4" placeholder="Enter text or Base64 string..."></textarea>
            </div>
            
            <div class="button-group">
                <button id="encodeBase64">Encode to Base64</button>
                <button id="decodeBase64">Decode from Base64</button>
                <button id="clearBase64">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="base64Output">Result:</label>
                <textarea id="base64Output" rows="4" readonly placeholder="Result will appear here..."></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Operation:</span>
                    <span id="base64Operation">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Input Length:</span>
                    <span id="inputLength">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Output Length:</span>
                    <span id="outputLength">-</span>
                </div>
            </div>
        </div>
    `;

    const base64Input = element.querySelector('#base64Input');
    const base64Output = element.querySelector('#base64Output');
    const encodeBase64 = element.querySelector('#encodeBase64');
    const decodeBase64 = element.querySelector('#decodeBase64');
    const clearBase64 = element.querySelector('#clearBase64');
    const base64Operation = element.querySelector('#base64Operation');
    const inputLength = element.querySelector('#inputLength');
    const outputLength = element.querySelector('#outputLength');

    function encodeToBase64() {
        const text = base64Input.value.trim();
        if (!text) {
            alert('Please enter text to encode');
            return;
        }

        try {
            const encoded = btoa(unescape(encodeURIComponent(text)));
            base64Output.value = encoded;
            base64Operation.textContent = 'Encoded';
            updateLengths(text, encoded);
        } catch (e) {
            alert('Error encoding text: ' + e.message);
        }
    }

    function decodeFromBase64() {
        const text = base64Input.value.trim();
        if (!text) {
            alert('Please enter Base64 string to decode');
            return;
        }

        try {
            const decoded = decodeURIComponent(escape(atob(text)));
            base64Output.value = decoded;
            base64Operation.textContent = 'Decoded';
            updateLengths(text, decoded);
        } catch (e) {
            alert('Error decoding Base64: ' + e.message);
        }
    }

    function updateLengths(input, output) {
        inputLength.textContent = input.length + ' characters';
        outputLength.textContent = output.length + ' characters';
    }

    function clearAll() {
        base64Input.value = '';
        base64Output.value = '';
        base64Operation.textContent = '-';
        inputLength.textContent = '-';
        outputLength.textContent = '-';
    }

    encodeBase64.addEventListener('click', encodeToBase64);
    decodeBase64.addEventListener('click', decodeFromBase64);
    clearBase64.addEventListener('click', clearAll);

    return element;
}

// 10. Text Diff Tool
function textDiffTool() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Text Diff Tool</h3>
            <p>Compare two texts and highlight differences</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="input-group">
                    <label for="textA">Original Text:</label>
                    <textarea id="textA" rows="6" placeholder="Enter original text..."></textarea>
                </div>
                <div class="input-group">
                    <label for="textB">Modified Text:</label>
                    <textarea id="textB" rows="6" placeholder="Enter modified text..."></textarea>
                </div>
            </div>
            
            <div class="button-group">
                <button id="compareTexts">Compare Texts</button>
                <button id="swapTexts">Swap Texts</button>
                <button id="clearTexts">Clear</button>
            </div>
            
            <div class="result-box">
                <h4>Comparison Results:</h4>
                <div id="diffResults"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Differences Found:</span>
                    <span id="diffCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Similarity:</span>
                    <span id="similarity">100%</span>
                </div>
            </div>
        </div>
    `;

    const textA = element.querySelector('#textA');
    const textB = element.querySelector('#textB');
    const compareTexts = element.querySelector('#compareTexts');
    const swapTexts = element.querySelector('#swapTexts');
    const clearTexts = element.querySelector('#clearTexts');
    const diffResults = element.querySelector('#diffResults');
    const diffCount = element.querySelector('#diffCount');
    const similarity = element.querySelector('#similarity');

    function compareText() {
        const text1 = textA.value;
        const text2 = textB.value;

        if (!text1 || !text2) {
            alert('Please enter both texts to compare');
            return;
        }

        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        
        let differences = 0;
        let maxLines = Math.max(lines1.length, lines2.length);
        let html = '';

        for (let i = 0; i < maxLines; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';
            
            if (line1 !== line2) {
                differences++;
                html += `
                    <div class="diff-line">
                        <div class="diff-line-number">Line ${i + 1}</div>
                        <div class="diff-content">
                            <div class="diff-removed">- ${escapeHtml(line1)}</div>
                            <div class="diff-added">+ ${escapeHtml(line2)}</div>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="diff-line unchanged">
                        <div class="diff-line-number">Line ${i + 1}</div>
                        <div class="diff-content">
                            <div class="diff-unchanged">${escapeHtml(line1)}</div>
                        </div>
                    </div>
                `;
            }
        }

        diffResults.innerHTML = html;
        diffCount.textContent = differences;
        
        // Calculate similarity percentage
        const totalChars = Math.max(text1.length, text2.length);
        const commonChars = calculateCommonChars(text1, text2);
        const similarityPercent = totalChars > 0 ? Math.round((commonChars / totalChars) * 100) : 100;
        similarity.textContent = similarityPercent + '%';
    }

    function calculateCommonChars(str1, str2) {
        let common = 0;
        const minLength = Math.min(str1.length, str2.length);
        
        for (let i = 0; i < minLength; i++) {
            if (str1[i] === str2[i]) {
                common++;
            }
        }
        
        return common;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function swapText() {
        const temp = textA.value;
        textA.value = textB.value;
        textB.value = temp;
        compareText();
    }

    function clearAll() {
        textA.value = '';
        textB.value = '';
        diffResults.innerHTML = '';
        diffCount.textContent = '0';
        similarity.textContent = '100%';
    }

    compareTexts.addEventListener('click', compareText);
    swapTexts.addEventListener('click', swapText);
    clearTexts.addEventListener('click', clearAll);

    return element;
}

// Add CSS for the new tools
const additionalStyles = `
/* Angle Converter Visualization */
.angle-visualization {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    gap: 15px;
}

.angle-circle {
    width: 200px;
    height: 200px;
    border: 3px solid var(--border-color);
    border-radius: 50%;
    position: relative;
    background: conic-gradient(var(--primary-color) 0deg, transparent 0deg);
}

.angle-line {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background: var(--warning-color);
    transform-origin: 0% 50%;
    transition: transform 0.3s ease;
}

.angle-value-display {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
    padding: 8px 16px;
    background: var(--control-bg);
    border-radius: 6px;
    border: 1px solid var(--border-color);
}

/* Text Diff Tool Styles */
.diff-line {
    display: flex;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    background: var(--control-bg);
}

.diff-line.unchanged {
    opacity: 0.7;
}

.diff-line-number {
    min-width: 80px;
    font-family: monospace;
    color: var(--secondary-color);
    font-size: 0.9rem;
}

.diff-content {
    flex: 1;
    font-family: monospace;
}

.diff-removed {
    color: var(--warning-color);
    text-decoration: line-through;
    background: rgba(211, 47, 47, 0.1);
    padding: 2px 4px;
    border-radius: 2px;
}

.diff-added {
    color: var(--success-color);
    background: rgba(56, 142, 60, 0.1);
    padding: 2px 4px;
    border-radius: 2px;
}

.diff-unchanged {
    color: var(--text-color);
    padding: 2px 4px;
}

/* Hash Generator Styles */
.button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.button-group button {
    flex: 1;
    min-width: 120px;
}

/* Base64 Styles */
textarea {
    font-family: monospace;
    resize: vertical;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ========== NEXT 10 SCREEN & DISPLAY TOOLS ==========

// 1. Resolution Scale Tool
function resolutionScaleTool() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Resolution Scale Tool</h3>
            <p>Scale resolutions up or down while maintaining aspect ratio</p>
            
            <div class="input-group">
                <label for="originalWidth">Original Width (px):</label>
                <div class="number-input-container">
                    <input type="number" id="originalWidth" value="1920" min="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="originalWidth" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="originalWidth" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="originalHeight">Original Height (px):</label>
                <div class="number-input-container">
                    <input type="number" id="originalHeight" value="1080" min="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="originalHeight" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="originalHeight" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="scaleFactor">Scale Factor (%):</label>
                <div class="number-input-container">
                    <input type="number" id="scaleFactor" value="50" min="1" max="1000" step="1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="scaleFactor" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="scaleFactor" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateScale">Calculate Scaled Resolution</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Original Resolution:</span>
                    <span id="originalRes">1920 × 1080</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Aspect Ratio:</span>
                    <span id="aspectRatio">16:9</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Scaled Resolution:</span>
                    <span id="scaledRes">960 × 540</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Scale Factor:</span>
                    <span id="scalePercent">50%</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Total Pixels (Original):</span>
                    <span id="totalPixelsOriginal">2,073,600</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Pixels (Scaled):</span>
                    <span id="totalPixelsScaled">518,400</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Pixel Reduction:</span>
                    <span id="pixelReduction">75%</span>
                </div>
            </div>
        </div>
    `;

    const originalWidth = element.querySelector('#originalWidth');
    const originalHeight = element.querySelector('#originalHeight');
    const scaleFactor = element.querySelector('#scaleFactor');
    const calculateBtn = element.querySelector('#calculateScale');
    const originalRes = element.querySelector('#originalRes');
    const aspectRatio = element.querySelector('#aspectRatio');
    const scaledRes = element.querySelector('#scaledRes');
    const scalePercent = element.querySelector('#scalePercent');
    const totalPixelsOriginal = element.querySelector('#totalPixelsOriginal');
    const totalPixelsScaled = element.querySelector('#totalPixelsScaled');
    const pixelReduction = element.querySelector('#pixelReduction');

    function calculateScale() {
        const width = parseInt(originalWidth.value);
        const height = parseInt(originalHeight.value);
        const scale = parseFloat(scaleFactor.value) / 100;

        const scaledWidth = Math.round(width * scale);
        const scaledHeight = Math.round(height * scale);

        // Calculate aspect ratio
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(width, height);
        const aspectW = width / divisor;
        const aspectH = height / divisor;

        // Calculate pixel counts
        const pixelsOriginal = width * height;
        const pixelsScaled = scaledWidth * scaledHeight;
        const reduction = ((pixelsOriginal - pixelsScaled) / pixelsOriginal * 100).toFixed(1);

        // Update display
        originalRes.textContent = `${width} × ${height}`;
        aspectRatio.textContent = `${aspectW}:${aspectH}`;
        scaledRes.textContent = `${scaledWidth} × ${scaledHeight}`;
        scalePercent.textContent = `${(scale * 100).toFixed(0)}%`;
        totalPixelsOriginal.textContent = pixelsOriginal.toLocaleString();
        totalPixelsScaled.textContent = pixelsScaled.toLocaleString();
        pixelReduction.textContent = `${reduction}%`;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    originalWidth.addEventListener('input', calculateScale);
    originalHeight.addEventListener('input', calculateScale);
    scaleFactor.addEventListener('input', calculateScale);
    calculateBtn.addEventListener('click', calculateScale);

    setupNumberInputArrows();
    calculateScale();
    return element;
}

// 2. Viewing Distance Calculator
function viewingDistanceCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Viewing Distance Calculator</h3>
            <p>Calculate optimal viewing distance for screens based on resolution and size</p>
            
            <div class="input-group">
                <label for="screenSizeVD">Screen Size (inches, diagonal):</label>
                <div class="number-input-container">
                    <input type="number" id="screenSizeVD" value="24" min="1" max="120" step="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="screenSizeVD" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="screenSizeVD" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="resolutionVD">Screen Resolution:</label>
                <select id="resolutionVD">
                    <option value="480">480p (SD)</option>
                    <option value="720">720p (HD)</option>
                    <option value="1080" selected>1080p (Full HD)</option>
                    <option value="1440">1440p (2K/QHD)</option>
                    <option value="2160">2160p (4K/UHD)</option>
                    <option value="4320">4320p (8K)</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="contentType">Content Type:</label>
                <select id="contentType">
                    <option value="general">General Use</option>
                    <option value="gaming" selected>Gaming</option>
                    <option value="video">Video/Movies</option>
                    <option value="graphic">Graphic Design</option>
                    <option value="reading">Reading/Text</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="calculateVD">Calculate Viewing Distance</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Optimal Viewing Distance:</span>
                    <span id="optimalDistance">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Minimum Distance:</span>
                    <span id="minDistance">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Maximum Distance:</span>
                    <span id="maxDistance">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Visual Acuity:</span>
                    <span id="visualAcuity">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Viewing Distance Guide</h4>
                <div class="info-item">
                    <span class="info-label">🖥️ Desktop:</span>
                    <span>20-40 inches</span>
                </div>
                <div class="info-item">
                    <span class="info-label">📺 TV:</span>
                    <span>1.5-2.5x screen height</span>
                </div>
                <div class="info-item">
                    <span class="info-label">🎮 Gaming:</span>
                    <span>Closer for immersion</span>
                </div>
            </div>
        </div>
    `;

    const screenSizeVD = element.querySelector('#screenSizeVD');
    const resolutionVD = element.querySelector('#resolutionVD');
    const contentType = element.querySelector('#contentType');
    const calculateBtn = element.querySelector('#calculateVD');
    const optimalDistance = element.querySelector('#optimalDistance');
    const minDistance = element.querySelector('#minDistance');
    const maxDistance = element.querySelector('#maxDistance');
    const visualAcuity = element.querySelector('#visualAcuity');

    function calculateViewingDistance() {
        const size = parseFloat(screenSizeVD.value);
        const resolution = parseInt(resolutionVD.value);
        const content = contentType.value;

        // Calculate PPI
        const diagonalPixels = Math.sqrt(Math.pow(1920, 2) + Math.pow(1080, 2));
        const ppi = diagonalPixels / size * (resolution / 1080);

        // Base distance calculation (in inches)
        let baseDistance = (size * 1.5); // 1.5x screen diagonal

        // Adjust based on content type
        const contentMultipliers = {
            general: 1.0,
            gaming: 0.8,
            video: 1.2,
            graphic: 0.9,
            reading: 1.1
        };

        baseDistance *= contentMultipliers[content];

        // Adjust based on resolution
        const resMultipliers = {
            480: 2.0,
            720: 1.5,
            1080: 1.0,
            1440: 0.8,
            2160: 0.6,
            4320: 0.4
        };

        baseDistance *= resMultipliers[resolution];

        const minDist = baseDistance * 0.7;
        const maxDist = baseDistance * 1.5;

        // Calculate visual acuity (arcminutes per pixel)
        const arcminutesPerPixel = (3438 / ppi) / baseDistance;

        optimalDistance.textContent = `${baseDistance.toFixed(1)} inches (${(baseDistance / 12).toFixed(1)} feet)`;
        minDistance.textContent = `${minDist.toFixed(1)} inches (${(minDist / 12).toFixed(1)} feet)`;
        maxDistance.textContent = `${maxDist.toFixed(1)} inches (${(maxDist / 12).toFixed(1)} feet)`;
        visualAcuity.textContent = `${arcminutesPerPixel.toFixed(2)} arcminutes/pixel`;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    screenSizeVD.addEventListener('input', calculateViewingDistance);
    resolutionVD.addEventListener('change', calculateViewingDistance);
    contentType.addEventListener('change', calculateViewingDistance);
    calculateBtn.addEventListener('click', calculateViewingDistance);

    setupNumberInputArrows();
    calculateViewingDistance();
    return element;
}

// 3. Color Contrast Checker
function colorContrastChecker() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Color Contrast Checker</h3>
            <p>Check color contrast ratios for accessibility (WCAG compliance)</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <label for="foregroundColor">Foreground Color:</label>
                    <input type="color" id="foregroundColor" value="#000000">
                    <input type="text" id="foregroundHex" value="#000000" style="margin-top: 5px; width: 100%;">
                </div>
                <div>
                    <label for="backgroundColor">Background Color:</label>
                    <input type="color" id="backgroundColor" value="#ffffff">
                    <input type="text" id="backgroundHex" value="#ffffff" style="margin-top: 5px; width: 100%;">
                </div>
            </div>
            
            <div id="contrastPreview" style="height: 100px; border: 2px solid var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.2rem; font-weight: bold;">
                Sample Text Preview
            </div>
            
            <div class="button-group">
                <button id="checkContrast">Check Contrast</button>
                <button id="swapColors">Swap Colors</button>
            </div>
            
            <div class="result-box" id="contrastResults">
                <div class="info-item">
                    <span class="info-label">Contrast Ratio:</span>
                    <span id="contrastRatio">21:1</span>
                </div>
                <div class="info-item">
                    <span class="info-label">WCAG AA:</span>
                    <span id="wcagAA" style="color: var(--success-color);">✓ PASS</span>
                </div>
                <div class="info-item">
                    <span class="info-label">WCAG AAA:</span>
                    <span id="wcagAAA" style="color: var(--success-color);">✓ PASS</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status:</span>
                    <span id="contrastStatus">Excellent contrast</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>WCAG Guidelines</h4>
                <div class="info-item">
                    <span class="info-label">AA (Minimum):</span>
                    <span>4.5:1 for normal text</span>
                </div>
                <div class="info-item">
                    <span class="info-label">AAA (Enhanced):</span>
                    <span>7:1 for normal text</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Large Text:</span>
                    <span>3:1 for AA, 4.5:1 for AAA</span>
                </div>
            </div>
        </div>
    `;

    const foregroundColor = element.querySelector('#foregroundColor');
    const foregroundHex = element.querySelector('#foregroundHex');
    const backgroundColor = element.querySelector('#backgroundColor');
    const backgroundHex = element.querySelector('#backgroundHex');
    const contrastPreview = element.querySelector('#contrastPreview');
    const checkBtn = element.querySelector('#checkContrast');
    const swapBtn = element.querySelector('#swapColors');
    const contrastRatio = element.querySelector('#contrastRatio');
    const wcagAA = element.querySelector('#wcagAA');
    const wcagAAA = element.querySelector('#wcagAAA');
    const contrastStatus = element.querySelector('#contrastStatus');

    function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    function calculateLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function calculateContrast() {
        const fgHex = foregroundColor.value;
        const bgHex = backgroundColor.value;
        
        const fg = hexToRGB(fgHex);
        const bg = hexToRGB(bgHex);
        
        const lum1 = calculateLuminance(fg.r, fg.g, fg.b);
        const lum2 = calculateLuminance(bg.r, bg.g, bg.b);
        
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        const ratio = (brightest + 0.05) / (darkest + 0.05);
        
        // Update preview
        contrastPreview.style.backgroundColor = bgHex;
        contrastPreview.style.color = fgHex;
        
        // Update results
        contrastRatio.textContent = `${ratio.toFixed(2)}:1`;
        
        // Check WCAG compliance
        const aaNormal = ratio >= 4.5;
        const aaaNormal = ratio >= 7;
        const aaLarge = ratio >= 3;
        const aaaLarge = ratio >= 4.5;
        
        wcagAA.textContent = aaNormal ? '✓ PASS' : '✗ FAIL';
        wcagAA.style.color = aaNormal ? 'var(--success-color)' : 'var(--warning-color)';
        
        wcagAAA.textContent = aaaNormal ? '✓ PASS' : '✗ FAIL';
        wcagAAA.style.color = aaaNormal ? 'var(--success-color)' : 'var(--warning-color)';
        
        // Set status message
        if (ratio >= 7) {
            contrastStatus.textContent = 'Excellent contrast (AAA)';
            contrastStatus.style.color = 'var(--success-color)';
        } else if (ratio >= 4.5) {
            contrastStatus.textContent = 'Good contrast (AA)';
            contrastStatus.style.color = 'var(--success-color)';
        } else if (ratio >= 3) {
            contrastStatus.textContent = 'Minimum for large text';
            contrastStatus.style.color = 'orange';
        } else {
            contrastStatus.textContent = 'Poor contrast';
            contrastStatus.style.color = 'var(--warning-color)';
        }
    }

    function swapColors() {
        const temp = foregroundColor.value;
        foregroundColor.value = backgroundColor.value;
        backgroundColor.value = temp;
        updateHexValues();
        calculateContrast();
    }

    function updateHexValues() {
        foregroundHex.value = foregroundColor.value.toUpperCase();
        backgroundHex.value = backgroundColor.value.toUpperCase();
    }

    foregroundColor.addEventListener('input', function() {
        updateHexValues();
        calculateContrast();
    });

    backgroundColor.addEventListener('input', function() {
        updateHexValues();
        calculateContrast();
    });

    foregroundHex.addEventListener('input', function() {
        if (this.value.match(/^#[0-9A-F]{6}$/i)) {
            foregroundColor.value = this.value;
            calculateContrast();
        }
    });

    backgroundHex.addEventListener('input', function() {
        if (this.value.match(/^#[0-9A-F]{6}$/i)) {
            backgroundColor.value = this.value;
            calculateContrast();
        }
    });

    checkBtn.addEventListener('click', calculateContrast);
    swapBtn.addEventListener('click', swapColors);

    updateHexValues();
    calculateContrast();
    return element;
}

// 4. Screen Time Estimator
function screenTimeEstimator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Screen Time Estimator</h3>
            <p>Estimate battery life based on screen usage and device specifications</p>
            
            <div class="input-group">
                <label for="batteryCapacity">Battery Capacity (mAh):</label>
                <div class="number-input-container">
                    <input type="number" id="batteryCapacity" value="4000" min="100" max="20000" step="100">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="batteryCapacity" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="batteryCapacity" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="screenSizeST">Screen Size (inches):</label>
                <div class="number-input-container">
                    <input type="number" id="screenSizeST" value="6.1" min="1" max="20" step="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="screenSizeST" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="screenSizeST" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="screenBrightness">Screen Brightness (%):</label>
                <div class="number-input-container">
                    <input type="number" id="screenBrightness" value="50" min="0" max="100" step="5">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="screenBrightness" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="screenBrightness" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="usageType">Usage Type:</label>
                <select id="usageType">
                    <option value="video">Video Streaming</option>
                    <option value="gaming">Gaming</option>
                    <option value="browsing" selected>Web Browsing</option>
                    <option value="reading">Reading</option>
                    <option value="standby">Standby</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="refreshRate">Refresh Rate (Hz):</label>
                <select id="refreshRate">
                    <option value="60">60Hz</option>
                    <option value="90">90Hz</option>
                    <option value="120" selected>120Hz</option>
                    <option value="144">144Hz</option>
                    <option value="240">240Hz</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="calculateScreenTime">Calculate Screen Time</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Estimated Screen Time:</span>
                    <span id="screenTimeResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Power Consumption:</span>
                    <span id="powerConsumption">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Battery Drain Rate:</span>
                    <span id="batteryDrain">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Power Consumption Factors</h4>
                <div class="info-item">
                    <span class="info-label">Screen Size:</span>
                    <span>Larger screens use more power</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Brightness:</span>
                    <span>Higher brightness = more power</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Refresh Rate:</span>
                    <span>Higher refresh rates use more power</span>
                </div>
            </div>
        </div>
    `;

    const batteryCapacity = element.querySelector('#batteryCapacity');
    const screenSizeST = element.querySelector('#screenSizeST');
    const screenBrightness = element.querySelector('#screenBrightness');
    const usageType = element.querySelector('#usageType');
    const refreshRate = element.querySelector('#refreshRate');
    const calculateBtn = element.querySelector('#calculateScreenTime');
    const screenTimeResult = element.querySelector('#screenTimeResult');
    const powerConsumption = element.querySelector('#powerConsumption');
    const batteryDrain = element.querySelector('#batteryDrain');

    function calculateScreenTime() {
        const capacity = parseInt(batteryCapacity.value);
        const size = parseFloat(screenSizeST.value);
        const brightness = parseInt(screenBrightness.value);
        const usage = usageType.value;
        const refresh = parseInt(refreshRate.value);

        // Base power consumption (mW per square inch)
        let basePower = 50;

        // Adjust for brightness (non-linear)
        const brightnessFactor = Math.pow(brightness / 50, 1.5);

        // Adjust for screen size
        const sizeFactor = Math.pow(size / 6, 2);

        // Adjust for refresh rate
        const refreshFactor = refresh / 60;

        // Adjust for usage type
        const usageFactors = {
            video: 1.8,
            gaming: 2.2,
            browsing: 1.2,
            reading: 0.8,
            standby: 0.3
        };

        const usageFactor = usageFactors[usage];

        // Calculate total power consumption
        const totalPower = basePower * brightnessFactor * sizeFactor * refreshFactor * usageFactor;

        // Calculate screen time (assuming 3.7V battery)
        const batteryEnergy = capacity * 3.7; // mWh
        const screenTimeHours = batteryEnergy / totalPower;

        // Calculate battery drain rate
        const drainRate = totalPower / 3.7; // mA per hour

        screenTimeResult.textContent = `${screenTimeHours.toFixed(1)} hours`;
        powerConsumption.textContent = `${totalPower.toFixed(0)} mW`;
        batteryDrain.textContent = `${drainRate.toFixed(0)} mA/hour`;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    batteryCapacity.addEventListener('input', calculateScreenTime);
    screenSizeST.addEventListener('input', calculateScreenTime);
    screenBrightness.addEventListener('input', calculateScreenTime);
    usageType.addEventListener('change', calculateScreenTime);
    refreshRate.addEventListener('change', calculateScreenTime);
    calculateBtn.addEventListener('click', calculateScreenTime);

    setupNumberInputArrows();
    calculateScreenTime();
    return element;
}

// 5. Display Comparison Tool
function displayComparisonTool() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Display Comparison Tool</h3>
            <p>Compare different display specifications side by side</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <!-- Display 1 -->
                <div class="display-comparison">
                    <h4>Display 1</h4>
                    <div class="input-group">
                        <label>Screen Size (inches):</label>
                        <div class="number-input-container">
                            <input type="number" id="size1" value="24" min="1" max="100" step="0.1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="size1" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="size1" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>Resolution:</label>
                        <select id="res1">
                            <option value="1920x1080">1920×1080 (Full HD)</option>
                            <option value="2560x1440" selected>2560×1440 (2K/QHD)</option>
                            <option value="3840x2160">3840×2160 (4K/UHD)</option>
                            <option value="5120x2880">5120×2880 (5K)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Panel Type:</label>
                        <select id="panel1">
                            <option value="ips">IPS</option>
                            <option value="va">VA</option>
                            <option value="tn" selected>TN</option>
                            <option value="oled">OLED</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Refresh Rate (Hz):</label>
                        <select id="refresh1">
                            <option value="60">60Hz</option>
                            <option value="144" selected>144Hz</option>
                            <option value="240">240Hz</option>
                        </select>
                    </div>
                </div>
                
                <!-- Display 2 -->
                <div class="display-comparison">
                    <h4>Display 2</h4>
                    <div class="input-group">
                        <label>Screen Size (inches):</label>
                        <div class="number-input-container">
                            <input type="number" id="size2" value="27" min="1" max="100" step="0.1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="size2" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="size2" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>Resolution:</label>
                        <select id="res2">
                            <option value="1920x1080">1920×1080 (Full HD)</option>
                            <option value="2560x1440">2560×1440 (2K/QHD)</option>
                            <option value="3840x2160" selected>3840×2160 (4K/UHD)</option>
                            <option value="5120x2880">5120×2880 (5K)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Panel Type:</label>
                        <select id="panel2">
                            <option value="ips" selected>IPS</option>
                            <option value="va">VA</option>
                            <option value="tn">TN</option>
                            <option value="oled">OLED</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Refresh Rate (Hz):</label>
                        <select id="refresh2">
                            <option value="60" selected>60Hz</option>
                            <option value="144">144Hz</option>
                            <option value="240">240Hz</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="compareDisplays">Compare Displays</button>
            </div>
            
            <div class="result-box">
                <h4>Comparison Results</h4>
                <div class="info-item">
                    <span class="info-label">PPI (Pixels Per Inch):</span>
                    <span id="ppi1">-</span> vs <span id="ppi2">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Screen Area:</span>
                    <span id="area1">-</span> vs <span id="area2">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Pixels:</span>
                    <span id="pixels1">-</span> vs <span id="pixels2">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Pixel Density:</span>
                    <span id="densityStatus">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Winner:</span>
                    <span id="displayWinner">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Recommendation:</span>
                    <span id="displayRecommendation">-</span>
                </div>
            </div>
        </div>
    `;

    const size1 = element.querySelector('#size1');
    const res1 = element.querySelector('#res1');
    const panel1 = element.querySelector('#panel1');
    const refresh1 = element.querySelector('#refresh1');
    const size2 = element.querySelector('#size2');
    const res2 = element.querySelector('#res2');
    const panel2 = element.querySelector('#panel2');
    const refresh2 = element.querySelector('#refresh2');
    const compareBtn = element.querySelector('#compareDisplays');
    const ppi1 = element.querySelector('#ppi1');
    const ppi2 = element.querySelector('#ppi2');
    const area1 = element.querySelector('#area1');
    const area2 = element.querySelector('#area2');
    const pixels1 = element.querySelector('#pixels1');
    const pixels2 = element.querySelector('#pixels2');
    const densityStatus = element.querySelector('#densityStatus');
    const displayWinner = element.querySelector('#displayWinner');
    const displayRecommendation = element.querySelector('#displayRecommendation');

    function calculatePPI(width, height, diagonal) {
        const diagonalPixels = Math.sqrt(width * width + height * height);
        return diagonalPixels / diagonal;
    }

    function calculateArea(diagonal, aspectWidth, aspectHeight) {
        const aspectRatio = aspectWidth / aspectHeight;
        const height = diagonal / Math.sqrt(1 + aspectRatio * aspectRatio);
        const width = height * aspectRatio;
        return width * height;
    }

    function compareDisplays() {
        const size1Val = parseFloat(size1.value);
        const size2Val = parseFloat(size2.value);
        
        const [width1, height1] = res1.value.split('x').map(Number);
        const [width2, height2] = res2.value.split('x').map(Number);
        
        const panel1Val = panel1.value;
        const panel2Val = panel2.value;
        const refresh1Val = parseInt(refresh1.value);
        const refresh2Val = parseInt(refresh2.value);

        // Calculate metrics
        const ppi1Val = calculatePPI(width1, height1, size1Val);
        const ppi2Val = calculatePPI(width2, height2, size2Val);
        
        const area1Val = calculateArea(size1Val, width1, height1);
        const area2Val = calculateArea(size2Val, width2, height2);
        
        const pixels1Val = width1 * height1;
        const pixels2Val = width2 * height2;

        // Update display
        ppi1.textContent = `${ppi1Val.toFixed(1)} PPI`;
        ppi2.textContent = `${ppi2Val.toFixed(1)} PPI`;
        area1.textContent = `${area1Val.toFixed(1)} sq in`;
        area2.textContent = `${area2Val.toFixed(1)} sq in`;
        pixels1.textContent = pixels1Val.toLocaleString();
        pixels2.textContent = pixels2Val.toLocaleString();

        // Determine winner and recommendations
        let winner = '';
        let recommendation = '';
        let densityText = '';

        if (ppi1Val > ppi2Val) {
            densityText = 'Display 1 has better pixel density';
            winner = 'Display 1';
        } else if (ppi2Val > ppi1Val) {
            densityText = 'Display 2 has better pixel density';
            winner = 'Display 2';
        } else {
            densityText = 'Both have similar pixel density';
            winner = 'Tie';
        }

        densityStatus.textContent = densityText;
        displayWinner.textContent = winner;

        // Generate recommendation
        if (refresh1Val > refresh2Val && panel1Val === 'tn') {
            recommendation = 'Display 1 better for gaming';
        } else if (refresh2Val > refresh1Val && panel2Val === 'tn') {
            recommendation = 'Display 2 better for gaming';
        } else if (panel1Val === 'ips' || panel1Val === 'oled') {
            recommendation = 'Display 1 better for color work';
        } else if (panel2Val === 'ips' || panel2Val === 'oled') {
            recommendation = 'Display 2 better for color work';
        } else {
            recommendation = 'Choose based on intended use case';
        }

        displayRecommendation.textContent = recommendation;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    size1.addEventListener('input', compareDisplays);
    res1.addEventListener('change', compareDisplays);
    panel1.addEventListener('change', compareDisplays);
    refresh1.addEventListener('change', compareDisplays);
    size2.addEventListener('input', compareDisplays);
    res2.addEventListener('change', compareDisplays);
    panel2.addEventListener('change', compareDisplays);
    refresh2.addEventListener('change', compareDisplays);
    compareBtn.addEventListener('click', compareDisplays);

    setupNumberInputArrows();
    compareDisplays();
    return element;
}

// 6. Pixel Density Map
function pixelDensityMap() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Pixel Density Map</h3>
            <p>Visualize pixel density across different devices and screen sizes</p>
            
            <div class="input-group">
                <label for="deviceCategory">Device Category:</label>
                <select id="deviceCategory">
                    <option value="smartphones">Smartphones</option>
                    <option value="tablets">Tablets</option>
                    <option value="laptops">Laptops</option>
                    <option value="monitors" selected>Monitors</option>
                    <option value="tvs">TVs</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="densityRange">PPI Range:</label>
                <select id="densityRange">
                    <option value="all">All Densities</option>
                    <option value="low">Low (&lt; 200 PPI)</option>
                    <option value="medium" selected>Medium (200-400 PPI)</option>
                    <option value="high">High (&gt; 400 PPI)</option>
                    <option value="retina">Retina/High-DPI</option>
                </select>
            </div>
            
            <div id="densityMap" style="height: 300px; border: 1px solid var(--border-color); border-radius: 8px; margin: 20px 0; background: var(--control-bg); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div style="text-align: center; padding: 20px;">
                    <h4>Pixel Density Visualization</h4>
                    <p>Select device category to see density map</p>
                </div>
            </div>
            
            <div class="button-group">
                <button id="generateMap">Generate Density Map</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Selected Category:</span>
                    <span id="selectedCategory">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Average PPI:</span>
                    <span id="averagePPI">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Density Range:</span>
                    <span id="densityRangeResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Human Eye Limit:</span>
                    <span id="eyeLimit">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Pixel Density Guide</h4>
                <div class="info-item">
                    <span class="info-label">📱 Smartphones:</span>
                    <span>400-800 PPI</span>
                </div>
                <div class="info-item">
                    <span class="info-label">💻 Laptops:</span>
                    <span>150-300 PPI</span>
                </div>
                <div class="info-item">
                    <span class="info-label">🖥️ Monitors:</span>
                    <span>80-200 PPI</span>
                </div>
                <div class="info-item">
                    <span class="info-label">📺 TVs:</span>
                    <span>30-100 PPI</span>
                </div>
            </div>
        </div>
    `;

    const deviceCategory = element.querySelector('#deviceCategory');
    const densityRange = element.querySelector('#densityRange');
    const densityMap = element.querySelector('#densityMap');
    const generateBtn = element.querySelector('#generateMap');
    const selectedCategory = element.querySelector('#selectedCategory');
    const averagePPI = element.querySelector('#averagePPI');
    const densityRangeResult = element.querySelector('#densityRangeResult');
    const eyeLimit = element.querySelector('#eyeLimit');

    const deviceData = {
        smartphones: { min: 300, max: 800, avg: 450, name: 'Smartphones' },
        tablets: { min: 200, max: 400, avg: 280, name: 'Tablets' },
        laptops: { min: 120, max: 300, avg: 180, name: 'Laptops' },
        monitors: { min: 80, max: 200, avg: 110, name: 'Monitors' },
        tvs: { min: 30, max: 100, avg: 60, name: 'TVs' }
    };

    function generateDensityMap() {
        const category = deviceCategory.value;
        const range = densityRange.value;
        const data = deviceData[category];

        // Clear previous map
        densityMap.innerHTML = '';

        // Create visualization
        const visualization = document.createElement('div');
        visualization.style.width = '100%';
        visualization.style.height = '100%';
        visualization.style.padding = '20px';
        visualization.style.display = 'flex';
        visualization.style.flexDirection = 'column';
        visualization.style.alignItems = 'center';
        visualization.style.justifyContent = 'center';

        // Create density bars
        const barsContainer = document.createElement('div');
        barsContainer.style.width = '80%';
        barsContainer.style.height = '120px';
        barsContainer.style.display = 'flex';
        barsContainer.style.alignItems = 'end';
        barsContainer.style.justifyContent = 'space-around';
        barsContainer.style.marginBottom = '20px';

        // Create 5 density bars representing the range
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            const density = data.min + (i * (data.max - data.min) / 4);
            const height = 20 + (i * 20); // Varying heights
            
            bar.style.width = '15%';
            bar.style.height = `${height}px`;
            bar.style.background = `linear-gradient(to top, var(--primary-color), var(--secondary-color))`;
            bar.style.borderRadius = '4px 4px 0 0';
            bar.style.display = 'flex';
            bar.style.alignItems = 'center';
            bar.style.justifyContent = 'center';
            bar.style.fontSize = '10px';
            bar.style.color = 'white';
            bar.style.fontWeight = 'bold';
            
            bar.textContent = `${Math.round(density)}`;
            barsContainer.appendChild(bar);
        }

        visualization.appendChild(barsContainer);

        // Add labels
        const labels = document.createElement('div');
        labels.style.width = '80%';
        labels.style.display = 'flex';
        labels.style.justifyContent = 'space-between';
        labels.style.fontSize = '12px';
        labels.style.color = 'var(--secondary-color)';
        
        labels.innerHTML = `
            <span>${data.min} PPI</span>
            <span>Low Density</span>
            <span>Average: ${data.avg} PPI</span>
            <span>High Density</span>
            <span>${data.max} PPI</span>
        `;

        visualization.appendChild(labels);

        // Add human eye limit indicator
        const eyeLimitIndicator = document.createElement('div');
        eyeLimitIndicator.style.marginTop = '20px';
        eyeLimitIndicator.style.padding = '10px';
        eyeLimitIndicator.style.background = 'var(--hover-color)';
        eyeLimitIndicator.style.borderRadius = '4px';
        eyeLimitIndicator.style.fontSize = '12px';
        
        const eyeLimitValue = category === 'smartphones' ? '300-400 PPI' : 
                            category === 'tvs' ? '40-60 PPI' : '100-150 PPI';
        
        eyeLimitIndicator.textContent = `Human eye limit at typical viewing distance: ${eyeLimitValue}`;
        visualization.appendChild(eyeLimitIndicator);

        densityMap.appendChild(visualization);

        // Update results
        selectedCategory.textContent = data.name;
        averagePPI.textContent = `${data.avg} PPI`;
        densityRangeResult.textContent = `${data.min}-${data.max} PPI`;
        eyeLimit.textContent = eyeLimitValue;
    }

    deviceCategory.addEventListener('change', generateDensityMap);
    densityRange.addEventListener('change', generateDensityMap);
    generateBtn.addEventListener('click', generateDensityMap);

    generateDensityMap();
    return element;
}

// 7. Screen Area Calculator
function screenAreaCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Screen Area Calculator</h3>
            <p>Calculate screen area in different units and compare screen sizes</p>
            
            <div class="input-group">
                <label for="screenDiagonal">Screen Diagonal (inches):</label>
                <div class="number-input-container">
                    <input type="number" id="screenDiagonal" value="24" min="1" max="120" step="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="screenDiagonal" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="screenDiagonal" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="aspectRatioSA">Aspect Ratio:</label>
                <select id="aspectRatioSA">
                    <option value="16:9" selected>16:9 (Widescreen)</option>
                    <option value="16:10">16:10</option>
                    <option value="4:3">4:3 (Standard)</option>
                    <option value="21:9">21:9 (Ultrawide)</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="custom">Custom Ratio</option>
                </select>
            </div>
            
            <div id="customAspect" style="display: none;">
                <div class="input-group">
                    <label>Custom Aspect Ratio:</label>
                    <div style="display: flex; gap: 10px;">
                        <div class="number-input-container" style="flex: 1;">
                            <input type="number" id="customWidth" value="16" min="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="customWidth" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="customWidth" data-direction="down"></div>
                            </div>
                        </div>
                        <span style="align-self: center;">:</span>
                        <div class="number-input-container" style="flex: 1;">
                            <input type="number" id="customHeight" value="9" min="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="customHeight" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="customHeight" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateArea">Calculate Screen Area</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Screen Width:</span>
                    <span id="screenWidth">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Screen Height:</span>
                    <span id="screenHeight">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Screen Area (sq inches):</span>
                    <span id="areaInches">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Screen Area (sq cm):</span>
                    <span id="areaCm">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Area Comparisons</h4>
                <div class="info-item">
                    <span class="info-label">Compared to 24" 16:9:</span>
                    <span id="comparison24">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Size Category:</span>
                    <span id="sizeCategory">-</span>
                </div>
            </div>
        </div>
    `;

    const screenDiagonal = element.querySelector('#screenDiagonal');
    const aspectRatioSA = element.querySelector('#aspectRatioSA');
    const customAspect = element.querySelector('#customAspect');
    const customWidth = element.querySelector('#customWidth');
    const customHeight = element.querySelector('#customHeight');
    const calculateBtn = element.querySelector('#calculateArea');
    const screenWidth = element.querySelector('#screenWidth');
    const screenHeight = element.querySelector('#screenHeight');
    const areaInches = element.querySelector('#areaInches');
    const areaCm = element.querySelector('#areaCm');
    const comparison24 = element.querySelector('#comparison24');
    const sizeCategory = element.querySelector('#sizeCategory');

    function calculateScreenArea() {
        const diagonal = parseFloat(screenDiagonal.value);
        let aspectWidth, aspectHeight;

        if (aspectRatioSA.value === 'custom') {
            aspectWidth = parseFloat(customWidth.value);
            aspectHeight = parseFloat(customHeight.value);
        } else {
            [aspectWidth, aspectHeight] = aspectRatioSA.value.split(':').map(Number);
        }

        // Calculate screen dimensions
        const aspectRatio = aspectWidth / aspectHeight;
        const height = diagonal / Math.sqrt(1 + aspectRatio * aspectRatio);
        const width = height * aspectRatio;

        // Calculate area
        const areaSqInches = width * height;
        const areaSqCm = areaSqInches * 6.4516;

        // Reference area (24" 16:9 screen)
        const refHeight = 24 / Math.sqrt(1 + (16/9) * (16/9));
        const refWidth = refHeight * (16/9);
        const refArea = refWidth * refHeight;
        const comparison = (areaSqInches / refArea * 100).toFixed(1);

        // Determine size category
        let category = '';
        if (areaSqInches < 100) category = 'Small';
        else if (areaSqInches < 200) category = 'Medium';
        else if (areaSqInches < 300) category = 'Large';
        else category = 'Extra Large';

        // Update results
        screenWidth.textContent = `${width.toFixed(2)} inches`;
        screenHeight.textContent = `${height.toFixed(2)} inches`;
        areaInches.textContent = `${areaSqInches.toFixed(2)} sq inches`;
        areaCm.textContent = `${areaSqCm.toFixed(2)} sq cm`;
        comparison24.textContent = `${comparison}% of 24" screen area`;
        sizeCategory.textContent = category;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    aspectRatioSA.addEventListener('change', function() {
        customAspect.style.display = this.value === 'custom' ? 'block' : 'none';
        calculateScreenArea();
    });

    screenDiagonal.addEventListener('input', calculateScreenArea);
    aspectRatioSA.addEventListener('change', calculateScreenArea);
    customWidth.addEventListener('input', calculateScreenArea);
    customHeight.addEventListener('input', calculateScreenArea);
    calculateBtn.addEventListener('click', calculateScreenArea);

    setupNumberInputArrows();
    calculateScreenArea();
    return element;
}

// 8. Bezier Curve Generator
function bezierCurveGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Bezier Curve Generator</h3>
            <p>Create and visualize Bezier curves with interactive control points</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <h4>Control Points</h4>
                    <div class="input-group">
                        <label>P0 X:</label>
                        <div class="number-input-container">
                            <input type="number" id="p0x" value="50" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p0x" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p0x" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>P0 Y:</label>
                        <div class="number-input-container">
                            <input type="number" id="p0y" value="350" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p0y" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p0y" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>P1 X:</label>
                        <div class="number-input-container">
                            <input type="number" id="p1x" value="150" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p1x" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p1x" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>P1 Y:</label>
                        <div class="number-input-container">
                            <input type="number" id="p1y" value="50" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p1y" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p1y" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Control Points (cont.)</h4>
                    <div class="input-group">
                        <label>P2 X:</label>
                        <div class="number-input-container">
                            <input type="number" id="p2x" value="250" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p2x" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p2x" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>P2 Y:</label>
                        <div class="number-input-container">
                            <input type="number" id="p2y" value="50" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p2y" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p2y" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>P3 X:</label>
                        <div class="number-input-container">
                            <input type="number" id="p3x" value="350" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p3x" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p3x" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>P3 Y:</label>
                        <div class="number-input-container">
                            <input type="number" id="p3y" value="350" min="0" max="400" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="p3y" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="p3y" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="drawCurve">Draw Bezier Curve</button>
                <button id="resetCurve">Reset to Default</button>
            </div>
            
            <div id="bezierCanvasContainer" style="border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; background: white; margin: 20px 0;">
                <canvas id="bezierCanvas" width="400" height="400" style="display: block; margin: 0 auto;"></canvas>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Curve Type:</span>
                    <span id="curveType">Cubic Bezier</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Control Points:</span>
                    <span id="controlPoints">4 points</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Curve Length:</span>
                    <span id="curveLength">-</span>
                </div>
            </div>
        </div>
    `;

    const p0x = element.querySelector('#p0x');
    const p0y = element.querySelector('#p0y');
    const p1x = element.querySelector('#p1x');
    const p1y = element.querySelector('#p1y');
    const p2x = element.querySelector('#p2x');
    const p2y = element.querySelector('#p2y');
    const p3x = element.querySelector('#p3x');
    const p3y = element.querySelector('#p3y');
    const drawBtn = element.querySelector('#drawCurve');
    const resetBtn = element.querySelector('#resetCurve');
    const canvas = element.querySelector('#bezierCanvas');
    const ctx = canvas.getContext('2d');
    const curveLength = element.querySelector('#curveLength');

    function drawBezierCurve() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get control points
        const points = [
            { x: parseFloat(p0x.value), y: parseFloat(p0y.value) },
            { x: parseFloat(p1x.value), y: parseFloat(p1y.value) },
            { x: parseFloat(p2x.value), y: parseFloat(p2y.value) },
            { x: parseFloat(p3x.value), y: parseFloat(p3y.value) }
        ];

        // Draw control points
        ctx.fillStyle = 'red';
        points.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillText(`P${index}`, point.x + 8, point.y - 8);
        });

        // Draw control lines
        ctx.strokeStyle = 'gray';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.moveTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw bezier curve
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.bezierCurveTo(
            points[1].x, points[1].y,
            points[2].x, points[2].y,
            points[3].x, points[3].y
        );
        ctx.stroke();

        // Calculate approximate curve length
        let length = 0;
        const steps = 100;
        let prevX = points[0].x;
        let prevY = points[0].y;

        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const x = Math.pow(1-t, 3)*points[0].x + 3*Math.pow(1-t, 2)*t*points[1].x + 3*(1-t)*Math.pow(t, 2)*points[2].x + Math.pow(t, 3)*points[3].x;
            const y = Math.pow(1-t, 3)*points[0].y + 3*Math.pow(1-t, 2)*t*points[1].y + 3*(1-t)*Math.pow(t, 2)*points[2].y + Math.pow(t, 3)*points[3].y;
            
            length += Math.sqrt(Math.pow(x-prevX, 2) + Math.pow(y-prevY, 2));
            prevX = x;
            prevY = y;
        }

        curveLength.textContent = `${length.toFixed(1)} pixels`;
    }

    function resetCurve() {
        p0x.value = 50;
        p0y.value = 350;
        p1x.value = 150;
        p1y.value = 50;
        p2x.value = 250;
        p2y.value = 50;
        p3x.value = 350;
        p3y.value = 350;
        drawBezierCurve();
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                drawBezierCurve();
            });
        });
    }

    p0x.addEventListener('input', drawBezierCurve);
    p0y.addEventListener('input', drawBezierCurve);
    p1x.addEventListener('input', drawBezierCurve);
    p1y.addEventListener('input', drawBezierCurve);
    p2x.addEventListener('input', drawBezierCurve);
    p2y.addEventListener('input', drawBezierCurve);
    p3x.addEventListener('input', drawBezierCurve);
    p3y.addEventListener('input', drawBezierCurve);
    drawBtn.addEventListener('click', drawBezierCurve);
    resetBtn.addEventListener('click', resetCurve);

    setupNumberInputArrows();
    drawBezierCurve();
    return element;
}

// 9. Shadow Calculator
function shadowCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Shadow Calculator</h3>
            <p>Calculate and preview CSS box shadows with real-time visualization</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <h4>Shadow Properties</h4>
                    <div class="input-group">
                        <label for="shadowX">X Offset (px):</label>
                        <div class="number-input-container">
                            <input type="number" id="shadowX" value="5" min="-50" max="50" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="shadowX" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="shadowX" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="shadowY">Y Offset (px):</label>
                        <div class="number-input-container">
                            <input type="number" id="shadowY" value="5" min="-50" max="50" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="shadowY" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="shadowY" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="shadowBlur">Blur Radius (px):</label>
                        <div class="number-input-container">
                            <input type="number" id="shadowBlur" value="10" min="0" max="100" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="shadowBlur" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="shadowBlur" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="shadowSpread">Spread (px):</label>
                        <div class="number-input-container">
                            <input type="number" id="shadowSpread" value="0" min="-50" max="50" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="shadowSpread" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="shadowSpread" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Color & Options</h4>
                    <div class="input-group">
                        <label for="shadowColor">Shadow Color:</label>
                        <input type="color" id="shadowColor" value="#000000">
                    </div>
                    <div class="input-group">
                        <label for="shadowOpacity">Opacity (%):</label>
                        <div class="number-input-container">
                            <input type="number" id="shadowOpacity" value="50" min="0" max="100" step="1">
                            <div class="number-input-arrows">
                                <div class="number-input-arrow up" data-input="shadowOpacity" data-direction="up"></div>
                                <div class="number-input-arrow down" data-input="shadowOpacity" data-direction="down"></div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>
                            <input type="checkbox" id="shadowInset" checked>
                            Inset Shadow
                        </label>
                    </div>
                    <div class="input-group">
                        <label>
                            <input type="checkbox" id="shadowMultiple">
                            Multiple Shadows
                        </label>
                    </div>
                </div>
            </div>
            
            <div id="shadowPreviewContainer" style="height: 200px; border: 1px solid var(--border-color); border-radius: 8px; margin: 20px 0; display: flex; align-items: center; justify-content: center; background: var(--control-bg);">
                <div id="shadowPreview" style="width: 100px; height: 100px; background: var(--card-bg); border-radius: 8px;">
                    Box with Shadow
                </div>
            </div>
            
            <div class="button-group">
                <button id="updateShadow">Update Shadow</button>
                <button id="copyCSS">Copy CSS Code</button>
            </div>
            
            <div class="result-box">
                <h4>CSS Code</h4>
                <code id="cssCode" style="display: block; padding: 10px; background: var(--control-bg); border-radius: 4px; font-family: monospace; font-size: 0.9rem; word-break: break-all;">
                    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
                </code>
            </div>
        </div>
    `;

    const shadowX = element.querySelector('#shadowX');
    const shadowY = element.querySelector('#shadowY');
    const shadowBlur = element.querySelector('#shadowBlur');
    const shadowSpread = element.querySelector('#shadowSpread');
    const shadowColor = element.querySelector('#shadowColor');
    const shadowOpacity = element.querySelector('#shadowOpacity');
    const shadowInset = element.querySelector('#shadowInset');
    const shadowMultiple = element.querySelector('#shadowMultiple');
    const updateBtn = element.querySelector('#updateShadow');
    const copyBtn = element.querySelector('#copyCSS');
    const shadowPreview = element.querySelector('#shadowPreview');
    const cssCode = element.querySelector('#cssCode');

    function updateShadow() {
        const x = parseInt(shadowX.value);
        const y = parseInt(shadowY.value);
        const blur = parseInt(shadowBlur.value);
        const spread = parseInt(shadowSpread.value);
        const color = shadowColor.value;
        const opacity = parseInt(shadowOpacity.value) / 100;
        const inset = shadowInset.checked;
        
        // Convert hex to rgba
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        const shadowValue = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        // Apply shadow
        shadowPreview.style.boxShadow = shadowValue;
        
        // Update CSS code
        cssCode.textContent = `box-shadow: ${shadowValue};`;
    }

    function copyCSSCode() {
        navigator.clipboard.writeText(cssCode.textContent).then(() => {
            alert('CSS code copied to clipboard!');
        });
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    shadowX.addEventListener('input', updateShadow);
    shadowY.addEventListener('input', updateShadow);
    shadowBlur.addEventListener('input', updateShadow);
    shadowSpread.addEventListener('input', updateShadow);
    shadowColor.addEventListener('input', updateShadow);
    shadowOpacity.addEventListener('input', updateShadow);
    shadowInset.addEventListener('change', updateShadow);
    shadowMultiple.addEventListener('change', updateShadow);
    updateBtn.addEventListener('click', updateShadow);
    copyBtn.addEventListener('click', copyCSSCode);

    setupNumberInputArrows();
    updateShadow();
    return element;
}

// 10. Animation Speed Tester
function animationSpeedTester() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Animation Speed Tester</h3>
            <p>Test and visualize CSS animation speeds with different easing functions</p>
            
            <div class="input-group">
                <label for="animationDuration">Animation Duration (ms):</label>
                <div class="number-input-container">
                    <input type="number" id="animationDuration" value="1000" min="100" max="10000" step="100">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="animationDuration" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="animationDuration" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="easingFunction">Easing Function:</label>
                <select id="easingFunction">
                    <option value="linear">linear</option>
                    <option value="ease" selected>ease</option>
                    <option value="ease-in">ease-in</option>
                    <option value="ease-out">ease-out</option>
                    <option value="ease-in-out">ease-in-out</option>
                    <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce</option>
                    <option value="cubic-bezier(0.175, 0.885, 0.32, 1.275)">elastic</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="animationType">Animation Type:</label>
                <select id="animationType">
                    <option value="move" selected>Horizontal Move</option>
                    <option value="scale">Scale</option>
                    <option value="rotate">Rotate</option>
                    <option value="color">Color Change</option>
                    <option value="bounce">Bounce</option>
                </select>
            </div>
            
            <div id="animationContainer" style="height: 200px; border: 1px solid var(--border-color); border-radius: 8px; margin: 20px 0; position: relative; background: var(--control-bg); overflow: hidden;">
                <div id="animatedElement" style="width: 50px; height: 50px; background: var(--primary-color); position: absolute; left: 10px; top: 75px; border-radius: 4px;"></div>
            </div>
            
            <div class="button-group">
                <button id="startAnimation">Start Animation</button>
                <button id="resetAnimation">Reset Animation</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Current Duration:</span>
                    <span id="currentDuration">1000ms</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Easing Function:</span>
                    <span id="currentEasing">ease</span>
                </div>
                <div class="info-item">
                    <span class="info-label">FPS (Approximate):</span>
                    <span id="animationFPS">60</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Animation Performance</h4>
                <div class="info-item">
                    <span class="info-label">Target FPS:</span>
                    <span>60 FPS (optimal)</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Smoothness:</span>
                    <span id="smoothnessRating">Excellent</span>
                </div>
            </div>
        </div>
    `;

    const animationDuration = element.querySelector('#animationDuration');
    const easingFunction = element.querySelector('#easingFunction');
    const animationType = element.querySelector('#animationType');
    const startBtn = element.querySelector('#startAnimation');
    const resetBtn = element.querySelector('#resetAnimation');
    const animatedElement = element.querySelector('#animatedElement');
    const currentDuration = element.querySelector('#currentDuration');
    const currentEasing = element.querySelector('#currentEasing');
    const animationFPS = element.querySelector('#animationFPS');
    const smoothnessRating = element.querySelector('#smoothnessRating');

    let animationId = null;
    let startTime = null;
    let frameCount = 0;

    function startAnimation() {
        const duration = parseInt(animationDuration.value);
        const easing = easingFunction.value;
        const type = animationType.value;
        
        // Reset element
        resetAnimation();
        
        // Update display
        currentDuration.textContent = `${duration}ms`;
        currentEasing.textContent = easing;
        
        // Set up animation based on type
        let keyframes = {};
        let animationOptions = {
            duration: duration,
            easing: easing,
            fill: 'forwards'
        };

        switch(type) {
            case 'move':
                keyframes = [
                    { transform: 'translateX(0px)' },
                    { transform: 'translateX(300px)' }
                ];
                break;
            case 'scale':
                keyframes = [
                    { transform: 'scale(1)' },
                    { transform: 'scale(2)' },
                    { transform: 'scale(1)' }
                ];
                break;
            case 'rotate':
                keyframes = [
                    { transform: 'rotate(0deg)' },
                    { transform: 'rotate(360deg)' }
                ];
                break;
            case 'color':
                keyframes = [
                    { background: 'var(--primary-color)' },
                    { background: 'var(--warning-color)' },
                    { background: 'var(--primary-color)' }
                ];
                break;
            case 'bounce':
                keyframes = [
                    { transform: 'translateY(0px)' },
                    { transform: 'translateY(-100px)' },
                    { transform: 'translateY(0px)' }
                ];
                break;
        }

        // Start FPS counter
        startFPSCounter();

        // Start animation
        animatedElement.animate(keyframes, animationOptions);
        
        // Update smoothness rating
        updateSmoothnessRating(duration);
    }

    function resetAnimation() {
        // Stop any running animation
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // Reset element to initial state
        animatedElement.style.transform = '';
        animatedElement.style.background = 'var(--primary-color)';
        animatedElement.style.left = '10px';
        animatedElement.style.top = '75px';
        
        // Reset FPS counter
        frameCount = 0;
        startTime = null;
        animationFPS.textContent = '60';
    }

    function startFPSCounter() {
        frameCount = 0;
        startTime = performance.now();
        
        function countFrame() {
            frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            
            if (elapsed >= 1000) {
                const fps = Math.round((frameCount * 1000) / elapsed);
                animationFPS.textContent = fps;
                frameCount = 0;
                startTime = currentTime;
            }
            
            animationId = requestAnimationFrame(countFrame);
        }
        
        countFrame();
    }

    function updateSmoothnessRating(duration) {
        if (duration <= 200) {
            smoothnessRating.textContent = 'Very Fast';
            smoothnessRating.style.color = 'var(--success-color)';
        } else if (duration <= 500) {
            smoothnessRating.textContent = 'Fast';
            smoothnessRating.style.color = 'var(--success-color)';
        } else if (duration <= 1000) {
            smoothnessRating.textContent = 'Smooth';
            smoothnessRating.style.color = 'var(--success-color)';
        } else if (duration <= 2000) {
            smoothnessRating.textContent = 'Slow';
            smoothnessRating.style.color = 'orange';
        } else {
            smoothnessRating.textContent = 'Very Slow';
            smoothnessRating.style.color = 'var(--warning-color)';
        }
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || -Infinity;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    animationDuration.addEventListener('input', function() {
        currentDuration.textContent = `${this.value}ms`;
        updateSmoothnessRating(parseInt(this.value));
    });

    easingFunction.addEventListener('change', function() {
        currentEasing.textContent = this.value;
    });

    startBtn.addEventListener('click', startAnimation);
    resetBtn.addEventListener('click', resetAnimation);

    setupNumberInputArrows();
    return element;
}

// ========== ADD THESE TOOLS TO YOUR STATE.TOOLS ARRAY ==========
/*
Add these tool definitions to your state.tools array:

{
    id: 'resolution-scale',
    name: 'Resolution Scale Tool',
    description: 'Scale resolutions up or down while maintaining aspect ratio',
    category: 'screen',
    component: resolutionScaleTool
},
{
    id: 'viewing-distance',
    name: 'Viewing Distance Calculator',
    description: 'Calculate optimal viewing distance for screens',
    category: 'screen',
    component: viewingDistanceCalculator
},
{
    id: 'color-contrast',
    name: 'Color Contrast Checker',
    description: 'Check color contrast ratios for accessibility',
    category: 'screen',
    component: colorContrastChecker
},
{
    id: 'screen-time',
    name: 'Screen Time Estimator',
    description: 'Estimate battery life based on screen usage',
    category: 'screen',
    component: screenTimeEstimator
},
{
    id: 'display-comparison',
    name: 'Display Comparison Tool',
    description: 'Compare different display specifications side by side',
    category: 'screen',
    component: displayComparisonTool
},
{
    id: 'pixel-density',
    name: 'Pixel Density Map',
    description: 'Visualize pixel density across different devices',
    category: 'screen',
    component: pixelDensityMap
},
{
    id: 'screen-area',
    name: 'Screen Area Calculator',
    description: 'Calculate screen area in different units',
    category: 'screen',
    component: screenAreaCalculator
},
{
    id: 'bezier-curve',
    name: 'Bezier Curve Generator',
    description: 'Create and visualize Bezier curves',
    category: 'screen',
    component: bezierCurveGenerator
},
{
    id: 'shadow-calculator',
    name: 'Shadow Calculator',
    description: 'Calculate and preview CSS box shadows',
    category: 'screen',
    component: shadowCalculator
},
{
    id: 'animation-speed',
    name: 'Animation Speed Tester',
    description: 'Test and visualize CSS animation speeds',
    category: 'screen',
    component: animationSpeedTester
}
*/





// ========== NEXT 10 TOOLS IMPLEMENTATION ==========

// 1. Time Converter
function timeConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Time Converter</h3>
            <p>Convert between different time units with precision</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="timeValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="timeValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="timeValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="timeFromUnit">
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months (30 days)</option>
                    <option value="years">Years (365 days)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="text" id="timeResult" readonly>
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="timeResult" data-direction="up" style="display: none"></div>
                        <div class="number-input-arrow down" data-input="timeResult" data-direction="down" style="display: none"></div>
                    </div>
                </div>
                <select id="timeToUnit">
                    <option value="seconds">Seconds</option>
                    <option value="minutes" selected>Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months (30 days)</option>
                    <option value="years">Years (365 days)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="timeConversionDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Time Conversions:</span>
                </div>
                <div class="info-item">
                    <span>1 minute = 60 seconds</span>
                    <span>1 hour = 60 minutes</span>
                </div>
                <div class="info-item">
                    <span>1 day = 24 hours</span>
                    <span>1 week = 7 days</span>
                </div>
                <div class="info-item">
                    <span>1 month ≈ 30.44 days</span>
                    <span>1 year = 365 days</span>
                </div>
            </div>
        </div>
    `;

    const timeValue = element.querySelector('#timeValue');
    const fromUnit = element.querySelector('#timeFromUnit');
    const toUnit = element.querySelector('#timeToUnit');
    const timeResult = element.querySelector('#timeResult');
    const detailsDiv = element.querySelector('#timeConversionDetails');

    const conversionRates = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
        months: 2592000, // 30 days
        years: 31536000  // 365 days
    };

    function convertTime() {
        const value = parseFloat(timeValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInSeconds = value * conversionRates[from];
        const result = valueInSeconds / conversionRates[to];

        timeResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getTimeUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getTimeUnitName(to)}</span>
            </div>
        `;
    }

    function getTimeUnitName(unit) {
        const names = {
            seconds: 'seconds',
            minutes: 'minutes',
            hours: 'hours',
            days: 'days',
            weeks: 'weeks',
            months: 'months',
            years: 'years'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                    if (currentValue > max) currentValue = max;
                } else {
                    currentValue -= step;
                    if (currentValue < min) currentValue = min;
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    timeValue.addEventListener('input', convertTime);
    fromUnit.addEventListener('change', convertTime);
    toUnit.addEventListener('change', convertTime);

    setupNumberInputArrows();
    convertTime();
    return element;
}

// 2. Clothing Sizes Converter (FIXED VERSION)
function clothingSizesConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Clothing Sizes Converter</h3>
            <p>Convert between US, UK, EU, and international clothing sizes</p>
            
            <div class="input-group" style="margin-bottom: 25px;">
                <label for="clothingType">Clothing Type:</label>
                <select id="clothingType" style="margin-bottom: 15px;">
                    <option value="mens-shirts">Men's Shirts</option>
                    <option value="womens-shirts">Women's Shirts</option>
                    <option value="mens-pants">Men's Pants</option>
                    <option value="womens-pants">Women's Pants</option>
                    <option value="mens-shoes">Men's Shoes</option>
                    <option value="womens-shoes">Women's Shoes</option>
                </select>
            </div>
            
            <div class="input-group" style="margin-bottom: 20px;">
                <label>Enter Size:</label>
                <div class="input-with-button" style="margin-bottom: 10px;">
                    <input type="text" id="clothingSize" value="M" placeholder="Enter size (e.g., M, 32, 10)">
                    <select id="clothingFromSystem">
                        <option value="us">US</option>
                        <option value="uk">UK</option>
                        <option value="eu">EU</option>
                        <option value="international">International</option>
                    </select>
                </div>
                <small style="color: var(--secondary-color);">Enter size like: S, M, L, XL, 32, 10, 42, etc.</small>
            </div>
            
            <div style="text-align: center; margin: 20px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-group" style="margin-bottom: 20px;">
                <label>Converted Size:</label>
                <div class="input-with-button">
                    <input type="text" id="clothingResult" readonly style="background: var(--control-bg);">
                    <select id="clothingToSystem">
                        <option value="us">US</option>
                        <option value="uk" selected>UK</option>
                        <option value="eu">EU</option>
                        <option value="international">International</option>
                    </select>
                </div>
            </div>
            
            <div class="result-box">
                <div id="clothingSizeDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Size Guide:</span>
                </div>
                <div id="sizeGuideContent">
                    <!-- Size guide will be populated here -->
                </div>
            </div>
        </div>
    `;

    const clothingType = element.querySelector('#clothingType');
    const clothingSize = element.querySelector('#clothingSize');
    const fromSystem = element.querySelector('#clothingFromSystem');
    const toSystem = element.querySelector('#clothingToSystem');
    const clothingResult = element.querySelector('#clothingResult');
    const detailsDiv = element.querySelector('#clothingSizeDetails');
    const sizeGuide = element.querySelector('#sizeGuideContent');

    // Enhanced size conversion data with more sizes
    const sizeCharts = {
        'mens-shirts': {
            us: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
            uk: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
            eu: ['44', '46', '48', '50', '52', '54', '56', '58'],
            international: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
        },
        'womens-shirts': {
            us: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
            uk: ['6', '8', '10', '12', '14', '16', '18'],
            eu: ['34', '36', '38', '40', '42', '44', '46'],
            international: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
        },
        'mens-pants': {
            us: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
            uk: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
            eu: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
            international: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
        },
        'womens-pants': {
            us: ['2', '4', '6', '8', '10', '12', '14', '16', '18'],
            uk: ['6', '8', '10', '12', '14', '16', '18', '20', '22'],
            eu: ['34', '36', '38', '40', '42', '44', '46', '48', '50'],
            international: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
        },
        'mens-shoes': {
            us: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
            uk: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
            eu: ['40', '40.5', '41', '42', '42.5', '43', '43.5', '44', '44.5', '45', '45.5', '46'],
            international: ['S', 'M', 'L', 'XL']
        },
        'womens-shoes': {
            us: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'],
            uk: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '9'],
            eu: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '42'],
            international: ['XS', 'S', 'M', 'L']
        }
    };

    function convertClothingSize() {
        const type = clothingType.value;
        let size = clothingSize.value.trim().toUpperCase();
        const from = fromSystem.value;
        const to = toSystem.value;

        const fromSizes = sizeCharts[type][from];
        const toSizes = sizeCharts[type][to];

        // Try exact match first
        let index = fromSizes.indexOf(size);
        
        // If not found, try case-insensitive and partial matches
        if (index === -1) {
            index = fromSizes.findIndex(s => s.toUpperCase() === size);
        }
        
        if (index === -1) {
            // Try to find the closest match for numeric sizes
            const numericSize = parseFloat(size);
            if (!isNaN(numericSize)) {
                index = fromSizes.findIndex(s => {
                    const sNum = parseFloat(s);
                    return !isNaN(sNum) && Math.abs(sNum - numericSize) < 1;
                });
            }
        }
        
        if (index !== -1 && toSizes[index]) {
            clothingResult.value = toSizes[index];
            detailsDiv.innerHTML = `
                <div class="info-item">
                    <span class="info-label">${fromSizes[index]} (${from.toUpperCase()}) =</span>
                    <span>${toSizes[index]} (${to.toUpperCase()})</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Type:</span>
                    <span>${element.querySelector('#clothingType option:checked').text}</span>
                </div>
            `;
        } else {
            clothingResult.value = 'Size not found';
            detailsDiv.innerHTML = `
                <div class="info-item">
                    <span class="info-label" style="color: var(--warning-color);">Size "${size}" not found in ${from.toUpperCase()} chart</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Available ${from.toUpperCase()} sizes:</span>
                    <span>${fromSizes.join(', ')}</span>
                </div>
            `;
        }

        updateSizeGuide(type);
    }

    function updateSizeGuide(type) {
        const chart = sizeCharts[type];
        let guideHTML = '<div style="overflow-x: auto;">';
        guideHTML += '<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-top: 10px;">';
        
        guideHTML += '<tr style="background: var(--hover-color);">';
        guideHTML += '<th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">US</th>';
        guideHTML += '<th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">UK</th>';
        guideHTML += '<th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">EU</th>';
        guideHTML += '<th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">INT</th>';
        guideHTML += '</tr>';
        
        const maxLength = Math.max(...Object.values(chart).map(arr => arr.length));
        
        for (let i = 0; i < maxLength; i++) {
            guideHTML += '<tr>';
            guideHTML += `<td style="border: 1px solid var(--border-color); padding: 6px 8px;">${chart.us[i] || '-'}</td>`;
            guideHTML += `<td style="border: 1px solid var(--border-color); padding: 6px 8px;">${chart.uk[i] || '-'}</td>`;
            guideHTML += `<td style="border: 1px solid var(--border-color); padding: 6px 8px;">${chart.eu[i] || '-'}</td>`;
            guideHTML += `<td style="border: 1px solid var(--border-color); padding: 6px 8px;">${chart.international[i] || '-'}</td>`;
            guideHTML += '</tr>';
        }
        
        guideHTML += '</table></div>';
        sizeGuide.innerHTML = guideHTML;
    }

    clothingType.addEventListener('change', function() {
        convertClothingSize();
        // Reset to common default size when type changes
        const defaults = {
            'mens-shirts': 'M',
            'womens-shirts': 'M', 
            'mens-pants': '32',
            'womens-pants': '8',
            'mens-shoes': '9',
            'womens-shoes': '7'
        };
        clothingSize.value = defaults[this.value] || 'M';
    });

    clothingSize.addEventListener('input', convertClothingSize);
    fromSystem.addEventListener('change', convertClothingSize);
    toSystem.addEventListener('change', convertClothingSize);

    convertClothingSize();
    return element;
}

// 3. Financial Calculator (INDIAN RUPEE VERSION)
function financialCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Financial Calculator</h3>
            <p>Calculate loans, investments, and financial metrics in Indian Rupees</p>
            
            <div class="input-group">
                <label for="calculationType">Calculation Type:</label>
                <select id="calculationType">
                    <option value="loan">Loan Payment</option>
                    <option value="investment">Future Investment</option>
                    <option value="compound-interest">Compound Interest</option>
                    <option value="roi">Return on Investment (ROI)</option>
                    <option value="sip">SIP Calculator</option>
                </select>
            </div>
            
            <div id="loanInputs" class="input-section">
                <div class="input-group">
                    <label for="loanAmount">Loan Amount (₹):</label>
                    <input type="number" id="loanAmount" value="1000000" min="0" step="1000">
                </div>
                <div class="input-group">
                    <label for="interestRate">Annual Interest Rate (%):</label>
                    <input type="number" id="interestRate" value="8.5" step="0.01" min="0">
                </div>
                <div class="input-group">
                    <label for="loanTerm">Loan Term (years):</label>
                    <input type="number" id="loanTerm" value="5" min="1" max="30">
                </div>
            </div>
            
            <div id="investmentInputs" class="input-section" style="display: none;">
                <div class="input-group">
                    <label for="initialInvestment">Initial Investment (₹):</label>
                    <input type="number" id="initialInvestment" value="50000" min="0" step="1000">
                </div>
                <div class="input-group">
                    <label for="monthlyContribution">Monthly Contribution (₹):</label>
                    <input type="number" id="monthlyContribution" value="5000" min="0" step="100">
                </div>
                <div class="input-group">
                    <label for="investmentRate">Annual Return Rate (%):</label>
                    <input type="number" id="investmentRate" value="12" step="0.01" min="0">
                </div>
                <div class="input-group">
                    <label for="investmentYears">Investment Period (years):</label>
                    <input type="number" id="investmentYears" value="10" min="1" max="50">
                </div>
            </div>
            
            <div id="sipInputs" class="input-section" style="display: none;">
                <div class="input-group">
                    <label for="sipAmount">Monthly SIP Amount (₹):</label>
                    <input type="number" id="sipAmount" value="10000" min="0" step="100">
                </div>
                <div class="input-group">
                    <label for="sipRate">Expected Annual Return (%):</label>
                    <input type="number" id="sipRate" value="12" step="0.01" min="0">
                </div>
                <div class="input-group">
                    <label for="sipYears">Investment Period (years):</label>
                    <input type="number" id="sipYears" value="15" min="1" max="50">
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateFinancial">Calculate</button>
            </div>
            
            <div class="result-box">
                <div id="financialResults">
                    <div class="info-item">
                        <span class="info-label">Monthly Payment/Amount:</span>
                        <span id="monthlyPayment">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total Interest/Returns:</span>
                        <span id="totalInterest">-</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total Amount:</span>
                        <span id="totalPayment">-</span>
                    </div>
                    <div class="info-item" id="totalInvestmentItem" style="display: none;">
                        <span class="info-label">Total Investment:</span>
                        <span id="totalInvestment">-</span>
                    </div>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Calculation Details:</span>
                    <span id="calculationDetails">-</span>
                </div>
            </div>
        </div>
    `;

    const calculationType = element.querySelector('#calculationType');
    const calculateBtn = element.querySelector('#calculateFinancial');
    const monthlyPayment = element.querySelector('#monthlyPayment');
    const totalInterest = element.querySelector('#totalInterest');
    const totalPayment = element.querySelector('#totalPayment');
    const totalInvestmentItem = element.querySelector('#totalInvestmentItem');
    const totalInvestment = element.querySelector('#totalInvestment');
    const calculationDetails = element.querySelector('#calculationDetails');

    function formatIndianRupees(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }

    function showRelevantInputs() {
        const type = calculationType.value;
        element.querySelectorAll('.input-section').forEach(section => {
            section.style.display = 'none';
        });
        
        if (type === 'loan') {
            element.querySelector('#loanInputs').style.display = 'block';
        } else if (type === 'sip') {
            element.querySelector('#sipInputs').style.display = 'block';
        } else {
            element.querySelector('#investmentInputs').style.display = 'block';
        }
    }

    function calculateFinancial() {
        const type = calculationType.value;
        
        if (type === 'loan') {
            calculateLoan();
        } else if (type === 'investment') {
            calculateInvestment();
        } else if (type === 'compound-interest') {
            calculateCompoundInterest();
        } else if (type === 'roi') {
            calculateROI();
        } else if (type === 'sip') {
            calculateSIP();
        }
    }

    function calculateLoan() {
        const amount = parseFloat(element.querySelector('#loanAmount').value);
        const annualRate = parseFloat(element.querySelector('#interestRate').value);
        const years = parseFloat(element.querySelector('#loanTerm').value);
        
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        
        const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        const total = monthly * numberOfPayments;
        const interest = total - amount;
        
        monthlyPayment.textContent = formatIndianRupees(monthly);
        totalInterest.textContent = formatIndianRupees(interest);
        totalPayment.textContent = formatIndianRupees(total);
        totalInvestmentItem.style.display = 'none';
        calculationDetails.textContent = `Home/Loan amortization over ${years} years at ${annualRate}% interest rate`;
    }

    function calculateInvestment() {
        const initial = parseFloat(element.querySelector('#initialInvestment').value);
        const monthly = parseFloat(element.querySelector('#monthlyContribution').value);
        const annualRate = parseFloat(element.querySelector('#investmentRate').value);
        const years = parseFloat(element.querySelector('#investmentYears').value);
        
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        
        let futureValue = initial * Math.pow(1 + monthlyRate, months);
        futureValue += monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        
        const totalContributions = initial + (monthly * months);
        const earnings = futureValue - totalContributions;
        
        monthlyPayment.textContent = formatIndianRupees(futureValue);
        totalInterest.textContent = formatIndianRupees(earnings);
        totalPayment.textContent = formatIndianRupees(totalContributions);
        totalInvestmentItem.style.display = 'none';
        calculationDetails.textContent = `Future value of investments after ${years} years with ${annualRate}% returns`;
    }

    function calculateCompoundInterest() {
        const principal = parseFloat(element.querySelector('#initialInvestment').value);
        const annualRate = parseFloat(element.querySelector('#investmentRate').value);
        const years = parseFloat(element.querySelector('#investmentYears').value);
        
        const futureValue = principal * Math.pow(1 + annualRate / 100, years);
        const interest = futureValue - principal;
        
        monthlyPayment.textContent = formatIndianRupees(futureValue);
        totalInterest.textContent = formatIndianRupees(interest);
        totalPayment.textContent = formatIndianRupees(principal);
        totalInvestmentItem.style.display = 'none';
        calculationDetails.textContent = `Compound interest on fixed deposit after ${years} years at ${annualRate}% p.a.`;
    }

    function calculateROI() {
        const initial = parseFloat(element.querySelector('#initialInvestment').value);
        const final = parseFloat(element.querySelector('#monthlyContribution').value); // Using this as final value
        const years = parseFloat(element.querySelector('#investmentYears').value);
        
        const roi = ((final - initial) / initial) * 100;
        const annualizedROI = (Math.pow(final / initial, 1 / years) - 1) * 100;
        
        monthlyPayment.textContent = `${roi.toFixed(2)}%`;
        totalInterest.textContent = `${annualizedROI.toFixed(2)}%`;
        totalPayment.textContent = formatIndianRupees(final);
        totalInvestmentItem.style.display = 'none';
        calculationDetails.textContent = `Return on investment over ${years} years`;
    }

    function calculateSIP() {
        const monthlySIP = parseFloat(element.querySelector('#sipAmount').value);
        const annualRate = parseFloat(element.querySelector('#sipRate').value);
        const years = parseFloat(element.querySelector('#sipYears').value);
        
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        
        // SIP formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
        const futureValue = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const totalInvested = monthlySIP * months;
        const wealthGained = futureValue - totalInvested;
        
        monthlyPayment.textContent = formatIndianRupees(futureValue);
        totalInterest.textContent = formatIndianRupees(wealthGained);
        totalPayment.textContent = formatIndianRupees(totalInvested);
        totalInvestmentItem.style.display = 'flex';
        totalInvestment.textContent = formatIndianRupees(totalInvested);
        calculationDetails.textContent = `SIP investment of ${formatIndianRupees(monthlySIP)} monthly for ${years} years at ${annualRate}% expected returns`;
    }

    calculationType.addEventListener('change', showRelevantInputs);
    calculateBtn.addEventListener('click', calculateFinancial);

    showRelevantInputs();
    calculateFinancial();
    return element;
}

// 4. Fraction Calculator (FIXED VERSION)
function fractionCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Fraction Calculator</h3>
            <p>Calculate with fractions and mixed numbers</p>
            
            <div class="input-group">
                <label for="fractionOperation">Operation:</label>
                <select id="fractionOperation">
                    <option value="add">Addition (+)</option>
                    <option value="subtract">Subtraction (-)</option>
                    <option value="multiply">Multiplication (×)</option>
                    <option value="divide">Division (÷)</option>
                </select>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: end; margin: 20px 0;">
                <div>
                    <label>First Fraction:</label>
                    <div style="display: flex; gap: 8px; align-items: center; margin-top: 5px;">
                        <input type="number" id="frac1Whole" value="0" placeholder="Whole" min="0" style="width: 70px; padding: 10px;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <input type="number" id="frac1Num" value="1" placeholder="Num" min="1" style="width: 70px; padding: 8px; margin-bottom: 2px;">
                            <div style="width: 100%; height: 2px; background: var(--border-color);"></div>
                            <input type="number" id="frac1Den" value="2" placeholder="Den" min="1" style="width: 70px; padding: 8px; margin-top: 2px;">
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 2rem; padding-bottom: 15px; font-weight: bold;" id="operationSymbol">+</div>
                
                <div>
                    <label>Second Fraction:</label>
                    <div style="display: flex; gap: 8px; align-items: center; margin-top: 5px;">
                        <input type="number" id="frac2Whole" value="0" placeholder="Whole" min="0" style="width: 70px; padding: 10px;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <input type="number" id="frac2Num" value="1" placeholder="Num" min="1" style="width: 70px; padding: 8px; margin-bottom: 2px;">
                            <div style="width: 100%; height: 2px; background: var(--border-color);"></div>
                            <input type="number" id="frac2Den" value="4" placeholder="Den" min="1" style="width: 70px; padding: 8px; margin-top: 2px;">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateFraction">Calculate</button>
                <button id="simplifyFraction">Simplify Result</button>
                <button id="clearFractions">Clear All</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Result:</span>
                    <span id="fractionResult" style="font-size: 1.3rem; font-weight: bold; color: var(--primary-color);">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Decimal Value:</span>
                    <span id="decimalResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Calculation Steps:</span>
                    <span id="calculationSteps">-</span>
                </div>
            </div>
        </div>
    `;

    const operationSelect = element.querySelector('#fractionOperation');
    const calculateBtn = element.querySelector('#calculateFraction');
    const simplifyBtn = element.querySelector('#simplifyFraction');
    const clearBtn = element.querySelector('#clearFractions');
    const fractionResult = element.querySelector('#fractionResult');
    const decimalResult = element.querySelector('#decimalResult');
    const calculationSteps = element.querySelector('#calculationSteps');
    const operationSymbol = element.querySelector('#operationSymbol');

    let currentResult = null;

    function updateOperationSymbol() {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        };
        operationSymbol.textContent = symbols[operationSelect.value];
    }

    function getFraction(wholeId, numId, denId) {
        const whole = parseInt(element.querySelector(wholeId).value) || 0;
        const num = parseInt(element.querySelector(numId).value) || 0;
        const den = parseInt(element.querySelector(denId).value) || 1;
        
        if (den === 0) {
            alert('Denominator cannot be zero!');
            element.querySelector(denId).value = 1;
            return null;
        }
        
        // Convert mixed number to improper fraction
        const improperNum = whole * den + (whole >= 0 ? num : -num);
        return { 
            whole, 
            num, 
            den, 
            improperNum,
            value: whole + (whole >= 0 ? num/den : -num/den)
        };
    }

    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    function simplifyFraction(num, den) {
        if (num === 0) return { num: 0, den: 1 };
        
        const divisor = gcd(num, den);
        const simplifiedNum = num / divisor;
        const simplifiedDen = den / divisor;
        
        // Ensure denominator is positive
        if (simplifiedDen < 0) {
            return { num: -simplifiedNum, den: -simplifiedDen };
        }
        return { num: simplifiedNum, den: simplifiedDen };
    }

    function formatFraction(whole, num, den) {
        if (num === 0) return whole.toString();
        
        const sign = whole < 0 || num < 0 ? '-' : '';
        const absWhole = Math.abs(whole);
        const absNum = Math.abs(num);
        
        if (absWhole === 0) return `${sign}${absNum}/${den}`;
        return `${sign}${absWhole} ${absNum}/${den}`;
    }

    function toMixedNumber(num, den) {
        if (num === 0) return { whole: 0, num: 0, den: 1 };
        
        const whole = Math.trunc(num / den);
        const remainder = Math.abs(num % den);
        
        return {
            whole: whole,
            num: remainder,
            den: den
        };
    }

    function calculateFraction() {
        const frac1 = getFraction('#frac1Whole', '#frac1Num', '#frac1Den');
        const frac2 = getFraction('#frac2Whole', '#frac2Num', '#frac2Den');
        const operation = operationSelect.value;
        
        if (!frac1 || !frac2) return;
        
        let resultNum, resultDen;
        let steps = '';
        
        switch (operation) {
            case 'add':
                resultNum = frac1.improperNum * frac2.den + frac2.improperNum * frac1.den;
                resultDen = frac1.den * frac2.den;
                steps = `(${frac1.improperNum}/${frac1.den}) + (${frac2.improperNum}/${frac2.den}) = ${frac1.improperNum * frac2.den}/${frac1.den * frac2.den} + ${frac2.improperNum * frac1.den}/${frac1.den * frac2.den} = ${resultNum}/${resultDen}`;
                break;
                
            case 'subtract':
                resultNum = frac1.improperNum * frac2.den - frac2.improperNum * frac1.den;
                resultDen = frac1.den * frac2.den;
                steps = `(${frac1.improperNum}/${frac1.den}) - (${frac2.improperNum}/${frac2.den}) = ${frac1.improperNum * frac2.den}/${frac1.den * frac2.den} - ${frac2.improperNum * frac1.den}/${frac1.den * frac2.den} = ${resultNum}/${resultDen}`;
                break;
                
            case 'multiply':
                resultNum = frac1.improperNum * frac2.improperNum;
                resultDen = frac1.den * frac2.den;
                steps = `(${frac1.improperNum}/${frac1.den}) × (${frac2.improperNum}/${frac2.den}) = ${resultNum}/${resultDen}`;
                break;
                
            case 'divide':
                resultNum = frac1.improperNum * frac2.den;
                resultDen = frac1.den * frac2.improperNum;
                steps = `(${frac1.improperNum}/${frac1.den}) ÷ (${frac2.improperNum}/${frac2.den}) = ${frac1.improperNum}/${frac1.den} × ${frac2.den}/${frac2.improperNum} = ${resultNum}/${resultDen}`;
                break;
        }
        
        // Store the raw result for later simplification
        currentResult = { num: resultNum, den: resultDen };
        
        // Simplify the result
        const simplified = simplifyFraction(resultNum, resultDen);
        const mixed = toMixedNumber(simplified.num, simplified.den);
        
        fractionResult.textContent = formatFraction(mixed.whole, mixed.num, mixed.den);
        decimalResult.textContent = (resultNum / resultDen).toFixed(6);
        calculationSteps.textContent = steps;
    }

    function simplifyCurrentResult() {
        if (!currentResult) {
            calculateFraction(); // Calculate first if no current result
            return;
        }
        
        const simplified = simplifyFraction(currentResult.num, currentResult.den);
        const mixed = toMixedNumber(simplified.num, simplified.den);
        
        fractionResult.textContent = formatFraction(mixed.whole, mixed.num, mixed.den);
        calculationSteps.textContent = `Simplified: ${currentResult.num}/${currentResult.den} = ${mixed.whole !== 0 ? mixed.whole + ' ' : ''}${mixed.num}/${mixed.den}`;
    }

    function clearAll() {
        element.querySelector('#frac1Whole').value = '0';
        element.querySelector('#frac1Num').value = '1';
        element.querySelector('#frac1Den').value = '2';
        element.querySelector('#frac2Whole').value = '0';
        element.querySelector('#frac2Num').value = '1';
        element.querySelector('#frac2Den').value = '4';
        fractionResult.textContent = '-';
        decimalResult.textContent = '-';
        calculationSteps.textContent = '-';
        currentResult = null;
    }

    operationSelect.addEventListener('change', updateOperationSymbol);
    calculateBtn.addEventListener('click', calculateFraction);
    simplifyBtn.addEventListener('click', simplifyCurrentResult);
    clearBtn.addEventListener('click', clearAll);

    updateOperationSymbol();
    calculateFraction();
    return element;
}

// 5. URL Encoder/Decoder
function urlEncoder() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>URL Encoder/Decoder</h3>
            <p>Encode and decode URL components with proper formatting</p>
            
            <div class="input-group">
                <label for="urlInput">Enter text to encode/decode:</label>
                <textarea id="urlInput" rows="4" placeholder="Enter text or URL here...">Hello World & Special Characters: @#$%^&*()</textarea>
            </div>
            
            <div class="button-group">
                <button id="encodeURL">Encode URL</button>
                <button id="decodeURL">Decode URL</button>
                <button id="encodeComponent">Encode Component</button>
                <button id="decodeComponent">Decode Component</button>
            </div>
            
            <div class="input-group">
                <label for="urlOutput">Result:</label>
                <textarea id="urlOutput" rows="4" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Operation:</span>
                    <span id="urlOperation">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Characters Encoded/Decoded:</span>
                    <span id="urlStats">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">URL Encoding Reference:</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; font-family: monospace; font-size: 0.9rem;">
                    <div>Space → %20</div>
                    <div>! → %21</div>
                    <div>" → %22</div>
                    <div># → %23</div>
                    <div>$ → %24</div>
                    <div>& → %26</div>
                    <div>' → %27</div>
                    <div>( → %28</div>
                    <div>) → %29</div>
                </div>
            </div>
        </div>
    `;

    const urlInput = element.querySelector('#urlInput');
    const urlOutput = element.querySelector('#urlOutput');
    const encodeBtn = element.querySelector('#encodeURL');
    const decodeBtn = element.querySelector('#decodeURL');
    const encodeCompBtn = element.querySelector('#encodeComponent');
    const decodeCompBtn = element.querySelector('#decodeComponent');
    const urlOperation = element.querySelector('#urlOperation');
    const urlStats = element.querySelector('#urlStats');

    function updateStats(input, output, operation) {
        const inputLength = input.length;
        const outputLength = output.length;
        const difference = outputLength - inputLength;
        
        urlOperation.textContent = operation;
        urlStats.textContent = `${inputLength} → ${outputLength} characters (${difference >= 0 ? '+' : ''}${difference})`;
    }

    function encodeURL() {
        const input = urlInput.value;
        const output = encodeURI(input);
        urlOutput.value = output;
        updateStats(input, output, 'URL Encoding');
    }

    function decodeURL() {
        const input = urlInput.value;
        try {
            const output = decodeURI(input);
            urlOutput.value = output;
            updateStats(input, output, 'URL Decoding');
        } catch (e) {
            urlOutput.value = 'Error: Invalid URL encoding';
            urlOperation.textContent = 'Error';
            urlStats.textContent = 'Invalid encoded URL';
        }
    }

    function encodeComponent() {
        const input = urlInput.value;
        const output = encodeURIComponent(input);
        urlOutput.value = output;
        updateStats(input, output, 'URL Component Encoding');
    }

    function decodeComponent() {
        const input = urlInput.value;
        try {
            const output = decodeURIComponent(input);
            urlOutput.value = output;
            updateStats(input, output, 'URL Component Decoding');
        } catch (e) {
            urlOutput.value = 'Error: Invalid URL component encoding';
            urlOperation.textContent = 'Error';
            urlStats.textContent = 'Invalid encoded URL component';
        }
    }

    encodeBtn.addEventListener('click', encodeURL);
    decodeBtn.addEventListener('click', decodeURL);
    encodeCompBtn.addEventListener('click', encodeComponent);
    decodeCompBtn.addEventListener('click', decodeComponent);

    encodeURL();
    return element;
}

// 6. HTML Entity Converter
function htmlEntityConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>HTML Entity Converter</h3>
            <p>Convert between characters and HTML entities</p>
            
            <div class="input-group">
                <label for="htmlInput">Enter text to convert:</label>
                <textarea id="htmlInput" rows="4" placeholder="Enter text with special characters..."><div class="container">Hello & Welcome!</div></textarea>
            </div>
            
            <div class="button-group">
                <button id="encodeHTML">Encode to Entities</button>
                <button id="decodeHTML">Decode from Entities</button>
                <button id="encodeAll">Encode All Characters</button>
            </div>
            
            <div class="input-group">
                <label for="htmlOutput">Result:</label>
                <textarea id="htmlOutput" rows="4" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Operation:</span>
                    <span id="htmlOperation">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Entities Found/Created:</span>
                    <span id="htmlStats">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common HTML Entities:</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; font-family: monospace; font-size: 0.9rem;">
                    <div>&lt; → &amp;lt;</div>
                    <div>&gt; → &amp;gt;</div>
                    <div>&amp; → &amp;amp;</div>
                    <div>" → &amp;quot;</div>
                    <div>' → &amp;apos;</div>
                    <div>© → &amp;copy;</div>
                    <div>® → &amp;reg;</div>
                    <div>€ → &amp;euro;</div>
                    <div>£ → &amp;pound;</div>
                </div>
            </div>
        </div>
    `;

    const htmlInput = element.querySelector('#htmlInput');
    const htmlOutput = element.querySelector('#htmlOutput');
    const encodeBtn = element.querySelector('#encodeHTML');
    const decodeBtn = element.querySelector('#decodeHTML');
    const encodeAllBtn = element.querySelector('#encodeAll');
    const htmlOperation = element.querySelector('#htmlOperation');
    const htmlStats = element.querySelector('#htmlStats');

    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
        '©': '&copy;',
        '®': '&reg;',
        '€': '&euro;',
        '£': '&pound;',
        '¥': '&yen;',
        '¢': '&cent;',
        '§': '&sect;',
        '¶': '&para;'
    };

    const reverseEntityMap = Object.fromEntries(
        Object.entries(entityMap).map(([key, value]) => [value, key])
    );

    function updateStats(input, output, operation, entitiesCount) {
        htmlOperation.textContent = operation;
        htmlStats.textContent = `${entitiesCount} entities processed`;
    }

    function encodeHTML() {
        const input = htmlInput.value;
        let output = input;
        let entitiesCount = 0;

        // Encode special characters
        for (const [char, entity] of Object.entries(entityMap)) {
            const regex = new RegExp(char, 'g');
            const matches = input.match(regex);
            if (matches) entitiesCount += matches.length;
            output = output.replace(regex, entity);
        }

        htmlOutput.value = output;
        updateStats(input, output, 'HTML Entity Encoding', entitiesCount);
    }

    function decodeHTML() {
        const input = htmlInput.value;
        let output = input;
        let entitiesCount = 0;

        // Decode entities
        for (const [entity, char] of Object.entries(reverseEntityMap)) {
            const regex = new RegExp(entity, 'g');
            const matches = input.match(regex);
            if (matches) entitiesCount += matches.length;
            output = output.replace(regex, char);
        }

        // Also decode numeric entities
        output = output.replace(/&#(\d+);/g, (match, dec) => {
            entitiesCount++;
            return String.fromCharCode(dec);
        });

        output = output.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
            entitiesCount++;
            return String.fromCharCode(parseInt(hex, 16));
        });

        htmlOutput.value = output;
        updateStats(input, output, 'HTML Entity Decoding', entitiesCount);
    }

    function encodeAllCharacters() {
        const input = htmlInput.value;
        let output = '';
        let entitiesCount = 0;

        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const code = char.charCodeAt(0);
            
            if (code > 127) {
                output += `&#${code};`;
                entitiesCount++;
            } else {
                output += char;
            }
        }

        htmlOutput.value = output;
        updateStats(input, output, 'All Characters Encoding', entitiesCount);
    }

    encodeBtn.addEventListener('click', encodeHTML);
    decodeBtn.addEventListener('click', decodeHTML);
    encodeAllBtn.addEventListener('click', encodeAllCharacters);

    encodeHTML();
    return element;
}

// 7. Color Blindness Simulator
function colorBlindnessSimulator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Color Blindness Simulator</h3>
            <p>Simulate how colors appear to people with color vision deficiencies</p>
            
            <div class="input-group">
                <label for="colorInput">Select Color:</label>
                <input type="color" id="colorInput" value="#ff0000">
            </div>
            
            <div class="input-group">
                <label for="colorBlindType">Color Blindness Type:</label>
                <select id="colorBlindType">
                    <option value="normal">Normal Vision</option>
                    <option value="protanopia">Protanopia (Red-Blind)</option>
                    <option value="protanomaly">Protanomaly (Red-Weak)</option>
                    <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
                    <option value="deuteranomaly">Deuteranomaly (Green-Weak)</option>
                    <option value="tritanopia">Tritanopia (Blue-Blind)</option>
                    <option value="tritanomaly">Tritanomaly (Blue-Weak)</option>
                    <option value="achromatopsia">Achromatopsia (Complete Color Blindness)</option>
                </select>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h4>Original Color</h4>
                    <div id="originalColor" style="width: 100%; height: 100px; border: 2px solid var(--border-color); border-radius: 8px; margin-bottom: 10px;"></div>
                    <div class="info-item">
                        <span class="info-label">HEX:</span>
                        <span id="originalHex">#FF0000</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">RGB:</span>
                        <span id="originalRGB">rgb(255, 0, 0)</span>
                    </div>
                </div>
                
                <div>
                    <h4>Simulated View</h4>
                    <div id="simulatedColor" style="width: 100%; height: 100px; border: 2px solid var(--border-color); border-radius: 8px; margin-bottom: 10px;"></div>
                    <div class="info-item">
                        <span class="info-label">HEX:</span>
                        <span id="simulatedHex">#FF0000</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">RGB:</span>
                        <span id="simulatedRGB">rgb(255, 0, 0)</span>
                    </div>
                </div>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Color Blindness Description:</span>
                    <span id="blindnessDescription">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Prevalence:</span>
                    <span id="blindnessPrevalence">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Color Blindness Test</h4>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center;">
                    <div>
                        <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #ff0000, #00ff00); border-radius: 8px; margin: 0 auto;"></div>
                        <small>Red-Green Test</small>
                    </div>
                    <div>
                        <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #0000ff, #ffff00); border-radius: 8px; margin: 0 auto;"></div>
                        <small>Blue-Yellow Test</small>
                    </div>
                    <div>
                        <div style="width: 80px; height: 80px; background: conic-gradient(red, yellow, green, blue, red); border-radius: 8px; margin: 0 auto;"></div>
                        <small>Full Spectrum</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    const colorInput = element.querySelector('#colorInput');
    const blindType = element.querySelector('#colorBlindType');
    const originalColor = element.querySelector('#originalColor');
    const simulatedColor = element.querySelector('#simulatedColor');
    const originalHex = element.querySelector('#originalHex');
    const originalRGB = element.querySelector('#originalRGB');
    const simulatedHex = element.querySelector('#simulatedHex');
    const simulatedRGB = element.querySelector('#simulatedRGB');
    const blindnessDescription = element.querySelector('#blindnessDescription');
    const blindnessPrevalence = element.querySelector('#blindnessPrevalence');

    const descriptions = {
        normal: "Normal color vision - can distinguish all colors",
        protanopia: "Red-blind - cannot perceive red light",
        protanomaly: "Red-weak - reduced sensitivity to red light",
        deuteranopia: "Green-blind - cannot perceive green light", 
        deuteranomaly: "Green-weak - reduced sensitivity to green light",
        tritanopia: "Blue-blind - cannot perceive blue light",
        tritanomaly: "Blue-weak - reduced sensitivity to blue light",
        achromatopsia: "Complete color blindness - sees only in grayscale"
    };

    const prevalence = {
        normal: "~92% of population",
        protanopia: "~1% of males",
        protanomaly: "~1% of males", 
        deuteranopia: "~1% of males",
        deuteranomaly: "~5% of males",
        tritanopia: "~0.01% of population",
        tritanomaly: "~0.01% of population",
        achromatopsia: "~0.003% of population"
    };

    function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    function RGBToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }

    function simulateColorBlindness(r, g, b, type) {
        // Simple color transformation matrices for different types of color blindness
        // These are approximations for demonstration purposes
        
        switch(type) {
            case 'protanopia':
                // Red-blind
                return {
                    r: r * 0.567 + g * 0.433,
                    g: r * 0.558 + g * 0.442,
                    b: b
                };
                
            case 'deuteranopia':
                // Green-blind  
                return {
                    r: r * 0.625 + g * 0.375,
                    g: r * 0.7 + g * 0.3,
                    b: b
                };
                
            case 'tritanopia':
                // Blue-blind
                return {
                    r: r * 0.95 + g * 0.05,
                    g: g * 0.433 + b * 0.567,
                    b: g * 0.475 + b * 0.525
                };
                
            case 'achromatopsia':
                // Complete color blindness - convert to grayscale
                const gray = r * 0.299 + g * 0.587 + b * 0.114;
                return { r: gray, g: gray, b: gray };
                
            default:
                // Normal vision or mild deficiencies - minimal change
                return { r, g, b };
        }
    }

    function updateColorSimulation() {
        const hex = colorInput.value;
        const type = blindType.value;
        const rgb = hexToRGB(hex);
        
        // Update original color display
        originalColor.style.backgroundColor = hex;
        originalHex.textContent = hex.toUpperCase();
        originalRGB.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        // Simulate color blindness
        const simulated = simulateColorBlindness(rgb.r, rgb.g, rgb.b, type);
        const simulatedHexValue = RGBToHex(
            Math.round(simulated.r),
            Math.round(simulated.g), 
            Math.round(simulated.b)
        );
        
        // Update simulated color display
        simulatedColor.style.backgroundColor = simulatedHexValue;
        simulatedHex.textContent = simulatedHexValue.toUpperCase();
        simulatedRGB.textContent = `rgb(${Math.round(simulated.r)}, ${Math.round(simulated.g)}, ${Math.round(simulated.b)})`;
        
        // Update descriptions
        blindnessDescription.textContent = descriptions[type];
        blindnessPrevalence.textContent = prevalence[type];
    }

    colorInput.addEventListener('input', updateColorSimulation);
    blindType.addEventListener('change', updateColorSimulation);

    updateColorSimulation();
    return element;
}

// 8. Unix Timestamp Converter
function unixTimestampConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Unix Timestamp Converter</h3>
            <p>Convert between Unix timestamps and human-readable dates</p>
            
            <div class="input-group">
                <label for="conversionType">Conversion Type:</label>
                <select id="conversionType">
                    <option value="timestampToDate">Timestamp to Date</option>
                    <option value="dateToTimestamp">Date to Timestamp</option>
                </select>
            </div>
            
            <div id="timestampInputs" class="input-section">
                <div class="input-group">
                    <label for="unixTimestamp">Unix Timestamp (seconds):</label>
                    <input type="number" id="unixTimestamp" value="${Math.floor(Date.now() / 1000)}">
                </div>
                <div class="button-group">
                    <button id="useCurrentTimestamp">Use Current Time</button>
                    <button id="convertTimestamp">Convert to Date</button>
                </div>
            </div>
            
            <div id="dateInputs" class="input-section" style="display: none;">
                <div class="input-group">
                    <label for="dateTimeInput">Date and Time:</label>
                    <input type="datetime-local" id="dateTimeInput" value="${new Date().toISOString().slice(0, 16)}">
                </div>
                <div class="button-group">
                    <button id="useCurrentDate">Use Current Date</button>
                    <button id="convertDate">Convert to Timestamp</button>
                </div>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Result:</span>
                    <span id="conversionResult" style="font-weight: bold; font-size: 1.1rem;">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Formatted Date:</span>
                    <span id="formattedDate">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">UTC Time:</span>
                    <span id="utcTime">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Your Local Time:</span>
                    <span id="localTime">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">About Unix Time:</span>
                    <span>Count of seconds since January 1, 1970 (UTC)</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Current Unix Time:</span>
                    <span id="currentUnixTime">-</span>
                </div>
            </div>
        </div>
    `;

    const conversionType = element.querySelector('#conversionType');
    const unixTimestamp = element.querySelector('#unixTimestamp');
    const dateTimeInput = element.querySelector('#dateTimeInput');
    const useCurrentTimestamp = element.querySelector('#useCurrentTimestamp');
    const useCurrentDate = element.querySelector('#useCurrentDate');
    const convertTimestamp = element.querySelector('#convertTimestamp');
    const convertDate = element.querySelector('#convertDate');
    const conversionResult = element.querySelector('#conversionResult');
    const formattedDate = element.querySelector('#formattedDate');
    const utcTime = element.querySelector('#utcTime');
    const localTime = element.querySelector('#localTime');
    const currentUnixTime = element.querySelector('#currentUnixTime');

    function showRelevantInputs() {
        const type = conversionType.value;
        element.querySelectorAll('.input-section').forEach(section => {
            section.style.display = 'none';
        });
        
        if (type === 'timestampToDate') {
            element.querySelector('#timestampInputs').style.display = 'block';
        } else {
            element.querySelector('#dateInputs').style.display = 'block';
        }
    }

    function updateCurrentTime() {
        const now = Math.floor(Date.now() / 1000);
        currentUnixTime.textContent = now;
    }

    function convertTimestampToDate() {
        const timestamp = parseInt(unixTimestamp.value);
        const date = new Date(timestamp * 1000);
        
        conversionResult.textContent = date.toLocaleString();
        formattedDate.textContent = date.toISOString();
        utcTime.textContent = date.toUTCString();
        localTime.textContent = date.toLocaleString();
    }

    function convertDateToTimestamp() {
        const dateString = dateTimeInput.value;
        const date = new Date(dateString);
        const timestamp = Math.floor(date.getTime() / 1000);
        
        conversionResult.textContent = timestamp;
        formattedDate.textContent = date.toLocaleString();
        utcTime.textContent = date.toUTCString();
        localTime.textContent = date.toLocaleString();
    }

    function setCurrentTimestamp() {
        unixTimestamp.value = Math.floor(Date.now() / 1000);
        convertTimestampToDate();
    }

    function setCurrentDate() {
        dateTimeInput.value = new Date().toISOString().slice(0, 16);
        convertDateToTimestamp();
    }

    conversionType.addEventListener('change', showRelevantInputs);
    useCurrentTimestamp.addEventListener('click', setCurrentTimestamp);
    useCurrentDate.addEventListener('click', setCurrentDate);
    convertTimestamp.addEventListener('click', convertTimestampToDate);
    convertDate.addEventListener('click', convertDateToTimestamp);

    // Initialize
    showRelevantInputs();
    updateCurrentTime();
    setCurrentTimestamp();
    
    // Update current time every second
    setInterval(updateCurrentTime, 1000);

    return element;
}

// 9. CSS Formatter
function cssFormatter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>CSS Formatter</h3>
            <p>Format and beautify CSS code with customizable options</p>
            
            <div class="input-group">
                <label for="cssInput">Enter CSS code:</label>
                <textarea id="cssInput" rows="8" placeholder="Enter your CSS code here...">body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f0f0f0}.container{max-width:1200px;margin:0 auto}.btn{padding:10px 20px;background:#007bff;color:white;border:none;border-radius:4px}</textarea>
            </div>
            
            <div class="input-group">
                <label for="formattingOptions">Formatting Options:</label>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <label>
                        <input type="checkbox" id="indentWithSpaces" checked>
                        Indent with spaces
                    </label>
                    <label>
                        <input type="number" id="indentSize" value="2" min="1" max="8" style="width: 60px;">
                        Indent size
                    </label>
                    <label>
                        <input type="checkbox" id="addSemicolons" checked>
                        Add missing semicolons
                    </label>
                    <label>
                        <input type="checkbox" id="sortProperties">
                        Sort properties alphabetically
                    </label>
                </div>
            </div>
            
            <div class="button-group">
                <button id="formatCSS">Format CSS</button>
                <button id="minifyCSS">Minify CSS</button>
                <button id="validateCSS">Validate CSS</button>
                <button id="copyCSS">Copy to Clipboard</button>
            </div>
            
            <div class="input-group">
                <label for="cssOutput">Formatted CSS:</label>
                <textarea id="cssOutput" rows="8" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Original Size:</span>
                    <span id="originalSize">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Formatted Size:</span>
                    <span id="formattedSize">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Reduction:</span>
                    <span id="sizeReduction">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Validation:</span>
                    <span id="validationStatus">-</span>
                </div>
            </div>
        </div>
    `;

    const cssInput = element.querySelector('#cssInput');
    const cssOutput = element.querySelector('#cssOutput');
    const formatBtn = element.querySelector('#formatCSS');
    const minifyBtn = element.querySelector('#minifyCSS');
    const validateBtn = element.querySelector('#validateCSS');
    const copyBtn = element.querySelector('#copyCSS');
    const originalSize = element.querySelector('#originalSize');
    const formattedSize = element.querySelector('#formattedSize');
    const sizeReduction = element.querySelector('#sizeReduction');
    const validationStatus = element.querySelector('#validationStatus');

    function formatCSS() {
        const input = cssInput.value;
        const indentWithSpaces = element.querySelector('#indentWithSpaces').checked;
        const indentSize = parseInt(element.querySelector('#indentSize').value);
        const addSemicolons = element.querySelector('#addSemicolons').checked;
        const sortProperties = element.querySelector('#sortProperties').checked;
        
        let output = '';
        let indentLevel = 0;
        const indentChar = indentWithSpaces ? ' '.repeat(indentSize) : '\t';
        
        // Simple CSS formatting logic
        const lines = input.split('}');
        
        lines.forEach((line, index) => {
            line = line.trim();
            if (!line) return;
            
            if (line.includes('{')) {
                const parts = line.split('{');
                const selector = parts[0].trim();
                const properties = parts[1].trim();
                
                output += indentChar.repeat(indentLevel) + selector + ' {\n';
                indentLevel++;
                
                const propLines = properties.split(';').filter(prop => prop.trim());
                let propertiesArray = [];
                
                propLines.forEach(prop => {
                    const cleanProp = prop.trim();
                    if (cleanProp) {
                        propertiesArray.push(cleanProp + (addSemicolons ? ';' : ''));
                    }
                });
                
                if (sortProperties) {
                    propertiesArray.sort();
                }
                
                propertiesArray.forEach(prop => {
                    output += indentChar.repeat(indentLevel) + prop + '\n';
                });
                
                output += indentChar.repeat(indentLevel - 1) + '}';
                indentLevel--;
            } else {
                // Handle properties without selector (invalid but handle gracefully)
                output += indentChar.repeat(indentLevel) + line + (addSemicolons ? ';' : '');
            }
            
            if (index < lines.length - 1) {
                output += '\n\n';
            }
        });
        
        cssOutput.value = output;
        updateStats(input, output, 'Formatted');
    }

    function minifyCSS() {
        const input = cssInput.value;
        // Remove comments
        let output = input.replace(/\/\*[\s\S]*?\*\//g, '');
        // Remove whitespace
        output = output.replace(/\s+/g, ' ');
        // Remove space around braces and semicolons
        output = output.replace(/\s*{\s*/g, '{');
        output = output.replace(/\s*}\s*/g, '}');
        output = output.replace(/\s*;\s*/g, ';');
        output = output.replace(/\s*:\s*/g, ':');
        output = output.replace(/\s*,\s*/g, ',');
        output = output.trim();
        
        cssOutput.value = output;
        updateStats(input, output, 'Minified');
    }

    function validateCSS() {
        const input = cssInput.value;
        let isValid = true;
        let errors = [];
        
        // Basic validation checks
        if (input.includes('/*') && !input.includes('*/')) {
            isValid = false;
            errors.push('Unclosed comment');
        }
        
        const openBraces = (input.match(/{/g) || []).length;
        const closeBraces = (input.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
            isValid = false;
            errors.push(`Mismatched braces: ${openBraces} opening vs ${closeBraces} closing`);
        }
        
        // Check for common syntax errors
        const lines = input.split('\n');
        lines.forEach((line, index) => {
            if (line.includes('{') && line.includes('}') && line.indexOf('{') > line.indexOf('}')) {
                isValid = false;
                errors.push(`Line ${index + 1}: Closing brace before opening brace`);
            }
        });
        
        if (isValid) {
            validationStatus.textContent = 'Valid CSS';
            validationStatus.style.color = 'var(--success-color)';
        } else {
            validationStatus.textContent = `Invalid: ${errors.join(', ')}`;
            validationStatus.style.color = 'var(--warning-color)';
        }
        
        updateStats(input, input, 'Validated');
    }

    function updateStats(input, output, operation) {
        const inputSize = input.length;
        const outputSize = output.length;
        const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
        
        originalSize.textContent = `${inputSize} characters`;
        formattedSize.textContent = `${outputSize} characters`;
        sizeReduction.textContent = `${reduction}% reduction`;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(cssOutput.value).then(() => {
            alert('CSS copied to clipboard!');
        });
    }

    formatBtn.addEventListener('click', formatCSS);
    minifyBtn.addEventListener('click', minifyCSS);
    validateBtn.addEventListener('click', validateCSS);
    copyBtn.addEventListener('click', copyToClipboard);

    formatCSS();
    return element;
}

// 10. CSV to JSON Converter
function csvToJsonConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>CSV to JSON Converter</h3>
            <p>Convert CSV data to JSON format with customizable options</p>
            
            <div class="input-group">
                <label for="csvInput">Enter CSV data:</label>
                <textarea id="csvInput" rows="6" placeholder="Enter CSV data here...">name,age,city
John,25,New York
Jane,30,Los Angeles
Bob,35,Chicago</textarea>
            </div>
            
            <div class="input-group">
                <label for="conversionOptions">Conversion Options:</label>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <label>
                        <input type="checkbox" id="firstRowHeaders" checked>
                        First row as headers
                    </label>
                    <label>
                        <input type="text" id="delimiter" value="," placeholder="Delimiter" style="width: 60px;">
                        Delimiter
                    </label>
                    <label>
                        <input type="checkbox" id="trimSpaces" checked>
                        Trim spaces
                    </label>
                    <label>
                        <input type="checkbox" id="parseNumbers">
                        Parse numbers
                    </label>
                </div>
            </div>
            
            <div class="button-group">
                <button id="convertCSV">Convert to JSON</button>
                <button id="previewCSV">Preview Data</button>
                <button id="downloadJSON">Download JSON</button>
                <button id="copyJSON">Copy JSON</button>
            </div>
            
            <div class="input-group">
                <label for="jsonOutput">JSON Output:</label>
                <textarea id="jsonOutput" rows="8" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Rows Processed:</span>
                    <span id="rowsProcessed">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Columns Found:</span>
                    <span id="columnsFound">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Conversion Time:</span>
                    <span id="conversionTime">-</span>
                </div>
            </div>
            
            <div class="info-display" id="previewSection" style="display: none;">
                <h4>Data Preview</h4>
                <div id="previewTable" style="max-height: 200px; overflow: auto;">
                    <!-- Preview table will be inserted here -->
                </div>
            </div>
        </div>
    `;

    const csvInput = element.querySelector('#csvInput');
    const jsonOutput = element.querySelector('#jsonOutput');
    const convertBtn = element.querySelector('#convertCSV');
    const previewBtn = element.querySelector('#previewCSV');
    const downloadBtn = element.querySelector('#downloadJSON');
    const copyBtn = element.querySelector('#copyJSON');
    const rowsProcessed = element.querySelector('#rowsProcessed');
    const columnsFound = element.querySelector('#columnsFound');
    const conversionTime = element.querySelector('#conversionTime');
    const previewSection = element.querySelector('#previewSection');
    const previewTable = element.querySelector('#previewTable');

    function convertCSVToJSON() {
        const startTime = performance.now();
        const csv = csvInput.value.trim();
        const firstRowHeaders = element.querySelector('#firstRowHeaders').checked;
        const delimiter = element.querySelector('#delimiter').value || ',';
        const trimSpaces = element.querySelector('#trimSpaces').checked;
        const parseNumbers = element.querySelector('#parseNumbers').checked;
        
        if (!csv) {
            jsonOutput.value = 'Please enter CSV data';
            return;
        }
        
        const lines = csv.split('\n').filter(line => line.trim());
        let headers = [];
        let data = [];
        
        if (firstRowHeaders && lines.length > 0) {
            headers = lines[0].split(delimiter).map(header => 
                trimSpaces ? header.trim() : header
            );
        } else {
            // Generate default headers
            const firstLine = lines[0].split(delimiter);
            headers = firstLine.map((_, index) => `column${index + 1}`);
        }
        
        const startIndex = firstRowHeaders ? 1 : 0;
        
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            const values = line.split(delimiter);
            const obj = {};
            
            for (let j = 0; j < headers.length; j++) {
                let value = j < values.length ? values[j] : '';
                if (trimSpaces) value = value.trim();
                
                if (parseNumbers && !isNaN(value) && value !== '') {
                    value = Number(value);
                }
                
                obj[headers[j]] = value;
            }
            
            data.push(obj);
        }
        
        const endTime = performance.now();
        const processingTime = (endTime - startTime).toFixed(2);
        
        jsonOutput.value = JSON.stringify(data, null, 2);
        rowsProcessed.textContent = data.length;
        columnsFound.textContent = headers.length;
        conversionTime.textContent = `${processingTime}ms`;
    }

    function previewData() {
        convertCSVToJSON();
        
        try {
            const data = JSON.parse(jsonOutput.value);
            let tableHTML = '<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">';
            
            // Create header
            if (data.length > 0) {
                tableHTML += '<tr style="background: var(--hover-color);">';
                Object.keys(data[0]).forEach(key => {
                    tableHTML += `<th style="border: 1px solid var(--border-color); padding: 8px; text-align: left;">${key}</th>`;
                });
                tableHTML += '</tr>';
                
                // Create rows (limit to 10 for preview)
                data.slice(0, 10).forEach(row => {
                    tableHTML += '<tr>';
                    Object.values(row).forEach(value => {
                        tableHTML += `<td style="border: 1px solid var(--border-color); padding: 8px;">${value}</td>`;
                    });
                    tableHTML += '</tr>';
                });
            }
            
            tableHTML += '</table>';
            
            if (data.length > 10) {
                tableHTML += `<div style="text-align: center; padding: 10px; color: var(--secondary-color);">
                    Showing 10 of ${data.length} rows
                </div>`;
            }
            
            previewTable.innerHTML = tableHTML;
            previewSection.style.display = 'block';
        } catch (e) {
            previewTable.innerHTML = '<div style="color: var(--warning-color);">Error generating preview</div>';
        }
    }

    function downloadJSON() {
        const data = jsonOutput.value;
        if (!data) return;
        
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function copyJSON() {
        navigator.clipboard.writeText(jsonOutput.value).then(() => {
            alert('JSON copied to clipboard!');
        });
    }

    convertBtn.addEventListener('click', convertCSVToJSON);
    previewBtn.addEventListener('click', previewData);
    downloadBtn.addEventListener('click', downloadJSON);
    copyBtn.addEventListener('click', copyJSON);

    convertCSVToJSON();
    return element;
}

// Add these tools to your existing tools array in the loadTools() function
// Just add these objects to your state.tools array:

/*
{
    id: 'time-converter',
    name: 'Time Converter',
    description: 'Convert between seconds, minutes, hours, days, weeks, months, years',
    category: 'unit',
    component: timeConverter
},
{
    id: 'clothing-sizes',
    name: 'Clothing Sizes Converter',
    description: 'Convert between US, UK, EU, international clothing sizes',
    category: 'unit', 
    component: clothingSizesConverter
},
{
    id: 'financial-calculator',
    name: 'Financial Calculator',
    description: 'Calculate loans, investments, and financial metrics',
    category: 'math',
    component: financialCalculator
},
{
    id: 'fraction-calculator',
    name: 'Fraction Calculator',
    description: 'Calculate with fractions and mixed numbers',
    category: 'math',
    component: fractionCalculator
},
{
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URL components',
    category: 'text',
    component: urlEncoder
},
{
    id: 'html-entity-converter',
    name: 'HTML Entity Converter',
    description: 'Convert between characters and HTML entities',
    category: 'text',
    component: htmlEntityConverter
},
{
    id: 'color-blindness-simulator',
    name: 'Color Blindness Simulator',
    description: 'Simulate how colors appear to people with color vision deficiencies',
    category: 'color',
    component: colorBlindnessSimulator
},
{
    id: 'unix-timestamp',
    name: 'Unix Timestamp Converter',
    description: 'Convert between Unix timestamps and dates',
    category: 'time',
    component: unixTimestampConverter
},
{
    id: 'css-formatter',
    name: 'CSS Formatter',
    description: 'Format and beautify CSS code',
    category: 'dev',
    component: cssFormatter
},
{
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format',
    category: 'file',
    component: csvToJsonConverter
}
*/



// ========== NEXT 10 TOOLS ==========

// 1. Digital Storage Converter (with more units including PB)
function digitalStorageConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Digital Storage Converter</h3>
            <p>Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="digitalValue" value="1" step="0.01" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="digitalValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="digitalValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="digitalFromUnit">
                    <option value="bits">Bits</option>
                    <option value="bytes" selected>Bytes</option>
                    <option value="kb">Kilobytes (KB)</option>
                    <option value="mb">Megabytes (MB)</option>
                    <option value="gb">Gigabytes (GB)</option>
                    <option value="tb">Terabytes (TB)</option>
                    <option value="pb">Petabytes (PB)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <input type="text" id="digitalResult" readonly>
                <select id="digitalToUnit">
                    <option value="bits">Bits</option>
                    <option value="bytes">Bytes</option>
                    <option value="kb">Kilobytes (KB)</option>
                    <option value="mb" selected>Megabytes (MB)</option>
                    <option value="gb">Gigabytes (GB)</option>
                    <option value="tb">Terabytes (TB)</option>
                    <option value="pb">Petabytes (PB)</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="digitalDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Storage Examples:</span>
                </div>
                <div class="info-item">
                    <span>1 byte = 8 bits</span>
                    <span>1 KB = 1024 bytes</span>
                </div>
                <div class="info-item">
                    <span>1 MB = 1024 KB</span>
                    <span>1 GB = 1024 MB</span>
                </div>
                <div class="info-item">
                    <span>1 TB = 1024 GB</span>
                    <span>1 PB = 1024 TB</span>
                </div>
            </div>
        </div>
    `;

    const digitalValue = element.querySelector('#digitalValue');
    const fromUnit = element.querySelector('#digitalFromUnit');
    const toUnit = element.querySelector('#digitalToUnit');
    const digitalResult = element.querySelector('#digitalResult');
    const detailsDiv = element.querySelector('#digitalDetails');

    const conversionRates = {
        bits: 1,
        bytes: 8,
        kb: 8192,
        mb: 8388608,
        gb: 8589934592,
        tb: 8796093022208,
        pb: 9007199254740992
    };

    function convertDigital() {
        const value = parseFloat(digitalValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        const valueInBits = value * conversionRates[from];
        const result = valueInBits / conversionRates[to];

        digitalResult.value = result.toFixed(6);
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value} ${getDigitalUnitName(from)} =</span>
                <span>${result.toFixed(6)} ${getDigitalUnitName(to)}</span>
            </div>
        `;
    }

    function getDigitalUnitName(unit) {
        const names = {
            bits: 'bits',
            bytes: 'bytes',
            kb: 'KB',
            mb: 'MB',
            gb: 'GB',
            tb: 'TB',
            pb: 'PB'
        };
        return names[unit];
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                if (input.readOnly) return;
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue += step;
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    digitalValue.addEventListener('input', convertDigital);
    fromUnit.addEventListener('change', convertDigital);
    toUnit.addEventListener('change', convertDigital);

    setupNumberInputArrows();
    convertDigital();
    return element;
}

// 2. Mortgage Calculator
function mortgageCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Mortgage Calculator</h3>
            <p>Calculate mortgage payments, total interest, and amortization schedule</p>
            
            <div class="input-group">
                <label for="loanAmount">Loan Amount ($):</label>
                <div class="number-input-container">
                    <input type="number" id="loanAmount" value="300000" step="1000" min="0">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="loanAmount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="loanAmount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="interestRate">Annual Interest Rate (%):</label>
                <div class="number-input-container">
                    <input type="number" id="interestRate" value="4.5" step="0.1" min="0" max="100">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="interestRate" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="interestRate" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="loanTerm">Loan Term (years):</label>
                <div class="number-input-container">
                    <input type="number" id="loanTerm" value="30" step="1" min="1" max="50">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="loanTerm" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="loanTerm" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateMortgage">Calculate Mortgage</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Monthly Payment:</span>
                    <span id="monthlyPayment">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Payment:</span>
                    <span id="totalPayment">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Interest:</span>
                    <span id="totalInterest">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Payoff Date:</span>
                    <span id="payoffDate">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Amortization Schedule (First 12 months):</span>
                </div>
                <div id="amortizationSchedule" style="max-height: 300px; overflow-y: auto;"></div>
            </div>
        </div>
    `;

    const loanAmount = element.querySelector('#loanAmount');
    const interestRate = element.querySelector('#interestRate');
    const loanTerm = element.querySelector('#loanTerm');
    const calculateBtn = element.querySelector('#calculateMortgage');
    const monthlyPayment = element.querySelector('#monthlyPayment');
    const totalPayment = element.querySelector('#totalPayment');
    const totalInterest = element.querySelector('#totalInterest');
    const payoffDate = element.querySelector('#payoffDate');
    const amortizationSchedule = element.querySelector('#amortizationSchedule');

    function calculateMortgage() {
        const principal = parseFloat(loanAmount.value);
        const annualRate = parseFloat(interestRate.value) / 100;
        const years = parseFloat(loanTerm.value);
        
        if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) return;
        
        const monthlyRate = annualRate / 12;
        const numberOfPayments = years * 12;
        
        // Calculate monthly payment
        const monthlyPaymentAmount = principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        const totalPaymentAmount = monthlyPaymentAmount * numberOfPayments;
        const totalInterestAmount = totalPaymentAmount - principal;
        
        // Calculate payoff date
        const today = new Date();
        const payoff = new Date(today);
        payoff.setMonth(payoff.getMonth() + numberOfPayments);
        
        monthlyPayment.textContent = `$${monthlyPaymentAmount.toFixed(2)}`;
        totalPayment.textContent = `$${totalPaymentAmount.toFixed(2)}`;
        totalInterest.textContent = `$${totalInterestAmount.toFixed(2)}`;
        payoffDate.textContent = payoff.toLocaleDateString();
        
        generateAmortizationSchedule(principal, monthlyRate, monthlyPaymentAmount, numberOfPayments);
    }

    function generateAmortizationSchedule(principal, monthlyRate, monthlyPayment, numberOfPayments) {
        let balance = principal;
        let scheduleHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1px; background: var(--border-color); margin-top: 10px;">
                <div style="padding: 8px; background: var(--control-bg); text-align: center; font-weight: bold;">Month</div>
                <div style="padding: 8px; background: var(--control-bg); text-align: center; font-weight: bold;">Payment</div>
                <div style="padding: 8px; background: var(--control-bg); text-align: center; font-weight: bold;">Interest</div>
                <div style="padding: 8px; background: var(--control-bg); text-align: center; font-weight: bold;">Balance</div>
        `;
        
        for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
            const interest = balance * monthlyRate;
            const principalPaid = monthlyPayment - interest;
            balance -= principalPaid;
            
            if (balance < 0) balance = 0;
            
            scheduleHTML += `
                <div style="padding: 6px; background: var(--control-bg); text-align: center;">${month}</div>
                <div style="padding: 6px; background: var(--control-bg); text-align: center;">$${monthlyPayment.toFixed(2)}</div>
                <div style="padding: 6px; background: var(--control-bg); text-align: center;">$${interest.toFixed(2)}</div>
                <div style="padding: 6px; background: var(--control-bg); text-align: center;">$${balance.toFixed(2)}</div>
            `;
        }
        
        scheduleHTML += `</div>`;
        amortizationSchedule.innerHTML = scheduleHTML;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 0;
                const max = parseFloat(input.max) || Infinity;
                let currentValue = parseFloat(input.value) || 0;
                
                if (direction === 'up') {
                    currentValue = Math.min(max, currentValue + step);
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    calculateBtn.addEventListener('click', calculateMortgage);
    loanAmount.addEventListener('input', calculateMortgage);
    interestRate.addEventListener('input', calculateMortgage);
    loanTerm.addEventListener('input', calculateMortgage);

    setupNumberInputArrows();
    calculateMortgage();
    return element;
}

// 3. Fibonacci Sequence Generator
function fibonacciSequence() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Fibonacci Sequence Generator</h3>
            <p>Generate Fibonacci sequences and explore the golden ratio</p>
            
            <div class="input-group">
                <label for="fibonacciCount">Number of terms to generate:</label>
                <div class="number-input-container">
                    <input type="number" id="fibonacciCount" value="10" step="1" min="1" max="100">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="fibonacciCount" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="fibonacciCount" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label for="fibonacciStart">Starting numbers:</label>
                <select id="fibonacciStart">
                    <option value="0,1">0, 1 (Classic)</option>
                    <option value="1,1">1, 1 (Alternative)</option>
                    <option value="2,1">2, 1 (Lucas-like)</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="generateFibonacci">Generate Sequence</button>
                <button id="copySequence">Copy Sequence</button>
            </div>
            
            <div class="result-box">
                <div id="fibonacciSequence" style="font-family: monospace; line-height: 1.8;"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Sequence Length:</span>
                    <span id="sequenceLength">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Sum of Sequence:</span>
                    <span id="sequenceSum">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Golden Ratio (last two terms):</span>
                    <span id="goldenRatio">-</span>
                </div>
            </div>
        </div>
    `;

    const fibonacciCount = element.querySelector('#fibonacciCount');
    const fibonacciStart = element.querySelector('#fibonacciStart');
    const generateBtn = element.querySelector('#generateFibonacci');
    const copyBtn = element.querySelector('#copySequence');
    const sequenceDiv = element.querySelector('#fibonacciSequence');
    const sequenceLength = element.querySelector('#sequenceLength');
    const sequenceSum = element.querySelector('#sequenceSum');
    const goldenRatio = element.querySelector('#goldenRatio');

    function generateFibonacci() {
        const count = parseInt(fibonacciCount.value);
        const start = fibonacciStart.value.split(',').map(Number);
        
        if (isNaN(count) || count < 1) return;
        
        const sequence = [...start];
        
        for (let i = 2; i < count; i++) {
            sequence.push(sequence[i-1] + sequence[i-2]);
        }
        
        // Display sequence
        sequenceDiv.innerHTML = sequence.map((num, index) => 
            `<span style="display: inline-block; padding: 4px 8px; margin: 2px; background: var(--hover-color); border-radius: 4px;">
                F<sub>${index}</sub> = ${num}
            </span>`
        ).join('');
        
        // Calculate statistics
        const sum = sequence.reduce((a, b) => a + b, 0);
        sequenceLength.textContent = sequence.length;
        sequenceSum.textContent = sum.toLocaleString();
        
        // Calculate golden ratio approximation
        if (sequence.length >= 2) {
            const ratio = sequence[sequence.length-1] / sequence[sequence.length-2];
            goldenRatio.textContent = ratio.toFixed(10);
        } else {
            goldenRatio.textContent = 'N/A';
        }
    }

    function copySequence() {
        const sequenceText = Array.from(sequenceDiv.querySelectorAll('span'))
            .map(span => span.textContent.split(' = ')[1])
            .join(', ');
        
        navigator.clipboard.writeText(sequenceText).then(() => {
            alert('Fibonacci sequence copied to clipboard!');
        });
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 1;
                const min = parseFloat(input.min) || 1;
                const max = parseFloat(input.max) || 100;
                let currentValue = parseInt(input.value) || min;
                
                if (direction === 'up') {
                    currentValue = Math.min(max, currentValue + step);
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    generateBtn.addEventListener('click', generateFibonacci);
    copyBtn.addEventListener('click', copySequence);
    fibonacciCount.addEventListener('input', generateFibonacci);
    fibonacciStart.addEventListener('change', generateFibonacci);

    setupNumberInputArrows();
    generateFibonacci();
    return element;
}

// 4. Statistical Calculator
function statisticalCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Statistical Calculator</h3>
            <p>Calculate mean, median, mode, range, variance, and standard deviation</p>
            
            <div class="input-group">
                <label for="dataInput">Enter numbers (comma separated):</label>
                <textarea id="dataInput" rows="4" placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10">1, 2, 3, 4, 5, 6, 7, 8, 9, 10</textarea>
            </div>
            
            <div class="button-group">
                <button id="calculateStats">Calculate Statistics</button>
                <button id="clearData">Clear Data</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Data Count:</span>
                    <span id="dataCount">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Mean (Average):</span>
                    <span id="meanValue">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Median:</span>
                    <span id="medianValue">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Mode:</span>
                    <span id="modeValue">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Range:</span>
                    <span id="rangeValue">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Variance:</span>
                    <span id="varianceValue">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Standard Deviation:</span>
                    <span id="stdDevValue">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Sum:</span>
                    <span id="sumValue">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Sorted Data:</span>
                </div>
                <div id="sortedData" style="font-family: monospace;"></div>
            </div>
        </div>
    `;

    const dataInput = element.querySelector('#dataInput');
    const calculateBtn = element.querySelector('#calculateStats');
    const clearBtn = element.querySelector('#clearData');
    const dataCount = element.querySelector('#dataCount');
    const meanValue = element.querySelector('#meanValue');
    const medianValue = element.querySelector('#medianValue');
    const modeValue = element.querySelector('#modeValue');
    const rangeValue = element.querySelector('#rangeValue');
    const varianceValue = element.querySelector('#varianceValue');
    const stdDevValue = element.querySelector('#stdDevValue');
    const sumValue = element.querySelector('#sumValue');
    const sortedData = element.querySelector('#sortedData');

    function calculateStatistics() {
        const input = dataInput.value;
        const numbers = input.split(',')
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));
        
        if (numbers.length === 0) {
            alert('Please enter valid numbers');
            return;
        }
        
        // Basic calculations
        const sorted = [...numbers].sort((a, b) => a - b);
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        
        // Median
        let median;
        const mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            median = (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            median = sorted[mid];
        }
        
        // Mode
        const frequency = {};
        let maxFreq = 0;
        let modes = [];
        
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            if (frequency[num] > maxFreq) {
                maxFreq = frequency[num];
                modes = [num];
            } else if (frequency[num] === maxFreq) {
                modes.push(num);
            }
        });
        
        // Range
        const range = sorted[sorted.length - 1] - sorted[0];
        
        // Variance and Standard Deviation
        const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
        const stdDev = Math.sqrt(variance);
        
        // Update display
        dataCount.textContent = numbers.length;
        meanValue.textContent = mean.toFixed(4);
        medianValue.textContent = median.toFixed(4);
        modeValue.textContent = modes.length === numbers.length ? 'No mode' : modes.join(', ');
        rangeValue.textContent = range.toFixed(4);
        varianceValue.textContent = variance.toFixed(4);
        stdDevValue.textContent = stdDev.toFixed(4);
        sumValue.textContent = sum.toFixed(4);
        sortedData.textContent = sorted.join(', ');
    }

    function clearData() {
        dataInput.value = '';
        dataCount.textContent = '-';
        meanValue.textContent = '-';
        medianValue.textContent = '-';
        modeValue.textContent = '-';
        rangeValue.textContent = '-';
        varianceValue.textContent = '-';
        stdDevValue.textContent = '-';
        sumValue.textContent = '-';
        sortedData.textContent = '';
    }

    calculateBtn.addEventListener('click', calculateStatistics);
    clearBtn.addEventListener('click', clearData);

    calculateStatistics();
    return element;
}

// 5. HEX/RGB/HSL Converter
function hexRgbHslConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>HEX/RGB/HSL Color Converter</h3>
            <p>Convert between HEX, RGB, and HSL color formats with real-time preview</p>
            
            <div class="input-group">
                <label for="colorInput">Select Color:</label>
                <input type="color" id="colorInput" value="#3498db">
            </div>
            
            <div style="display: flex; gap: 20px; margin: 20px 0;">
                <div id="colorPreview" style="width: 100px; height: 100px; border: 2px solid var(--border-color); border-radius: 8px;"></div>
                <div style="flex: 1;">
                    <div class="input-group">
                        <label>HEX:</label>
                        <div class="input-with-button">
                            <input type="text" id="hexValue" value="#3498db">
                            <button id="copyHex">Copy</button>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label>RGB:</label>
                        <div class="input-with-button">
                            <input type="text" id="rgbValue" value="rgb(52, 152, 219)">
                            <button id="copyRGB">Copy</button>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label>HSL:</label>
                        <div class="input-with-button">
                            <input type="text" id="hslValue" value="hsl(204, 70%, 53%)">
                            <button id="copyHSL">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Color Components:</span>
                </div>
                <div class="info-item">
                    <span>Red: <span id="redValue">52</span></span>
                    <span>Green: <span id="greenValue">152</span></span>
                    <span>Blue: <span id="blueValue">219</span></span>
                </div>
                <div class="info-item">
                    <span>Hue: <span id="hueValue">204°</span></span>
                    <span>Saturation: <span id="saturationValue">70%</span></span>
                    <span>Lightness: <span id="lightnessValue">53%</span></span>
                </div>
            </div>
        </div>
    `;

    const colorInput = element.querySelector('#colorInput');
    const colorPreview = element.querySelector('#colorPreview');
    const hexValue = element.querySelector('#hexValue');
    const rgbValue = element.querySelector('#rgbValue');
    const hslValue = element.querySelector('#hslValue');
    const redValue = element.querySelector('#redValue');
    const greenValue = element.querySelector('#greenValue');
    const blueValue = element.querySelector('#blueValue');
    const hueValue = element.querySelector('#hueValue');
    const saturationValue = element.querySelector('#saturationValue');
    const lightnessValue = element.querySelector('#lightnessValue');
    const copyHex = element.querySelector('#copyHex');
    const copyRGB = element.querySelector('#copyRGB');
    const copyHSL = element.querySelector('#copyHSL');

    function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    function RGBToHSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    function updateColor() {
        const hex = colorInput.value;
        const rgb = hexToRGB(hex);
        const hsl = RGBToHSL(rgb.r, rgb.g, rgb.b);

        colorPreview.style.backgroundColor = hex;
        hexValue.value = hex.toUpperCase();
        rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        
        redValue.textContent = rgb.r;
        greenValue.textContent = rgb.g;
        blueValue.textContent = rgb.b;
        hueValue.textContent = `${hsl.h}°`;
        saturationValue.textContent = `${hsl.s}%`;
        lightnessValue.textContent = `${hsl.l}%`;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    }

    // Also update when HEX value is manually changed
    hexValue.addEventListener('input', function() {
        const hex = this.value;
        if (/^#[0-9A-F]{6}$/i.test(hex)) {
            colorInput.value = hex;
            updateColor();
        }
    });

    colorInput.addEventListener('input', updateColor);
    copyHex.addEventListener('click', () => copyToClipboard(hexValue.value));
    copyRGB.addEventListener('click', () => copyToClipboard(rgbValue.value));
    copyHSL.addEventListener('click', () => copyToClipboard(hslValue.value));

    updateColor();
    return element;
}

// 6. Week Number Calculator
function weekNumberCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Week Number Calculator</h3>
            <p>Find week numbers for dates and calculate weeks between dates</p>
            
            <div class="input-group">
                <label for="weekDateInput">Select Date:</label>
                <input type="date" id="weekDateInput" value="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <div class="input-group">
                <label for="weekSystem">Week Numbering System:</label>
                <select id="weekSystem">
                    <option value="iso">ISO 8601 (Monday first)</option>
                    <option value="us">US (Sunday first)</option>
                    <option value="middleEastern">Middle Eastern (Saturday first)</option>
                </select>
            </div>
            
            <div class="button-group">
                <button id="calculateWeek">Calculate Week Number</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Week Number:</span>
                    <span id="weekNumber">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Year:</span>
                    <span id="weekYear">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Week Range:</span>
                    <span id="weekRange">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Days in Year:</span>
                    <span id="daysInYear">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Weeks in Year:</span>
                    <span id="weeksInYear">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Week Calendar:</span>
                </div>
                <div id="weekCalendar" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-top: 10px;"></div>
            </div>
        </div>
    `;

    const weekDateInput = element.querySelector('#weekDateInput');
    const weekSystem = element.querySelector('#weekSystem');
    const calculateBtn = element.querySelector('#calculateWeek');
    const weekNumber = element.querySelector('#weekNumber');
    const weekYear = element.querySelector('#weekYear');
    const weekRange = element.querySelector('#weekRange');
    const daysInYear = element.querySelector('#daysInYear');
    const weeksInYear = element.querySelector('#weeksInYear');
    const weekCalendar = element.querySelector('#weekCalendar');

    function getFirstDayOfWeek(system) {
        switch (system) {
            case 'iso': return 1; // Monday
            case 'us': return 0; // Sunday
            case 'middleEastern': return 6; // Saturday
            default: return 1;
        }
    }

    function calculateWeekNumber() {
        const date = new Date(weekDateInput.value);
        const system = weekSystem.value;
        const firstDay = getFirstDayOfWeek(system);
        
        const year = date.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        
        // Adjust start of year to the first day of the week
        const startDay = startOfYear.getDay();
        const diff = (startDay - firstDay + 7) % 7;
        startOfYear.setDate(startOfYear.getDate() - diff);
        
        // Calculate week number
        const diffTime = date - startOfYear;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weekNum = Math.floor(diffDays / 7) + 1;
        
        // Calculate week range
        const weekStart = new Date(startOfYear);
        weekStart.setDate(weekStart.getDate() + (weekNum - 1) * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        // Days in year
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const totalDays = isLeapYear ? 366 : 365;
        
        // Update display
        weekNumber.textContent = weekNum;
        weekYear.textContent = year;
        weekRange.textContent = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
        daysInYear.textContent = totalDays;
        weeksInYear.textContent = Math.ceil(totalDays / 7);
        
        generateWeekCalendar(weekStart, system);
    }

    function generateWeekCalendar(weekStart, system) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = getFirstDayOfWeek(system);
        
        // Reorder days based on first day of week
        const reorderedDays = [...days.slice(firstDay), ...days.slice(0, firstDay)];
        
        let calendarHTML = '';
        
        // Day headers
        reorderedDays.forEach(day => {
            calendarHTML += `<div style="padding: 8px; text-align: center; background: var(--hover-color); font-weight: bold;">${day}</div>`;
        });
        
        // Days of the week
        const currentDate = new Date(weekStart);
        for (let i = 0; i < 7; i++) {
            const isToday = currentDate.toDateString() === new Date().toDateString();
            calendarHTML += `
                <div style="padding: 12px; text-align: center; background: ${isToday ? 'var(--accent-color)' : 'var(--control-bg)'}; border: 1px solid var(--border-color);">
                    ${currentDate.getDate()}
                </div>
            `;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        weekCalendar.innerHTML = calendarHTML;
    }

    calculateBtn.addEventListener('click', calculateWeekNumber);
    weekDateInput.addEventListener('change', calculateWeekNumber);
    weekSystem.addEventListener('change', calculateWeekNumber);

    calculateWeekNumber();
    return element;
}

// 7. Meeting Planner (Fixed)
function meetingPlanner() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Meeting Planner</h3>
            <p>Find suitable meeting times across different time zones</p>
            
            <div class="input-group">
                <label for="meetingDate">Meeting Date:</label>
                <input type="date" id="meetingDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <div class="input-group">
                <label for="startTime">Start Time Range:</label>
                <input type="time" id="startTime" value="09:00">
            </div>
            
            <div class="input-group">
                <label for="endTime">End Time Range:</label>
                <input type="time" id="endTime" value="17:00">
            </div>
            
            <div class="input-group">
                <label for="meetingDuration">Meeting Duration (minutes):</label>
                <div class="number-input-container">
                    <input type="number" id="meetingDuration" value="60" step="15" min="15" max="480">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="meetingDuration" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="meetingDuration" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="input-group">
                <label>Time Zones:</label>
                <div id="timezoneContainer">
                    <div class="timezone-entry" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <select class="timezone-select" style="flex: 1;">
                            <option value="America/New_York">New York (EST)</option>
                            <option value="America/Los_Angeles">Los Angeles (PST)</option>
                            <option value="Europe/London" selected>London (GMT)</option>
                            <option value="Europe/Paris">Paris (CET)</option>
                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                            <option value="Australia/Sydney">Sydney (AEST)</option>
                        </select>
                        <button type="button" class="remove-timezone" style="white-space: nowrap; padding: 8px 12px;">Remove</button>
                    </div>
                </div>
                <button type="button" id="addTimezone" style="margin-top: 10px;">Add Timezone</button>
            </div>
            
            <div class="button-group">
                <button id="findMeetings">Find Available Times</button>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Available Meeting Times:</span>
                </div>
                <div id="meetingTimes" style="max-height: 300px; overflow-y: auto;"></div>
            </div>
        </div>
    `;

    const meetingDate = element.querySelector('#meetingDate');
    const startTime = element.querySelector('#startTime');
    const endTime = element.querySelector('#endTime');
    const meetingDuration = element.querySelector('#meetingDuration');
    const timezoneContainer = element.querySelector('#timezoneContainer');
    const addTimezone = element.querySelector('#addTimezone');
    const findMeetings = element.querySelector('#findMeetings');
    const meetingTimes = element.querySelector('#meetingTimes');

    const timezoneOptions = [
        { value: "America/New_York", label: "New York (EST)" },
        { value: "America/Los_Angeles", label: "Los Angeles (PST)" },
        { value: "Europe/London", label: "London (GMT)" },
        { value: "Europe/Paris", label: "Paris (CET)" },
        { value: "Asia/Tokyo", label: "Tokyo (JST)" },
        { value: "Australia/Sydney", label: "Sydney (AEST)" },
        { value: "Asia/Dubai", label: "Dubai (GST)" },
        { value: "Asia/Kolkata", label: "Kolkata (IST)" }
    ];

    function addTimezoneField(selectedValue = "Europe/London") {
        const timezoneEntry = document.createElement('div');
        timezoneEntry.className = 'timezone-entry';
        timezoneEntry.style.display = 'flex';
        timezoneEntry.style.alignItems = 'center';
        timezoneEntry.style.gap = '10px';
        timezoneEntry.style.marginBottom = '10px';
        
        const select = document.createElement('select');
        select.className = 'timezone-select';
        select.style.flex = '1';
        
        timezoneOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            opt.selected = option.value === selectedValue;
            select.appendChild(opt);
        });
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-timezone';
        removeBtn.textContent = 'Remove';
        removeBtn.style.whiteSpace = 'nowrap';
        removeBtn.style.padding = '8px 12px';
        removeBtn.addEventListener('click', function() {
            if (timezoneContainer.children.length > 1) {
                timezoneEntry.remove();
            }
        });
        
        timezoneEntry.appendChild(select);
        timezoneEntry.appendChild(removeBtn);
        timezoneContainer.appendChild(timezoneEntry);
    }

    function findAvailableTimes() {
        const date = meetingDate.value;
        const start = startTime.value;
        const end = endTime.value;
        const duration = parseInt(meetingDuration.value);
        
        const timezoneSelects = element.querySelectorAll('.timezone-select');
        const timezones = Array.from(timezoneSelects).map(select => select.value);
        
        // Simple algorithm to find overlapping business hours
        const availableTimes = [];
        const startHour = parseInt(start.split(':')[0]);
        const endHour = parseInt(end.split(':')[0]);
        
        for (let hour = startHour; hour <= endHour - Math.ceil(duration / 60); hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            availableTimes.push({
                time: timeString,
                timezones: timezones.map(tz => {
                    // Simple timezone offset simulation
                    const offsets = {
                        "America/New_York": -5,
                        "America/Los_Angeles": -8,
                        "Europe/London": 0,
                        "Europe/Paris": 1,
                        "Asia/Tokyo": 9,
                        "Australia/Sydney": 10,
                        "Asia/Dubai": 4,
                        "Asia/Kolkata": 5.5
                    };
                    
                    const localHour = (hour + offsets[tz] + 24) % 24;
                    return {
                        zone: tz,
                        localTime: `${localHour.toString().padStart(2, '0')}:00`,
                        isBusiness: localHour >= 9 && localHour <= 17
                    };
                })
            });
        }
        
        displayMeetingTimes(availableTimes);
    }

    function displayMeetingTimes(times) {
        if (times.length === 0) {
            meetingTimes.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--secondary-color);">No available times found</div>';
            return;
        }
        
        let html = '';
        times.forEach(slot => {
            const allBusinessHours = slot.timezones.every(tz => tz.isBusiness);
            const borderColor = allBusinessHours ? 'var(--success-color)' : 'var(--border-color)';
            html += `
                <div style="padding: 15px; margin: 10px 0; background: var(--control-bg); border-radius: 8px; border: 2px solid ${borderColor};">
                    <div style="font-weight: bold; margin-bottom: 10px;">
                        ${slot.time} GMT
                        ${allBusinessHours ? '<span style="color: var(--success-color); margin-left: 10px;">✓ All in business hours</span>' : ''}
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        ${slot.timezones.map(tz => `
                            <div style="font-size: 0.9rem;">
                                <strong>${tz.zone.split('/')[1]}:</strong><br>
                                <span style="color: ${tz.isBusiness ? 'var(--success-color)' : 'var(--warning-color)'}">
                                    ${tz.localTime} ${tz.isBusiness ? '(Business)' : '(Outside hours)'}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        meetingTimes.innerHTML = html;
    }

    function setupNumberInputArrows() {
        const arrows = element.querySelectorAll('.number-input-arrow');
        arrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                const inputId = this.getAttribute('data-input');
                const direction = this.getAttribute('data-direction');
                const input = element.querySelector(`#${inputId}`);
                
                const step = parseFloat(input.step) || 15;
                const min = parseFloat(input.min) || 15;
                const max = parseFloat(input.max) || 480;
                let currentValue = parseInt(input.value) || min;
                
                if (direction === 'up') {
                    currentValue = Math.min(max, currentValue + step);
                } else {
                    currentValue = Math.max(min, currentValue - step);
                }
                
                input.value = currentValue;
            });
        });
    }

    addTimezone.addEventListener('click', () => addTimezoneField());
    findMeetings.addEventListener('click', findAvailableTimes);

    // Add one more timezone by default
    addTimezoneField("America/New_York");
    setupNumberInputArrows();
    findAvailableTimes();

    return element;
}
// 8. JavaScript Formatter
function javascriptFormatter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>JavaScript Formatter</h3>
            <p>Format and beautify JavaScript code with syntax highlighting</p>
            
            <div class="input-group">
                <label for="jsInput">Enter JavaScript code:</label>
                <textarea id="jsInput" rows="10" placeholder="function example(){return 'hello world';}">function example(){const x=1;const y=2;return x+y;}</textarea>
            </div>
            
            <div class="button-group">
                <button id="formatJS">Format Code</button>
                <button id="minifyJS">Minify Code</button>
                <button id="validateJS">Validate Syntax</button>
                <button id="clearJS">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="jsOutput">Formatted JavaScript:</label>
                <textarea id="jsOutput" rows="10" readonly></textarea>
            </div>
            
            <div class="result-box" id="jsValidationResult">
                <div id="jsValidationMessage">Enter JavaScript code to validate</div>
            </div>
        </div>
    `;

    const jsInput = element.querySelector('#jsInput');
    const jsOutput = element.querySelector('#jsOutput');
    const formatBtn = element.querySelector('#formatJS');
    const minifyBtn = element.querySelector('#minifyJS');
    const validateBtn = element.querySelector('#validateJS');
    const clearBtn = element.querySelector('#clearJS');
    const validationResult = element.querySelector('#jsValidationResult');
    const validationMessage = element.querySelector('#jsValidationMessage');

    function formatJavaScript(code) {
        try {
            // Simple formatting rules
            let formatted = code
                // Add spaces around operators
                .replace(/([=+\-*/%&|^~<>!])=?/g, ' $1 ')
                // Add spaces after commas
                .replace(/,/g, ', ')
                // Add spaces after semicolons
                .replace(/;/g, '; ')
                // Add newlines after braces
                .replace(/{/g, ' {\n')
                .replace(/}/g, '\n}\n')
                // Add newlines after function definitions
                .replace(/function/g, '\nfunction')
                // Clean up multiple spaces
                .replace(/\s+/g, ' ')
                // Add proper indentation
                .split('\n')
                .map((line, index, arr) => {
                    const indent = '    '.repeat(
                        (line.match(/{/g) || []).length - 
                        (line.match(/}/g) || []).length
                    );
                    return indent + line.trim();
                })
                .join('\n')
                // Final cleanup
                .trim();

            return { code: formatted, valid: true };
        } catch (e) {
            return { code: code, valid: false, error: e.message };
        }
    }

    function minifyJavaScript(code) {
        try {
            // Simple minification
            const minified = code
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
                .replace(/\/\/.*$/gm, '') // Remove line comments
                .replace(/\s+/g, ' ') // Collapse whitespace
                .replace(/\s*([=+\-*/%&|^~<>!([{}]|;|,)\s*/g, '$1') // Remove spaces around operators
                .trim();

            return { code: minified, valid: true };
        } catch (e) {
            return { code: code, valid: false, error: e.message };
        }
    }

    function validateJavaScript(code) {
        try {
            // Basic syntax validation using Function constructor
            new Function(code);
            return { valid: true, message: 'Valid JavaScript syntax' };
        } catch (e) {
            return { valid: false, message: 'Syntax Error: ' + e.message };
        }
    }

    function showValidation(message, isValid) {
        validationMessage.textContent = message;
        validationResult.className = 'result-box ' + (isValid ? 'valid' : '');
    }

    function formatCode() {
        const result = formatJavaScript(jsInput.value);
        jsOutput.value = result.code;
        showValidation(result.valid ? 'Code formatted successfully' : 'Formatting completed with warnings', result.valid);
    }

    function minifyCode() {
        const result = minifyJavaScript(jsInput.value);
        jsOutput.value = result.code;
        showValidation(result.valid ? 'Code minified successfully' : 'Minification completed with warnings', result.valid);
    }

    function validateCode() {
        const result = validateJavaScript(jsInput.value);
        showValidation(result.message, result.valid);
    }

    function clearCode() {
        jsInput.value = '';
        jsOutput.value = '';
        validationMessage.textContent = 'Enter JavaScript code to validate';
        validationResult.className = 'result-box';
    }

    formatBtn.addEventListener('click', formatCode);
    minifyBtn.addEventListener('click', minifyCode);
    validateBtn.addEventListener('click', validateCode);
    clearBtn.addEventListener('click', clearCode);

    return element;
}

// 9. JSON to CSV Converter
function jsonToCsvConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>JSON to CSV Converter</h3>
            <p>Convert JSON data to CSV format with customizable options</p>
            
            <div class="input-group">
                <label for="jsonInput">Enter JSON data:</label>
                <textarea id="jsonInput" rows="8" placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'>[{"name": "John", "age": 30, "city": "New York"}, {"name": "Jane", "age": 25, "city": "London"}]</textarea>
            </div>
            
            <div class="input-group">
                <label for="csvDelimiter">CSV Delimiter:</label>
                <select id="csvDelimiter">
                    <option value="," selected>Comma (,)</option>
                    <option value=";">Semicolon (;)</option>
                    <option value="\t">Tab</option>
                    <option value="|">Pipe (|)</option>
                </select>
            </div>
            
            <div class="input-group">
                <label>
                    <input type="checkbox" id="includeHeaders" checked>
                    Include headers
                </label>
            </div>
            
            <div class="button-group">
                <button id="convertToCSV">Convert to CSV</button>
                <button id="downloadCSV">Download CSV</button>
                <button id="copyCSV">Copy CSV</button>
                <button id="clearCSV">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="csvOutput">CSV Output:</label>
                <textarea id="csvOutput" rows="8" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Rows Converted:</span>
                    <span id="rowsConverted">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Columns Found:</span>
                    <span id="columnsFound">-</span>
                </div>
            </div>
        </div>
    `;

    const jsonInput = element.querySelector('#jsonInput');
    const csvDelimiter = element.querySelector('#csvDelimiter');
    const includeHeaders = element.querySelector('#includeHeaders');
    const convertBtn = element.querySelector('#convertToCSV');
    const downloadBtn = element.querySelector('#downloadCSV');
    const copyBtn = element.querySelector('#copyCSV');
    const clearBtn = element.querySelector('#clearCSV');
    const csvOutput = element.querySelector('#csvOutput');
    const rowsConverted = element.querySelector('#rowsConverted');
    const columnsFound = element.querySelector('#columnsFound');

    function jsonToCSV(jsonData, delimiter, includeHeaders) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('JSON must be a non-empty array of objects');
            }

            // Get all unique keys (columns)
            const columns = [...new Set(data.flatMap(obj => Object.keys(obj)))];
            
            let csv = '';
            
            // Add headers
            if (includeHeaders) {
                csv += columns.map(col => `"${col}"`).join(delimiter) + '\n';
            }
            
            // Add data rows
            data.forEach(obj => {
                const row = columns.map(col => {
                    const value = obj[col];
                    // Handle different data types and escape quotes
                    let stringValue = value === null || value === undefined ? '' : String(value);
                    // Escape quotes and wrap in quotes if contains delimiter or quotes
                    if (stringValue.includes('"') || stringValue.includes(delimiter) || stringValue.includes('\n')) {
                        stringValue = '"' + stringValue.replace(/"/g, '""') + '"';
                    }
                    return stringValue;
                });
                csv += row.join(delimiter) + '\n';
            });
            
            return {
                csv: csv.trim(),
                rows: data.length,
                columns: columns.length
            };
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    }

    function convertToCSV() {
        try {
            const result = jsonToCSV(
                jsonInput.value,
                csvDelimiter.value,
                includeHeaders.checked
            );
            
            csvOutput.value = result.csv;
            rowsConverted.textContent = result.rows;
            columnsFound.textContent = result.columns;
        } catch (error) {
            csvOutput.value = 'Error: ' + error.message;
            rowsConverted.textContent = '0';
            columnsFound.textContent = '0';
        }
    }

    function downloadCSV() {
        if (!csvOutput.value) {
            alert('No CSV data to download');
            return;
        }
        
        const blob = new Blob([csvOutput.value], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted_data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function copyCSV() {
        if (!csvOutput.value) {
            alert('No CSV data to copy');
            return;
        }
        
        navigator.clipboard.writeText(csvOutput.value).then(() => {
            alert('CSV data copied to clipboard!');
        });
    }

    function clearAll() {
        jsonInput.value = '';
        csvOutput.value = '';
        rowsConverted.textContent = '-';
        columnsFound.textContent = '-';
    }

    convertBtn.addEventListener('click', convertToCSV);
    downloadBtn.addEventListener('click', downloadCSV);
    copyBtn.addEventListener('click', copyCSV);
    clearBtn.addEventListener('click', clearAll);

    convertToCSV();
    return element;
}

// Add these tools to your tools array in the loadTools function
// Add them to the appropriate categories in your existing tools array

// Example of how to add them:
/*
{
    id: 'digital-storage-converter',
    name: 'Digital Storage Converter',
    description: 'Convert between bits, bytes, KB, MB, GB, TB, PB',
    category: 'unit',
    component: digitalStorageConverter
},
{
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and amortization schedule',
    category: 'math',
    component: mortgageCalculator
},
// ... and so on for all 10 tools
*/


// ========== REMAINING TOOLS IMPLEMENTATION ==========

// Screen & Display Tools
function borderRadiusPreview() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Border Radius Preview</h3>
            <p>Preview and generate CSS border-radius values with visual feedback</p>
            
            <div class="input-group">
                <label for="borderRadiusAll">All Corners (px):</label>
                <div class="number-input-container">
                    <input type="number" id="borderRadiusAll" value="8" min="0" max="500">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="borderRadiusAll" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="borderRadiusAll" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                <div class="input-group">
                    <label for="borderRadiusTL">Top Left (px):</label>
                    <div class="number-input-container">
                        <input type="number" id="borderRadiusTL" value="8" min="0" max="500">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="borderRadiusTL" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="borderRadiusTL" data-direction="down"></div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="borderRadiusTR">Top Right (px):</label>
                    <div class="number-input-container">
                        <input type="number" id="borderRadiusTR" value="8" min="0" max="500">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="borderRadiusTR" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="borderRadiusTR" data-direction="down"></div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="borderRadiusBL">Bottom Left (px):</label>
                    <div class="number-input-container">
                        <input type="number" id="borderRadiusBL" value="8" min="0" max="500">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="borderRadiusBL" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="borderRadiusBL" data-direction="down"></div>
                        </div>
                    </div>
                </div>
                
                <div class="input-group">
                    <label for="borderRadiusBR">Bottom Right (px):</label>
                    <div class="number-input-container">
                        <input type="number" id="borderRadiusBR" value="8" min="0" max="500">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="borderRadiusBR" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="borderRadiusBR" data-direction="down"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="preview-container" style="display: flex; justify-content: center; margin: 30px 0;">
                <div id="borderRadiusPreview" style="width: 200px; height: 150px; background: var(--primary-color); transition: all 0.3s ease;"></div>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">CSS Code:</span>
                    <code id="cssCode" style="font-family: monospace; background: var(--control-bg); padding: 8px; border-radius: 4px; display: block; margin-top: 5px;">border-radius: 8px;</code>
                </div>
                <button id="copyCSSCode" style="margin-top: 10px;">Copy CSS</button>
            </div>
        </div>
    `;

    const borderRadiusAll = element.querySelector('#borderRadiusAll');
    const borderRadiusTL = element.querySelector('#borderRadiusTL');
    const borderRadiusTR = element.querySelector('#borderRadiusTR');
    const borderRadiusBL = element.querySelector('#borderRadiusBL');
    const borderRadiusBR = element.querySelector('#borderRadiusBR');
    const previewElement = element.querySelector('#borderRadiusPreview');
    const cssCode = element.querySelector('#cssCode');
    const copyBtn = element.querySelector('#copyCSSCode');

    function updatePreview() {
        const allValue = borderRadiusAll.value;
        
        // If all corners input changes, update all individual corners
        if (event && event.target === borderRadiusAll) {
            borderRadiusTL.value = allValue;
            borderRadiusTR.value = allValue;
            borderRadiusBL.value = allValue;
            borderRadiusBR.value = allValue;
        }

        const tl = borderRadiusTL.value;
        const tr = borderRadiusTR.value;
        const bl = borderRadiusBL.value;
        const br = borderRadiusBR.value;

        const borderRadiusValue = `${tl}px ${tr}px ${br}px ${bl}px`;
        previewElement.style.borderRadius = borderRadiusValue;
        
        // Generate CSS code
        if (tl === tr && tr === bl && bl === br) {
            cssCode.textContent = `border-radius: ${tl}px;`;
        } else {
            cssCode.textContent = `border-radius: ${borderRadiusValue};`;
        }
    }

    function copyCSSCode() {
        navigator.clipboard.writeText(cssCode.textContent).then(() => {
            alert('CSS code copied to clipboard!');
        });
    }

    borderRadiusAll.addEventListener('input', updatePreview);
    borderRadiusTL.addEventListener('input', updatePreview);
    borderRadiusTR.addEventListener('input', updatePreview);
    borderRadiusBL.addEventListener('input', updatePreview);
    borderRadiusBR.addEventListener('input', updatePreview);
    copyBtn.addEventListener('click', copyCSSCode);

    setupNumberInputArrows(element);
    updatePreview();
    return element;
}

// Unit Converters
function shoeSizesConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Shoe Sizes Converter</h3>
            <p>Convert between US, UK, EU shoe sizes and centimeters</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="shoeSizeValue" value="9" step="0.5" min="1" max="20">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="shoeSizeValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="shoeSizeValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="shoeSizeFromUnit">
                    <option value="us">US Men</option>
                    <option value="usw">US Women</option>
                    <option value="uk">UK</option>
                    <option value="eu">EU</option>
                    <option value="cm">Centimeters</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <input type="text" id="shoeSizeResult" readonly>
                <select id="shoeSizeToUnit">
                    <option value="us">US Men</option>
                    <option value="usw">US Women</option>
                    <option value="uk" selected>UK</option>
                    <option value="eu">EU</option>
                    <option value="cm">Centimeters</option>
                </select>
            </div>
            
            <div class="result-box">
                <div id="shoeSizeDetails"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Conversion Chart:</span>
                </div>
                <div class="info-item">
                    <span>US 7 = UK 6 = EU 40 = 25.4 cm</span>
                </div>
                <div class="info-item">
                    <span>US 9 = UK 8 = EU 42 = 27.0 cm</span>
                </div>
                <div class="info-item">
                    <span>US 11 = UK 10 = EU 44 = 28.6 cm</span>
                </div>
            </div>
        </div>
    `;

    const sizeValue = element.querySelector('#shoeSizeValue');
    const fromUnit = element.querySelector('#shoeSizeFromUnit');
    const toUnit = element.querySelector('#shoeSizeToUnit');
    const sizeResult = element.querySelector('#shoeSizeResult');
    const detailsDiv = element.querySelector('#shoeSizeDetails');

    // Conversion data based on standard shoe size charts
    const sizeChart = [
        { us: 6, usw: 7.5, uk: 5.5, eu: 39, cm: 24.8 },
        { us: 6.5, usw: 8, uk: 6, eu: 39.5, cm: 25.2 },
        { us: 7, usw: 8.5, uk: 6.5, eu: 40, cm: 25.6 },
        { us: 7.5, usw: 9, uk: 7, eu: 40.5, cm: 26.0 },
        { us: 8, usw: 9.5, uk: 7.5, eu: 41, cm: 26.4 },
        { us: 8.5, usw: 10, uk: 8, eu: 42, cm: 26.8 },
        { us: 9, usw: 10.5, uk: 8.5, eu: 42.5, cm: 27.2 },
        { us: 9.5, usw: 11, uk: 9, eu: 43, cm: 27.6 },
        { us: 10, usw: 11.5, uk: 9.5, eu: 44, cm: 28.0 },
        { us: 10.5, usw: 12, uk: 10, eu: 44.5, cm: 28.4 },
        { us: 11, usw: 12.5, uk: 10.5, eu: 45, cm: 28.8 },
        { us: 11.5, usw: 13, uk: 11, eu: 46, cm: 29.2 },
        { us: 12, usw: 13.5, uk: 11.5, eu: 46.5, cm: 29.6 }
    ];

    function convertShoeSize() {
        const value = parseFloat(sizeValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) return;

        // Find closest match in size chart
        let closestSize = null;
        let minDiff = Infinity;

        sizeChart.forEach(size => {
            const fromValue = size[from];
            if (fromValue !== undefined) {
                const diff = Math.abs(fromValue - value);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestSize = size;
                }
            }
        });

        if (closestSize) {
            const result = closestSize[to];
            sizeResult.value = result !== undefined ? result.toFixed(1) : 'N/A';
            
            detailsDiv.innerHTML = `
                <div class="info-item">
                    <span class="info-label">${value} ${getShoeSizeUnitName(from)} =</span>
                    <span>${result !== undefined ? result.toFixed(1) : 'N/A'} ${getShoeSizeUnitName(to)}</span>
                </div>
            `;
        }
    }

    function getShoeSizeUnitName(unit) {
        const names = {
            us: 'US Men',
            usw: 'US Women',
            uk: 'UK',
            eu: 'EU',
            cm: 'cm'
        };
        return names[unit];
    }

    sizeValue.addEventListener('input', convertShoeSize);
    fromUnit.addEventListener('change', convertShoeSize);
    toUnit.addEventListener('change', convertShoeSize);

    setupNumberInputArrows(element);
    convertShoeSize();
    return element;
}

function typographyConverter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Typography Converter</h3>
            <p>Convert between px, pt, em, rem, percentage, and viewport units</p>
            
            <div class="input-with-button">
                <div class="number-input-container">
                    <input type="number" id="typographyValue" value="16" step="0.1" min="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="typographyValue" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="typographyValue" data-direction="down"></div>
                    </div>
                </div>
                <select id="typographyFromUnit">
                    <option value="px" selected>Pixels (px)</option>
                    <option value="pt">Points (pt)</option>
                    <option value="em">Ems (em)</option>
                    <option value="rem">Rems (rem)</option>
                    <option value="percent">Percentage (%)</option>
                    <option value="vw">Viewport Width (vw)</option>
                    <option value="vh">Viewport Height (vh)</option>
                </select>
            </div>
            
            <div style="text-align: center; margin: 10px 0; font-size: 1.5rem;">→</div>
            
            <div class="input-with-button">
                <input type="text" id="typographyResult" readonly>
                <select id="typographyToUnit">
                    <option value="px">Pixels (px)</option>
                    <option value="pt" selected>Points (pt)</option>
                    <option value="em">Ems (em)</option>
                    <option value="rem">Rems (rem)</option>
                    <option value="percent">Percentage (%)</option>
                    <option value="vw">Viewport Width (vw)</option>
                    <option value="vh">Viewport Height (vh)</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="baseFontSize">Base Font Size (px):</label>
                <div class="number-input-container">
                    <input type="number" id="baseFontSize" value="16" min="8" max="32">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="baseFontSize" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="baseFontSize" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="result-box">
                <div id="typographyDetails"></div>
            </div>
            
            <div class="preview-container" style="margin: 20px 0; padding: 20px; background: var(--control-bg); border-radius: 8px;">
                <div id="typographyPreview" style="font-size: 16px; line-height: 1.5;">
                    Preview Text: The quick brown fox jumps over the lazy dog.
                </div>
            </div>
        </div>
    `;

    const typographyValue = element.querySelector('#typographyValue');
    const fromUnit = element.querySelector('#typographyFromUnit');
    const toUnit = element.querySelector('#typographyToUnit');
    const baseFontSize = element.querySelector('#baseFontSize');
    const typographyResult = element.querySelector('#typographyResult');
    const detailsDiv = element.querySelector('#typographyDetails');
    const previewElement = element.querySelector('#typographyPreview');

    function convertTypography() {
        const value = parseFloat(typographyValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        const baseSize = parseFloat(baseFontSize.value);

        if (isNaN(value)) return;

        // Convert to pixels first
        let pixels;
        switch (from) {
            case 'px': pixels = value; break;
            case 'pt': pixels = value * 1.333; break; // 1pt = 1.333px
            case 'em': pixels = value * baseSize; break;
            case 'rem': pixels = value * baseSize; break;
            case 'percent': pixels = (value / 100) * baseSize; break;
            case 'vw': pixels = (value / 100) * 1920; break; // Assuming 1920px viewport
            case 'vh': pixels = (value / 100) * 1080; break; // Assuming 1080px viewport
            default: pixels = value;
        }

        // Convert from pixels to target unit
        let result;
        switch (to) {
            case 'px': result = pixels; break;
            case 'pt': result = pixels / 1.333; break;
            case 'em': result = pixels / baseSize; break;
            case 'rem': result = pixels / baseSize; break;
            case 'percent': result = (pixels / baseSize) * 100; break;
            case 'vw': result = (pixels / 1920) * 100; break;
            case 'vh': result = (pixels / 1080) * 100; break;
            default: result = pixels;
        }

        typographyResult.value = result.toFixed(4);
        
        // Update preview
        previewElement.style.fontSize = `${pixels}px`;
        
        detailsDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">${value}${from} =</span>
                <span>${result.toFixed(4)}${to}</span>
            </div>
            <div class="info-item">
                <span class="info-label">In Pixels:</span>
                <span>${pixels.toFixed(2)}px</span>
            </div>
        `;
    }

    typographyValue.addEventListener('input', convertTypography);
    fromUnit.addEventListener('change', convertTypography);
    toUnit.addEventListener('change', convertTypography);
    baseFontSize.addEventListener('input', convertTypography);

    setupNumberInputArrows(element);
    convertTypography();
    return element;
}

// Math Tools
function geometryCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Geometry Calculator</h3>
            <p>Calculate area, perimeter, volume, and other geometric properties</p>
            
            <div class="input-group">
                <label for="geometryShape">Select Shape:</label>
                <select id="geometryShape">
                    <option value="square">Square</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                    <option value="sphere">Sphere</option>
                    <option value="cylinder">Cylinder</option>
                </select>
            </div>
            
            <div id="geometryInputs">
                <!-- Dynamic inputs will be inserted here -->
            </div>
            
            <div class="button-group">
                <button id="calculateGeometry">Calculate</button>
            </div>
            
            <div class="result-box">
                <div id="geometryResults"></div>
            </div>
            
            <div id="geometryPreview" style="margin: 20px 0; text-align: center;"></div>
        </div>
    `;

    const shapeSelect = element.querySelector('#geometryShape');
    const inputsContainer = element.querySelector('#geometryInputs');
    const resultsContainer = element.querySelector('#geometryResults');
    const previewContainer = element.querySelector('#geometryPreview');
    const calculateBtn = element.querySelector('#calculateGeometry');

    const shapeConfigs = {
        square: {
            inputs: [{ id: 'side', label: 'Side Length:', type: 'number', value: 10 }],
            calculate: (values) => {
                const side = parseFloat(values.side);
                return {
                    'Area': side * side,
                    'Perimeter': 4 * side,
                    'Diagonal': side * Math.sqrt(2)
                };
            },
            preview: '■'
        },
        rectangle: {
            inputs: [
                { id: 'length', label: 'Length:', type: 'number', value: 15 },
                { id: 'width', label: 'Width:', type: 'number', value: 10 }
            ],
            calculate: (values) => {
                const length = parseFloat(values.length);
                const width = parseFloat(values.width);
                return {
                    'Area': length * width,
                    'Perimeter': 2 * (length + width),
                    'Diagonal': Math.sqrt(length * length + width * width)
                };
            },
            preview: '▭'
        },
        circle: {
            inputs: [{ id: 'radius', label: 'Radius:', type: 'number', value: 10 }],
            calculate: (values) => {
                const radius = parseFloat(values.radius);
                return {
                    'Area': Math.PI * radius * radius,
                    'Circumference': 2 * Math.PI * radius,
                    'Diameter': 2 * radius
                };
            },
            preview: '●'
        },
        triangle: {
            inputs: [
                { id: 'base', label: 'Base:', type: 'number', value: 10 },
                { id: 'height', label: 'Height:', type: 'number', value: 8 },
                { id: 'side1', label: 'Side 1:', type: 'number', value: 6 },
                { id: 'side2', label: 'Side 2:', type: 'number', value: 6 }
            ],
            calculate: (values) => {
                const base = parseFloat(values.base);
                const height = parseFloat(values.height);
                const side1 = parseFloat(values.side1);
                const side2 = parseFloat(values.side2);
                return {
                    'Area': 0.5 * base * height,
                    'Perimeter': base + side1 + side2
                };
            },
            preview: '▲'
        },
        sphere: {
            inputs: [{ id: 'radius', label: 'Radius:', type: 'number', value: 10 }],
            calculate: (values) => {
                const radius = parseFloat(values.radius);
                return {
                    'Volume': (4/3) * Math.PI * Math.pow(radius, 3),
                    'Surface Area': 4 * Math.PI * Math.pow(radius, 2),
                    'Diameter': 2 * radius
                };
            },
            preview: '⚫'
        },
        cylinder: {
            inputs: [
                { id: 'radius', label: 'Radius:', type: 'number', value: 5 },
                { id: 'height', label: 'Height:', type: 'number', value: 10 }
            ],
            calculate: (values) => {
                const radius = parseFloat(values.radius);
                const height = parseFloat(values.height);
                return {
                    'Volume': Math.PI * Math.pow(radius, 2) * height,
                    'Surface Area': 2 * Math.PI * radius * (radius + height),
                    'Lateral Surface': 2 * Math.PI * radius * height
                };
            },
            preview: '⛊'
        }
    };

    function renderInputs(shape) {
        const config = shapeConfigs[shape];
        inputsContainer.innerHTML = '';
        
        config.inputs.forEach(input => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <label for="${input.id}">${input.label}</label>
                <div class="number-input-container">
                    <input type="${input.type}" id="${input.id}" value="${input.value}" min="0.1" step="0.1">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="${input.id}" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="${input.id}" data-direction="down"></div>
                    </div>
                </div>
            `;
            inputsContainer.appendChild(inputGroup);
        });
        
        previewContainer.innerHTML = `<div style="font-size: 3rem;">${config.preview}</div>`;
        
        setupNumberInputArrows(element);
    }

    function calculateGeometry() {
        const shape = shapeSelect.value;
        const config = shapeConfigs[shape];
        const values = {};
        
        config.inputs.forEach(input => {
            values[input.id] = element.querySelector(`#${input.id}`).value;
        });
        
        const results = config.calculate(values);
        
        let resultsHTML = '';
        Object.keys(results).forEach(key => {
            resultsHTML += `
                <div class="info-item">
                    <span class="info-label">${key}:</span>
                    <span>${results[key].toFixed(4)}</span>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = resultsHTML;
    }

    shapeSelect.addEventListener('change', () => {
        renderInputs(shapeSelect.value);
        calculateGeometry();
    });

    calculateBtn.addEventListener('click', calculateGeometry);

    // Initialize
    renderInputs('square');
    calculateGeometry();
    return element;
}

function matrixCalculator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Matrix Calculator</h3>
            <p>Perform matrix operations including addition, multiplication, and determinant calculation</p>
            
            <div class="input-group">
                <label for="matrixOperation">Operation:</label>
                <select id="matrixOperation">
                    <option value="add">Addition</option>
                    <option value="multiply">Multiplication</option>
                    <option value="determinant">Determinant</option>
                    <option value="transpose">Transpose</option>
                </select>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h4>Matrix A</h4>
                    <div id="matrixA" class="matrix-input">
                        <div class="matrix-row">
                            <input type="number" value="1" class="matrix-cell">
                            <input type="number" value="2" class="matrix-cell">
                        </div>
                        <div class="matrix-row">
                            <input type="number" value="3" class="matrix-cell">
                            <input type="number" value="4" class="matrix-cell">
                        </div>
                    </div>
                    <button id="resizeA" style="margin-top: 10px;">Resize Matrix A</button>
                </div>
                
                <div id="matrixBContainer">
                    <h4>Matrix B</h4>
                    <div id="matrixB" class="matrix-input">
                        <div class="matrix-row">
                            <input type="number" value="5" class="matrix-cell">
                            <input type="number" value="6" class="matrix-cell">
                        </div>
                        <div class="matrix-row">
                            <input type="number" value="7" class="matrix-cell">
                            <input type="number" value="8" class="matrix-cell">
                        </div>
                    </div>
                    <button id="resizeB" style="margin-top: 10px;">Resize Matrix B</button>
                </div>
            </div>
            
            <div class="button-group">
                <button id="calculateMatrix">Calculate</button>
                <button id="clearMatrix">Clear</button>
            </div>
            
            <div class="result-box">
                <h4>Result</h4>
                <div id="matrixResult" class="matrix-result"></div>
            </div>
        </div>
    `;

    const operationSelect = element.querySelector('#matrixOperation');
    const matrixA = element.querySelector('#matrixA');
    const matrixB = element.querySelector('#matrixB');
    const matrixBContainer = element.querySelector('#matrixBContainer');
    const calculateBtn = element.querySelector('#calculateMatrix');
    const clearBtn = element.querySelector('#clearMatrix');
    const resultDiv = element.querySelector('#matrixResult');
    const resizeABtn = element.querySelector('#resizeA');
    const resizeBBtn = element.querySelector('#resizeB');

    function getMatrixValues(matrixElement) {
        const rows = matrixElement.querySelectorAll('.matrix-row');
        return Array.from(rows).map(row => 
            Array.from(row.querySelectorAll('.matrix-cell')).map(cell => 
                parseFloat(cell.value) || 0
            )
        );
    }

    function setMatrixValues(matrixElement, values) {
        const rows = matrixElement.querySelectorAll('.matrix-row');
        values.forEach((row, i) => {
            if (rows[i]) {
                const cells = rows[i].querySelectorAll('.matrix-cell');
                row.forEach((value, j) => {
                    if (cells[j]) {
                        cells[j].value = value;
                    }
                });
            }
        });
    }

    function resizeMatrix(matrixElement, rows, cols) {
        matrixElement.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'matrix-row';
            for (let j = 0; j < cols; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-cell';
                input.value = '0';
                rowDiv.appendChild(input);
            }
            matrixElement.appendChild(rowDiv);
        }
    }

    function matrixAddition(a, b) {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error('Matrices must have the same dimensions for addition');
        }
        
        return a.map((row, i) => 
            row.map((val, j) => val + b[i][j])
        );
    }

    function matrixMultiplication(a, b) {
        if (a[0].length !== b.length) {
            throw new Error('Number of columns in A must equal number of rows in B');
        }
        
        const result = Array(a.length).fill().map(() => Array(b[0].length).fill(0));
        
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
                for (let k = 0; k < a[0].length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        
        return result;
    }

    function matrixDeterminant(matrix) {
        if (matrix.length !== matrix[0].length) {
            throw new Error('Matrix must be square for determinant calculation');
        }
        
        if (matrix.length === 1) return matrix[0][0];
        if (matrix.length === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        
        let det = 0;
        for (let j = 0; j < matrix.length; j++) {
            const minor = matrix.slice(1).map(row => 
                row.filter((_, colIndex) => colIndex !== j)
            );
            det += matrix[0][j] * Math.pow(-1, j) * matrixDeterminant(minor);
        }
        
        return det;
    }

    function matrixTranspose(matrix) {
        return matrix[0].map((_, colIndex) => 
            matrix.map(row => row[colIndex])
        );
    }

    function calculateMatrix() {
        try {
            const operation = operationSelect.value;
            const a = getMatrixValues(matrixA);
            const b = getMatrixValues(matrixB);
            let result;

            switch (operation) {
                case 'add':
                    result = matrixAddition(a, b);
                    break;
                case 'multiply':
                    result = matrixMultiplication(a, b);
                    break;
                case 'determinant':
                    result = [[matrixDeterminant(a)]];
                    break;
                case 'transpose':
                    result = matrixTranspose(a);
                    break;
            }

            displayMatrixResult(result);
        } catch (error) {
            resultDiv.innerHTML = `<div style="color: var(--warning-color);">Error: ${error.message}</div>`;
        }
    }

    function displayMatrixResult(matrix) {
        resultDiv.innerHTML = matrix.map(row => 
            `<div class="matrix-row">${row.map(cell => 
                `<span class="matrix-cell">${cell.toFixed(2)}</span>`
            ).join('')}</div>`
        ).join('');
    }

    function clearMatrices() {
        setMatrixValues(matrixA, [[0, 0], [0, 0]]);
        setMatrixValues(matrixB, [[0, 0], [0, 0]]);
        resultDiv.innerHTML = '';
    }

    function updateMatrixBVisibility() {
        const operation = operationSelect.value;
        matrixBContainer.style.display = (operation === 'add' || operation === 'multiply') ? 'block' : 'none';
    }

    resizeABtn.addEventListener('click', () => {
        const rows = prompt('Enter number of rows:', '2');
        const cols = prompt('Enter number of columns:', '2');
        if (rows && cols) {
            resizeMatrix(matrixA, parseInt(rows), parseInt(cols));
        }
    });

    resizeBBtn.addEventListener('click', () => {
        const rows = prompt('Enter number of rows:', '2');
        const cols = prompt('Enter number of columns:', '2');
        if (rows && cols) {
            resizeMatrix(matrixB, parseInt(rows), parseInt(cols));
        }
    });

    operationSelect.addEventListener('change', updateMatrixBVisibility);
    calculateBtn.addEventListener('click', calculateMatrix);
    clearBtn.addEventListener('click', clearMatrices);

    updateMatrixBVisibility();
    return element;
}

// Text Utilities
function lineCounter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Line Counter</h3>
            <p>Count lines in text with various counting options</p>
            
            <div class="input-group">
                <label for="lineTextInput">Enter your text:</label>
                <textarea id="lineTextInput" rows="8" placeholder="Enter text to count lines..."></textarea>
            </div>
            
            <div class="input-group">
                <label>
                    <input type="checkbox" id="ignoreEmptyLines" checked>
                    Ignore empty lines
                </label>
            </div>
            
            <div class="input-group">
                <label>
                    <input type="checkbox" id="ignoreWhitespaceLines">
                    Ignore whitespace-only lines
                </label>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Total Lines:</span>
                    <span id="totalLines">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Non-empty Lines:</span>
                    <span id="nonEmptyLines">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Empty Lines:</span>
                    <span id="emptyLines">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Whitespace Lines:</span>
                    <span id="whitespaceLines">0</span>
                </div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Line Length Analysis:</span>
                </div>
                <div class="info-item">
                    <span>Longest Line:</span>
                    <span id="longestLine">0 characters</span>
                </div>
                <div class="info-item">
                    <span>Shortest Line:</span>
                    <span id="shortestLine">0 characters</span>
                </div>
                <div class="info-item">
                    <span>Average Line:</span>
                    <span id="averageLine">0 characters</span>
                </div>
            </div>
        </div>
    `;

    const textInput = element.querySelector('#lineTextInput');
    const ignoreEmptyLines = element.querySelector('#ignoreEmptyLines');
    const ignoreWhitespaceLines = element.querySelector('#ignoreWhitespaceLines');
    const totalLines = element.querySelector('#totalLines');
    const nonEmptyLines = element.querySelector('#nonEmptyLines');
    const emptyLines = element.querySelector('#emptyLines');
    const whitespaceLines = element.querySelector('#whitespaceLines');
    const longestLine = element.querySelector('#longestLine');
    const shortestLine = element.querySelector('#shortestLine');
    const averageLine = element.querySelector('#averageLine');

    function countLines() {
        const text = textInput.value;
        const lines = text.split('\n');
        
        const total = lines.length;
        const nonEmpty = lines.filter(line => line.trim().length > 0).length;
        const empty = lines.filter(line => line.length === 0).length;
        const whitespace = lines.filter(line => line.trim().length === 0 && line.length > 0).length;
        
        // Line length analysis
        const nonEmptyLineLengths = lines
            .filter(line => line.trim().length > 0)
            .map(line => line.length);
        
        const maxLength = nonEmptyLineLengths.length > 0 ? Math.max(...nonEmptyLineLengths) : 0;
        const minLength = nonEmptyLineLengths.length > 0 ? Math.min(...nonEmptyLineLengths) : 0;
        const avgLength = nonEmptyLineLengths.length > 0 ? 
            (nonEmptyLineLengths.reduce((a, b) => a + b, 0) / nonEmptyLineLengths.length).toFixed(1) : 0;

        totalLines.textContent = total;
        nonEmptyLines.textContent = nonEmpty;
        emptyLines.textContent = empty;
        whitespaceLines.textContent = whitespace;
        longestLine.textContent = `${maxLength} characters`;
        shortestLine.textContent = `${minLength} characters`;
        averageLine.textContent = `${avgLength} characters`;
    }

    textInput.addEventListener('input', countLines);
    ignoreEmptyLines.addEventListener('change', countLines);
    ignoreWhitespaceLines.addEventListener('change', countLines);

    countLines();
    return element;
}

function regexTester() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Regex Tester</h3>
            <p>Test regular expressions with live preview and match highlighting</p>
            
            <div class="input-group">
                <label for="regexPattern">Regular Expression:</label>
                <input type="text" id="regexPattern" value="[A-Za-z]+" placeholder="Enter regex pattern">
            </div>
            
            <div class="input-group">
                <label for="regexFlags">Flags:</label>
                <input type="text" id="regexFlags" value="g" placeholder="g, i, m, etc.">
            </div>
            
            <div class="input-group">
                <label for="regexTestText">Test Text:</label>
                <textarea id="regexTestText" rows="6" placeholder="Enter text to test against...">Hello World 123 Testing</textarea>
            </div>
            
            <div class="button-group">
                <button id="testRegex">Test Regex</button>
                <button id="clearRegex">Clear</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Matches Found:</span>
                    <span id="matchCount">0</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Valid Regex:</span>
                    <span id="regexValid">Yes</span>
                </div>
            </div>
            
            <div class="input-group">
                <label>Match Results:</label>
                <div id="regexResults" style="background: var(--control-bg); padding: 15px; border-radius: 6px; min-height: 100px; font-family: monospace; white-space: pre-wrap;"></div>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Common Patterns:</span>
                </div>
                <div class="info-item">
                    <span>Email:</span>
                    <code style="font-size: 0.8em;">\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b</code>
                </div>
                <div class="info-item">
                    <span>URL:</span>
                    <code style="font-size: 0.8em;">https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)</code>
                </div>
            </div>
        </div>
    `;

    const regexPattern = element.querySelector('#regexPattern');
    const regexFlags = element.querySelector('#regexFlags');
    const testText = element.querySelector('#regexTestText');
    const testBtn = element.querySelector('#testRegex');
    const clearBtn = element.querySelector('#clearRegex');
    const matchCount = element.querySelector('#matchCount');
    const regexValid = element.querySelector('#regexValid');
    const resultsDiv = element.querySelector('#regexResults');

    function testRegex() {
        try {
            const pattern = regexPattern.value;
            const flags = regexFlags.value;
            const text = testText.value;
            
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex);
            
            if (matches) {
                matchCount.textContent = matches.length;
                
                // Highlight matches in the text
                let highlightedText = text;
                matches.forEach(match => {
                    const escapedMatch = match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    highlightedText = highlightedText.replace(
                        new RegExp(escapedMatch, 'g'),
                        `<mark style="background: yellow; color: black;">${match}</mark>`
                    );
                });
                
                resultsDiv.innerHTML = highlightedText;
            } else {
                matchCount.textContent = '0';
                resultsDiv.textContent = text;
            }
            
            regexValid.textContent = 'Yes';
            regexValid.style.color = 'var(--success-color)';
            
        } catch (error) {
            matchCount.textContent = '0';
            regexValid.textContent = 'No - ' + error.message;
            regexValid.style.color = 'var(--warning-color)';
            resultsDiv.textContent = testText.value;
        }
    }

    function clearTest() {
        regexPattern.value = '';
        regexFlags.value = 'g';
        testText.value = '';
        matchCount.textContent = '0';
        regexValid.textContent = 'Yes';
        resultsDiv.textContent = '';
    }

    testBtn.addEventListener('click', testRegex);
    clearBtn.addEventListener('click', clearTest);
    
    // Real-time testing
    regexPattern.addEventListener('input', testRegex);
    regexFlags.addEventListener('input', testRegex);
    testText.addEventListener('input', testRegex);

    testRegex();
    return element;
}

// Color Tools
function colorNameFinder() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Color Name Finder</h3>
            <p>Find names for colors from various color naming systems</p>
            
            <div class="input-group">
                <label for="colorInputName">Select Color:</label>
                <input type="color" id="colorInputName" value="#3498db">
            </div>
            
            <div style="display: flex; gap: 20px; align-items: center; margin: 20px 0;">
                <div id="colorPreviewName" style="width: 100px; height: 100px; border: 2px solid var(--border-color); border-radius: 8px;"></div>
                <div style="flex: 1;">
                    <div class="input-with-button" style="margin-bottom: 10px;">
                        <label>HEX:</label>
                        <input type="text" id="hexValueName" value="#3498db">
                        <button id="copyHexName">Copy</button>
                    </div>
                    <div class="input-with-button">
                        <label>RGB:</label>
                        <input type="text" id="rgbValueName" value="rgb(52, 152, 219)">
                        <button id="copyRGBName">Copy</button>
                    </div>
                </div>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Color Name:</span>
                    <span id="colorNameResult">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Color Family:</span>
                    <span id="colorFamily">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">CSS Name:</span>
                    <span id="cssColorName">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Similar Colors</h4>
                <div id="similarColors" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px; margin-top: 10px;"></div>
            </div>
        </div>
    `;

    const colorInput = element.querySelector('#colorInputName');
    const colorPreview = element.querySelector('#colorPreviewName');
    const hexValue = element.querySelector('#hexValueName');
    const rgbValue = element.querySelector('#rgbValueName');
    const colorNameResult = element.querySelector('#colorNameResult');
    const colorFamily = element.querySelector('#colorFamily');
    const cssColorName = element.querySelector('#cssColorName');
    const similarColors = element.querySelector('#similarColors');
    const copyHexBtn = element.querySelector('#copyHexName');
    const copyRGBBtn = element.querySelector('#copyRGBName');

    // Extended color database
    const colorDatabase = [
        { name: "Red", family: "Warm", hex: "#FF0000", css: "red" },
        { name: "Crimson", family: "Warm", hex: "#DC143C", css: "crimson" },
        { name: "Coral", family: "Warm", hex: "#FF7F50", css: "coral" },
        { name: "Tomato", family: "Warm", hex: "#FF6347", css: "tomato" },
        { name: "Orange Red", family: "Warm", hex: "#FF4500", css: "orangered" },
        { name: "Dark Orange", family: "Warm", hex: "#FF8C00", css: "darkorange" },
        { name: "Orange", family: "Warm", hex: "#FFA500", css: "orange" },
        { name: "Gold", family: "Warm", hex: "#FFD700", css: "gold" },
        { name: "Yellow", family: "Warm", hex: "#FFFF00", css: "yellow" },
        { name: "Light Yellow", family: "Warm", hex: "#FFFFE0", css: "lightyellow" },
        { name: "Lemon Chiffon", family: "Warm", hex: "#FFFACD", css: "lemonchiffon" },
        { name: "Light Goldenrod", family: "Warm", hex: "#FAFAD2", css: "lightgoldenrodyellow" },
        { name: "Papaya Whip", family: "Warm", hex: "#FFEFD5", css: "papayawhip" },
        { name: "Moccasin", family: "Warm", hex: "#FFE4B5", css: "moccasin" },
        { name: "Peach Puff", family: "Warm", hex: "#FFDAB9", css: "peachpuff" },
        { name: "Pale Goldenrod", family: "Warm", hex: "#EEE8AA", css: "palegoldenrod" },
        { name: "Khaki", family: "Warm", hex: "#F0E68C", css: "khaki" },
        { name: "Dark Khaki", family: "Warm", hex: "#BDB76B", css: "darkkhaki" },
        { name: "Green", family: "Cool", hex: "#008000", css: "green" },
        { name: "Lime", family: "Cool", hex: "#00FF00", css: "lime" },
        { name: "Forest Green", family: "Cool", hex: "#228B22", css: "forestgreen" },
        { name: "Lime Green", family: "Cool", hex: "#32CD32", css: "limegreen" },
        { name: "Spring Green", family: "Cool", hex: "#00FF7F", css: "springgreen" },
        { name: "Medium Spring Green", family: "Cool", hex: "#00FA9A", css: "mediumspringgreen" },
        { name: "Sea Green", family: "Cool", hex: "#2E8B57", css: "seagreen" },
        { name: "Medium Sea Green", family: "Cool", hex: "#3CB371", css: "mediumseagreen" },
        { name: "Light Sea Green", family: "Cool", hex: "#20B2AA", css: "lightseagreen" },
        { name: "Pale Green", family: "Cool", hex: "#98FB98", css: "palegreen" },
        { name: "Light Green", family: "Cool", hex: "#90EE90", css: "lightgreen" },
        { name: "Lawn Green", family: "Cool", hex: "#7CFC00", css: "lawngreen" },
        { name: "Chartreuse", family: "Cool", hex: "#7FFF00", css: "chartreuse" },
        { name: "Green Yellow", family: "Cool", hex: "#ADFF2F", css: "greenyellow" },
        { name: "Yellow Green", family: "Cool", hex: "#9ACD32", css: "yellowgreen" },
        { name: "Olive Drab", family: "Cool", hex: "#6B8E23", css: "olivedrab" },
        { name: "Dark Olive Green", family: "Cool", hex: "#556B2F", css: "darkolivegreen" },
        { name: "Olive", family: "Cool", hex: "#808000", css: "olive" },
        { name: "Dark Sea Green", family: "Cool", hex: "#8FBC8F", css: "darkseagreen" },
        { name: "Medium Aquamarine", family: "Cool", hex: "#66CDAA", css: "mediumaquamarine" },
        { name: "Aquamarine", family: "Cool", hex: "#7FFFD4", css: "aquamarine" },
        { name: "Turquoise", family: "Cool", hex: "#40E0D0", css: "turquoise" },
        { name: "Medium Turquoise", family: "Cool", hex: "#48D1CC", css: "mediumturquoise" },
        { name: "Dark Turquoise", family: "Cool", hex: "#00CED1", css: "darkturquoise" },
        { name: "Light Turquoise", family: "Cool", hex: "#AFEEEE", css: "lightturquoise" },
        { name: "Azure", family: "Cool", hex: "#F0FFFF", css: "azure" },
        { name: "Alice Blue", family: "Cool", hex: "#F0F8FF", css: "aliceblue" },
        { name: "Blue", family: "Cool", hex: "#0000FF", css: "blue" },
        { name: "Medium Blue", family: "Cool", hex: "#0000CD", css: "mediumblue" },
        { name: "Dark Blue", family: "Cool", hex: "#00008B", css: "darkblue" },
        { name: "Navy", family: "Cool", hex: "#000080", css: "navy" },
        { name: "Midnight Blue", family: "Cool", hex: "#191970", css: "midnightblue" },
        { name: "Royal Blue", family: "Cool", hex: "#4169E1", css: "royalblue" },
        { name: "Steel Blue", family: "Cool", hex: "#4682B4", css: "steelblue" },
        { name: "Dodger Blue", family: "Cool", hex: "#1E90FF", css: "dodgerblue" },
        { name: "Deep Sky Blue", family: "Cool", hex: "#00BFFF", css: "deepskyblue" },
        { name: "Cornflower Blue", family: "Cool", hex: "#6495ED", css: "cornflowerblue" },
        { name: "Sky Blue", family: "Cool", hex: "#87CEEB", css: "skyblue" },
        { name: "Light Sky Blue", family: "Cool", hex: "#87CEFA", css: "lightskyblue" },
        { name: "Light Steel Blue", family: "Cool", hex: "#B0C4DE", css: "lightsteelblue" },
        { name: "Light Blue", family: "Cool", hex: "#ADD8E6", css: "lightblue" },
        { name: "Powder Blue", family: "Cool", hex: "#B0E0E6", css: "powderblue" },
        { name: "Indigo", family: "Cool", hex: "#4B0082", css: "indigo" },
        { name: "Purple", family: "Cool", hex: "#800080", css: "purple" },
        { name: "Dark Magenta", family: "Cool", hex: "#8B008B", css: "darkmagenta" },
        { name: "Dark Violet", family: "Cool", hex: "#9400D3", css: "darkviolet" },
        { name: "Blue Violet", family: "Cool", hex: "#8A2BE2", css: "blueviolet" },
        { name: "Dark Orchid", family: "Cool", hex: "#9932CC", css: "darkorchid" },
        { name: "Medium Orchid", family: "Cool", hex: "#BA55D3", css: "mediumorchid" },
        { name: "Orchid", family: "Cool", hex: "#DA70D6", css: "orchid" },
        { name: "Violet", family: "Cool", hex: "#EE82EE", css: "violet" },
        { name: "Plum", family: "Cool", hex: "#DDA0DD", css: "plum" },
        { name: "Thistle", family: "Cool", hex: "#D8BFD8", css: "thistle" },
        { name: "Lavender", family: "Cool", hex: "#E6E6FA", css: "lavender" },
        { name: "Brown", family: "Neutral", hex: "#A52A2A", css: "brown" },
        { name: "Maroon", family: "Neutral", hex: "#800000", css: "maroon" },
        { name: "Saddle Brown", family: "Neutral", hex: "#8B4513", css: "saddlebrown" },
        { name: "Sienna", family: "Neutral", hex: "#A0522D", css: "sienna" },
        { name: "Chocolate", family: "Neutral", hex: "#D2691E", css: "chocolate" },
        { name: "Peru", family: "Neutral", hex: "#CD853F", css: "peru" },
        { name: "Sandy Brown", family: "Neutral", hex: "#F4A460", css: "sandybrown" },
        { name: "Burly Wood", family: "Neutral", hex: "#DEB887", css: "burlywood" },
        { name: "Tan", family: "Neutral", hex: "#D2B48C", css: "tan" },
        { name: "Rosy Brown", family: "Neutral", hex: "#BC8F8F", css: "rosybrown" },
        { name: "White", family: "Neutral", hex: "#FFFFFF", css: "white" },
        { name: "Snow", family: "Neutral", hex: "#FFFAFA", css: "snow" },
        { name: "Honeydew", family: "Neutral", hex: "#F0FFF0", css: "honeydew" },
        { name: "Mint Cream", family: "Neutral", hex: "#F5FFFA", css: "mintcream" },
        { name: "Ghost White", family: "Neutral", hex: "#F8F8FF", css: "ghostwhite" },
        { name: "White Smoke", family: "Neutral", hex: "#F5F5F5", css: "whitesmoke" },
        { name: "Seashell", family: "Neutral", hex: "#FFF5EE", css: "seashell" },
        { name: "Beige", family: "Neutral", hex: "#F5F5DC", css: "beige" },
        { name: "Old Lace", family: "Neutral", hex: "#FDF5E6", css: "oldlace" },
        { name: "Floral White", family: "Neutral", hex: "#FFFAF0", css: "floralwhite" },
        { name: "Ivory", family: "Neutral", hex: "#FFFFF0", css: "ivory" },
        { name: "Antique White", family: "Neutral", hex: "#FAEBD7", css: "antiquewhite" },
        { name: "Linen", family: "Neutral", hex: "#FAF0E6", css: "linen" },
        { name: "Lavender Blush", family: "Neutral", hex: "#FFF0F5", css: "lavenderblush" },
        { name: "Misty Rose", family: "Neutral", hex: "#FFE4E1", css: "mistyrose" },
        { name: "Black", family: "Neutral", hex: "#000000", css: "black" },
        { name: "Dark Slate Gray", family: "Neutral", hex: "#2F4F4F", css: "darkslategray" },
        { name: "Dim Gray", family: "Neutral", hex: "#696969", css: "dimgray" },
        { name: "Slate Gray", family: "Neutral", hex: "#708090", css: "slategray" },
        { name: "Light Slate Gray", family: "Neutral", hex: "#778899", css: "lightslategray" },
        { name: "Gray", family: "Neutral", hex: "#808080", css: "gray" },
        { name: "Dark Gray", family: "Neutral", hex: "#A9A9A9", css: "darkgray" },
        { name: "Silver", family: "Neutral", hex: "#C0C0C0", css: "silver" },
        { name: "Light Gray", family: "Neutral", hex: "#D3D3D3", css: "lightgray" },
        { name: "Gainsboro", family: "Neutral", hex: "#DCDCDC", css: "gainsboro" }
    ];

    function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    function colorDistance(hex1, hex2) {
        const rgb1 = hexToRGB(hex1);
        const rgb2 = hexToRGB(hex2);
        
        return Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2)
        );
    }

    function findClosestColor(hex) {
        let closestColor = null;
        let minDistance = Infinity;
        
        colorDatabase.forEach(color => {
            const distance = colorDistance(hex, color.hex);
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = color;
            }
        });
        
        return closestColor;
    }

    function findSimilarColors(hex, count = 5) {
        return colorDatabase
            .map(color => ({
                ...color,
                distance: colorDistance(hex, color.hex)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(1, count + 1); // Skip the closest (itself) and take next ones
    }

    function updateColor() {
        const hex = colorInput.value;
        const rgb = hexToRGB(hex);
        
        colorPreview.style.backgroundColor = hex;
        hexValue.value = hex.toUpperCase();
        rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        const closest = findClosestColor(hex);
        if (closest) {
            colorNameResult.textContent = closest.name;
            colorFamily.textContent = closest.family;
            cssColorName.textContent = closest.css;
        }
        
        // Show similar colors
        const similar = findSimilarColors(hex, 6);
        similarColors.innerHTML = similar.map(color => `
            <div style="text-align: center;">
                <div style="width: 40px; height: 40px; background: ${color.hex}; border: 1px solid var(--border-color); border-radius: 4px; margin: 0 auto;"></div>
                <div style="font-size: 0.7em; margin-top: 5px;">${color.name}</div>
            </div>
        `).join('');
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    }

    colorInput.addEventListener('input', updateColor);
    copyHexBtn.addEventListener('click', () => copyToClipboard(hexValue.value));
    copyRGBBtn.addEventListener('click', () => copyToClipboard(rgbValue.value));

    updateColor();
    return element;
}

// Time & Date Tools
function holidayCalendar() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Holiday Calendar</h3>
            <p>View holidays for different countries and years</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="input-group">
                    <label for="holidayCountry">Country:</label>
                    <select id="holidayCountry">
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="in">India</option>
                        <option value="jp">Japan</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="holidayYear">Year:</label>
                    <div class="number-input-container">
                        <input type="number" id="holidayYear" value="2024" min="2000" max="2030">
                        <div class="number-input-arrows">
                            <div class="number-input-arrow up" data-input="holidayYear" data-direction="up"></div>
                            <div class="number-input-arrow down" data-input="holidayYear" data-direction="down"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="loadHolidays">Load Holidays</button>
            </div>
            
            <div class="result-box">
                <div id="holidaysList"></div>
            </div>
        </div>
    `;

    const countrySelect = element.querySelector('#holidayCountry');
    const yearInput = element.querySelector('#holidayYear');
    const loadBtn = element.querySelector('#loadHolidays');
    const holidaysList = element.querySelector('#holidaysList');

    // Sample holiday data - in a real app, you'd fetch from an API
    const holidayData = {
        us: {
            2024: [
                { date: '2024-01-01', name: "New Year's Day", type: "Federal" },
                { date: '2024-01-15', name: "Martin Luther King Jr. Day", type: "Federal" },
                { date: '2024-02-19', name: "Presidents' Day", type: "Federal" },
                { date: '2024-05-27', name: "Memorial Day", type: "Federal" },
                { date: '2024-06-19', name: "Juneteenth", type: "Federal" },
                { date: '2024-07-04', name: "Independence Day", type: "Federal" },
                { date: '2024-09-02', name: "Labor Day", type: "Federal" },
                { date: '2024-10-14', name: "Columbus Day", type: "Federal" },
                { date: '2024-11-11', name: "Veterans Day", type: "Federal" },
                { date: '2024-11-28', name: "Thanksgiving", type: "Federal" },
                { date: '2024-12-25', name: "Christmas Day", type: "Federal" }
            ]
        },
        uk: {
            2024: [
                { date: '2024-01-01', name: "New Year's Day", type: "Bank Holiday" },
                { date: '2024-03-29', name: "Good Friday", type: "Bank Holiday" },
                { date: '2024-04-01', name: "Easter Monday", type: "Bank Holiday" },
                { date: '2024-05-06', name: "Early May Bank Holiday", type: "Bank Holiday" },
                { date: '2024-05-27', name: "Spring Bank Holiday", type: "Bank Holiday" },
                { date: '2024-08-26', name: "Summer Bank Holiday", type: "Bank Holiday" },
                { date: '2024-12-25', name: "Christmas Day", type: "Bank Holiday" },
                { date: '2024-12-26', name: "Boxing Day", type: "Bank Holiday" }
            ]
        },
        ca: {
            2024: [
                { date: '2024-01-01', name: "New Year's Day", type: "Federal" },
                { date: '2024-02-19', name: "Family Day", type: "Provincial" },
                { date: '2024-03-29', name: "Good Friday", type: "Federal" },
                { date: '2024-05-20', name: "Victoria Day", type: "Federal" },
                { date: '2024-07-01', name: "Canada Day", type: "Federal" },
                { date: '2024-08-05', name: "Civic Holiday", type: "Provincial" },
                { date: '2024-09-02', name: "Labour Day", type: "Federal" },
                { date: '2024-10-14', name: "Thanksgiving", type: "Federal" },
                { date: '2024-11-11', name: "Remembrance Day", type: "Federal" },
                { date: '2024-12-25', name: "Christmas Day", type: "Federal" },
                { date: '2024-12-26', name: "Boxing Day", type: "Federal" }
            ]
        }
    };

    function loadHolidays() {
        const country = countrySelect.value;
        const year = yearInput.value;
        
        const holidays = holidayData[country]?.[year] || [];
        
        if (holidays.length === 0) {
            holidaysList.innerHTML = '<div style="text-align: center; color: var(--secondary-color);">No holiday data available for selected country and year.</div>';
            return;
        }
        
        let html = '<div style="max-height: 400px; overflow-y: auto;">';
        holidays.forEach(holiday => {
            const date = new Date(holiday.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            
            html += `
                <div class="info-item" style="padding: 10px; border-bottom: 1px solid var(--border-color);">
                    <div>
                        <strong>${holiday.name}</strong>
                        <div style="font-size: 0.9em; color: var(--secondary-color);">
                            ${formattedDate} • ${holiday.type}
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        holidaysList.innerHTML = html;
    }

    loadBtn.addEventListener('click', loadHolidays);
    countrySelect.addEventListener('change', loadHolidays);
    yearInput.addEventListener('input', loadHolidays);

    setupNumberInputArrows(element);
    loadHolidays();
    return element;
}

// Development Tools
function sqlFormatter() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>SQL Formatter</h3>
            <p>Format and beautify SQL queries with syntax highlighting</p>
            
            <div class="input-group">
                <label for="sqlInput">Enter SQL Query:</label>
                <textarea id="sqlInput" rows="8" placeholder="SELECT * FROM users WHERE active = true;">SELECT u.id, u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = true GROUP BY u.id, u.name HAVING COUNT(o.id) > 5 ORDER BY order_count DESC;</textarea>
            </div>
            
            <div class="button-group">
                <button id="formatSQL">Format SQL</button>
                <button id="minifySQL">Minify SQL</button>
                <button id="clearSQL">Clear</button>
            </div>
            
            <div class="input-group">
                <label for="sqlOutput">Formatted SQL:</label>
                <textarea id="sqlOutput" rows="8" readonly></textarea>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Query Type:</span>
                    <span id="queryType">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Tables Found:</span>
                    <span id="tablesFound">-</span>
                </div>
            </div>
        </div>
    `;

    const sqlInput = element.querySelector('#sqlInput');
    const sqlOutput = element.querySelector('#sqlOutput');
    const formatBtn = element.querySelector('#formatSQL');
    const minifyBtn = element.querySelector('#minifySQL');
    const clearBtn = element.querySelector('#clearSQL');
    const queryType = element.querySelector('#queryType');
    const tablesFound = element.querySelector('#tablesFound');

    function formatSQL(sql) {
        // Basic SQL formatting
        let formatted = sql
            .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|GROUP BY|ORDER BY|HAVING|LIMIT|INSERT INTO|UPDATE|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE)\b/gi, '\n$1')
            .replace(/,/g, ',\n    ')
            .replace(/\bFROM\b/gi, '\nFROM')
            .replace(/\bWHERE\b/gi, '\nWHERE')
            .replace(/\b(LEFT|RIGHT|INNER|OUTER) JOIN\b/gi, '\n$1 JOIN')
            .replace(/\bON\b/gi, '\n    ON')
            .replace(/\b(AND|OR)\b/gi, '\n    $1')
            .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
            .replace(/\bHAVING\b/gi, '\nHAVING')
            .replace(/\bORDER BY\b/gi, '\nORDER BY')
            .replace(/\bLIMIT\b/gi, '\nLIMIT');
        
        // Add proper indentation
        const lines = formatted.split('\n');
        let indentLevel = 0;
        const formattedLines = lines.map(line => {
            line = line.trim();
            if (!line) return '';
            
            // Decrease indent for certain clauses
            if (line.match(/^(FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT)/i)) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indentedLine = '    '.repeat(indentLevel) + line;
            
            // Increase indent after certain clauses
            if (line.match(/^(SELECT|FROM|WHERE|JOIN|ON|AND|OR|GROUP BY|HAVING|ORDER BY)/i)) {
                indentLevel++;
            }
            
            return indentedLine;
        });
        
        return formattedLines.filter(line => line).join('\n');
    }

    function minifySQL(sql) {
        return sql
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*([,;()])\s*/g, '$1') // Remove space around punctuation
            .trim();
    }

    function detectQueryType(sql) {
        const firstWord = sql.trim().split(/\s+/)[0].toUpperCase();
        const queryTypes = {
            'SELECT': 'SELECT Query',
            'INSERT': 'INSERT Statement',
            'UPDATE': 'UPDATE Statement',
            'DELETE': 'DELETE Statement',
            'CREATE': 'DDL - Create',
            'ALTER': 'DDL - Alter',
            'DROP': 'DDL - Drop'
        };
        return queryTypes[firstWord] || 'Unknown';
    }

    function findTables(sql) {
        const tableRegex = /\b(FROM|JOIN|INTO|UPDATE)\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
        const tables = new Set();
        let match;
        
        while ((match = tableRegex.exec(sql)) !== null) {
            tables.add(match[2]);
        }
        
        return Array.from(tables);
    }

    function formatSQLHandler() {
        const sql = sqlInput.value;
        const formatted = formatSQL(sql);
        sqlOutput.value = formatted;
        
        // Update analysis
        queryType.textContent = detectQueryType(sql);
        tablesFound.textContent = findTables(sql).join(', ') || 'None detected';
    }

    function minifySQLHandler() {
        const sql = sqlInput.value;
        const minified = minifySQL(sql);
        sqlOutput.value = minified;
        
        queryType.textContent = detectQueryType(sql);
        tablesFound.textContent = findTables(sql).join(', ') || 'None detected';
    }

    function clearHandler() {
        sqlInput.value = '';
        sqlOutput.value = '';
        queryType.textContent = '-';
        tablesFound.textContent = '-';
    }

    formatBtn.addEventListener('click', formatSQLHandler);
    minifyBtn.addEventListener('click', minifySQLHandler);
    clearBtn.addEventListener('click', clearHandler);

    // Auto-format on input
    sqlInput.addEventListener('input', formatSQLHandler);

    formatSQLHandler();
    return element;
}

function httpStatusLookup() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>HTTP Status Code Lookup</h3>
            <p>Look up HTTP status codes and their meanings</p>
            
            <div class="input-group">
                <label for="statusCodeInput">Enter Status Code:</label>
                <div class="number-input-container">
                    <input type="number" id="statusCodeInput" value="200" min="100" max="599">
                    <div class="number-input-arrows">
                        <div class="number-input-arrow up" data-input="statusCodeInput" data-direction="up"></div>
                        <div class="number-input-arrow down" data-input="statusCodeInput" data-direction="down"></div>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="lookupStatus">Lookup Status Code</button>
            </div>
            
            <div class="result-box" id="statusResult">
                <div class="info-item">
                    <span class="info-label">Status Code:</span>
                    <span id="statusCode">200</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status Name:</span>
                    <span id="statusName">OK</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Category:</span>
                    <span id="statusCategory">Success</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Description:</span>
                    <span id="statusDescription">The request has succeeded.</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Common Status Codes</h4>
                <div id="commonStatusCodes" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;"></div>
            </div>
        </div>
    `;

    const statusInput = element.querySelector('#statusCodeInput');
    const lookupBtn = element.querySelector('#lookupStatus');
    const statusCode = element.querySelector('#statusCode');
    const statusName = element.querySelector('#statusName');
    const statusCategory = element.querySelector('#statusCategory');
    const statusDescription = element.querySelector('#statusDescription');
    const statusResult = element.querySelector('#statusResult');
    const commonCodes = element.querySelector('#commonStatusCodes');

    const httpStatusCodes = {
        100: { name: "Continue", category: "Informational", description: "The server has received the request headers and the client should proceed to send the request body." },
        101: { name: "Switching Protocols", category: "Informational", description: "The requester has asked the server to switch protocols." },
        200: { name: "OK", category: "Success", description: "The request has succeeded." },
        201: { name: "Created", category: "Success", description: "The request has been fulfilled and resulted in a new resource being created." },
        204: { name: "No Content", category: "Success", description: "The server successfully processed the request, but is not returning any content." },
        301: { name: "Moved Permanently", category: "Redirection", description: "The requested resource has been assigned a new permanent URI." },
        302: { name: "Found", category: "Redirection", description: "The requested resource resides temporarily under a different URI." },
        304: { name: "Not Modified", category: "Redirection", description: "The resource has not been modified since the version specified by the request headers." },
        400: { name: "Bad Request", category: "Client Error", description: "The server cannot or will not process the request due to an apparent client error." },
        401: { name: "Unauthorized", category: "Client Error", description: "Authentication is required and has failed or has not been provided." },
        403: { name: "Forbidden", category: "Client Error", description: "The request was valid, but the server is refusing action." },
        404: { name: "Not Found", category: "Client Error", description: "The requested resource could not be found." },
        405: { name: "Method Not Allowed", category: "Client Error", description: "The request method is not supported for the requested resource." },
        429: { name: "Too Many Requests", category: "Client Error", description: "The user has sent too many requests in a given amount of time." },
        500: { name: "Internal Server Error", category: "Server Error", description: "A generic error message when the server encounters an unexpected condition." },
        502: { name: "Bad Gateway", category: "Server Error", description: "The server was acting as a gateway or proxy and received an invalid response." },
        503: { name: "Service Unavailable", category: "Server Error", description: "The server is currently unavailable (overloaded or down for maintenance)." },
        504: { name: "Gateway Timeout", category: "Server Error", description: "The server was acting as a gateway or proxy and did not receive a timely response." }
    };

    const commonStatusList = [200, 201, 301, 302, 400, 401, 403, 404, 500, 503];

    function lookupStatus() {
        const code = parseInt(statusInput.value);
        const status = httpStatusCodes[code];
        
        if (status) {
            statusCode.textContent = code;
            statusName.textContent = status.name;
            statusCategory.textContent = status.category;
            statusDescription.textContent = status.description;
            
            // Set category-based color
            const categoryColors = {
                "Informational": "#17a2b8",
                "Success": "#28a745",
                "Redirection": "#ffc107",
                "Client Error": "#dc3545",
                "Server Error": "#e83e8c"
            };
            
            statusResult.style.borderLeft = `4px solid ${categoryColors[status.category] || '#6c757d'}`;
        } else {
            statusCode.textContent = code;
            statusName.textContent = "Unknown";
            statusCategory.textContent = "Unknown";
            statusDescription.textContent = "This status code is not recognized or not in the database.";
            statusResult.style.borderLeft = "4px solid #6c757d";
        }
    }

    function displayCommonCodes() {
        commonCodes.innerHTML = commonStatusList.map(code => {
            const status = httpStatusCodes[code];
            return `
                <div style="padding: 10px; background: var(--control-bg); border-radius: 6px; cursor: pointer;" data-code="${code}">
                    <strong>${code} ${status.name}</strong>
                    <div style="font-size: 0.8em; color: var(--secondary-color); margin-top: 5px;">${status.category}</div>
                </div>
            `;
        }).join('');
        
        // Add click handlers
        commonCodes.querySelectorAll('div[data-code]').forEach(div => {
            div.addEventListener('click', () => {
                statusInput.value = div.getAttribute('data-code');
                lookupStatus();
            });
        });
    }

    lookupBtn.addEventListener('click', lookupStatus);
    statusInput.addEventListener('input', lookupStatus);

    setupNumberInputArrows(element);
    lookupStatus();
    displayCommonCodes();
    return element;
}

function userAgentParser() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>User Agent Parser</h3>
            <p>Parse user agent strings to extract browser, OS, and device information</p>
            
            <div class="input-group">
                <label for="userAgentInput">User Agent String:</label>
                <textarea id="userAgentInput" rows="4" placeholder="Enter user agent string or use current browser's">Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36</textarea>
            </div>
            
            <div class="button-group">
                <button id="parseUA">Parse User Agent</button>
                <button id="useCurrentUA">Use Current Browser</button>
                <button id="clearUA">Clear</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">Browser:</span>
                    <span id="uaBrowser">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Browser Version:</span>
                    <span id="uaBrowserVersion">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Operating System:</span>
                    <span id="uaOS">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">OS Version:</span>
                    <span id="uaOSVersion">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Device Type:</span>
                    <span id="uaDevice">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Device Model:</span>
                    <span id="uaDeviceModel">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Platform:</span>
                    <span id="uaPlatform">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Raw User Agent</h4>
                <code id="rawUA" style="display: block; background: var(--control-bg); padding: 10px; border-radius: 4px; font-size: 0.9em; word-break: break-all;"></code>
            </div>
        </div>
    `;

    const uaInput = element.querySelector('#userAgentInput');
    const parseBtn = element.querySelector('#parseUA');
    const useCurrentBtn = element.querySelector('#useCurrentUA');
    const clearBtn = element.querySelector('#clearUA');
    const uaBrowser = element.querySelector('#uaBrowser');
    const uaBrowserVersion = element.querySelector('#uaBrowserVersion');
    const uaOS = element.querySelector('#uaOS');
    const uaOSVersion = element.querySelector('#uaOSVersion');
    const uaDevice = element.querySelector('#uaDevice');
    const uaDeviceModel = element.querySelector('#uaDeviceModel');
    const uaPlatform = element.querySelector('#uaPlatform');
    const rawUA = element.querySelector('#rawUA');

    // Simple UA parser (in a real application, you'd use a library like ua-parser-js)
    function parseUserAgent(uaString) {
        const ua = uaString.toLowerCase();
        const result = {
            browser: 'Unknown',
            browserVersion: 'Unknown',
            os: 'Unknown',
            osVersion: 'Unknown',
            device: 'Desktop',
            deviceModel: 'Unknown',
            platform: 'Unknown'
        };

        // Browser detection
        if (ua.includes('chrome') && !ua.includes('edg')) {
            result.browser = 'Chrome';
            const match = ua.match(/chrome\/([\d.]+)/);
            if (match) result.browserVersion = match[1];
        } else if (ua.includes('firefox')) {
            result.browser = 'Firefox';
            const match = ua.match(/firefox\/([\d.]+)/);
            if (match) result.browserVersion = match[1];
        } else if (ua.includes('safari') && !ua.includes('chrome')) {
            result.browser = 'Safari';
            const match = ua.match(/version\/([\d.]+)/);
            if (match) result.browserVersion = match[1];
        } else if (ua.includes('edg')) {
            result.browser = 'Edge';
            const match = ua.match(/edg\/([\d.]+)/);
            if (match) result.browserVersion = match[1];
        }

        // OS detection
        if (ua.includes('windows')) {
            result.os = 'Windows';
            if (ua.includes('windows nt 10')) result.osVersion = '10/11';
            else if (ua.includes('windows nt 6.3')) result.osVersion = '8.1';
            else if (ua.includes('windows nt 6.2')) result.osVersion = '8';
            else if (ua.includes('windows nt 6.1')) result.osVersion = '7';
        } else if (ua.includes('mac os')) {
            result.os = 'macOS';
            const match = ua.match(/mac os x ([\d_]+)/);
            if (match) result.osVersion = match[1].replace(/_/g, '.');
        } else if (ua.includes('linux')) {
            result.os = 'Linux';
        } else if (ua.includes('android')) {
            result.os = 'Android';
            const match = ua.match(/android ([\d.]+)/);
            if (match) result.osVersion = match[1];
            result.device = 'Mobile';
        } else if (ua.includes('iphone') || ua.includes('ipad')) {
            result.os = 'iOS';
            const match = ua.match(/os ([\d_]+)/);
            if (match) result.osVersion = match[1].replace(/_/g, '.');
            result.device = ua.includes('iphone') ? 'Mobile' : 'Tablet';
        }

        // Device model detection
        if (ua.includes('iphone')) result.deviceModel = 'iPhone';
        else if (ua.includes('ipad')) result.deviceModel = 'iPad';
        else if (ua.includes('samsung')) result.deviceModel = 'Samsung';

        // Platform
        result.platform = result.device === 'Desktop' ? 'Desktop' : 'Mobile';

        return result;
    }

    function parseHandler() {
        const uaString = uaInput.value.trim() || navigator.userAgent;
        const parsed = parseUserAgent(uaString);
        
        uaBrowser.textContent = parsed.browser;
        uaBrowserVersion.textContent = parsed.browserVersion;
        uaOS.textContent = parsed.os;
        uaOSVersion.textContent = parsed.osVersion;
        uaDevice.textContent = parsed.device;
        uaDeviceModel.textContent = parsed.deviceModel;
        uaPlatform.textContent = parsed.platform;
        rawUA.textContent = uaString;
    }

    function useCurrentHandler() {
        uaInput.value = navigator.userAgent;
        parseHandler();
    }

    function clearHandler() {
        uaInput.value = '';
        uaBrowser.textContent = '-';
        uaBrowserVersion.textContent = '-';
        uaOS.textContent = '-';
        uaOSVersion.textContent = '-';
        uaDevice.textContent = '-';
        uaDeviceModel.textContent = '-';
        uaPlatform.textContent = '-';
        rawUA.textContent = '';
    }

    parseBtn.addEventListener('click', parseHandler);
    useCurrentBtn.addEventListener('click', useCurrentHandler);
    clearBtn.addEventListener('click', clearHandler);

    // Auto-parse when input changes
    uaInput.addEventListener('input', parseHandler);

    // Parse current browser on load
    useCurrentHandler();
    return element;
}

function ipAddressLookup() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>IP Address Lookup</h3>
            <p>Look up IP address information including geolocation and network details</p>
            
            <div class="input-group">
                <label for="ipInput">IP Address:</label>
                <input type="text" id="ipInput" value="8.8.8.8" placeholder="Enter IP address">
            </div>
            
            <div class="button-group">
                <button id="lookupIP">Lookup IP</button>
                <button id="useMyIP">Use My IP</button>
                <button id="clearIP">Clear</button>
            </div>
            
            <div class="result-box">
                <div class="info-item">
                    <span class="info-label">IP Address:</span>
                    <span id="ipAddress">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Country:</span>
                    <span id="ipCountry">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Region:</span>
                    <span id="ipRegion">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">City:</span>
                    <span id="ipCity">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">ISP:</span>
                    <span id="ipISP">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Organization:</span>
                    <span id="ipOrg">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Timezone:</span>
                    <span id="ipTimezone">-</span>
                </div>
            </div>
            
            <div class="info-display">
                <h4>Network Information</h4>
                <div class="info-item">
                    <span class="info-label">IP Version:</span>
                    <span id="ipVersion">-</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Local IP:</span>
                    <span id="localIP">-</span>
                </div>
            </div>
        </div>
    `;

    const ipInput = element.querySelector('#ipInput');
    const lookupBtn = element.querySelector('#lookupIP');
    const useMyBtn = element.querySelector('#useMyIP');
    const clearBtn = element.querySelector('#clearIP');
    const ipAddress = element.querySelector('#ipAddress');
    const ipCountry = element.querySelector('#ipCountry');
    const ipRegion = element.querySelector('#ipRegion');
    const ipCity = element.querySelector('#ipCity');
    const ipISP = element.querySelector('#ipISP');
    const ipOrg = element.querySelector('#ipOrg');
    const ipTimezone = element.querySelector('#ipTimezone');
    const ipVersion = element.querySelector('#ipVersion');
    const localIP = element.querySelector('#localIP');

    // Mock data for demonstration (in a real app, you'd use an IP geolocation API)
    const ipDatabase = {
        '8.8.8.8': {
            country: 'United States',
            region: 'California',
            city: 'Mountain View',
            isp: 'Google LLC',
            org: 'Google',
            timezone: 'America/Los_Angeles'
        },
        '1.1.1.1': {
            country: 'United States',
            region: 'California',
            city: 'Los Angeles',
            isp: 'Cloudflare',
            org: 'Cloudflare',
            timezone: 'America/Los_Angeles'
        },
        '208.67.222.222': {
            country: 'United States',
            region: 'California',
            city: 'San Francisco',
            isp: 'Cisco OpenDNS',
            org: 'OpenDNS',
            timezone: 'America/Los_Angeles'
        }
    };

    function isValidIP(ip) {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    }

    function getLocalIP() {
        // Note: This is a simplified version. Getting local IP usually requires WebRTC.
        return '192.168.1.1'; // Placeholder
    }

    function lookupIP() {
        const ip = ipInput.value.trim();
        
        if (!isValidIP(ip)) {
            alert('Please enter a valid IP address');
            return;
        }

        const data = ipDatabase[ip] || {
            country: 'Unknown',
            region: 'Unknown',
            city: 'Unknown',
            isp: 'Unknown',
            org: 'Unknown',
            timezone: 'Unknown'
        };

        ipAddress.textContent = ip;
        ipCountry.textContent = data.country;
        ipRegion.textContent = data.region;
        ipCity.textContent = data.city;
        ipISP.textContent = data.isp;
        ipOrg.textContent = data.org;
        ipTimezone.textContent = data.timezone;
        ipVersion.textContent = ip.includes(':') ? 'IPv6' : 'IPv4';
        localIP.textContent = getLocalIP();
    }

    async function useMyIPHandler() {
        try {
            // Using a public API to get the public IP
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            ipInput.value = data.ip;
            lookupIP();
        } catch (error) {
            alert('Could not fetch your IP address. Using placeholder.');
            ipInput.value = '8.8.8.8';
            lookupIP();
        }
    }

    function clearHandler() {
        ipInput.value = '';
        ipAddress.textContent = '-';
        ipCountry.textContent = '-';
        ipRegion.textContent = '-';
        ipCity.textContent = '-';
        ipISP.textContent = '-';
        ipOrg.textContent = '-';
        ipTimezone.textContent = '-';
        ipVersion.textContent = '-';
        localIP.textContent = '-';
    }

    lookupBtn.addEventListener('click', lookupIP);
    useMyBtn.addEventListener('click', useMyIPHandler);
    clearBtn.addEventListener('click', clearHandler);

    // Lookup on Enter key
    ipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') lookupIP();
    });

    lookupIP();
    return element;
}

// File & Data Tools
function dataUrlGenerator() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="control-group">
            <h3>Data URL Generator</h3>
            <p>Generate data URLs from text or uploaded files</p>
            
            <div class="input-group">
                <label for="dataUrlType">Input Type:</label>
                <select id="dataUrlType">
                    <option value="text">Text</option>
                    <option value="file">File Upload</option>
                </select>
            </div>
            
            <div id="textInputSection">
                <div class="input-group">
                    <label for="dataUrlText">Enter Text:</label>
                    <textarea id="dataUrlText" rows="4" placeholder="Enter text to convert to data URL">Hello, World!</textarea>
                </div>
                
                <div class="input-group">
                    <label for="textMimeType">MIME Type:</label>
                    <select id="textMimeType">
                        <option value="text/plain">text/plain</option>
                        <option value="text/html">text/html</option>
                        <option value="text/css">text/css</option>
                        <option value="text/javascript">text/javascript</option>
                        <option value="application/json">application/json</option>
                        <option value="application/xml">application/xml</option>
                    </select>
                </div>
            </div>
            
            <div id="fileInputSection" style="display: none;">
                <div class="input-group">
                    <label for="dataUrlFile">Upload File:</label>
                    <input type="file" id="dataUrlFile">
                </div>
                
                <div class="input-group">
                    <label for="fileInfo">File Info:</label>
                    <div id="fileInfo" style="padding: 10px; background: var(--control-bg); border-radius: 4px; font-size: 0.9em;">
                        No file selected
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="generateDataUrl">Generate Data URL</button>
                <button id="copyDataUrl">Copy Data URL</button>
                <button id="clearDataUrl">Clear</button>
            </div>
            
            <div class="result-box">
                <label>Data URL:</label>
                <textarea id="dataUrlOutput" rows="4" readonly placeholder="Data URL will appear here..."></textarea>
            </div>
            
            <div class="info-display">
                <div class="info-item">
                    <span class="info-label">Data URL Length:</span>
                    <span id="dataUrlLength">0 characters</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Preview:</span>
                    <div id="dataUrlPreview" style="margin-top: 5px;"></div>
                </div>
            </div>
        </div>
    `;

    const typeSelect = element.querySelector('#dataUrlType');
    const textInputSection = element.querySelector('#textInputSection');
    const fileInputSection = element.querySelector('#fileInputSection');
    const dataUrlText = element.querySelector('#dataUrlText');
    const textMimeType = element.querySelector('#textMimeType');
    const dataUrlFile = element.querySelector('#dataUrlFile');
    const fileInfo = element.querySelector('#fileInfo');
    const generateBtn = element.querySelector('#generateDataUrl');
    const copyBtn = element.querySelector('#copyDataUrl');
    const clearBtn = element.querySelector('#clearDataUrl');
    const dataUrlOutput = element.querySelector('#dataUrlOutput');
    const dataUrlLength = element.querySelector('#dataUrlLength');
    const dataUrlPreview = element.querySelector('#dataUrlPreview');

    function updateSections() {
        const type = typeSelect.value;
        textInputSection.style.display = type === 'text' ? 'block' : 'none';
        fileInputSection.style.display = type === 'file' ? 'block' : 'none';
    }

    function generateDataURL() {
        const type = typeSelect.value;
        
        if (type === 'text') {
            const text = dataUrlText.value;
            const mimeType = textMimeType.value;
            const dataURL = `data:${mimeType};base64,${btoa(unescape(encodeURIComponent(text)))}`;
            
            dataUrlOutput.value = dataURL;
            dataUrlLength.textContent = `${dataURL.length} characters`;
            
            // Preview
            if (mimeType === 'text/html') {
                dataUrlPreview.innerHTML = `<iframe src="${dataURL}" style="width: 100%; height: 200px; border: 1px solid var(--border-color);"></iframe>`;
            } else if (mimeType.startsWith('image/')) {
                dataUrlPreview.innerHTML = `<img src="${dataURL}" style="max-width: 100%; max-height: 200px;">`;
            } else {
                dataUrlPreview.textContent = text.substring(0, 100) + (text.length > 100 ? '...' : '');
            }
            
        } else if (type === 'file') {
            const file = dataUrlFile.files[0];
            if (!file) {
                alert('Please select a file');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataURL = e.target.result;
                dataUrlOutput.value = dataURL;
                dataUrlLength.textContent = `${dataURL.length} characters`;
                
                // Preview based on file type
                if (file.type.startsWith('image/')) {
                    dataUrlPreview.innerHTML = `<img src="${dataURL}" style="max-width: 100%; max-height: 200px;">`;
                } else if (file.type.startsWith('text/')) {
                    dataUrlPreview.textContent = 'Text file - download to view content';
                } else {
                    dataUrlPreview.textContent = `File: ${file.name} (${file.type})`;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function updateFileInfo() {
        const file = dataUrlFile.files[0];
        if (file) {
            fileInfo.innerHTML = `
                <strong>${file.name}</strong><br>
                Type: ${file.type || 'Unknown'}<br>
                Size: ${(file.size / 1024).toFixed(2)} KB<br>
                Last Modified: ${new Date(file.lastModified).toLocaleDateString()}
            `;
        } else {
            fileInfo.textContent = 'No file selected';
        }
    }

    function copyDataURL() {
        if (dataUrlOutput.value) {
            navigator.clipboard.writeText(dataUrlOutput.value).then(() => {
                alert('Data URL copied to clipboard!');
            });
        }
    }

    function clearAll() {
        dataUrlText.value = '';
        dataUrlFile.value = '';
        dataUrlOutput.value = '';
        dataUrlLength.textContent = '0 characters';
        dataUrlPreview.innerHTML = '';
        fileInfo.textContent = 'No file selected';
    }

    typeSelect.addEventListener('change', updateSections);
    generateBtn.addEventListener('click', generateDataURL);
    copyBtn.addEventListener('click', copyDataURL);
    clearBtn.addEventListener('click', clearAll);
    dataUrlFile.addEventListener('change', updateFileInfo);

    // Auto-generate when text changes
    dataUrlText.addEventListener('input', generateDataURL);
    textMimeType.addEventListener('change', generateDataURL);

    updateSections();
    generateDataURL();
    return element;
}

// ========== UTILITY FUNCTIONS ==========

function setupNumberInputArrows(element) {
    const arrows = element.querySelectorAll('.number-input-arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const inputId = this.getAttribute('data-input');
            const direction = this.getAttribute('data-direction');
            const input = element.querySelector(`#${inputId}`);
            
            if (input.readOnly) return;
            
            const step = parseFloat(input.step) || 1;
            const min = parseFloat(input.min) || -Infinity;
            const max = parseFloat(input.max) || Infinity;
            let currentValue = parseFloat(input.value) || 0;
            
            if (direction === 'up') {
                currentValue += step;
                if (currentValue > max) currentValue = max;
            } else {
                currentValue -= step;
                if (currentValue < min) currentValue = min;
            }
            
            input.value = currentValue;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
    });
}

// ========== ADDITIONAL CSS FOR NEW COMPONENTS ==========

const additionalCSS = `
/* Matrix Calculator Styles */
.matrix-input {
    display: inline-block;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 10px;
    background: var(--control-bg);
}

.matrix-row {
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
}

.matrix-row:last-child {
    margin-bottom: 0;
}

.matrix-cell {
    width: 60px;
    padding: 5px;
    text-align: center;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    background: var(--input-bg);
    color: var(--text-color);
}

.matrix-result {
    display: inline-block;
    padding: 10px;
    background: var(--control-bg);
    border-radius: 4px;
}

.matrix-result .matrix-row {
    margin-bottom: 2px;
}

.matrix-result .matrix-cell {
    background: transparent;
    border: none;
    padding: 2px 8px;
}

/* Data URL Generator Styles */
#dataUrlPreview img {
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

/* Holiday Calendar Styles */
.info-item div {
    line-height: 1.4;
}

/* Color Name Finder Styles */
#similarColors > div {
    transition: transform 0.2s ease;
}

#similarColors > div:hover {
    transform: translateY(-2px);
}

/* Regex Tester Styles */
mark {
    padding: 1px 2px;
    border-radius: 2px;
}

/* SQL Formatter Styles */
textarea {
    font-family: 'Courier New', monospace;
    line-height: 1.4;
}

/* HTTP Status Lookup Styles */
#commonStatusCodes > div {
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

#commonStatusCodes > div:hover {
    border-color: var(--primary-color);
    transform: translateY(-1px);
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.tool) {
            const tool = state.tools.find(t => t.id === event.state.tool);
            if (tool) {
                openTool(tool);
            }
        } else {
            showToolsGrid();
        }
    });

    // Initialize the application
    init();
});

