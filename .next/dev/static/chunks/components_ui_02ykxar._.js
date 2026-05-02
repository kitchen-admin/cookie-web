(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/hero-content.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroContent",
    ()=>HeroContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Color targets
const WHITE = {
    r: 255,
    g: 255,
    b: 255
};
const AMBER_900 = {
    r: 120,
    g: 53,
    b: 15
};
function lerp(a, b, t) {
    return Math.round(a + (b - a) * t);
}
// Returns 0→1 progress between two scroll positions (expressed as vh multipliers)
function scrollProgress(scrollY, startMult, endMult, vh) {
    return Math.max(0, Math.min(1, (scrollY - startMult * vh) / ((endMult - startMult) * vh)));
}
function HeroContent() {
    _s();
    const [headlineOpacity, setHeadlineOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [colorProgress, setColorProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [taglineVisible, setTaglineVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroContent.useEffect": ()=>{
            function handleScroll() {
                const vh = window.innerHeight;
                const scrollY = window.scrollY;
                // ── Within hero (0 → 300vh) ──────────────────────────────────────────
                // Headline fades in during 30vh → 120vh (user scrolls through first screen)
                setHeadlineOpacity(scrollProgress(scrollY, 0.3, 1.2, vh));
                // ── Transition into section 2 (scrollY 2.0 → 2.8 × vh) ──────────────────
                // The amber section enters the viewport from scrollY = 200dvh (its top
                // hits the viewport bottom) and is fully in view at scrollY = 300dvh (max).
                // Color transitions white → amber-900 across this window.
                setColorProgress(scrollProgress(scrollY, 2.0, 2.8, vh));
                // Tagline appears once the amber section is mostly filling the screen
                setTaglineVisible(scrollY > vh * 2.85);
            }
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "HeroContent.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["HeroContent.useEffect"];
        }
    }["HeroContent.useEffect"], []);
    const r = lerp(WHITE.r, AMBER_900.r, colorProgress);
    const g = lerp(WHITE.g, AMBER_900.g, colorProgress);
    const b = lerp(WHITE.b, AMBER_900.b, colorProgress);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            opacity: headlineOpacity
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-7xl font-extrabold leading-none tracking-tight whitespace-nowrap",
                style: {
                    color: `rgb(${r}, ${g}, ${b})`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block",
                        children: "What if your"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/hero-content.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block",
                        children: "kitchen can think?"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/hero-content.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/hero-content.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-4 text-2xl font-normal whitespace-nowrap text-black-50", "transition-opacity duration-700 ease-out", taglineVisible ? "opacity-100" : "opacity-0"),
                children: "Stop ordering in. Your fridge has a 3-course meal hiding."
            }, void 0, false, {
                fileName: "[project]/components/ui/hero-content.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/hero-content.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(HeroContent, "LU/XR+yG22S0DXvKjrD51F0cL4o=");
_c = HeroContent;
var _c;
__turbopack_context__.k.register(_c, "HeroContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/hero-overlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroOverlay",
    ()=>HeroOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function HeroOverlay() {
    _s();
    const [opacity, setOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroOverlay.useEffect": ()=>{
            function handleScroll() {
                const vh = window.innerHeight;
                // Overlay fully fades in within the first viewport-height of scroll (0 → 100vh)
                const progress = Math.max(0, Math.min(1, window.scrollY / vh));
                setOpacity(progress);
            }
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "HeroOverlay.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["HeroOverlay.useEffect"];
        }
    }["HeroOverlay.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-20 bg-black/60 backdrop-blur-lg",
        style: {
            opacity
        },
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/components/ui/hero-overlay.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(HeroOverlay, "Ga86qnrIhwUCt0/dxb3hKUM4P9I=");
_c = HeroOverlay;
var _c;
__turbopack_context__.k.register(_c, "HeroOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/hero-video.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroVideo",
    ()=>HeroVideo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function HeroVideo({ src }) {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function handleTimeUpdate() {
        const video = videoRef.current;
        if (!video) return;
        // Pause and freeze at exactly 13 seconds
        if (video.currentTime >= 13) {
            video.pause();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
        ref: videoRef,
        className: "pointer-events-none absolute inset-0 z-0 h-full w-full object-cover",
        autoPlay: true,
        muted: true,
        playsInline: true,
        preload: "metadata",
        "aria-hidden": true,
        onTimeUpdate: handleTimeUpdate,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
            src: src,
            type: "video/mp4"
        }, void 0, false, {
            fileName: "[project]/components/ui/hero-video.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/hero-video.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(HeroVideo, "0CLVWOVx+8g0ODBjgEMJWUwEryM=");
_c = HeroVideo;
var _c;
__turbopack_context__.k.register(_c, "HeroVideo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/intro-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntroSection",
    ()=>IntroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const FRIDGE_IMAGE_SRC = "https://7gexo7oc4kxixfb3.public.blob.vercel-storage.com/fridge.png";
const INGREDIENTS = [
    {
        name: "Fresh Fish",
        expires: "Expires in 2 days"
    },
    {
        name: "Fish (door shelf)",
        expires: "Expires in 3 days"
    },
    {
        name: "Chicken Breast",
        expires: "Expires tomorrow"
    },
    {
        name: "Eggs",
        expires: "Expires in 14 days"
    },
    {
        name: "Lettuce",
        expires: "Expires in 4 days"
    },
    {
        name: "Mushrooms",
        expires: "Expires in 3 days"
    },
    {
        name: "Zucchini",
        expires: "Expires in 5 days"
    },
    {
        name: "Bell Peppers",
        expires: "Expires in 7 days"
    },
    {
        name: "Broccoli",
        expires: "Expires in 5 days"
    },
    {
        name: "Carrots",
        expires: "Expires in 10 days"
    },
    {
        name: "Tomatoes",
        expires: "Expires in 4 days"
    },
    {
        name: "Red Onion",
        expires: "Expires in 21 days"
    },
    {
        name: "Garlic",
        expires: "Expires in 30 days"
    },
    {
        name: "Spice Blend",
        expires: "Expires in 90 days"
    }
];
const FIRST_DELAY_MS = 2500;
const BETWEEN_MS = 600 // gap after one balloon fades before next appears
;
function IntroSection() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Reveal section on scroll into view
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntroSection.useEffect": ()=>{
            const el = sectionRef.current;
            if (!el) return;
            const observer = new IntersectionObserver({
                "IntroSection.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                }
            }["IntroSection.useEffect"], {
                threshold: 0.2
            });
            observer.observe(el);
            return ({
                "IntroSection.useEffect": ()=>observer.disconnect()
            })["IntroSection.useEffect"];
        }
    }["IntroSection.useEffect"], []);
    // Fire first bubble after initial delay
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntroSection.useEffect": ()=>{
            if (!visible) return;
            const t = setTimeout({
                "IntroSection.useEffect.t": ()=>setCurrentIndex(0)
            }["IntroSection.useEffect.t"], FIRST_DELAY_MS);
            return ({
                "IntroSection.useEffect": ()=>clearTimeout(t)
            })["IntroSection.useEffect"];
        }
    }["IntroSection.useEffect"], [
        visible
    ]);
    // After each balloon finishes floating, queue the next ingredient
    const handleAnimationComplete = ()=>{
        setTimeout(()=>{
            setCurrentIndex((i)=>i === null ? 0 : (i + 1) % INGREDIENTS.length);
        }, BETWEEN_MS);
    };
    const isRight = currentIndex !== null && currentIndex % 2 !== 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        className: "h-dvh w-full bg-amber-50 flex items-center justify-end px-12 md:px-20",
        "aria-label": "Introduction",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative transition-all duration-700 ease-out", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: FRIDGE_IMAGE_SRC,
                            alt: "An open fridge stocked with fresh organic ingredients",
                            width: 480,
                            height: 530,
                            className: "w-[480px] h-auto object-contain",
                            priority: false
                        }, void 0, false, {
                            fileName: "[project]/components/ui/intro-section.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fridge-scan-bar"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/intro-section.tsx",
                            lineNumber: 86,
                            columnNumber: 23
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/intro-section.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: currentIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-0 z-10 bg-amber-200 p-3",
                        style: {
                            // Alternate which side of the image the bubble rises from
                            ...isRight ? {
                                right: "20%"
                            } : {
                                left: "20%"
                            },
                            // Notch corner faces inward toward the image centre
                            borderRadius: isRight ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                            // Scale from the bottom so it grows "out of" the image edge
                            transformOrigin: "bottom center"
                        },
                        // Full float: fades in, drifts up, fades out — like a balloon
                        animate: {
                            opacity: [
                                0,
                                1,
                                1,
                                0
                            ],
                            y: [
                                12,
                                -24,
                                -56,
                                -80
                            ],
                            // Slight lateral drift — left bubbles lean left, right lean right
                            x: isRight ? [
                                0,
                                6,
                                10,
                                12
                            ] : [
                                0,
                                -6,
                                -10,
                                -12
                            ],
                            scale: [
                                0.8,
                                1,
                                1,
                                0.92
                            ]
                        },
                        transition: {
                            duration: 2.4,
                            times: [
                                0,
                                0.18,
                                0.72,
                                1
                            ],
                            ease: "easeOut"
                        },
                        onAnimationComplete: handleAnimationComplete,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14px] font-medium leading-tight text-black-90 whitespace-nowrap",
                                children: INGREDIENTS[currentIndex].name
                            }, void 0, false, {
                                fileName: "[project]/components/ui/intro-section.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] font-normal text-black-50 whitespace-nowrap",
                                children: INGREDIENTS[currentIndex].expires
                            }, void 0, false, {
                                fileName: "[project]/components/ui/intro-section.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this)
                        ]
                    }, currentIndex, true, {
                        fileName: "[project]/components/ui/intro-section.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/intro-section.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/intro-section.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/intro-section.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(IntroSection, "7dyJfezJL1keToFCFPloP23C2x8=");
_c = IntroSection;
var _c;
__turbopack_context__.k.register(_c, "IntroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_ui_02ykxar._.js.map