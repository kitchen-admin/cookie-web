(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
// Target colors
// White:      rgb(255, 255, 255)
// Amber-900:  rgb(120,  53,  15)  (#78350f)
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
function HeroContent({ overlayDelay = 7000 }) {
    _s();
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [colorProgress, setColorProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0) // 0 = white, 1 = amber-900
    ;
    const [fadeOut, setFadeOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reveal text 1s after the overlay appears
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroContent.useEffect": ()=>{
            const timer = setTimeout({
                "HeroContent.useEffect.timer": ()=>setRevealed(true)
            }["HeroContent.useEffect.timer"], overlayDelay + 1000);
            return ({
                "HeroContent.useEffect": ()=>clearTimeout(timer)
            })["HeroContent.useEffect"];
        }
    }["HeroContent.useEffect"], [
        overlayDelay
    ]);
    // Track scroll to interpolate color as amber section rises over the text
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroContent.useEffect": ()=>{
            function handleScroll() {
                const vh = window.innerHeight;
                const scrollY = window.scrollY;
                // Hero is h-dvh. Text is fixed at ~50vh.
                // Amber section enters viewport from bottom as user scrolls.
                // It reaches the text center (~50vh from top) when scrollY ≈ vh * 0.5.
                // Transition window: scrollY 30%–70% of viewport height.
                const start = vh * 0.3;
                const end = vh * 0.7;
                const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
                setColorProgress(progress);
                // Fade out once the user has scrolled past the hero section
                setFadeOut(scrollY > vh * 1.1);
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
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-12 top-1/2 z-50 -translate-y-1/2 pointer-events-none md:left-20", "transition-opacity duration-700 ease-in-out", revealed && !fadeOut ? "opacity-100" : "opacity-0"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-7xl font-extrabold leading-tight tracking-tight whitespace-nowrap",
            style: {
                color: `rgb(${r}, ${g}, ${b})`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block",
                    children: "What if your kitchen"
                }, void 0, false, {
                    fileName: "[project]/components/ui/hero-content.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block",
                    children: "can think?"
                }, void 0, false, {
                    fileName: "[project]/components/ui/hero-content.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/hero-content.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/hero-content.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(HeroContent, "UX1Gc9X0JIly+Jg60dJiiDA6Q6E=");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function HeroOverlay({ delay = 7000 }) {
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroOverlay.useEffect": ()=>{
            const timer = setTimeout({
                "HeroOverlay.useEffect.timer": ()=>setVisible(true)
            }["HeroOverlay.useEffect.timer"], delay);
            return ({
                "HeroOverlay.useEffect": ()=>clearTimeout(timer)
            })["HeroOverlay.useEffect"];
        }
    }["HeroOverlay.useEffect"], [
        delay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(// Covers the full hero, sits above video (z-20) but below foreground content (z-10 is fg)
        "absolute inset-0 z-20", // Black at 80% opacity + background blur applied to the overlay itself
        "bg-black/40 backdrop-blur-lg", // Fade in from 0 to full opacity
        "transition-opacity duration-1200 ease-in-out", visible ? "opacity-100" : "opacity-0"),
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/components/ui/hero-overlay.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(HeroOverlay, "cz/DzCD06IMMsoBJ0A1IgCy1P5M=");
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
"[project]/components/ui/progressive-blur.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgressiveBlur",
    ()=>ProgressiveBlur
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function ProgressiveBlur({ className, height = "30%", position = "bottom", blurLevels = [
    0.5,
    1,
    2,
    4,
    8,
    16,
    32,
    64
] }) {
    // Middle layers = total levels minus the first and last
    const divElements = Array(blurLevels.length - 2).fill(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none absolute inset-x-0 z-10", position === "top" ? "top-0" : position === "bottom" ? "bottom-0" : "inset-y-0", className),
        style: {
            height: position === "both" ? "100%" : height
        },
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    zIndex: 1,
                    backdropFilter: `blur(${blurLevels[0]}px)`,
                    WebkitBackdropFilter: `blur(${blurLevels[0]}px)`,
                    maskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/progressive-blur.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            divElements.map((_, index)=>{
                const blurIndex = index + 1;
                const startPercent = blurIndex * 12.5;
                const midPercent = (blurIndex + 1) * 12.5;
                const endPercent = (blurIndex + 2) * 12.5;
                const maskGradient = position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        zIndex: index + 2,
                        backdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                        WebkitBackdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                        maskImage: maskGradient,
                        WebkitMaskImage: maskGradient
                    }
                }, `blur-${index}`, false, {
                    fileName: "[project]/components/ui/progressive-blur.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    zIndex: blurLevels.length,
                    backdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
                    WebkitBackdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
                    maskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage: position === "bottom" ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : position === "top" ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)` : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/progressive-blur.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/progressive-blur.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = ProgressiveBlur;
var _c;
__turbopack_context__.k.register(_c, "ProgressiveBlur");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_02jmo46._.js.map